import numpy as np
import pandas as pd
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pickle
import copy
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
import json
import sys

l1= LabelEncoder()

app = Flask(__name__)
CORS(app)
# model = pickle.load(open('model_pkl', 'rb'))
loan_model = pickle.load(open('loan_model.pkl', 'rb'))

data1= pd.read_csv("APY.csv")
data2= pd.read_csv("APY.csv")
tr_df = pd.read_csv("https://raw.githubusercontent.com/Kirti-kn/AgroInOne/master/loan%20prediction/Train.csv")
tr_df.drop('Loan_ID',axis=1,inplace=True)






mn=round(data1["Production"].mean(),2)
data1["Production"].fillna(mn,inplace=True)
data1["Crop"].fillna("Wheat",inplace=True)
data2["Production"].fillna(mn,inplace=True)
data2["Crop"].fillna("Wheat",inplace=True)

data1["State"]=l1.fit_transform(data1["State"])
data1["District "]=l1.fit_transform(data1["District "])
data1["Crop"]=l1.fit_transform(data1["Crop"])
data1["Season"]=l1.fit_transform(data1["Season"])

state_dict={}
district_dict={}
crop_dict={}
season_dict={}

for i,j in zip(data1['State'],data2['State']):
  state_dict[j]=i

for i,j in zip(data1['District '],data2['District ']):
  district_dict[j]=i

for i,j in zip(data1['Crop'],data2['Crop']):
  j=j.replace(" ","")
  crop_dict[j]=i

for i,j in zip(data1['Season'],data2['Season']):
  j=j.replace(" ","")
  season_dict[j]=i

print("**************************************************************************************************************")

null_cols = ['Credit_History', 'Self_Employed', 'LoanAmount','Dependents', 'Loan_Amount_Term', 'Gender', 'Married']
for col in null_cols:
    tr_df[col] = tr_df[col].fillna(tr_df[col].dropna().mode().values[0])

# categorial columns
cat = tr_df.select_dtypes('object').columns.to_list()



train_data= copy.deepcopy(tr_df)

for i in cat:
  train_data[i]=l1.fit_transform(train_data[i])

oi_dict ={}


for i in cat:
  for j,k in zip(tr_df[i],train_data[i]):
    oi_dict[j]=k

credits_dict = {'No dues':1.0,'Dues left':0.0}


dataset = pd.read_csv('Crop_recommendation.csv')
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)

classifier = RandomForestClassifier(n_estimators = 10, criterion = 'entropy', random_state = 0)
classifier.fit(X_train, y_train)


# Load the dataset
df = pd.read_csv("crop_production_karnataka.csv")

# Drop the Crop_Year column
df = df.drop(['Crop_Year'], axis=1)

# Separate the features and target variables
X = df.drop(['Production'], axis=1)
y = df['Production']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Categorical columns for one-hot encoding
categorical_cols = ['State_Name', 'District_Name', 'Season', 'Crop']

# One-hot encode the categorical columns
ohe = OneHotEncoder(handle_unknown='ignore')
ohe.fit(X_train[categorical_cols])

# Convert categorical columns to one-hot encoding
X_train_categorical = ohe.transform(X_train[categorical_cols])
X_test_categorical = ohe.transform(X_test[categorical_cols])

# Combine the one-hot encoded categorical columns and numerical columns
X_train_final = np.hstack((X_train_categorical.toarray(), X_train.drop(categorical_cols, axis=1)))
X_test_final = np.hstack((X_test_categorical.toarray(), X_test.drop(categorical_cols, axis=1)))

# Train the model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train_final, y_train)

df1 = pd.read_csv('rainfall_in_india_1901-2015.csv')






# print(district_dict)
# print(crop_dict)
# print(season_dict)

# Route for serving the React frontend
@app.route('/')
def index():
    return "Hello world"

@app.route('/get_selected_value', methods=['POST'])
def get_selected_value():
    temp = request.json
    state = temp['State_Name']
    district = temp['District_Name']
    crop = temp['Crop']
    season = temp['Season']
    area= temp['Area']
    # input=[[state_dict[state],district_dict[district],crop_dict[crop],season_dict[season]]]
    # Convert the categorical columns to one-hot encoding
    user_input = np.array([[state,district,season,crop,area]])

    user_input_categorical = ohe.transform(user_input[:, :4])

    # Combine the one-hot encoded categorical columns and numerical columns
    user_input_final = np.hstack((user_input_categorical.toarray(), user_input[:, 4:].astype(float)))

    # Make the prediction
    prediction = model.predict(user_input_final)
    result=str(prediction[0])
    a = {
       'answer':result
    }
    return jsonify(a)




@app.route('/loan_predicted_value', methods=['POST'])
def loan_predicted_value():
    temp1 = request.json
    gender = temp1['gender']
    married = temp1['married']
    dependent = temp1['dependent']
    education = temp1['education']
    self_emp = temp1['self_emp']
    ap_income = int(temp1['ap_income'])
    coap_income = float(temp1['coap_income'])
    loan_amount = float(temp1['loan_amount'])
    loan_term = float(temp1['loan_term'])
    credit_history = temp1['credit_history']
    prop_area = temp1['prop_area']

    input= [[oi_dict[gender],oi_dict[married],oi_dict[dependent],oi_dict[education],oi_dict[self_emp],ap_income,coap_income,loan_amount,loan_term,credits_dict[credit_history],oi_dict[prop_area]]]
    prediction = loan_model.predict(input)
    result = prediction[0]
    if result==1:
       txt = "Can be Approved"
    else:
       txt = "Cannot be Approved"   

    a = {
       "ans":float(result)
      }


    return jsonify(a)

@app.route('/crop_recommendation', methods=['POST'])
def crop_recommendation():
    temp2 = request.json
    n_params = temp2['nitrogen']
    p_params = temp2['phosporous']
    k_params = temp2['potassium']
    t_params = temp2['temp']
    h_params = temp2['humidity']
    ph_params = temp2['ph']
    r_params = temp2['rainfall']
    
    user_input = np.array([[n_params,p_params,k_params,t_params,h_params,ph_params,r_params]])
    predictions = classifier.predict(user_input)
    recommended_crop = predictions[0]
    a = {
       "answer":recommended_crop
      }
    return jsonify(a)

@app.route('/rainfall', methods=['POST'])
def rainfall():
    temp3 = request.json
    state = temp3['Region']
    month = temp3['Month']
    
    state_data = df1[df1['SUBDIVISION'] == state]

    # Calculate the average rainfall for the given month across all the years
    avg_rainfall = state_data[month].mean()
    a = {
       "answer":avg_rainfall
      }
    return jsonify(a)




# Run the Flask application
if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=False)