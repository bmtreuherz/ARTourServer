# Jackpot Server

Serving up some big wins and some fair event registration!

## Endpoints

Here is an outline of all the routes on the server, as well as their required
parameters and responses.

## Authentication

### POST /auth/login

Request parameters must be of the form:

```
{
  email: String,
  password: String
}
```

A successful login will return a response similar to:

```
{
    "success": true,
    "message": "Login Succesfull!",    
    "user": {
        "_id": "597199a2dfd4c658bbb82131",
        "email": "bradleymtreuherz@gmail.com",
        "password": "password",
        "__v": 0,
        "token": "eyJhbGciOiJI", // Will be much longer than this
        "tokenExpiration": 1508901104, // This is a unix timestamp
    }
}
```

A failed login will return a response similar to:
```
{
    "success": false,
    "message": "Authentication failed. Wrong password."
}
```

### POST /auth/signup

Request parameters must be of the form:

```
{
  email: String,
  password: String,
}
```

A successful signup will return a response similar to:


```
{
    "success": true,
    "message": "Signup Succesfull!",
    "user": {
        "__v": 0,
        "email": "bradleymtreuherz@gmail.com",
        "password": "password",
        "_id": "597199a2dfd4c658bbb82131",
        "token": "eyJhbGciOiJ,
        "tokenExpiration": 1508900722,
    }
}
```

A failed signup will return a response similar to:
```
{
    "success": false,
    "message": "That email is already in use."
}
```

## Access Tokens

All other endpoints will require an access token. The access token can be provided
as a header with the key 'x-access-token', as a query parameter with the key 'token',
or as part of the request body with the key 'token'

If the token is not present, or it is invalid, the request will return a 403 with a response of this form:

```
{
    "success": false,
    "message": "Failed to authenticate token."
}
```

Currently access tokens are set to expire after 24 hours.


## Getting Features

### GET /features

This endpoint will return an array of all features. No paremeters, body, or token is needed. The response
looks like this:

```
{
    "success": true,
    "message": "OK",
    "features": [
        {
            "_id": "5adf829c730e7e5145c34177",
            "name": "Feature 0 Diff name again",
            "beaconID": 0,
            "long": 12.4,
            "lat": 13.3,
            "imageLink": "http://i1.ytimg.com/vi/SfLV8hD7zX4/0.jpg",
            "__v": 0,
            "scripts": [
                {
                    "_id": "5adf8e9bb7a1645340c16c0c",
                    "beaconID": 0,
                    "language": "spanish",
                    "value": "here is an spanish script for beacon 0.",
                    "__v": 0
                }
            ]
        },
        {
            "_id": "5adf9328b48e8153e3077ab4",
            "name": "Feature 1 Diff name again",
            "beaconID": 1,
            "long": 12.4,
            "lat": 13.3,
            "imageLink": "http://i1.ytimg.com/vi/SfLV8hD7zX4/0.jpg",
            "__v": 0,
            "scripts": [
                {
                    "_id": "5adf8d758852e5532a98308f",
                    "beaconID": 1,
                    "language": "english",
                    "value": "here is an english script for beacon 1.",
                    "__v": 0
                }
            ]
        }
    ]
}
```

## Admin Endpoints

All admin endpoints require an access token.

### POST /admin/feature

This endpoint can be used to either create a new feature, or update the value for an existing
feature. The request body must contain all of the information needed for a feature (except for scripts). Scripts will be managed by a different endpoint.

A Feature is identified by its beaconID.

A request should have a body that looks like this:

```
{
  "name": "Feature 1 Diff name again",
  "beaconID": 1,
  "long": 12.4,
  "lat": 13.3,
  "imageLink": "http://i1.ytimg.com/vi/SfLV8hD7zX4/0.jpg",
  "token": "eyJhbGc"
}
```

And the response will have the following form:

```
{
    "success": true,
    "message": "Feature Updated!", //This will say "Feature Created!" if a feature with the beaconID did not already exist.
    "feature": {
        "_id": "5adf8a53d92c1e52d3df9cea",
        "name": "Feature 1 Diff name again",
        "beaconID": 1,
        "long": 12.4,
        "lat": 13.3,
        "imageLink": "http://i1.ytimg.com/vi/SfLV8hD7zX4/0.jpg",
        "__v": 0,
        "scripts": [
            {
                "_id": "5adf8d758852e5532a98308f",
                "beaconID": 1,
                "language": "english",
                "value": "here is an english script for beacon 1.",
                "__v": 0
            }
        ]
    }
}
```

### POST /admin/deleteFeature

Hitting this endpoint will delete a feature with the beaconID specified in the body.

The request body should look like this:

```
{
  "beaconID": 1,
  "token": "eyJhbGc"
}
```

The response will look like this:
```
{
    "success": true,
    "message": "Feature Deleted!"
}
```

### POST /admin/script

This endpoint can be used to either create a new script, or update the value for an existing
script. The request body must contain all of the information needed for a script

A Script is identified by its beaconID and language.

A request should have a body that looks like this:

```
{
  "language": "english",
  "beaconID": 0,
  "value": "here is an english script for beacon 0.",
  "token": "eyJhbGciOiJ"
}
```

And the response will have the following form:

```
{
    "success": true,
    "message": "Script Updated!", // This will say created if a script with this beaconID and language doesn't already exist.
    "script": {
        "_id": "5adf8e9bb7a1645340c16c0c",
        "beaconID": 0,
        "language": "spanish",
        "value": "here is an spanish script for beacon 0.",
        "__v": 0
    }
}
```


### POST /admin/deleteScript

Hitting this endpoint will delete a script with the beaconID and launguage specified in the body.

The request body should look like this:

```
{
  "beaconID": 1,
  "language": "english",
  "token": "eyJhbGc"
}
```

The response will look like this:
```
{
    "success": true,
    "message": "Script Deleted!"
}
```

## Running the Server

You must have node and mongodb installed. I also recommend installing nodemon as it
will restart the server when files change, as well as some other things that make it nice
to work with.

The current configuration points to a local instance of mongodb, so you need to be running mongo before starting the server. To do this, just open a terminal window and run:

```
mongod
```

To start the server, in a new terminal window or tab run
```
node app.js
```
or using nodemon
```
nodemon app.js
```

I also recommend using ngrok to provide a tunnel to your localhost as this will be helpful in allowing the mobile clients to reach the server. The server is configure to run on port 8080 so to open a tunnel run:

```
ngrok http 8080
```

This will open a tunnel to localhost:8080 and a public url will be shown. This url can
be used to hit the server from other machines.
