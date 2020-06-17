# DogDating
Note: No login system yet - idk how to do that properly

A dog dating website. Some of the dog breeds are wrong but thats not important.

# Features

- User can select a profile and switch between multiple easily.
- User can 'discover' potential partners.
  - User can filter the results down by breed, location and kennelclub membership.
    - Which is sent as a URL query to the web server.
- Uses a PostgreSQL database to store accounts, profiles, images, reviews and messages.
- User can upload as many images as they want for each profile.
  - Each image can have a message attached to it.
  - Each image can be set as a a profile pic.
  - Images can be completely deleted from the web server; database record and file.
- User can create a unlimited number of profiles.
  - And can update all infomation on them.
- User can refresh the webpage and it will remain on the same page and the discovery page will keep the same filter and sort options.
- Users can message other profiles and they can response in real time.
- User can leave reviews on other profiles reviewing the experience they had.

# NPM Packages used

- Express
- Multer
- Nodemon
- Pg
- Uuid-random
- eslint-config-portsoc

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

# TODO

- Across the whole site
  - Tidy up the code and improve maintanability.
  - Deal with server errors appropiately and show relevant message to user such as 404 and 500.
  - Improve mobile compatability.
  - Improve the CSS layout for reviews.
- Home page (index.html):
  - See profiles who you have had a conversation with.
  - See "recommended" profiles from the discovery page.
  - Show shortcuts to common areas such as:
    - Create new profile.
- Message Page:
  - List all previous conversations with other users.
  - List name, last message time and last message in a table like a real messaging app.
- Profile:
  - ~~Change profile picture~~
  - ~~Upload message with user uploaded images.~~
  - ~~Allow user to delete specific images.~~
  - ~~Allow users to leave a review and a star rating to rate previous interactions.~~
    - Allow reviews to be deleted.
    - Allow reviews to be edited - in the same way that profiles are handled.
- Messaging:
  - ~~Get simple messaging working.~~
  - Show profile picture next to each message.
  - Allow the user to delete their message from the server.
- Profile Selection:
  - ~~Allow the user to create a new profile directly from the profile-selection page.~~
  - Allow the user to delete specific profiles and all of their content such as images.
  - ~~Shortcut to the my-profile page.~~
- login page
  - Mock login page that allows you to switch between different user accounts.
  - **Note: this is only to show that the webpages content is dynamic and changes based on the current user and to show that messaging would actually work.**

# Troubleshoot

1. Restart the browser and webserver. I had a issue where the website was very slow and was actually starting to slowdown my computer until I realised firefox was taking up 14GB of memory because I didnt closed the tab in hours.

# Overview

A simple overview of the entire project and how it all interacts with each other and works.

# API DESIGN PLAN

    GET : GET DATA

    POST: CREATE DATA

    DELETE: DELETE DATA

    PUT: MODIFY DATA

## ACCOUNTS:

    GET     /api/account/:id/profiles - GET ACCOUNT PROFILES

    GET     /api/account/:id - GET ACCOUNT DATA

## PROFILE:

    GET     /api/profile/:id - GET PROFILE DATA

    PUT     /api/profile/:id - UPDATE PROFILE DATA

    DELETE  /api/profile/:id - DELETE PROFILE

    POST    /api/profile - CREATE NEW PROFILE

## DISCOVERY:

    GET    /api/profile/:pro_id/discovery - GET possible matches and takes queries:
            ?
            pro_location - filter location
            pro_breed - filter breed
            kc - kennelclub membership
            s={column name}-{asc or desc} - sort the returned profiles.

            For example: http://localhost:8080/discovery?location=Portsmouth&kc=Member&s=pro_name-desc

    GET     /api/discovery/:pro_id/filters - GET DISTINCT VALUES FOR THE COLUMNS THAT ARE USED AS A FILTER.

## IMAGE:

    POST    /api/profile/:id/image - UPLOAD IMAGE

    DELETE  /api/profile/:id/image/:img_id - DELETE IMAGE

    PUT     /api/profile/:id/image/:img_id - SET AS PROFILE PIC

    GET     /api/profile/:id/image - GET ALL IMAGES FROM PROFILE

    GET     /api/profile/:id/profilepic - GET PROFILE PIC ID

## MESSAGE:

    GET     /api/profile/:id/recipient/:otherProfileID - GET ALL MESSAGES BETWEEN PROFILES

    POST    /api/profile/:id/recipient/:otherProfileID - SEND MESSAGE TO PROFILE

    GET     /api/profile/:id/recipient/:rec_id/message/:msg_id - GET SPECIFIC MESSAGE BY msg_id

## REVIEWS:

    GET     /api/profile/:id/reviews/:rec_id - GET ALL REVIEWS FOR rec_id
    POST    /api/profile/:id/reviews/:rec_id - CREATE A REVIEW FOR rec_id
