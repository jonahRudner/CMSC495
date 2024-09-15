Instructions to run software (Ubuntu):

Install Node, NPM, Axios, and React

Install mySQL using ‘sudo apt install mysql-server’

Create a new database called HotelManagement using ‘sudo mysql’ and then ‘CREATE DATABASE HotelManagement;’

Connect to the database in vscode

Run the DB.sql code from the repository to create the tables needed for the program

Create a new React project

After creating the project, copy the code into the appropriate sections in src and in the main folder

Run ‘npm audit fix’ to make sure that all dependencies are installed

Navigate to server.js, and change the database password to the root password for your mysql installation

Run ‘sudo systemctl start mysql’ to start your sql server in linux

CD to the src folder, and then in terminal run ‘Node server.js’ to start the server

In a new terminal, CD to the app, and run ‘npm start’
