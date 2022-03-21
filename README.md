# TRAVENTURE

## Description

Organize your travels and plan new adventures.
 
## User Stories

- **homepage** - As a user I want to be able to access the homepage to see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can start my travel profile
- **login** - As a user I want to be able to log in and see my profile (via email and password)
- **logout** - As a user I want to be able to log out from the webpage
- **profile page** - As a user I want to see a map of the world and be able to hover over all countries. By clicking, I can add each country to my travel list
- **past travel list** - As a user I want to see a list of all my past travels and edit or delete each entry
- **travel details** - As a user I want to see the details of each travel entry and be able to specify: cities visited (alphabetical order) and travel dates
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault


## Backlog

List of other features outside of the MVPs scope

User profile:
- add country also to new adventure list
- Via navigation bar I can access: Logout / profiles of other travelers / past travel list / new adventure list / profile page
- user can publish profile so other users can check out my traventures

Past Travel List:
- chronological view option (only possible if year is specified in each entry)

Travel Details:
- user is able to select for each travel a category: into the wild / city trip / all inclusive / campervan / hiking...
- user can descibe experience or highlights in an input field
- add picture
- add other travelers to my journey

New Adventure List
- As a user I want to be able to see all countries I want to visit in the future
- I can get random inspiration or browse other traventure profiles
- I can invite other user to join my travel plans

Profiles of other travelers
- I can see other users


## ROUTES:

- GET / 
  - renders the homepage
- GET /signup
  - renders the signup form
- POST /signup
  - body:
    - username
    - email
    - password
  - redirects to /login if user is signed up
- GET /login
  - renders the login form
- POST /login
  - redirects to /profile if user logged in
  - body:
    - email
    - password
- POST /logout                             
                                        //- später prüfen
  - body: (empty)
  - redirects to /

- GET /profile
  - renders the users profile page
  - svg on click allows to add entry to travel list (creates id)
  - redirects to travel list if user clicks on LINK/BTN
                                          //- POST /profile
                                          //  - id

- GET /travels
  - renders the past travels list
  - redirects to individual travel entries if user clicks on entry

- GET /travels/:id
  - renders the travel detail form (if edited before then pre-filled form)
  - accesses API to gain information on country

- POST /travels/:id
                          //   - if user clicks on save-btn redirects to travel detail page (w/o form)
  - if user clicks on save-btn redirects to /travels
  - body: 
    -cities
    -travel dates
    -experience
    -category

                                    // list error paths

## Models

User model

```
username: String
email: String
password: String
travels: [{Travel-Objects}]
```

Travel model

```
traveler: ObjectId<User>
country: String
cities: [String]
travelName: String
dateFrom: Date
dateTo: Date
categories: [String]
Experience: String
Photo: String
``` 

## Links

### Trello

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
