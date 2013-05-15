import numpy as np
import pandas as pd
from pandas import *
from datetime import datetime, date
import calendar
from calendar import *


data = pd.read_csv('static/Master_Listens_ID.csv')
data = DataFrame({'userid':data['UID'], 'sessid':data['sessid'], 'date':data['listentime']}).drop_duplicates()
b = data['userid'].value_counts()
print(len(data['userid'].values))
print((data['date'].values)[0])
# print(b.cumsum())
# print((b+0.0)/sum(b))
# print((b.cumsum()+0.0)/sum(b))
