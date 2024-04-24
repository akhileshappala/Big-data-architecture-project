
FROM python:3.11

WORKDIR /server

COPY requirements.txt /server/
COPY donorEndpoints.py /server/

RUN pip3 install -r requirements.txt

ENTRYPOINT ["python", "donorEndpoints.py"]