import numpy as np
import pandas as pd
from pandas import *
from datetime import datetime, date
import calendar
from calendar import *


data = pd.read_csv('static/AO_Outgoing_Aug.csv')
data = data[data['duration'] != "N/A"]

