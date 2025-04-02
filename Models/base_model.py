import numpy as np
import pandas as pd
import copy
from typing import Optional, Union

from torch.utils.data import DataLoader, Sampler
import torch
import torch.nn as nn
import torch.optim as optim

def calc_ic(pred, label):
    df = pd.DataFrame({'pred': pred, 'label': label})
    ic = df['pred'].corr(df['label'])
    ric = df['pred'].corr(df['label'], method='spearman')
    return ic, ric

def zscore(x):
    return (x - x.mean()).div(x.std())

def drop_extreme(x):
    sorted_tensor, indices = x.sort()
    N = x.shape[0]
    percent_2_5 = int(0.025 * N)
    # Exclude top 2.5% and bottom 2.5% values
    filtered_indices = indices[percent_2_5:-percent_2_5]
    mask = torch.zeros_like(x, device=x.device, dtype=torch.bool)
    mask[filtered_indices] = True
    return mask, x[mask]

def drop_na(x):
    mask = ~x.isnan()
    return mask, x[mask]

class DailyBatchSamplerRandom(Sampler):
    def __init__(self, data_source, shuffle: bool = False):
        self.data_source = data_source
        self.shuffle = shuffle
        # Calculate number of samples in each batch
        self.daily_count = pd.Series(index=self.data_source.get_index()).groupby("datetime").size().values
        daily_count_array = np.array(self.daily_count)
        self.daily_index = np.roll(np.cumsum(daily_count_array), 1)  # Calculate begin index of each batch
        self.daily_index[0] = 0

    def __iter__(self):
        if self.shuffle:
            index = np.arange(len(self.daily_count))
            np.random.shuffle(index)
            for i in index:
                yield np.arange(self.daily_index[i], self.daily_index[i] + self.daily_count[i])
        else:
            for idx, count in zip(self.daily_index, self.daily_count):
                yield np.arange(idx, idx + count)

    def __len__(self):
        return len(self.data_source)

class SequenceModel:
    def __init__( self, n_epochs: int, lr: float, GPU: Optional[int] = None, seed: Optional[int] = None, train_stop_loss_thred: Optional[float] = None, save_path: str = "model/", save_prefix: str = "",):
        self.n_epochs = n_epochs
        self.lr = lr
        self.device = torch.device(f"cuda:{GPU}" if GPU is not None and torch.cuda.is_available() else "cpu")
        self.seed = seed
        self.train_stop_loss_thred = train_stop_loss_thred

        if self.seed is not None:
            np.random.seed(self.seed)
            torch.manual_seed(self.seed)
            torch.cuda.manual_seed_all(self.seed)
            torch.backends.cudnn.deterministic = True

        self.fitted: int = -1  # Track training progress with an integer
        self.model: Optional[nn.Module] = None  # Placeholder for the model
        self.train_optimizer: Optional[optim.Optimizer] = None  # Placeholder for the optimizer

        self.save_path = save_path
        self.save_prefix = save_prefix

    def init_model(self):
        if self.model is None:
            raise ValueError("Model has not been initialized")
        self.train_optimizer = optim.Adam(self.model.parameters(), lr=self.lr)
        self.model.to(self.device)

    def loss_fn(self, pred, label):
        mask = ~torch.isnan(label)
        loss = (pred[mask] - label[mask]) ** 2
        return torch.mean(loss)

    def train_epoch(self, data_loader):
        if self.model is None:
            raise ValueError("Model has not been initialized")
        self.model.train()
        losses = []

        for data in data_loader:
            data = torch.squeeze(data, dim=0)
            '''
            data.shape: (N, T, F)
            N - number of stocks
            T - length of lookback_window, 8
            F - 158 factors + 63 market information + 1 label           
            '''
            feature = data[:, :, 0:-1].to(self.device)
            label = data[:, -1, -1].to(self.device)

            # Additional process on labels
            # If you use original data to train, you won't need the following lines because we already drop extreme when we dumped the data.
            # If you use the opensource data to train, use the following lines to drop extreme labels.
            #########################
            mask, label = drop_extreme(label)
            feature = feature[mask, :, :]
            label = zscore(label) # CSZscoreNorm
            #########################

            pred = self.model(feature.float())
            loss = self.loss_fn(pred, label)
            losses.append(loss.item())

            if self.train_optimizer is None:
                raise ValueError("Optimizer has not been initialized")
            self.train_optimizer.zero_grad()
            loss.backward()
            torch.nn.utils.clip_grad_value_(self.model.parameters(), 3.0)
            self.train_optimizer.step()

        return float(np.mean(losses))

    def test_epoch(self, data_loader):
        if self.model is None:
            raise ValueError("Model has not been initialized")
        self.model.eval()
        losses = []

        for data in data_loader:
            data = torch.squeeze(data, dim=0)
            feature = data[:, :, 0:-1].to(self.device)
            label = data[:, -1, -1].to(self.device)
            
            # You cannot drop extreme labels for test. 
            label = zscore(label)

            pred = self.model(feature.float())
            loss = self.loss_fn(pred, label)
            losses.append(loss.item())

        return float(np.mean(losses))

    def _init_data_loader(self, data, shuffle=True, drop_last=True):
        sampler = DailyBatchSamplerRandom(data, shuffle)
        data_loader = DataLoader(data, sampler=sampler, drop_last=drop_last)
        return data_loader
    
    def load_param(self, param_path: str):
        if self.model is None:
            raise ValueError("Model has not been initialized")
        self.model.load_state_dict(torch.load(param_path, map_location=self.device))
        self.fitted = 1

    def fit(self, dl_train, dl_valid=None):
        train_loader = self._init_data_loader(dl_train, shuffle=True, drop_last=True)
        best_param = None
        for step in range(self.n_epochs):
            train_loss = self.train_epoch(train_loader)
            self.fitted = step
            if dl_valid:
                predictions, metrics = self.predict(dl_valid)
                print(
                    f"Epoch {step}, train_loss {train_loss:.6f}, valid ic {metrics['IC']:.4f}, "
                    f"icir {metrics['ICIR']:.3f}, rankic {metrics['RIC']:.4f}, rankicir {metrics['RICIR']:.3f}."
                )
            else:
                print(f"Epoch {step}, train_loss {train_loss:.6f}")

            if self.train_stop_loss_thred is not None and train_loss <= self.train_stop_loss_thred:
                if self.model is None:
                    raise ValueError("Model has not been initialized")
                best_param = copy.deepcopy(self.model.state_dict())
                torch.save(best_param, f"{self.save_path}/{self.save_prefix}_{self.seed}.pkl")
                break

    def predict(self, dl_test):
        if self.fitted < 0:
            raise ValueError("Model is not fitted yet!")
        print("Epoch:", self.fitted)

        test_loader = self._init_data_loader(dl_test, shuffle=False, drop_last=False)
        preds, ic, ric = [], [], []

        if self.model is None:
            raise ValueError("Model has not been initialized")
        self.model.eval()
        for data in test_loader:
            data = torch.squeeze(data, dim=0)
            feature = data[:, :, 0:-1].to(self.device)
            label = data[:, -1, -1]

            # nan label will be automatically ignored when compute metrics.
            # zscorenorm will not affect the results of ranking-based metrics.
            with torch.no_grad():
                pred = self.model(feature.float()).detach().cpu().numpy()
            preds.append(pred.ravel())

            daily_ic, daily_ric = calc_ic(pred, label.detach().numpy())
            ic.append(daily_ic)
            ric.append(daily_ric)

        predictions = pd.Series(np.concatenate(preds), index=dl_test.get_index())
        metrics = {
            "IC": np.mean(ic),
            "ICIR": np.mean(ic) / np.std(ic),
            "RIC": np.mean(ric),
            "RICIR": np.mean(ric) / np.std(ric),
        }
        return predictions, metrics