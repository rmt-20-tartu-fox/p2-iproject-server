# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /balances/data`
- `GET /balances/data`
- `Post /histories/data`
- `GET /histories/data`
- `GET /additionals/getCrypto`
- `GET /additionals/getForex`

&nbsp;

## 1. POST /register

Description:

- Register Account

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
  "email": "string",
  "name": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message":  "Password is required!"
}
OR
{
  "message": "Email is required!"
}
OR
{
  "message": "Email must be unique!"
}
OR
{
  "message": "Invalid email format"
}
```

&nbsp;

## 2. POST /login

Description:

- Login Account

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

&nbsp;

## 3. POST /balances/data

Description:

- post balance

Request:

- body:

```json
{
  "title": "string",
  "type": "string",
  "crypto": "string"
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
  "title": "string",
  "type": "string",
  "crypto": "string",
  "UserId": "integer"
}
```

## 4. GET /balances/data

Description:

- get balance

request:

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
    "id": "integer",
    "UserId": "integer",
    "title": "string",
    "type": "string"
  }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Balance not found"
}
```

&nbsp;

## 5. Post /histories/data

Description:

- make new data transaction

request:

- Body:

```json
{
  "BalanceId": "integer",
  "value": "integer"
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
  "id": 13,
  "BalanceId": 2,
  "value": "100",
  "UserId": 2,
  "valueCrypto": null,
  "attachment": "",
  "updatedAt": "2022-02-24T06:11:55.483Z",
  "createdAt": "2022-02-24T06:11:55.483Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Balance not found"
}
```

_Response (403 - Not Found)_

```json
{
  "message": "Not Authorized"
}
```

&nbsp;

## 6. GET /histories/data

Description:

- get data transaction

request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "result": [
        {
            "id": 7,
            "UserId": 2,
            "BalanceId": 4,
            "value": "100",
            "valueCrypto": null,
            "attachment": "",
            "createdAt": "2021-05-25T12:00:00.000Z",
            "updatedAt": "2022-02-23T20:29:50.330Z",
            "Balance": {
                "id": 4,
                "UserId": 2,
                "title": "Cash",
                "type": "IDR",
                "crypto": true,
                "createdAt": "2022-02-23T08:12:41.606Z",
                "updatedAt": "2022-02-23T08:12:41.606Z"
            }
        },
        {
            "id": 4,
            "UserId": 2,
            "BalanceId": 1,
            "value": "50000",
            "valueCrypto": null,
            "attachment": "",
            "createdAt": "2021-07-25T12:00:00.000Z",
            "updatedAt": "2022-02-23T13:47:24.114Z",
            "Balance": {
                "id": 1,
                "UserId": 2,
                "title": "tabungan anak sekolah",
                "type": "IDR",
                "crypto": false,
                "createdAt": "2022-02-23T06:28:00.350Z",
                "updatedAt": "2022-02-23T06:28:00.350Z"
            }
        },...

}
```

## 7. GET /additionals/getCrypto

Description:

show BTC rate and ETH rate

- header

```json
{
  "access_token": "string"
}
```

## 8. GET /additionals/getForex

Description:

show USD rate and EUR rate

- header

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "USD": "integer",
  "EUR": "integer"
}
```

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
