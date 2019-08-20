Jean Around the World
===
#### TL;DR
*Jean Around the World* is a web app that allows users to plan an adventure anywhere in the world. Select a location on the map, and we will provide an itinerary for you based on your preferences!

***

#### Basic Contribution Requirements:
* Hai Lin:
    * Created the UI for the home and preferences pages, the navbar, the loading spinner, as well as the Google Maps integrations
    * HTML/CSS styling, MUI shared components, component skeleton, code reviews
* Jessica:
    * UI and UX design behind this web application, and implemented some of the core functionality such as the login, signup, and            calendar export
* John:
    * Research and implementation of the algorithms for filtering locations and generating the path for a trip, redux calls to the           database for a users preferences/previous trips, and the users profile page
* Wesley:
    * API calls, deploying (troubleshooting) the app, and about page
    * Set up build pipeline for CI/CD, hosting, and meteor methods for API calls
   
***

#### Basic Functionality Requirements:
The main functionality of our app is described [here](#project-description), in the project description. Our requirements are described [here](#project-requirements).
   
***

#### Project Description
*Jean Around the World* will be a full-stack web application using React frontend and MongoDB/MeteorJS backend. We will create a website with the purpose of trip-planning, allowing users to select a destination somewhere in the world and returning suggestions for accommodation, food, etc. Aimed at users who are planning to go on vacation, looking for a good deal, or are interested in personalizing their trip, *Jean Around the World* will expedite their trip-planning experience by generating locales from which the user can develop their itinerary.

Data that we will store includes saved trips, past trips, reviews, and blacklists. We will use this information to personalize suggestions and new trip itineraries for users, creating a more unique user experience. Users may use this data for analytic purposes and, for example, to see where they may have visited or to create long-term travel plans.

Based on time restraints, we are unlikely to implement functionalities which recommend trips to users. This includes monthly email recommendations and a trip randomizer based on preferences. We are also unlikely to complete integrations with third-party softwares such as Google Maps. Our minimum viable product will, however, include a functionality to recommend a trip itinerary for a user-defined location somewhere in the world. 

***

#### Project Requirements
* ##### Minimal requirement (3-5) - will complete
    * Input a location, returns recommendations for accommodations, food, etc. - Complete, on Home Page
    * Store past trips, reviews, blacklist, favourites, etc. - Complete, on Preferences page and Profile page
    * Change the search radius - Complete, on Home Page
    * Plan a trip depending on what you want  - Complete, on Results Page
        * I.e. single meal, meal + dessert, snack, transportation type, budget
    * Link to the place
* ##### Standard (2-7) - will probably complete
    * Homepage is google maps type thing, click on a location - Complete, on Home Page
    * Randomizer for what is recommended - Complete, on Results Page
    * Change given selected restaurants, accommodations, etc. - Complete, on Results Page
        * In case hotel is fully booked, etc.
    * Sharing trip with friends on social media - Incomplete, for future consideration
    * Export to calendar - Complete, on Results Page 
    * (depending on API) emailing the company to make a reservation - Incomplete, for future consideration
        * Based on template
* ##### Stretch (2-3) - hope to complete
    * Email you recommendations based on where you’ve been/liked, once a month - Incomplete, for future consideration
    * Family mode (age ranges?)- Incomplete, for future consideration
    * Google maps integration - Complete, on Home and Results pages 
    * Input area you want to explore and how long trip distance should cover - Complete, on Home Page
        * Trip will recommend a “trip” for you including like a restaurant/cafe/activity to go to or do depending on your inputs
            * E.g. “Would you like to eat something” → trip path will include a food place

***

#### Project Breakdown
* ##### Input a location, returns recommendations for accommodations, food, etc.
    * Retrieve location from frontend, sanitize inputs
        * Aim is to get this from a Google-Maps style plugin, so inputs will depend on what we decide to use
    * Run API(s) to get hotels, food, etc. based on location
    * Display in frontend
* ##### Store past trips, reviews, blacklist, favourites, etc.
    * Retrieve data from frontend
    * Format, store in MongoDB
* ##### Change the search radius
    * Purely front-end changes, depends on plugin we use
* ##### Plan a trip depending on what you want
    * I.e. single meal, meal + dessert, snack, transportation type, budget
        * Front-end input fields/parameters
        * Retrieve, sanitize, format for API calls/database storage
* ##### Link to the place
    * API-dependent

***

#### Prototype Sketches


![alt text](https://github.com/denim-squad/jean-around-the-world/blob/master/images/PrototypeSketches.JPG?raw=true)
