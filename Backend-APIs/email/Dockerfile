FROM python:3.11

WORKDIR /server

COPY requirements.txt /server/
COPY emailConsumer.py /server/

RUN pip3 install -r requirements.txt

ENTRYPOINT ["python", "emailConsumer.py"]