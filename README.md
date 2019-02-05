# Introduction

This project provides a website app to museums or similar organizations. Our first client is the "Musée du Sport" in Nice, France.
The goal of the app is to provide the client an immersive experience with quizzes at the end of a part of the museum to make them learn in a funny way what they just saw and allows the client to share a picture of what he liked the most in the museum. The groupe of visitors can then vote for the picture they liked the most and the Museum can share the most popular picture of a group on Facebook.
In this way, they have memories for ever of their visit of the museum.
Moreover, the application gives to the manager of the museum some detailled statistics of the utilisation of the application, the most liked themes/parts of the museum and if his guides' performances into interesting the clients on the museum's themes/parts. 

# Initial setup

Installs node.js on your computer

Install mongodb on your computer you can [download it on their website](https://www.mongodb.com/download-center/community)

Run `npm install -g @angular/cli` to install angular command line on your computer

Run `npm install` to install the dependencies

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `public/` directory.

## Launch server

Run `node server.js` to access the API and Website. 

##route 
Navigate to `http://localhost:8081/guide` to access to the Guide interface 
`http://localhost:8081/quiz` for the visitors interface.
'http://localhost:8081/manager' for the manager interface.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Project structure

- server.js : Manage the node.js server and load the controller, event and configuration
- /Event : Manage the different event triggered by the sockets
- /Controller : Create new access routes and use the appropriate methods to access to the models
- /Models : Stock the mongoose model for structuring our json data with mongodb
- /Utils : Utility script
- /Utils/Provider : Utility function between the controller and models
- /src : Angular frontend
- /src/app : Angular compenents
