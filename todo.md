# todo

## Frontend:

1. Break up the main pages into templates.
2. Improve the overall design and decide if I want to use "pages" or "Items" on the page to display a profile.
3. Add a multi-filter to make it easy to find specific types of options and filter multiple options at the same time such as location and breed and age.

## API:

> use :account and :profile to see if the user should have access to those resources and deny them if the profile is not linked to the account.

> Need to deal with real time messaging.

### **GET Requests**

1. GET General server information - might need this - MOTD?

```
/api/general
```

2. GET potential matches with discover for profile id

```
/api/discover/:id
```

2. GET Request JSON object for specific profile

```
/api/:account/:profile/:id
```

### **POST Requests**

1. POST Add new profile

```
/api/:accountID/new
```

2. POST Changes to a profile

```
/api/:accountID/change/:profileID
```

3. POST Add image to account

```
/api/:accountID/:profileID/image
```
