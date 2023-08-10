# Logstash Elasticsearch Kibana

In this project, practice using Logstash Elasticsearch Kibana as follows [CodeBangkok](https://www.youtube.com/@CodeBangkok)

## Lesson

- [Elasticsearch: Get Started](https://www.youtube.com/watch?v=d2Ek-8HKdcI&t=1729s)
- [Elasticsearch: Search & Query](https://www.youtube.com/watch?v=YKr52eyWPkE)
- [Logstash: Get Started](https://www.youtube.com/watch?v=qlQePjKaHAw)


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

## Credit

[CodeBangkok](https://www.youtube.com/@CodeBangkok)