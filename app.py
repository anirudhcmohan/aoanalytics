from flask import Flask, render_template, request
import numpy as np
import pandas as pd
from pandas import *
import os, calendar, json
from datetime import datetime,date
from calendar import *


app = Flask(__name__)

app.config.update(
	DEBUG = True,
	SEND_FILE_MAX_AGE_DEFAULT = 10
)

@app.route('/')
@app.route('/listens')
def index():
	data = pd.read_csv('static/Master_Listens_ID.csv')
	dates = np.unique(data['listentime']).tolist()
	datetimes = [date(int(dt.split('/')[2]),int(dt.split('/')[0]),int(dt.split('/')[1])) for dt in dates]
	datetimes.sort()
	datemillis = [timegm(dt.timetuple())*1000 for dt in datetimes]
	dates = [datetime.strftime(dt, '%-m/%-d/%Y') for dt in datetimes]
	daily_counts = []
	for i in range(len(dates)):
		daily_counts.append(np.unique(data[data['listentime'] == dates[i]]['sessid']).size)
	template_data = [[datemillis[i], daily_counts[i]] for i in range(len(dates))]
	return render_template('listens.html',data=template_data)

@app.route('/farmers')
def farmers():
	data = pd.read_csv('static/Master_Listens_ID.csv')
	data = DataFrame({'userid':data['UID'], 'sessid':data['sessid'], 'datecall':data['listentime']}).drop_duplicates()
	farmer_calls = {}
	for i in range(len(data['userid'].values)):
		user = data['userid'].values[i]
		call = data['datecall'].values[i]
		call = timegm(date(int(call.split('/')[2]),int(call.split('/')[0]),int(call.split('/')[1])).timetuple())*1000
		if user not in farmer_calls: farmer_calls[user] = {} 
		if call not in farmer_calls[user]: farmer_calls[user][call] = 0
		farmer_calls[user][call] += 1
	for key in farmer_calls:
		farmer_calls[key] = [[dt,farmer_calls[key][dt]] for dt in farmer_calls[key]]
	counts = [value for value in data['userid'].value_counts().values]
	print farmer_calls
	return render_template('farmers.html',counts=counts,calls=farmer_calls)
	
if __name__ == '__main__':
	port = int(os.environ.get('PORT', 5000))
	app.run(host='0.0.0.0', port=port)