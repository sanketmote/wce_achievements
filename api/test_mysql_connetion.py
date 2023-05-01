# ip details -> one global_customer_id -> have 100 ips in one year -> 365 days 
#  create fake customer -> generate 100 ips -> { timestamp first_access 365/100 }


import sqlobject
from random import randint
import string
import datetime
import time

import random 
connection = sqlobject.connectionForURI("mysql://root:wce@172.18.0.1:3306/social") # 
sqlobject.sqlhub.processConnection = connection


get_ip_id_query = "select * from comments"
((get_ip_id,), )= connection.queryAll(get_ip_id_query)