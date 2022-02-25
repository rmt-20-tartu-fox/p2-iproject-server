# Branded Things

# Endpoints:
List of available endpoints:

- `POST /REGISTER /Create User Account`
- `POST /LOGIN /Log In to Database`

- `POST /BOOKINGS /Get Hotel list by longitude and latitude from Booking.Com`
- `POST /BOOKINGS?HOTELS /Get List room by Hotel Id from Booking.Com`

- `POST /WEATHERS /Get Weather forecasting up to 132 Hours by longitude and latitude`

- `GET /CITIES /Get City data from Database One by One`
- `GET /CITIES/ALL /Get all city data from Database`

- `POST /BOOKMARKS /Add bookmark for hotel room`
- `GET /BOOKMARKS /Get bookmark from user by Id`
- `DELETE /BOOKMARKS/:ID /Delete bookmark user by Id`

## 1. POST /REGISTER /Create User Account

Description:
- Create new user account to database.

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
  "id": 21,
  "name": "admin5",
  "email": "admin5@gmail.com" 
}
```


_Response (400 - Bad Request)_

```json
{
  "message": "Name is required."
}
OR
{
  "message": "Email must be unique."
}
OR
{
  "message": "Email is required."
}
OR
{
  "message": "Password is required."
}
OR
{
  "message": "Role is required."
}
OR
{
  "message": "Status is required."
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 2. POST /LOGIN /Log In to Database

Description:
- Login user account to database.

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - Created)_

```json
{
    "id": 3,
    "email": "user3@user.com",
    "name": "user3",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ1c2VyM0B1c2VyLmNvbSIsInJvbGUiOiJjb3N0dW1lciIsImlhdCI6MTY0NTY3ODgzNywiZXhwIjoxNjQ1NjkzMjM3fQ.ksIIOkYILePJwLR5oUVkuAPgGgcC7-QfoK5ONFv1fYU"
}
```

_Response (401 - Unauthorize)_

```json
{
  "message": "Invalid Input Email or Password"
}
OR
{
  "code": 401,
  "message": "Invalid Token or User."
}
```

_Response (500 - Internal Server Error)_

```json
{
  "code": 500, 
  "message": "Internal Server Error"
}
```

## 3. POST /GOOGLELOGIN /Log In to Database Use Google Account

Description:
- Login user account to database using Google Account.


_Response (200 - Created)_

```json
{
  "code": 200,
  "message": "Login Successful",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoiYWRtaW4yQGdtYWlsLmNvbSIsImlhdCI6MTY0MzY1Njg5OX0.kzlaVReZTVjqarbMGgajkefECVZ1OGer--hGAwQPO3M"
}
```

_Response (401 - Unauthorize)_

```json
{
  "code": 401,
  "message": "Invalid Input Email or Password"
}
OR
{
  "code": 401,
  "message": "Invalid Token or User."
}
```

_Response (500 - Internal Server Error)_

```json
{
  "code": 500, 
  "message": "Internal Server Error"
}
```

## 4. POST /GOOGLEREGISTER /Add some data from Google Account to Database

Description:
- Create new user using google account using add some data to database.

Request:

- body:

```json
{
  "password": "string",
  "phoneNumber": "string",
  "address": "string",
}
```

_Response (201 - Created)_

```json
{
  "code": 201,
  "data": {
    "id": 21,
    "username": "admin5",
    "email": "admin5@gmail.com"
  }
}
```


_Response (400 - Bad Request)_

```json
{
  "code": 400,
  "message": [
    "Password minimum 5 character and maximum 20 character."
  ]
}
OR
{
  "code": 400,
  "message": [
    "Password cannot be empty."
  ]
}
OR
{
  "code": 400,
  "message": [
    "Phone number minimum 8 digits."
  ]
}
OR
{
  "code": 400,
  "message": [
    "Phone number cannot be empty."
  ]
}
```

_Response (500 - Internal Server Error)_

```json
{
  "code": 500, 
  "message": "Internal Server Error"
}
```

## 5. POST /Create Product

Description:
- Create new data of product to database.

Request:

- body:

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer",
}
```

- headers:

```json
{
  "access_token": "string"
}
```

_Response (201 - Created)_

```json
{
  "code": 201,
  "data": {
    "id": 9,
    "name": "Tartan Lancester Shirt Staff",
    "description": "Kemeja lengan panjang bermotif kotak untuk timeless classic look, Warna orange tua, Material katun tidak transparan, ringan dan tidak stretch,Tinggi model 187cm, lingkar dada 100cm.",
    "price": 469900,
    "imgUrl": "http://placehold.it/120x120&text=image2",
    "categoryId": 2,
    "authorId": 20,
    "updatedAt": "2022-02-02T09:25:23.149Z",
    "createdAt": "2022-02-02T09:25:23.149Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "code": 400,
  "message": [
    "Name can't be empty."
  ]
}
OR
{
  "code": 400,
  "message": [
    "Description can't be empty."
  ]
}
OR
{
  "code": 400,
  "message": [
    "Price can't be empty."
  ]
}
OR
{
  "code": 400,
  "message": [
    "Minimum price product was Rp. 10.000,-"
  ]
}
OR
{
  "code": 400,
  "message": [
    "Image URL can't be empty."
  ]
}
OR
{
  "code": 400,
  "message": [
    "Image must be URL format data."
  ]
}
OR
{
  "code": 400,
  "message": [
    "Category can't be empty."
  ]
}
OR
{
  "code": 400,
  "message": [
    "Author can't be empty."
  ]
}
```

_Response (404 - Not Found)_

```json
{
  "code": 404,
  "message": "User ID Not Found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "code": 500, 
  "message": "Internal Server Error"
}
```

&nbsp;

## 6. GET /List of All Product

Description:
- Get list of all product from database.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "code": 200,
  "data" : [
    {
      "id": 1,
      "name": "Baju Gw Banget",
      "description": "Keren abiz lah, ga nyesel",
      "price": 450000,
      "imgUrl": "http://placehold.it/120x120&text=image2",
      "categoryId": 3,
      "authorId": 1,
      "createdAt": "2022-01-31T13:10:53.698Z",
      "updatedAt": "2022-01-31T14:56:26.829Z"
    },
    {
      "id": 2,
      "name": "Baju Santai",
      "description": "qwerty",
      "price": 125000,
      "imgUrl": "http://placehold.it/120x120&text=image1",
      "categoryId": 1,
      "authorId": 10,
      "createdAt": "2022-01-31T13:11:48.232Z",
      "updatedAt": "2022-01-31T13:11:48.232Z"
    },
    ...,
  ]
}
```

_Response (403 - Forbidden)_

```json
{
  "code": 403, 
  "message": "Access Denied."
}
```

_Response (500 - Internal Server Error)_

```json
{
  "code": 500, 
  "message": "Internal Server Error"
}
```

&nbsp;

## 7. GET/:ID /Detail Product By Id

Description:
- Get detail data product by id from database.

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

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "Baju Gw Banget",
  "description": "Keren abiz lah, ga nyesel",
  "price": 450000,
  "imgUrl": "http://placehold.it/120x120&text=image2",
  "categoryId": 3,
  "authorId": 1,
  "createdAt": "2022-01-31T13:10:53.698Z",
  "updatedAt": "2022-01-31T14:56:26.829Z"
}
```

_Response (404 - NOT FOUND)_

```json
{
  "code": 404,
  "message": "User ID Not Found."
}
```

_Response (500 - Internal Server Error)_

```json
{
  "code": 500, 
  "message": "Internal Server Error"
}
```

## 8. PUT/:ID /Update Data Product

Description:
- Update data product to database.

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

- body:
```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "name": "Tartan Lancester Shirt",
    "description": "Kemeja lengan panjang bermotif kotak untuk timeless classic look, Warna orange tua, Material katun tidak transparan, ringan dan tidak stretch,Tinggi model 187cm, lingkar dada 100cm.",
    "price": 469900,
    "imgUrl": "http://placehold.it/120x120&text=image2",
    "categoryId": 3,
    "authorId": 1,
    "createdAt": "2022-01-31T13:10:53.698Z",
    "updatedAt": "2022-01-31T17:50:51.954Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "code": 400,
  "message": [
    "Name can't be empty."
  ]
}
OR
{
  "code": 400,
  "message": [
    "Description can't be empty."
  ]
}
OR
{
  "code": 400,
  "message": [
    "Price can't be empty."
  ]
}
OR
{
  "code": 400,
  "message": [
    "Minimum price product was Rp. 10.000,-"
  ]
}
OR
{
  "code": 400,
  "message": [
    "Image URL can't be empty."
  ]
}
OR
{
  "code": 400,
  "message": [
    "Image must be URL format data."
  ]
}
OR
{
  "code": 400,
  "message": [
    "Category can't be empty."
  ]
}
OR
{
  "code": 400,
  "message": [
    "Author can't be empty."
  ]
}
```

_Response (404 - NOT FOUND)_

```json
{
  "code": 404,
  "message": "User ID Not Found."
}
```

_Response (500 - Internal Server Error)_

```json
{
  "code": 500, 
  "message": "Internal Server Error"
}
```

&nbsp;

## 9. DELETE /Delete Product By Id

Description:
- Delete product by id from database.

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

_Response (200 - OK)_

```json
{
  "code": 200,
  "message": "<name_product> success to delete."
}
```

_Response (404 - NOT FOUND)_

```json
{
  "code": 404,
  "message": "User ID Not Found."
}
```

_Response (500 - Internal Server Error)_

```json
{
  "code": 500, 
  "message": "Internal Server Error"
}
```

## 10. POST /PUBS/REGISTER /Create Costumer User Account As Costumer

Description:
- Create new user account to database as Costumer.

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string",
}
```

_Response (201 - Created)_

```json
{
  "code": 201,
  "data": {
    "id": 21,
    "username": "admin5",
    "email": "admin5@gmail.com"
  }
}
```


_Response (400 - Bad Request)_

```json
{
  "code": 400,
  "message": [
    "Username minimum 4 character and maximum 20 character."
  ]
}
OR
{
  "code": 400,
  "message": [
    "Username cannot be empty."
  ]
}
OR
{
  "code": 400,
  "message": [
    "Format must be email format."
  ]
}
OR
{
  "code": 400,
  "message": [
    "Email cannot be empty."
  ]
}
OR
{
  "code": 400,
  "message": [
    "Password minimum 5 character and maximum 20 character."
  ]
}
OR
{
  "code": 400,
  "message": [
    "Password cannot be empty."
  ]
}
OR
{
  "code": 400,
  "message": [
    "Phone number minimum 8 digits."
  ]
}
OR
{
  "code": 400,
  "message": [
    "Phone number cannot be empty."
  ]
}
```

_Response (500 - Internal Server Error)_

```json
{
  "code": 500, 
  "message": "Internal Server Error"
}
```

## 11. POST /PUBS/LOGIN /Log In to Database As Costumer

Description:
- Login user account to database as Costumer.

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - Created)_

```json
{
  "code": 200,
  "message": "Login Successful",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoiYWRtaW4yQGdtYWlsLmNvbSIsImlhdCI6MTY0MzY1Njg5OX0.kzlaVReZTVjqarbMGgajkefECVZ1OGer--hGAwQPO3M"
}
```

_Response (401 - Unauthorize)_

```json
{
  "code": 401,
  "message": "Please input some data first"
}
OR
{
  "code": 401,
  "message": "Invalid Token or User."
}
OR
{
  "code": 401,
  "message": "Invalid Input Email or Password 1",
}
OR
{
  "code": 401,
  "message": "Invalid Input Email or Password 2",
}
```

_Response (500 - Internal Server Error)_

```json
{
  "code": 500, 
  "message": "Internal Server Error"
}
```

## 12. POST /PUBS/GOOGLELOGIN /Log In to Database Use Google Account As Costumer

Description:
- Login user account to database using Google account as Costumer.


_Response (200 - Created)_

```json
{
  "code": 200,
  "message": "Login Successful",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoiYWRtaW4yQGdtYWlsLmNvbSIsImlhdCI6MTY0MzY1Njg5OX0.kzlaVReZTVjqarbMGgajkefECVZ1OGer--hGAwQPO3M"
}
```

_Response (401 - Unauthorize)_

```json
{
  "code": 401,
  "message": "Invalid Input Email or Password"
}
OR
{
  "code": 401,
  "message": "Invalid Token or User."
}
```

_Response (500 - Internal Server Error)_

```json
{
  "code": 500, 
  "message": "Internal Server Error"
}
```

## 13. GET /PUBS/PRODUCTS /Get Product On Costumer Side

Description:
- Get all data product from database.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- query:

```json
{
  "page": "integer"
}
OR
{
  "page": "integer",
  "categoryId": "integer"
}
OR
{
  "page": "integer",
  "name": "string"
}
OR
{
  "page": "integer",
  "minPrice": "number"
}
OR
{
  "page": "integer",
  "maxPrice": "number"
}
OR
{
  "page": "integer",
  "categoryId": "integer",
  "name": "string"
}
OR
{
  "page": "integer",
  "name": "string",
  "minPrice":"number"
}
...
OR
{
  "page": "integer",
  "name": "string",
  "categoryId": "integer",
  "minPrice":"number",
  "maxPrice": "number"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "Baju Gw Banget",
  "description": "Keren abiz lah, ga nyesel",
  "price": 450000,
  "imgUrl": "http://placehold.it/120x120&text=image2",
  "categoryId": 3,
  "authorId": 1,
  "status": "active",
  "createdAt": "2022-01-31T13:10:53.698Z",
  "updatedAt": "2022-01-31T14:56:26.829Z"
},
{
  "id": 3,
  "name": "Baju Gw Banget",
  "description": "Keren abiz lah, ga nyesel",
  "price": 350000,
  "imgUrl": "http://placehold.it/120x120&text=image2",
  "categoryId": 4,
  "authorId": 11,
  "status": "inactive",
  "createdAt": "2022-01-31T13:10:53.698Z",
  "updatedAt": "2022-01-31T14:56:26.829Z"
},
...
```

_Response (404 - NOT FOUND)_

```json
{
  "code": 404,
  "message": "User ID Not Found."
}
```

_Response (500 - Internal Server Error)_

```json
{
  "code": 500, 
  "message": "Internal Server Error"
}
```

## 14. GET /PUBS/WISHLISTS /Get Product On Costumer Wish List

Description:
- Get all data product from database.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "Baju Gw Banget",
  "description": "Keren abiz lah, ga nyesel",
  "price": 450000,
  "imgUrl": "http://placehold.it/120x120&text=image2",
  "categoryId": 3,
  "authorId": 1,
  "status": "active",
  "createdAt": "2022-01-31T13:10:53.698Z",
  "updatedAt": "2022-01-31T14:56:26.829Z"
},
{
  "id": 3,
  "name": "Baju Gw Banget",
  "description": "Keren abiz lah, ga nyesel",
  "price": 350000,
  "imgUrl": "http://placehold.it/120x120&text=image2",
  "categoryId": 4,
  "authorId": 11,
  "status": "inactive",
  "createdAt": "2022-01-31T13:10:53.698Z",
  "updatedAt": "2022-01-31T14:56:26.829Z"
},
...
```

_Response (404 - NOT FOUND)_

```json
{
  "code": 404,
  "message": "User ID Not Found."
}
```

_Response (500 - Internal Server Error)_

```json
{
  "code": 500, 
  "message": "Internal Server Error"
}
```

## 15. GET /PUBS/WISHLISTS/:PRODUCTID /Add Product To Costumer Wish List

Description:
- Get all data product from database.

Request:

- params:

```json
{
  "ProductId": "integer"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "Baju Gw Banget",
  "description": "Keren abiz lah, ga nyesel",
  "price": 450000,
  "imgUrl": "http://placehold.it/120x120&text=image2",
  "categoryId": 3,
  "authorId": 1,
  "status": "active",
  "createdAt": "2022-01-31T13:10:53.698Z",
  "updatedAt": "2022-01-31T14:56:26.829Z"
}
...
```

_Response (401 - UNAUTHORIZED)_
```json
OR
{
  "code": 401,
  "message": "Access Denied."
}
```

_Response (404 - NOT FOUND)_

```json
{
  "code": 404,
  "message": "Product ID Not Found."
}
```

_Response (500 - Internal Server Error)_

```json
{
  "code": 500, 
  "message": "Internal Server Error"
}
```

## 16. DELETE /PUBS/WISHLISTS/:ID /Delete Costumer Wish List By Id

Description:
- Delete product by id from database.

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

_Response (200 - OK)_

```json
{
  "code": 200,
  "message": "<name_product> success to delete."
}
```

_Response (401 - UNAUTHORIZED)_
```json
OR
{
  "code": 401,
  "message": "Access Denied."
}
```

_Response (404 - NOT FOUND)_

```json
{
  "code": 404,
  "message": "User ID Not Found."
}
```

_Response (500 - Internal Server Error)_

```json
{
  "code": 500, 
  "message": "Internal Server Error"
}
```