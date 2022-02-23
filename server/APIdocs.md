# PiBuYo! documentation

## Endpoints:

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /upload`
- `GET /weather`
- `GET /pet`
- `POST /pet`
- `PATCH /pet`

## 1. POST /register

Description:

- Register a new account

Request:

- body:

```json
{
  "email": "dio@gmail.com",
  "password": 12345
}
```

_Response (201 - Created)_

```json
{
  "message": "Register successful"
}
```

## 2. POST /login

Description:

- Login to an account

- body:

```json
{
  "email": "dio@gmail.com",
  "password": 12345
}
```

_Response (200 - OK)_

```json
{
  "message": "Login successful",
  "access_token": "string",
  "OwnerID": "integer"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email or password"
}
```
