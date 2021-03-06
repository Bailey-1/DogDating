# TODO

## Next week
1. Reduce code
2. Improve Maintainability
3. Comments throughout

## Plan:

1. ~~Implement get profile selection for the current account Tim.~~
   - ~~Use localstorage for the currentAccount and currentProfile~~
   - Use the /api/get/profiles/:account to select all profiles by the same account.
2. ~~Fix the discovery page so the currentProfile will not show and only the opposite sex will.~~
3. Create the home page to show recent matches and recommended profiles.
4. Develop the messaging system between multiple profiles and or accounts.

---

## Frontend:

1. ~~Break up the main pages into templates.~~
2. ~~Improve the overall design and decide if I want to use "pages" or "Items" on the page to display a profile.~~
3. ~~Add a multi-filter to make it easy to find specific types of options and filter multiple options at the same time such as location and breed and age.~~
4. Allow the user to create a "profile" for their dog on the front end and develop the APIs needed to save and store the data.
5. Improve the efficency of the CSS and use multiple classes for items.

---

## Maybe if I have enough time:

- Sort out the date format to **DD/MM/YYYY** both for input and output.
- Improve CSS and add slight animations on items.
- Improve the design and colours scheme.
- Allow the user to sort the returned results on the discovery page.

---

## API Overview Plan:

> use :account and :profile to see if the logged in user should have access to those resources and deny them if the profile is not linked to the account. Security?

> Need to deal with real time messaging.

### **GET Requests**

1. GET General server information - might need this - MOTD?

```
/api/get/general
```

2. GET potential matches with discover for profile id

```
/api/get/discover/:id
```

2. GET Request JSON object for specific profile

```
/api/get/:account/:profile/:id
```

### **POST Requests**

1. POST Add new profile

```
/api/post/:accountID/new
```

2. POST Changes to a profile

```
/api/post/:accountID/change/:profileID
```

3. POST Add image to account

```
/api/post/:accountID/:profileID/image
```

## Filter

/api/get/discovery/:profileID/
