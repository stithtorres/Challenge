# Challenge
 FullStack Javascript App *made with love*.
 
 The user will have a simple screen where he can select a year and he will get all movies ordered from January to December released in that year, the user could navigate all movies and he will provide a rank value from 1 (worst) to 5 (best), the user could made comments for each movie as well. The user can change his rank value anytime.  
The information to be queried in the mobile app is the one provided by the open source database for movies called:  
The Movie DB https://www.themoviedb.org/documentation/api  
The mobile application should use this API from the service and will shown movies by year. 

 
 ## node-postgres/
 Rest API using node, seqealize and Postgresql. 
 
 General configurations:
 ```
 -npm i
 -npm run dev 
 -by default port 9000
 -sql/db.sql (schema of tables)
 -src/database/connection.js (Postgres Data Base Configuration)
 ```
 
 ```
"@babel/polyfill": "^7.6.0",
"cors": "^2.8.5",
"express": "^4.17.1",
"jsonwebtoken": "^8.5.1",
"morgan": "^1.9.1",
"pg": "^7.12.1",
"pg-hstore": "^2.3.3",
"sequelize": "^5.19.6"
```
 
 ## react/
 Front-end React based appication, designed specifically for the api. 
 
 General configurations:
 ```
 -npm i
 -npm start
 -by default port 3000
 ```
 
```
"axios": "^0.18.1",
"bootstrap": "^4.3.1",
"font-awesome": "^4.7.0",
"joi-browser": "^13.4.0",
"jquery": "^3.4.1",
"jwt-decode": "^2.2.0",
"lodash": "^4.17.15",
"prop-types": "^15.7.2",
"react": "^16.10.2",
"react-dom": "^16.10.2",
"react-rating": "^2.0.0",
"react-router-dom": "^5.1.2",
"react-scripts": "3.2.0",
"react-toastify": "^5.4.0"
 ```
 
