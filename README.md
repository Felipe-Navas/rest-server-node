# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
    * A Rest Server App in Node.js
* Version: 1.0
* [Author](https://www.linkedin.com/in/felipenavaslederhos)

### How do I get set up? ###

* Summary of set up
    * ```npm install```
* Configuration of ".env" file
    * Create a new file ".env" and add the content of ".example.env" into your new ".env" file
        * PORT= -> In this variable add the port number where the server will run                   
        * MONGOBD_CNN=mongodb+srv://<user>:<password>@<micluster>.ml5uh.mongodb.net/test
            * Go to https://cloud.mongodb.com and create an user
            * Create a new cluster
            * Add a new Database User, in the section SECURITY -> Database Access
            * Get the connection string in the section DEPLOYMENT -> Databases, clicking in "Connect"
            * Modify the the password in your connection string
        * SECRETOPRIVATEKEY= -> In this variable create a secure password for the token generation
        * GOOGLE_CLIENT_ID= -> In this variable set your google client id
        * GOOGLE_SECRET_ID= -> In this variable set your google secret id

* How to run the app?
    * ```node app```
    * ```npm start```
* Dependencies
    * "bcryptjs": "^2.4.3"
    * "cors": "^2.8.5"
    * "dotenv": "^10.0.0"
    * "express": "^4.17.1"
    * "express-validator": "^6.13.0"
    * "jsonwebtoken": "^8.5.1"
    * "mongoose": "^6.0.12"
    * "google-auth-library": "^7.10.1",

* Google autentication
    * Go to https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid
    * Create a new proyect in https://console.cloud.google.com/apis/dashboard
    * Configure your OAuth Consent Screen https://console.cloud.google.com/apis/credentials/consent?project=your_proyect_name
    * Create your credentials https://console.cloud.google.com/apis/credentials?project=your_proyect_name
    * Modify the data-client_id in the /public/index.html file with your google client id


### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact