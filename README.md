[Jean Around the World](http://jeanaroundtheworld.herokuapp.com)
===

#### TL;DR
*Jean Around the World* is a web app that allows users to plan an adventure anywhere in the world. Select a location on the map, and we will provide an itinerary for you based on your preferences!

***

Our [Figma](https://figma.com/file/QquUdjFQLHEftdTfah2Yh8MQ/436I-Prototypes?node-id=0%3A1)

#### Basic Technology Requirements:
* HTML/CSS:
   * An example: the [Preference Page](https://github.com/denim-squad/jean-around-the-world/blob/master/imports/ui/pages/preferences)'s [HTML](https://github.com/denim-squad/jean-around-the-world/blob/master/imports/ui/pages/preferences/preferences.page.jsx) and [CSS](https://github.com/denim-squad/jean-around-the-world/blob/master/imports/ui/pages/preferences/preferences.page.css) employs many modern frontend tools for responsiveness, such as using CSS grid, responsive styling using `%`s, media queries, as well as general industry-standard web development practices.
* Redux:
  * [The Folder](https://github.com/denim-squad/jean-around-the-world/tree/master/imports/redux). Note that we exported many constants inside our `actions` and imported them into our `reducers`. This ensures that we have a single source of truth, and that any changes to these constants will cascade to any component that uses them. 
* APIs:
  * [The Folder](https://github.com/denim-squad/jean-around-the-world/tree/master/imports/api/places). Our main API is in [fetchPlaces](https://github.com/denim-squad/jean-around-the-world/blob/master/imports/api/places/server/fetchPlaces.js); we use this via Meteor methods to generate a list of locations.
* MongoDB:
  * [Setup](https://github.com/denim-squad/jean-around-the-world/blob/master/lib/userInfoCollection.js). [Use](https://github.com/denim-squad/jean-around-the-world/blob/master/imports/redux/reducers/index.jsx). Note that these were handled using Meteor methods.
* Release engineering:
  * [CI/CD](https://github.com/denim-squad/jean-around-the-world/deployments). [Hosted site](http://jeanaroundtheworld.herokuapp.com). We set up CI/CD using Heroku deployment to automatically deploy our PRs. The `Development` branch deployed to our `dev` environment, `Master` deployed to our `staging` environment, and we manually deployed our final hosted site.

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

In summary, our project's aim was to simplify the trip-planning process. Our app has done this to a great extent, by offering a streamlined path for a user based on their preferences for any location and radius. We are proud to say that a user can go from the home page to having relevant events in their calendar within minutes.

We have done so by using a custom Google Maps component on our home page as well as a Material UI slider to grab a selected location and a set radius. These are passed as parameters to our Google Places API call, which will generate a JSON object of locations, based on what is enabled by the user in the `select what you want` section of the preferences page. Then, the last 2 parts of the preferences page filter our API results, and they are displayed in the results page. From the results page, we have made a greedy nearest-neighbour algorithm to essentially sort an array of latitudes and longitudes to be placed as markers on the map. When the markers are clicked, they call the Google Maps Place Details API to fetch a small icon based on its type (bar, restaurant, etc.), as well as its address, website link, etc. In addition, we also used Redux and MongoDB to handle our login-logout functionalities. Login is handled using builtin Meteor methods.


***

#### Challenges, learning, and future directions:
A major challenge that we faced was CSS styling. Opting for CSS grid, we discovered that having nested CSS grids caused unexpected behavior. Also, it was tough to make some Material UI components responsive. The documentation did not seem to match what we worked with in some cases. From working through these challenges, we have learned how to develop a responsive user experience by making sure components behave responsively and are styled with a dynamic range of viewport sizes in mind. Another challenge we faced was that the plugin we used for our Google Maps component was very badly documented and lacked a lot of functionalities we needed. For example, the version on npm we used did not support the `Circle` we needed for our radius. We worked around this by [forking the repository](https://github.com/denim-squad/google-maps-react) and rolling back to an older version instead, where the component was stable. Additionally, the `InfoWindow` on the markers in the results page did not allow us to hook onto any events; so, we were unable to use any `onClick`s or `onMouseOver`s. We needed a way for users to add a location to their favourites, so to work around this, we added the double-click functionality to markers to add them to favourites. We had to think outside the box.

Another challenge we faced was that the plugin we used for our Google Maps component was very badly documented and lacked a lot of functionalities we needed. For example, the version on npm we used did not support the `Circle` we needed for our radius. We worked around this by forking the repository and rolling back to an older version instead, where the component was stable. Additionally, the `InfoWindow` on the markers in the results page did not allow us to hook onto any events; so, we were unable to use any `onClick`s or `onMouseOver`s. We needed a way for users to add a location to their favourites, so to work around this, we added the double-click functionality to markers to add them to favourites. We had to think outside the box.

Finally, a significant challenge was the combination of Meteor changing over time, decreased adoption, and heavy boilerplate leading to difficulty finding online discussions involving issues that we had. For example, although the documentation for Meteor Methods is clear enough once you're already comfortable with them, due to learning Express through class activities and being told to self-learn Meteor, it took some time to fully grasp what the documentation said. Additionally, the reliance on perfect out-of-language syntax and "magic strings" to use Methods caused some difficulty since unlike a programming langugage in an IDE, it's more difficult to debug what exactly is incorrect with the Method implementation.


There are a number of things that we can improve on or have left undone. Outside of the [incomplete project requirements](#project-requirements), which are only extra optional features we can add, there are a number of things we can improve on:
* the Google places API seems to return mostly restaurants/food options. We should add additional APIs to cater to a broader range of suggestions
* we have not made our website fully responsive; we have a mock for a mobile design, but have not had the resources to implement it

***

#### Initiative and additional contributions:
* Hai Lin:
    * Took charge of code reviews and the initial design of the app
    * Coordinated deadlines
    * Handled the brunt of the frontend work, UI styling
* Jessica:
    * Designed entire app on [Figma](https://figma.com/file/QquUdjFQLHEftdTfah2Yh8MQ/436I-Prototypes?node-id=0%3A1)
    * Did most of the responsiveness work
    * Login/logout functionality
* John:
    * Handled most of the Redux
    * Lower level logic such as implementing the nearest-neighbour algorithm to organize our results
* Wesley:
    * Set up the entire build pipeline, hosting
    * Handled all of the API calls

***

#### Project Description
*Jean Around the World* will be a full-stack web application using React frontend and MongoDB/MeteorJS backend. We will create a website with the purpose of trip-planning, allowing users to select a destination somewhere in the world and returning suggestions for accommodation, food, etc. Aimed at users who are planning to go on vacation, looking for a good deal, or are interested in personalizing their trip, *Jean Around the World* will expedite their trip-planning experience by generating locales from which the user can develop their itinerary.

Data that we will store includes saved trips, past trips, reviews, and blacklists. We will use this information to personalize suggestions and new trip itineraries for users, creating a more unique user experience. Users may use this data for analytic purposes and, for example, to see where they may have visited or to create long-term travel plans.

Based on time restraints, we are unlikely to implement functionalities which recommend trips to users. This includes monthly email recommendations and a trip randomizer based on preferences. We are also unlikely to complete integrations with third-party softwares such as Google Maps. Our minimum viable product will, however, include a functionality to recommend a trip itinerary for a user-defined location somewhere in the world. 

***

#### Project Requirements
* ##### Minimal requirement (3-5) - will complete
    * Input a location, returns recommendations for accommodations, food, etc. - *Complete, on Home Page*
    * Store past trips, reviews, blacklist, favourites, etc. - *Complete, on Preferences page and Profile page*
    * Change the search radius - *Complete, on Home Page*
    * Plan a trip depending on what you want  - *Complete, on Results Page*
        * I.e. single meal, meal + dessert, snack, transportation type, budget
    * Link to the place - *Complete, on Results Page*
* ##### Standard (2-7) - will probably complete
    * Homepage is google maps type thing, click on a location - *Complete, on Home Page*
    * Randomizer for what is recommended - *Complete, on Results Page*
    * Change given selected restaurants, accommodations, etc. - *Complete, on Results Page*
        * In case hotel is fully booked, etc.
    * Sharing trip with friends on social media - *Incomplete, for future consideration*
    * Export to calendar - *Complete, on Results Page*
    * (depending on API) emailing the company to make a reservation - *Incomplete, for future consideration*
        * Based on template
* ##### Stretch (2-3) - hope to complete
    * Email you recommendations based on where you’ve been/liked, once a month - *Incomplete, for future consideration*
    * Family mode (age ranges?)- *Incomplete, for future consideration*
    * Google maps integration - *Complete, on Home and Results pages*
    * Input area you want to explore and how long trip distance should cover - *Complete, on Home Page*
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
