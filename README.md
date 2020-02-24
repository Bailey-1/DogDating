# DogDating

A dog dating website.

# Features

- User can "Discover" other profiles and filter then accordingly.
- Uses a PostgreSQL database to store accounts, profiles, images and messages.
- User can upload as many images as they want for each profile.
- User can refresh the webpage and it will remain on the same page.

# Setup

1. Ensure PostgreSQL is running.
2. Run the following command to install required packages:
   > npm i
3. Run the following command to create the database:
   > npm run setup
4. Run the following command to start the web server:
   > npm run start
5. Open a browser and either go to
   > localhost:8080

# TODO

- Across the whole site
  - Deal with server errors appropiately and show relevant message to user such as 404 and 500.
- Home page:
  - See profiles who you have had a conversation with.
  - See "recommended" profiles from the discovery page.
- Profile:
  - Change profile picture
  - Upload message with user uploaded images.
  - Allow user to delete specific images.
  - Allow users to leave a review and a star rating to rate previous interactions.
- Messaging:
  - Get simple messaging working.
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
todo
