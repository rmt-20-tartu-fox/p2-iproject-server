# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /deck`
- `POST /deck/:cardId`
- `DELETE /deck/:id`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "name": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /deck

Description:

- Get all card from Deck

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 17,
        "CardName": "Time Thief Perpetua",
        "CardType": "XYZ Monster",
        "CardImageUrl": "https://storage.googleapis.com/ygoprodeck.com/pics/59208943.jpg",
        "UserId": 3,
        "CardId": 59208943,
        "createdAt": "2022-02-24T05:23:01.335Z",
        "updatedAt": "2022-02-24T05:23:01.335Z"
    },
    {
        "id": 18,
        "CardName": "Time Thief Perpetua",
        "CardType": "XYZ Monster",
        "CardImageUrl": "https://storage.googleapis.com/ygoprodeck.com/pics/59208943.jpg",
        "UserId": 3,
        "CardId": 59208943,
        "createdAt": "2022-02-24T05:23:04.206Z",
        "updatedAt": "2022-02-24T05:23:04.206Z"
    }, ...
]
```

&nbsp;

## 4. DELETE /deck/:id

Description:

- Delete movie by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "card removed from deck"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "data not found"
}
```

&nbsp;

## 4. POST /deck/:cardId

Description:

- add Card to deck by cardId

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "cardId": "integer (required)"
}
```

_Response (201 - created)_

```json
{
  "id": 18,
  "UserId": 3,
  "CardId": 59208943,
  "CardName": "Time Thief Perpetua",
  "CardType": "XYZ Monster",
  "CardImageUrl": "https://storage.googleapis.com/ygoprodeck.com/pics/59208943.jpg",
  "updatedAt": "2022-02-24T05:23:04.206Z",
  "createdAt": "2022-02-24T05:23:04.206Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "data not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
