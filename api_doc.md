# Individual Project Server API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /login-google`
- `GET /books`
- `GET /books/search`

Routes below need authentication:

- `POST /bookmarks`
- `GET /bookmarks`
- `DELETE /bookmarks/:bookmarkId`

&nbsp;

## 1. POST /register

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
  "id": "integer",
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
  "message": "Email must be unique!"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Password minimum length is 8"
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
  "message": "string",
  "access_token": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email or password"
}
```


&nbsp;


## 3. POST /login-google

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
  "message": "string",
  "access_token": "string"
}
```

&nbsp;


## 4. GET /books

Description:
- Get books from 3rd party api


_Response (200 - OK)_

```json
[
  {
        "key": "string",
        "title": "string",
        "edition_count": "integer",
        "cover_id": "integer",
        "cover_edition_key": "string",
        "subject": "array",
        "ia_collection": "array",
        "lendinglibrary": "boolean",
        "printdisabled": "boolean",
        "lending_edition": "string",
        "lending_identifier": "string",
        "authors": "array of object",
        "first_publish_year": "boolean",
        "ia": "string",
        "public_scan": "boolean",
        "has_fulltext": "boolean",
        "availability": {
            "status": "string",
            "available_to_browse": "boolean",
            "available_to_borrow": "boolean",
            "available_to_waitlist": "boolean",
            "is_printdisabled": "boolean",
            "is_readable": "boolean",
            "is_lendable": "boolean",
            "is_previewable": "boolean",
            "identifier": "string",
            "isbn": "string",
            "oclc": "string",
            "openlibrary_work": "string",
            "openlibrary_edition": "string",
            "last_loan_date": "string",
            "num_waitlist": "string",
            "last_waitlist_date": "string",
            "collection": "string",
            "is_restricted": "boolean",
            "is_browseable": "boolean",
            "__src__": "string"
        }
  },
  ...,
]
```

&nbsp;


## 5. GET /books/search

Description:
- Get books by title from 3rd party api

Request:

- Query Params: 

```json
{
  "title": "string",
}
```

_Response (200 - OK)_

```json
[
  {
        "key": "string",
        "title": "string",
        "edition_count": "integer",
        "cover_id": "integer",
        "cover_edition_key": "string",
        "subject": "array",
        "ia_collection": "array",
        "lendinglibrary": "boolean",
        "printdisabled": "boolean",
        "lending_edition": "string",
        "lending_identifier": "string",
        "authors": "array of object",
        "first_publish_year": "boolean",
        "ia": "string",
        "public_scan": "boolean",
        "has_fulltext": "boolean",
        "availability": {
            "status": "string",
            "available_to_browse": "boolean",
            "available_to_borrow": "boolean",
            "available_to_waitlist": "boolean",
            "is_printdisabled": "boolean",
            "is_readable": "boolean",
            "is_lendable": "boolean",
            "is_previewable": "boolean",
            "identifier": "string",
            "isbn": "string",
            "oclc": "string",
            "openlibrary_work": "string",
            "openlibrary_edition": "string",
            "last_loan_date": "string",
            "num_waitlist": "string",
            "last_waitlist_date": "string",
            "collection": "string",
            "is_restricted": "boolean",
            "is_browseable": "boolean",
            "__src__": "string"
        }
  },
  ...,
]
```

&nbsp;


## 5. POST /bookmarks
Request:

- Headers

```json
{
  "access_token": "string"
}
```

- Body

```json
{
  "BookId": "integer",
  "title" : "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "Add book with id <value> successfull!",
}
```
&nbsp;



## 6. GET /bookmarks

Description:
- Get book by id user login from database

Request:

- Headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "UserId": "integer",
    "BookId": "integer",
    "title": "string",
    "status": "string",
    "createdAt": "string",
    "updatedAt": "string",
  },
  ...,
]

```


&nbsp;



## 7. DELETE /bookmarks/:bookmarkId

Description:
- Delete bookmark by id user login from database

Request:

- Headers: 

```json
{
  "access_token": "string"
}
```

- Params: 

```json
{
  "bookmarkId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Book <title> success remove from My Book!"
}

```


&nbsp;

## 8. Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token or user"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```