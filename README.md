# shared-backend

## What is the use of this Repo

This Project is a Simple Node and Express js Project which demonstrates the following
1. Creating an Api in Node with Express js
2. Setting up Middlewares for Request Parsing

## Prerequisites

## Install Node JS
Refer to https://nodejs.org/en/ to install nodejs

## Cloning and Running the Application in local

Clone this project into your local machine

Install all the npm packages. Go into the project folder and type the following command to install all npm packages

```bash
npm install
```
Update the config.js file with your database credentials.
```bash 
const dbConfig = {
    databasename : "",
    username : "",
    password : "",
    host : "",
    dbtype : "postgres"
}
```
Update this object to connect with database.

In order to run the application Type the following command

```bash
node app.js
```

The Application Runs on **localhost:3001**
