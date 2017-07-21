# Jackpot Server

Serving up some big wins and some fair event registration!

## Endpoints

Here is an outline of all the routes on the server, as well as their required
parameters and responses.

### Authentication

#### /auth/login

Required Parameters

```
{
  email: String,
  password: String
}
```

Response Example

Success:

```
{
    "success": true,
    "message": "Login Succesfull!",
    "token": "eyJhbGciOiJI", // Will be much longer than this
    "expirationDate": 1508901104, // This is a unix timestamp
    "user": {
        "_id": "597199a2dfd4c658bbb82131",
        "email": "bradleymtreuherz@gmail.com",
        "displayName": "Bradley Treuherz",
        "password": "password",
        "__v": 0
    }
}
```

Failure:
```
{
    "success": false,
    "message": "Authentication failed. Wrong password."
}
```

### /auth/signup

Required Parameters

```
{
  email: String,
  password: String,
  displayName: String
}
```

Response Example

Success:

```
{
    "success": true,
    "message": "Signup Succesfull!",
    "token": "eyJhbGciOiJ,
    "expirationDate": 1508900722,
    "user": {
        "__v": 0,
        "email": "bradleymtreuherz@gmail.com",
        "displayName": "Bradley Treuherz",
        "password": "password",
        "_id": "597199a2dfd4c658bbb82131"
    }
}
```

Failure:
```
{
    "success": false,
    "message": "That email is already in use."
}
```

## Access Tokens

All other endpoints will require an access token. The access token can be provided
as a header with the key 'x-access-token', or as a query parameter with the key 'token'.

If the token is not present, or it is invalid, the request will return a 403 with a response of this form:

```
{
    "success": false,
    "message": "Failed to authenticate token."
}
```

## Running the Server

You must have node and mongodb installed. I also recommend installing nodemon as it
will restart the server when files change, as well as some other things that make it nice
to work with.

The current configuration points to a local instance of mongodb, so you need to be running mongo before starting the server. To do this, just open a terminal window and run

```
mongod
```

To start the server, in a new terminal window or tab run
```
node app.js
```
or
```
nodemon app.js
```

I also recomment using ngrok to provide a tunnel to your localhost which will be necessary for the mobile applications to use the server (unless we decide to deploy elsewhere). The server is configure to run on port 8080 so run:

```
ngrok http 8080
```

This will open a tunnel to localhost:8080 and a public url will be shown. This can
be used to hit the server from other machines.
