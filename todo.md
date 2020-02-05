# todo

## Frontend

1. Break up the main pages into templates.
2.

## API:

---

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
