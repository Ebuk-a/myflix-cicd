## Table of contents
* [Introduction: Continuous Delployment and Integration for Data pipeline](#Introduction)
* [Technologies](#technologies)
* [Test](#test)
* [Related Works](#related-works)

## Introduction: Continuous Delployment and Integration for Data pipeline
Development of a movie streaming application in a Microservice Architecture, deployable using Jenkins for CI/CD on VM (EC2 instance). <br />


## Technologies 
The tools used 
1. MongoDB
2. Javascript
3. Git
4. Docker and Docker Compose
5. RabbitMQ
6. EC2
7. Elastic Container Registry/ Git
8. Jenkins


## Test
### Requirements before the commands

1. You need to have docker and docker compose installed on VM/local (maybe you should just download docker desktop)

2. You need to have node and npm installed on VM/local (just visit the nodejs website and download)

3. The mongodb server needs to be up, running and reachable from application server or local - VM. This is where the data persists. The connection string for the db should be stored for each service, found at paths below (after cloning repo)
    
    movies/.env <br />
    customer/.env <br />
    docker-compose.yml <br />

### Steps to run after cloning the repo

- cd into gateway and run “npm install” (on your terminal)

- run “npm run dev”

- cd to the root and run “docker compose up” (if you are using docker compose v2) or “docker-compose up” (for older versions)


## Related Works
1. Earlier works utilizing Jenkins for build, and EC2 for container hosting https://github.com/Ebuk-a/airflow-dbt-docker 

