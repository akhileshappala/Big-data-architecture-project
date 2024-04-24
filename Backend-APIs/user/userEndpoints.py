import pandas as pd
from flask import Flask, jsonify ,request,Response
import json
import mysql.connector as sql
from flask_cors import CORS
from flask_cors import cross_origin
from datetime import datetime
import hashlib
from kafka import KafkaProducer, producer

import pandas as pd
from flask import Flask, jsonify ,request,Response
import json
import mysql.connector as sql
from flask_cors import CORS
from flask_cors import cross_origin
import re
import os
app=Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

MYSQL_HOST=os.getenv("MYSQL_HOST")
MYSQL_ADMIN_USER = os.getenv("MYSQL_USER")
MYSQL_ADMIN_PASSWORD = os.getenv("MYSQL_PASSWORD")
MY_DB = os.getenv("PARENT_DB")
USER_FLASK_IPADDRESS = '0.0.0.0'
USER_FLASK_PORT = os.getenv("USER_FLASK_PORT")
KAFKA_HOST=os.getenv('KAFKA_HOST')
KAFKA_PORT=os.getenv('KAFKA_PORT')
KAFKA_ORDERS = os.getenv('KAFKA_ORDERS')

# Creates new user
@app.route('/user/createUser',methods=['post'])
@cross_origin()
def createUser():

    con = sql.connect(host=MYSQL_HOST,user=MYSQL_ADMIN_USER,password=MYSQL_ADMIN_PASSWORD,db=MY_DB, use_unicode=True, charset='utf8')
    cur = con.cursor()
    try:
        userName=request.form.get('name')
    except:
        return jsonify({"Error":"Enter the Name of user"})
    try:
        emailId=request.form.get('emailId')
    except:
        return jsonify({"Error":"Enter the emailId"})
    try:
        password=request.form.get('password')
    except:
        return jsonify({"Error":"Enter the password"})
    try:
        phoneNumber=request.form.get('phoneNumber')
    except:
        return jsonify({"Error":"Enter the phoneNumber"})
    try:
    	cur.execute("SELECT emailId FROM users WHERE emailId='%s'"%format(emailId))
    	data = cur.fetchall()
    	user=pd.Series(data)
    	if(not user.empty >0):
    	   return jsonify({"Error": "User already has an account, try logging in!!"})
    except Exception as errorResponse:
        print(errorResponse)
        return jsonify({"Error":str(errorResponse)})
    try:
        cur.execute("INSERT INTO users (userName, emailId, website, pincode, address, phoneNumber, password) \
        	VALUES ('%s','%s','%s','%s) "%(userName, emailId, phoneNumber, password))
        con.commit()
        return jsonify({"status":200})
    except Exception as errorResponse:
        print(errorResponse)
        return jsonify({"Error":str(errorResponse)})

# Logs in user (person ordering food)
@app.route('/user/loginUser',methods=['post'])
@cross_origin()
def loginUser():
    con = sql.connect(host=MYSQL_HOST,user=MYSQL_ADMIN_USER,password=MYSQL_ADMIN_PASSWORD,db=MY_DB, use_unicode=True, charset='utf8')
    cur = con.cursor()
    try:
        emailId=request.form.get('emailId')
    except:
        return jsonify({"Error":"Enter the emailId"})
    try:
        password=request.form.get('password')
    except Exception as errorResponse:
        print(errorResponse)
        return jsonify({"Error":str(errorResponse)})
    try:
        cur.execute("SELECT * FROM users WHERE emailId='%s' AND password='%s' "%(emailId,password))
        data = cur.fetchall()
        user=pd.Series(data)
        if(not user.empty):
            userName = user[0][1]
            return jsonify({"status":200})
        else:
        	return jsonify({"Error":"username/password is wrong, or create an account"})
    except Exception as errorResponse:
        print(str(errorResponse))
        return jsonify({"Error":str(errorResponse)})

# Lists all available foods
@app.route('/user/listFoodItems',methods=['get'])
@cross_origin()
def listFoodItems():
    con = sql.connect(host=MYSQL_HOST,user=MYSQL_ADMIN_USER,password=MYSQL_ADMIN_PASSWORD,db=MY_DB, use_unicode=True, charset='utf8')
    cur = con.cursor()    
    try:
        cur.execute("SELECT * FROM foodItems")
        foodData = cur.fetchall()
        foodDataFrame = pd.DataFrame(foodData)
        foodDataFrame.columns=['foodId','emailId','foodName','updated on', 'description', 'address', 'pincode', 'isVeg', 'isNutsFree', 'isGlutenFree', 'isDairyFree', 'quantity']

        jsonResponse = foodDataFrame.to_json(orient='records')
        listFoodResponse=Response(listFoodResponse = jsonResponse, status = 200, mimeType='application/json')

        return listFoodResponse

    except Exception as errorResponse:
        print(str(errorResponse))
        return jsonify({"Error":str(errorResponse)})


# Orders the items in the user's cart
@app.route('/user/orderCartItems',methods=['post'])
@cross_origin()
def orderCartItems():
    try:
        itemCart=request.form.get('itemCart')
    except:
        return jsonify({"Error":"Enter the items"})
    try:
        emailId=request.form.get('emailId')
    except:
        return jsonify({"Error":"Enter the emailId"})
    try:
        con = sql.connect(host=MYSQL_HOST,user=MYSQL_ADMIN_USER,password=MYSQL_ADMIN_PASSWORD,db=MY_DB, use_unicode=True, charset='utf8')
        cur = con.cursor()
        itemList = json.loads(itemCart)
        flag =0
        print("Type:", type(itemList))
        print(itemList)
        foodItemsList=[]
        for key in itemList:
            print(key)
            cur.execute("SELECT * FROM foodItems WHERE foodId=%d"%(int(key)))
            data=cur.fetchall()
            quant=pd.Series(data)
            if(not quant.empty):
                currentQuantity = int(quant[0][11])
                print(currentQuantity)
                if currentQuantity == int(itemList[key]): 
                    cur.execute("DELETE FROM foodItems WHERE foodId='%s'"%(key)) # if last food item is ordered then delete it from the list
                elif currentQuantity > int(itemList[key]):
                    foodItemDict = {}
                    cur.execute("UPDATE foodItems SET quantity=%d WHERE foodId='%s'"%(currentQuantity-int(itemList[key]),key)) # subtract the number of food items ordered from available food
                    foodItemDict["foodId"]=quant[0][0]
                    foodItemDict["donorEmailId"]=quant[0][1]
                    foodItemDict["foodName"]=quant[0][2]
                    foodItemDict["description"]=quant[0][4]
                    foodItemDict["address"]=quant[0][5]
                    foodItemDict["pincode"]=quant[0][6]
                    foodItemDict["isVeg"]=quant[0][7]
                    foodItemDict["isNutsFree"]=quant[0][8]
                    foodItemDict["isGlutenFree"]=quant[0][9]
                    foodItemDict["isDairyFree"]=quant[0][10]
                    foodItemDict["quantity"]=quant[0][11]
                    foodItemsList.append(foodItemDict)
                else:
                	return jsonify({"Error": "Not enough quantity for the item %s"%(quant[0][2])})
                con.commit()
            else:
            	return jsonify({"Error": "one of the items removed by the Donor, please check again!!"})
        cur.execute("SELECT * FROM users WHERE emailId='%s'"%(emailId))
        userDetails = cur.fetchall()
        uDetails =pd.Series(userDetails)
        userDetailsDict ={}
        userDetailsDict["userId"]=uDetails[0][0]
        userDetailsDict["userName"]=uDetails[0][1]
        userDetailsDict["userEmailId"]=uDetails[0][2]
        userDetailsDict["userPhoneNumber"]=uDetails[0][3]
        dictionary ={}
        orderTime = str(datetime.date.today().strftime("%B %d, %Y"))
        orderId = str(hashlib.sha1(orderTime.encode("utf-8")).hexdigest(), 16) % (10 ** 8) # Create unique order ID from the current date and time 
        dictionary['userDetails']=userDetailsDict
        dictionary['foodItems']=foodItemsList
        dictionary['orderTime']=datetime.now().strftime('%s')
        dictionary['orderId']=orderId
       	for key in itemList:
            cur.execute("INSERT INTO orders (orderId,userEmail, foodId, quantity) \
            	VALUES ('%s','%s','%s','%d') "%(orderId,emailId,key,int(itemList[key])))
        con.commit()
        producer.send(KAFKA_ORDERS,json.dumps(dictionary).encode("utf-8"))
        return jsonify({"status":200}) # Good
    except Exception as errorResponse:
        return jsonify({"Error":str(errorResponse)})



if __name__ == '__main__':
    app.run(USER_FLASK_IPADDRESS,port=USER_FLASK_PORT,debug=True)