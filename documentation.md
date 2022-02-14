# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /products`
- `POST /posts`
- `GET /posts/:id`
- `PUT /posts/:id`
- `DELETE /posts/:id`
- `GET /categories`
- `GET /histories`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Email must be unique"
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
  "message": "Error invalid username or password"
}
```

&nbsp;

## 3. GET /posts

Description:
- Get all Posts from database

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
    "id": 1,
    "title": "Jalan-Jalan ke Bali",
    "content": "dfdsfB",
    "imgUrl": "https://www.google.com/search?q=balizoo+harimau",
    "CategoryId": 3,
    "AuthorId": 5,
    "createdAt": "2022-02-02T05:21:21.760Z",
    "updatedAt": "2022-02-02T05:21:21.760Z"
  },
  {
    "id": 2,
    "title": "Jalan-Jalan ke Jogja",
    "content": "dfdsfB",
    "imgUrl": "https://www.google.com/search?q=balizoo+harimau",
    "CategoryId": 3,
    "AuthorId": 5,
    "createdAt": "2022-02-02T05:21:29.320Z",
    "updatedAt": "2022-02-02T05:21:29.320Z"
  },
  {
    "id": 3,
    "title": "Jalan-Jalan ke Jogja",
    "content": "dfdsfB",
    "imgUrl": "https://www.google.com/search?q=balizoo+harimau",
    "CategoryId": 3,
    "AuthorId": 1,
    "createdAt": "2022-02-02T05:22:07.167Z",
    "updatedAt": "2022-02-02T05:22:07.167Z"
  }
  ...,
]
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```


## 4. POST /posts

Description:
- Add post to database

Request:

- body: 

```json
{
  "title": "string",
  "content": "string",
  "imgUrl": "string",
  "CategoryId": "string"
}
```

- headers: 

```json
{
  "token": "string",
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "title": "Jalan-Jalan ke Bali",
    "content": "dfdsfB",
    "imgUrl": "https://www.google.com/search?q=balizoo+harimau",
    "CategoryId": 3,
    "AuthorId": 5,
    "createdAt": "2022-02-02T05:21:21.760Z",
    "updatedAt": "2022-02-02T05:21:21.760Z"
  }
  // Author id from token
  ...,
]
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```


## 5. GET /posts/:id

Description:
- Get post by id from database

Request:

- params: 

```json
{
  "id": "string",
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "title": "Jalan-Jalan ke Bali",
    "content": "dfdsfB",
    "imgUrl": "https://www.google.com/search?q=balizoo+harimau",
    "CategoryId": 3,
    "AuthorId": 5,
    "createdAt": "2022-02-02T05:21:21.760Z",
    "updatedAt": "2022-02-02T05:21:21.760Z"
  }
  ...,
]
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```


## 6. PUT /posts/:id

Description:
- Update post by id from database

Request:

- params: 

```json
{
  "id": "string",
}
```

```json
{
  "title": "string",
  "content": "string",
  "imgUrl": "string",
  "CategoryId": "string"
}
```

- headers: 

```json
{
  "token": "string",
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "title": "Jalan-Jalan ke Bali",
    "content": "dfdsfB",
    "imgUrl": "https://www.google.com/search?q=balizoo+harimau",
    "CategoryId": 3,
    "AuthorId": 5,
    "createdAt": "2022-02-02T05:21:21.760Z",
    "updatedAt": "2022-02-02T05:21:21.760Z"
  }
  ...,
]
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```



&nbsp;

## 7. DELETE /posts/:id

Description:
- Delete Posts by id

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
  "message": "Posts success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "404 NOT FOUND"
}
```

&nbsp;


## 8. GET /categories

Description:
- Get all categories from database

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
    "id": 1,
    "name": "Adventure"
  },
  {
    "id": 2,
    "name": "Religi"
  },
  {
    "id": 3,
    "name": "Software"
  },
  ...,
]
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```


## 8. GET /histories

Description:
- Get all histories from database

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
    "name": "Pergi ke Tangerang",
    "description": "New entity with id 1 created",
    "updatedBy": "derissatrio@gmail.com",
    "EntityId": 3
  },
    {
    "name": "Pergi ke Jakarta",
    "description": "Entity with id 2 status has been updated from active into archived",
    "updatedBy": "derissatrio@gmail.com",
    "EntityId": 2
  }
  ...,
]
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```


## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Forbidden Access"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```