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

## 3. POST /upload

Description:

- Upload to feed the pet

Request:

- body:

```json
{
  "file": "Form Data"
}
```

_Response (201 - Created)_

```json
{
  "data": ["a", "b", "c", "d"]
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please upload a file!"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "File size cannot be larger than 2MB!"
}
```

## 4. GET /weather
## 5. GET /pet
## 6. POST /pet
## 7. PATCH /pet