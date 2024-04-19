import json
from kafka import KafkaConsumer
from kafka import KafkaProducer
import os


import smtplib


def sendMailTo(sent_to, orderId):
	gmail_user = 'foodfree857@gmail.com'
	gmail_app_password = 'ktslmyrndckjpfbs'

	sent_from = gmail_user
	# sent_to = 'kireetimucherla@gmail.com'
	sent_subject = "Order confirmed!! from FreeFood";
	sent_body = ("Hey, your order is confirmed with freeFood!\n\n"
		        "Your order ID is %s\n"
		        "You can show this order ID to collect your food\n"
		        "Cheers,\n"
		        "freeFood\n"%(orderId))

	email_text = """\
From: %s
To: %s
Subject: %s

%s
	""" % (sent_from, sent_to, sent_subject, sent_body)
	print(email_text)

	# =============================================================================
	# SEND EMAIL OR DIE TRYING!!!
	# Details: http://www.samlogic.net/articles/smtp-commands-reference.htm
	# =============================================================================

	try:
	    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
	    server.ehlo()
	    server.login(gmail_user, gmail_app_password)
	    server.sendmail(sent_from, sent_to, email_text)
	    server.close()

	    print('Email sent!')
	except Exception as exception:
	    print("Error: %s!\n\n" % exception)




ORDER_KAFKA_TOPIC = os.getenv('KAFKA_ORDERS_TOPIC')
KAFKA_HOST=os.getenv('KAFKA_HOST')
KAFKA_PORT=os.getenv('KAFKA_PORT')
print("starting Consumer")
btServer = KAFKA_HOST+":"+str(KAFKA_PORT)
consumer = KafkaConsumer(ORDER_KAFKA_TOPIC, bootstrap_servers=btServer)
# sendMailTo("127849989")
print("Start Listening")

while True:
	for message in consumer:
		print("Ongoing transaction")
		consumed_message=json.loads(message.value.decode())
		orderId =consumed_message['orderId']
		print(consumed_message)
		sendMailTo(consumed_message['userDetails']['userEmailId'],orderId)
		print(consumed_message['userDetails']['userEmailId'])
		print(orderId)