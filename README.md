# WeLoveMovies
Final Capstone for Thinkful

## Links
* Front end Repo: https://github.com/khangbeo/restaurant-client
* Deployed App: https://welovemovies.netlify.app/

## Tasks:
* Built API conforming to RESTful standards
* Utilized common middleware packages
* Provided access to relevant information through route and query parameters
* Used PostgreSQL to store data
* Handled error for nonexistant routes
* Customized knexfile.js file for staging
* Used Knex.js to write database queries for handling CRUD operations in an Express server
* Utilized joined and nested data with Knex.js
* Wrote database migrations using Knex.js's migration tool
* Deployed to Heroku

## Stack:
* Node.js
* Express.js
* PostgreSQL
* Knex.js

## Routes:
* GET /movies
* GET /movies?is_showing=true
* GET /movies/:movieId
* GET /movies/:movieId/theaters
* GET /movies/:movied/reviews
* GET /theaters
* PUT/DELETE /reviews/:reviewId 

## /movies
![movies](/images/movies.PNG)

## /movies/:movieId
![movies/:movieId](/images/movies-movieId.PNG)

## /movies/:movieId/theaters
![movies/:movieId/theaters](/images/movies-movieId-theaters.PNG)

## /movies/:movieId/reviews
![movies/:movieId/reviews](/images/movies-movieId-reviews.PNG)

## /theaters
![theaters](/images/theaters.PNG)

## /reviews PUT
![reviews-1](/images/reviews-reviewId-1.PNG)

## /reviews DELETE
![reviews-2](/images/reviews-reviewId-2.PNG)