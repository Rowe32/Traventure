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
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)

- GET /events
  - renders the event list + the create form
- POST /events/create 
  - redirects to / if user is anonymous
  - body: 
    - name
    - date
    - location
    - description
- GET /events/:id
  - renders the event detail page
  - includes the list of attendees
  - attend button if user not attending yet
- POST /events/:id/attend 
  - redirects to / if user is anonymous
  - body: (empty - the user is already stored in the session)


## Models

User model
 
```
username: String
password: String
```

Event model

```
owner: ObjectId<User>
name: String
description: String
date: Date
location: String
attendees: [ObjectId<User>]
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
