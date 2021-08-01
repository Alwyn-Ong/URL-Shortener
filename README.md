# URL-Shortener
Web app to shorten url

Check out a live demo [here!](http://13.250.25.22:3000/)

## Features:
* Enter a url to get back a shortened version.
* Go to the shortened version to be redirected to your url!

### Additional Features:
* Persistence - Queries are persisted with a relational database
* Styling - Frontend facing website with animations 
* Tested and ready - Testing for Spring Boot
* Mobile ready - Content scales down with screen size
* Production ready - Web application is being hosted [here.](http://13.250.25.22:3000/)
* Docker ready - Web application is dockerised and ready to deploy on the go

### Tech stack used:
* Frontend: ReactJs
* Backend: Java Spring Boot
* Database: MySQL
* Deployment: AWS

## Deployment Guide
Want to run it locally? Here are some steps to help you do so!

### Frontend

#### Dependencies
npm to compile and run frontend server

```shell script
cd frontend 
```
To change to frontend directory


```shell script
npm install 
```
Downloads and installed required packages


```shell script
npm start 
```
Starts the react server locally.
The application can then be accessed at http://localhost:3000

### Backend

#### Dependencies
To compile and run backend server:
1. java
2. maven 

To allow the backend to use as a database:
1. MySQL - via Tools like WAMP or MAMP

Change your database credentials accordingly in application.properties file.

`/backend/src/main/resources/application.properties`

For localhost, change 
`-spring.datasource.url=jdbc:mysql://mysql...`
to
`-spring.datasource.url=jdbc:mysql://localhost...`

Make sure your MySQL server is up and running before compiling as database connection is required for testing.

```shell script
cd backend 
```
To change to frontend directory<br><br>

```shell script
mvn clean install
```
Compiles the backend server<br><br>

```shell script
mvn spring-boot:run
```
Starts the spring boot application<br><br>

### Docker
You also choose to deploy the application locally via docker!

Before you deploy, compile the backend server as shown above using `mvn clean install`.
If you want to compile the backend server without having to run MySQL separately, use `mvn clean install -DskipTests` instead.

```shell script
docker-compose up
```
Runs frontend, backend and MySQL servers.<br><br>

```shell script
docker-compose down
```
Stops the application.<br><br>

Issues to note
* The MySQL server is spun up automatically by Spring Boot, so there is no need for a database schema.
* If the backend fails to run, a common problem would be due to it being unable to connect to the database. Check your credentials as shown above.
* The application only stores one shortened url for every original url. Generating the same original url twice will return the same result.

Future Enhancements
* Ci/Cd pipeline could be built for better deployment
* Getting a hostname to make the shortened url shorter
* Caching database queries to improve performance
* Auto scaling to improve scalability