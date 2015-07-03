#Starty
Awesome projectmanagement tool for startups!

##Features
* All features are project-based within an organization
* Centralized messages with private messages and GitHub bot
* Scrumboard (Kabana) with sprints, lists and user stories
* Issue tracker
* Burn down chart generation for reports (external Java application)
* Many more small features

##Technology stack
* Node.js as backend
* AngularJS as frontend
* MongoDB and MySQL as the databases
* Angular Material as CSS framework
* Socket.io for real-time communications
* JSON Web Tokens for authentication

##Running the frontend

1. Go into the ```/frontend``` folder, using your favorite command line tool.
2. In your command line, execute ```bower install``` and ```npm install``` to install all the necessary dependencies.
3. In your command line, execute ```grunt serve``` to start the frontend
4. Go to [http://localhost:9000/](http://localhost:9000/) to access the frontend

##Running the backend

1. Install Node.js and the nodemon library (```npm install -g nodemon```)
2. Run MongoDB and MySQL (import the sqldump from root if necessary) and change the values in ```config/settings.js``` according to your values.
3. In your command line, execute ```npm install``` to install all the necessary dependencies.
4. In your command line, execute ```nodemon app.js``` to run application
5. Go to [http://localhost:1337/api/{whatever api endpoint}](http://localhost:1337/api/{whatever api endpoint}) to access the backend

##Running the graph generator

1. Get the war-file from ```/starty.gen war/starty.gen.war```
2. Using for example XAMPP, place the war-file in XAMPP's ```/tomcat/webapps```
3. Start the Tomcat client within XAMPP
4. Go to [http://localhost:8080/starty.gen/api/request/graph/{sprintId}/](http://localhost:8080/starty.gen/api/request/graph/{sprintId}/) to get the graph data