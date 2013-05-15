import numpy as np
import pandas as pd
from pandas import *
from datetime import datetime, date
import calendar
from calendar import *


data = pd.read_csv('static/Master_Listens_ID.csv')
dates = np.unique(data['listentime']).tolist()
datetimes = [date(int(dt.split('/')[2]),int(dt.split('/')[0]),int(dt.split('/')[1])) for dt in dates]
datetimes.sort()
datemillis = [timegm(date.timetuple())*1000 for date in datetimes]
dates = [datetime.strftime(date, '%-m/%-d/%Y') for date in datetimes]
daily_counts = []
for i in range(len(dates)):
	daily_counts.append(np.unique(data[data['listentime'] == dates[i]]['sessid']).size)
template_data = [[date, count] for date in datemillis for count in daily_counts]
print(template_data)





