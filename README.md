# Logstash Elasticsearch Kibana

In this project, practice using Logstash Elasticsearch Kibana as follows [CodeBangkok](https://www.youtube.com/watch?v=RjtIdUOpH04&t=6093s)

## Install and Run Project

### Elasticsearch and Kibana

Requires : [docker](https://www.docker.com/)

- open terminal or cmd
- pull image docker.elastic.co/elasticsearch/elasticsearch:8.8.1
	```bash
	docker pull docker.elastic.co/elasticsearch/elasticsearch:8.8.1
	```
- pull image docker.elastic.co/kibana/kibana:8.8.1
	```bash
	docker pull docker.elastic.co/kibana/kibana:8.8.1
	```
	
> Note : can dowload image from  https://www.docker.elastic.co/

- cd ...\logstash-elasticsearch-kibana\Elastic
- run file docker compose
	```bash
	docker compose up -d
	```
	
> Note: Elasticsearch port: 9200, Kibana: port: 5601


### Logstash
Requires : [docker](https://www.docker.com/)

- open terminal or cmd
- pull image docker.elastic.co/logstash/logstash:8.8.1
	```bash
	docker pull docker.elastic.co/logstash/logstash:8.8.1
	```
> Note : can dowload image from  https://www.docker.elastic.co/

- cd ...\logstash-elasticsearch-kibana\Logstash
- run file docker compose
	```bash
	docker compose up
	```
> Note: Logstash port: 8080 and port: 8081