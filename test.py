import numpy as np
import pandas as pd
from pandas import DataFrame, Series
from datetime import datetime, date
import calendar
from calendar import *


data = pd.read_csv('static/AO_Outgoing_Aug.csv')
data = data[data['duration'] != "N/A"]
data['duration'] = map(int,data['duration'].values)
print((data[data["date"] == "8/24/2011"]["duration"]).mean())
print(np.unique(data[data["date"] == "8/24/2011"]["UID"]).size)