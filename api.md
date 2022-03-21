# Gestura App Streaming Music API Documentation

## Endpoints :

List of available endpoints:

- `POST /send`
- `POST /payment`

&nbsp;

## 1. POST /send

Description:

- Nodemailer Feature

Request:

- body:

```json
{
  "name": "string",
  "email": "string",
}
```

_Response (200 - OK)_

```json
{
  "message": "Message has been sent"
}
```

&nbsp;

## 2. POST /payment

Description:

- Payment Gateaway Feature

Request:

- body:

```json
{
  "name": "string",
  "email": "string",
  "itemName": "string",
  "price": "integer"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "redirect_url": "string",
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