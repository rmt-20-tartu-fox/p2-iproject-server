# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /customers/login`
- `POST /customers/register`
- `POST /customers/login-google`
- `GET /customers/books`
- `GET /customers/books/:id`
- `POST /customers/payment`
- `GET /customers/transactions`
- `POST /customers/transactions`
- `POST /customers/send-emails`

&nbsp;

## 1. POST /customers/login

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

## 2. POST /users/register

Description:

- Create new user

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": 45,
  "email": "admin1211@gmail.com"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": ["Email is required"]
}
OR
{
  "message": ["Password is required"]
}
```

&nbsp;

## 3. POST /users/login-google

Request:

- body:

```json
{
  "token": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

&nbsp;

## 4. GET /customers/books

Request:

- query:

```json
{
  "page": "integer",
  "title": "string"
}
```

\_Response (200 - OK)\_

```json
{
  "count": 30,
  "rows": [
      {
          "id": 1,
          "title": "Letters of Two Brides",
          "imageUrl": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348552689i/1991721._UY400_SS400_.jpg",
          "price": 100000,
          "language": "English",
          "totalTime": "9:09:20",
          "link": "https://www.archive.org/download/letters_brides_0709_librivox/letters_brides_0709_librivox_64kb_mp3.zip",
          "createdAt": "2022-02-23T05:59:09.546Z",
          "updatedAt": "2022-02-23T05:59:09.546Z"
      },
      ...
  ]
}
```

&nbsp;

## 5. GET /customers/books/:id

Request:

- params:

```json
{
  "id": "integer"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

\_Response (200 - OK)\_

```json
{
  "id": 1,
  "title": "Letters of Two Brides",
  "imageUrl": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348552689i/1991721._UY400_SS400_.jpg",
  "price": 100000,
  "language": "English",
  "totalTime": "9:09:20",
  "link": "https://www.archive.org/download/letters_brides_0709_librivox/letters_brides_0709_librivox_64kb_mp3.zip",
  "createdAt": "2022-02-23T05:59:09.546Z",
  "updatedAt": "2022-02-23T05:59:09.546Z"
}
```

\_Response (404 - Not_found)\_

```json
{
  "message": "Book not found"
}
```

&nbsp;

## 6. POST /customers/payment

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "price": "integer",
  "first_name": "string",
  "last_name": "string",
  "quantity": "integer",
  "itemName": "string"
}
```

\_Response (200 - OK)\_

```json
{
  "token": "363c09eb-e7bc-4710-a3bf-5ab00b8a2b4d",
  "redirect_url": "https://app.sandbox.midtrans.com/snap/v2/vtweb/363c09eb-e7bc-4710-a3bf-5ab00b8a2b4d"
}
```

\_Response (400 - Bad_Request)\_

```json
{
  "message": "Quantity is required"
}
```

&nbsp;

## 8. GET /customers/transactions

Request:

- headers:

```json
{
  "access_token": "string"
}
```

\_Response (200 - OK)\_

```json
[
  {
    "id": 5,
    "UserId": 1,
    "BookId": 2,
    "order_id": "164559673834",
    "status": "Completed",
    "Book": {
        "id": 2,
        "title": "Heart of Darkness",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/41jtQZWfu4L.jpg",
        "price": 100000,
        "language": "English",
        "totalTime": "4:10:12",
        "link": "https://www.archive.org/download/heart_of_darkness/heart_of_darkness_64kb_mp3.zip",
        "createdAt": "2022-02-23T05:59:09.573Z",
        "updatedAt": "2022-02-23T05:59:09.573Z"
    }
  },
  ...
]
```

&nbsp;

## 9. POST /customers/transactions

Request:

- headers:

```json
{
  "access_token": "string"
}
```

\_Response (200 - OK)\_

```json
{
  "id": 11,
  "status": "Completed",
  "order_id": "9489482103",
  "UserId": 1,
  "BookId": 1,
  "updatedAt": "2022-02-24T01:22:01.095Z",
  "createdAt": "2022-02-24T01:22:01.095Z"
}
```

\_Response (400 - Bad_Request)\_

```json
{
  "message": ["Book id is required", "Order id is required"]
}
```

&nbsp;

## 10. POST /customers/send-emails

Request:

- headers:

```json
{
  "access_token": "string"
}
```

\_Response (200 - OK)\_

```json
{
  "accepted": ["customer@mail.com"],
  "rejected": [],
  "envelopeTime": 730,
  "messageTime": 663,
  "messageSize": 231,
  "response": "250 2.0.0 OK  1645669603 c3sm883328pfd.129 - gsmtp",
  "envelope": {
    "from": "aryawdy16@gmail.com",
    "to": ["customer@mail.com"]
  },
  "messageId": "<68aa9b71-f8f7-1556-dd03-2d7ae5d2393f@gmail.com>"
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
