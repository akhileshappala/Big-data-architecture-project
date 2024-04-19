VERSION=amd64
DOCKERUSER=akhileshappala11

build:
	docker build -f Dockerfile -t donorservice . --no-cache=true --platform=linux/amd64

push:
	docker tag donorservice $(DOCKERUSER)/donorservice:$(VERSION)
	docker push $(DOCKERUSER)/donorservice:$(VERSION)
	docker tag donorservice $(DOCKERUSER)/donorservice:latest
	docker push $(DOCKERUSER)/donorservice