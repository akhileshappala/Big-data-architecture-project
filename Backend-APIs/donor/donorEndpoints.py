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
DONOR_FLASK_IPADDRESS = '0.0.0.0'
DONOR_FLASK_PORT = os.getenv("DONOR_FLASK_PORT")


@app.route('/donor/createDonor',methods=['post'])
@cross_origin()
def createDonor():

    con = sql.connect(host=MYSQL_HOST,user=MYSQL_ADMIN_USER,password=MYSQL_ADMIN_PASSWORD,db=MY_DB, use_unicode=True, charset='utf8')
    cur = con.cursor()
    try:
        donorName=request.form.get('name')
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
        website=request.form.get('website')
    except:
        return jsonify({"Error":"Enter the website"})
    try:
        address=request.form.get('address')
    except:
        return jsonify({"Error":"Enter the address"})
    try:
        pincode=request.form.get('pincode')
    except:
        return jsonify({"Error":"Enter the pincode"})
    try:
    	cur.execute("SELECT emailId FROM donors WHERE emailId='%s'"%format(emailId))
    	data = cur.fetchall()
    	user=pd.Series(data)
    	if(not user.empty >0):
    	   return jsonify({"Error": "User already has an account, try logging in!!"})
    except Exception as e:
        return jsonify({"Error":str(e)})
    try:
        cur.execute("INSERT INTO donors (donorName,emailId, website, pincode, address, phoneNumber, password) \
        	VALUES ('%s','%s','%s','%s','%s','%s','%s') "%(donorName,emailId,website, pincode, address,phoneNumber,password))
        con.commit()
        return jsonify({"status":200})
    except Exception as e:
        print(e)
        return jsonify({"Error":str(e)})



@app.route('/donor/loginDonor',methods=['post'])
@cross_origin()
def loginDonor():
    con = sql.connect(host=MYSQL_HOST,user=MYSQL_ADMIN_USER,password=MYSQL_ADMIN_PASSWORD,db=MY_DB, use_unicode=True, charset='utf8')
    cur = con.cursor()
    try:
        emailId=request.form.get('emailId')
    except:
        return jsonify({"Error":"Enter the emailId"})
    try:
        password=request.form.get('password')
    except Exception as e:
        print(e)
        return jsonify({"Error":str(e)})
    try:
        cur.execute("SELECT * FROM donors WHERE emailId='%s' AND password='%s' "%(emailId,password))
        data = cur.fetchall()
        user=pd.Series(data)
        # print(user)
        if(not user.empty):
            userName = user[0][1]
            return jsonify({"status":200})
        else:
        	return jsonify({"Error":"username/password is wrong, or create an account"})
    except Exception as e:
        print(str(e))
        return jsonify({"Error":str(e)})


@app.route('/donor/addFoodItem',methods=['post'])
@cross_origin()
def addFoodItem():
    con = sql.connect(host=MYSQL_HOST,user=MYSQL_ADMIN_USER,password=MYSQL_ADMIN_PASSWORD,db=MY_DB, use_unicode=True, charset='utf8')
    cur = con.cursor()
    try:
        emailId=request.form.get('emailId')
    except:
        return jsonify({"Error":"Enter the emailId"})
    try:
        foodName=request.form.get('foodName')
    except Exception as e:
        print(e)
        return jsonify({"Error":str(e)})
    try:
        description=request.form.get('description')
    except Exception as e:
        return jsonify({"Error": str(e)})
    try:
        address=request.form.get('address')
    except Exception as e:
        return jsonify({"Error": str(e)})
    try:
        pincode=request.form.get('pincode')
    except Exception as e:
        return jsonify({"Error": str(e)})
    try:
        isVeg=int(request.form.get('isVeg'))
    except Exception as e:
        return jsonify({"Error":str(e)})
    try:
        isNutsFree=int(request.form.get('isNutsFree'))
    except Exception as e:
        return jsonify({"Error":str(e)})
    try:
        isGlutenFree=int(request.form.get('isGlutenFree'))
    except Exception as e:
        return jsonify({"Error":str(e)})
    try:
    	isDairyFree=int(request.form.get('isDairyFree'))
    except Exception as e:
        return jsonify({"Error":str(e)})
    try:
    	quantity=int(request.form.get('quantity'))
    except Exception as e:
        return jsonify({"Error":str(e)})
    try:
        cur.execute("INSERT INTO foodItems \
        	 (emailId,foodName, description, address, pincode, isVeg, isNutsFree, isGlutenFree, isDairyFree, quantity) \
        	VALUES ('%s','%s','%s','%s','%s',%d,%d,%d,%d,%d) "%(emailId,foodName,description,address,pincode,isVeg,isNutsFree,isGlutenFree,isDairyFree,quantity))
        con.commit()
        return jsonify({"status":200})
    except Exception as e:
        return jsonify({"Error":str(e)})


@app.route('/donor/getDonorFoodItems',methods=['get'])
@cross_origin()
def getDonorFoodItems():
    try:
        emailId=request.form.get('emailId')
    except:
        return jsonify({"Error":"Enter the emailId"})
    try:
        con = sql.connect(host=MYSQL_HOST,user=MYSQL_ADMIN_USER,password=MYSQL_ADMIN_PASSWORD,db=MY_DB, use_unicode=True, charset='utf8')
        cur = con.cursor()
        cur.execute("SELECT * FROM foodItems WHERE emailId='%s'"%(emailId))
        # print("===============")
        data = cur.fetchall()
        # print("===============")
        test_df=pd.DataFrame(data)
        # print("===============")
        print(test_df)
        test_df.columns=['foodId','emailId','foodName','updated on', 'description', 'address', 'pincode', 'isVeg', 'isNutsFree', 'isGlutenFree', 'isDairyFree', 'quantity']
        # print("===============")
        # print("Kireti")
        test_json=test_df.to_json(orient='records')
        # print("kireeti - 2")
        resp=Response(response=test_json,status=200,mimetype="application/json")
        # print("kireeti -3")
        return resp
    except Exception as e:
        return jsonify({"Error":str(e)})

@app.route('/donor/deleteDonorFoodItem',methods=['delete'])
@cross_origin()
def deleteDonorFoodItem():
    try:
        foodId=request.form.get('foodId')
    except:
        return jsonify({"Error":"Enter the foodId"})
    try:
	    con = sql.connect(host=MYSQL_HOST,user=MYSQL_ADMIN_USER,password=MYSQL_ADMIN_PASSWORD,db=MY_DB, use_unicode=True, charset='utf8')
	    cur = con.cursor()
	    cur.execute("DELETE FROM foodItems WHERE foodId='%s'"%(foodId))
	    con.commit()
	    resp=jsonify({"status":200})
	    return resp
    except Exception as e:
        return jsonify({"Error":str(e)})

@app.route('/donor/updateDonorFoodItem',methods=['put'])
@cross_origin()
def updateDonorFoodItem():
    try:
        foodId=request.form.get('foodId')
    except:
        return jsonify({"Error":"Enter the foodId"})
    try:
        quantity=int(request.form.get('quantity'))
    except:
        return jsonify({"Error":"Enter the quantity"})
    try:
	    con = sql.connect(host=MYSQL_HOST,user=MYSQL_ADMIN_USER,password=MYSQL_ADMIN_PASSWORD,db=MY_DB, use_unicode=True, charset='utf8')
	    cur = con.cursor()
	    cur.execute("UPDATE foodItems SET quantity=%d WHERE foodId='%s'"%(quantity,foodId))
	    con.commit()
	    resp=jsonify({"status":200})
	    return resp
    except Exception as e:
        return jsonify({"Error":str(e)})


if __name__ == '__main__':
    app.run(DONOR_FLASK_IPADDRESS,port=DONOR_FLASK_PORT,debug=True)