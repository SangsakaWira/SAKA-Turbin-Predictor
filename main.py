from flask import Flask,jsonify
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from flask_cors import CORS,cross_origin
from flask import request
import json 

app = Flask(__name__)
CORS(app)

# IMPORT DATASET
dataset = pd.read_excel("data_gas.xlsx")
dataset = dataset.iloc[1:,:]
max_list = dataset.max().values
min_list = dataset.min().values
x=dataset.iloc[:,:-1].values
y=dataset.iloc[:,-1].values

mmScaler = MinMaxScaler()
x = mmScaler.fit_transform(x)

# DATA SPLIT FOR MODELLING
X_train, X_test, y_train, y_test = train_test_split(x, y, test_size= 0.3, random_state= 1234)
reg = LinearRegression().fit(X_train, y_train)

def inference(coba_scaling):
    coba_scaling_2 = []
    coba_scaling_2.append(min_list[:-1])
    coba_scaling_2.append(max_list[:-1])
    coba_scaling_2.append(coba_scaling)
    data_return = mmScaler.fit_transform(coba_scaling_2)
    return data_return[2]

data_scaling = dataset.iloc[0,:-1].values
scaled_value = inference(data_scaling)
result = reg.predict([scaled_value])
print(format(result[0],'3f'))

@app.route("/predict")
def predict():
    return jsonify({'result':result[0]})

@app.route("/predict_post",methods=["POST"])
def predict_post():
    request_data = request.get_json()
    
    print("Type: "+str(type(request_data)))
    print("JSON: "+str(request_data))
    if request.method == 'POST':
        air_pressure = float(request_data.get('air_pressure'))
        temperature_enclosure = float(request_data.get('temperature_enclosure'))
        pcd = float(request_data.get('pcd'))
        actual_fuel_flow = float(request_data.get('actual_fuel_flow'))
        generator = float(request_data.get('generator'))
        t1_temperature = float(request_data.get('t1_temperature'))
        gas_fuel_temp = float(request_data.get('gas_fuel_temp'))
        turbine_air_inlet = float(request_data.get('turbine_air_inlet'))
        parameters = np.asarray([air_pressure,temperature_enclosure,pcd,actual_fuel_flow,generator,t1_temperature,gas_fuel_temp,turbine_air_inlet])
        print("Parameters: "+str(parameters))
        inference_data = inference(parameters)
        predicted = reg.predict([inference_data])
    
    return jsonify({'result':predicted[0]})

app.run(host='localhost',port=3500)