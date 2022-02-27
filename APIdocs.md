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
Description:

- Getting weather's data to change background image

Request:

- body:

```json
{
  "file": "Form Data"
}
```

## 5. GET /pet
Description:

- Getting pet's data to match pet's Owner ID and the owner's ID

Request:

- userData:

```json
{
  "OwnerID": "string"
}
```

- _Response (200 - OK)_

```json
{
  "name": "string",
  "hunger": "integer",
  "craving": "text",
  "OwnerID": "integer"
}
```



## 6. POST /pet
Description:

- Creating a pet for new user

Request:

- userData:

```json
{
  "OwnerID": "string"
}
```

- body:

```json
{
  "name": "string"
}
```

- _Response (201 - created)_

```json
{
  "message": "Your pet has been born"
}
```

Initial creation of pet always put the hunger into 70

## 7. PATCH /pet
Description:

- To feed the pet and relish it's hunger

Request:

- userData:

```json
{
  "OwnerID": "string"
}
```

Request:

- body:

```json
{
  "data": "object / { data }"
}
```

- _Response (200 - OK)_

```json
{
  "message": "Your pet really like the food! 😍"
}
```

- _Response (500 - Disliked food)_

```json
{
  "message": "Your pet doesn't like the food 😔"
}
```