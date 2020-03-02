# DogDating

A dog dating website.

# Features

- User can "Discover" other profiles and filter then accordingly.
- Uses a PostgreSQL database to store accounts, profiles, images and messages.
- User can upload as many images as they want for each profile.
- User can refresh the webpage and it will remain on the same page.

# Setup

1.  Ensure PostgreSQL is running.
2.  Run the following command to install required packages:

        npm i

3.  Run the following command to create the database:

        npm run setup

4.  Run the following command to start the web server:

        npm run start

5.  Open a browser and either go to localhost or the IP from another machine.
      <!-- prettier-ignore -->
        localhost:8080

# Troubleshoot

1. Restart the browser and webserver. I had a issue where the website was very slow and was actually starting to slowdown my computer until I realised firefox was taking up 14GB of memory because I didnt closed the tab in hours.

# TODO

- Across the whole site
  - Deal with server errors appropiately and show relevant message to user such as 404 and 500.
- Home page:
  - See profiles who you have had a conversation with.
  - See "recommended" profiles from the discovery page.
- Profile:
  - ~~Change profile picture~~
  - Upload message with user uploaded images.
  - Allow user to delete specific images.
  - Allow users to leave a review and a star rating to rate previous interactions.
- Messaging:
  - ~~Get simple messaging working.~~
  - Share images?
- Profile Selection:
  - Allow the user to create a new profile directly from the profile-selection page.
  - Allow the user to delete specific profiles and all of their content such as images.
  - Shortcut to the my-profile page.
- login page
  - Mock login page that allows you to switch between different user accounts.
  - **Note: this is only to show that the webpages content is dynamic and changes based on the current user and to show that messaging would actually work.**

# Overview

A simple overview of the entire project and how it all interacts with each other and works.

# API DESIGN PLAN

    GET : GET DATA

    POST: SEND DATA

    DELETE: DELETE DATA

    PUT: MODIFY DATA

## ACCOUNTS:

    GET     /api/account/:id/profiles - GET ACCOUNT PROFILES

    GET     /api/account/:id - GET ACCOUNT DATA

## PROFILE:

    GET     /api/profile/:id - GET PROFILE DATA

    PUT     /api/profile/:id - UPDATE PROFILE DATA

    DELETE  /api/profile/:id - DELETE PROFILE

    POST    /api/profile/:id - CREATE NEW PROFILE

## DISCOVERY:

    POST    /api/discovery/:pro_id

    GET     /api/discovery/:pro_id/filters

## IMAGE:

    POST    /api/profile/:id/image - UPLOAD IMAGE

    DELETE  /api/profile/:id/image/:img_id - DELETE IMAGE

    PUT     /api/profile/:id/image/:img_id - SET AS PROFILE PIC

    GET     /api/profile/:id/image - GET ALL IMAGES FROM PROFILE

    GET     /api/profile/:id/profilepic - GET PROFILE PIC ID

## MESSAGE:

    GET     /api/profile/:id/messages/:otherProfileID - GET ALL MESSAGES BETWEEN PROFILES

    POST    /api/profile/:id/messages/:otherProfileID - SEND MESSAGE TO PROFILE

    GET     /api/messages/:id - GET MESSAGE
