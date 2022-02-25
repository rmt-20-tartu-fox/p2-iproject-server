# Dating API Documentation

## Endpoints :

List of available endpoints:

- `POST /login`
- `POST /register`
- `GET /users/`
- `POST /users/:id/profiles`
- `GET /users/:id/profiles`
- `PUT /users/:id/profiles`
- `POST /users/:id/likes`
- `GET /matches`

&nbsp;

## 1. POST /login

Description:

- Login.

request:

- body

_Response (200 - OK)_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhbmdndW4uc2FzbWlAbWFpbC5jb20iLCJpYXQiOjE2NDM3NjA2NTh9.g39Vgn-7YnQFMt5C8c8kzf65d8o6D-6ejawKRfiMK7M"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "User not found or password not matched"
}
```

&nbsp;

## 2. POST /register

Description:

- register

_Response (201 - Created)_

```json
{
  "id": 1,
  "email": "user1@mail.com"
}
```

_Response (400 - Bad request)_

```json
{
    "message": "Email is required, Password is required"
}

OR

{
  "message": "Invalid email format, Email can not be empty, Password can not be empty, Password minimum 5 characters"
}

OR

{
    "message": "email must be unique"
}
```

&nbsp;

## 3. GET /users

Description: get all user profile

&nbsp;

## 4. POST /:id/profiles

Description: create user profile

&nbsp;

## 5. GET /:id/profiles

Description: read user profile

&nbsp;

## 6. PUT /:id/profiles

Description: edit user profile

_Response (200 - OK)_

```json
{
  "message": "Profile with id has been updated"
}
```

&nbsp;

## Global Error

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden to access the resource"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
