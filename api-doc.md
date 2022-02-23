# Symptom Checker API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /loginToken`
- `POST /symptoms`
- `GET /symptoms`
- `POST /diagnosis`
- `POST /coordinate`
- `POST /nearby`

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
  "message": "Email must be inputted"
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
  "message": "Password must be inputted"
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
  "message": "Email or password must be inputted"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. POST /loginToken

Description:

- Get token for api-medic API

Request:

- headers:

```json
{
  "Authorization": "Bearer token (string-required)"
}
```

_Response (200 - OK)_

```json
{
  "Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imp1YmVsc2luYWdhMTNAZ21haWwuY29tIiwicm9sZSI6IlVzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxMDI4OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyMi0wMi0wNiIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNjQ1NjAwMTI4LCJuYmYiOjE2NDU1OTI5Mjh9.aJthSvdcIzOKYZYLzZo-hZhfQyOSf-evh7w8oRw2Qz0",
  "ValidThrough": 7200
}
```

&nbsp;

## 4. POST /Symptoms

Description:

- Get list of symptoms from api-medic

_Response (200 - OK)_

```json
[
  {
    "ID": 10,
    "Name": "Abdominal pain"
  },
  {
    "ID": 238,
    "Name": "Anxiety"
  },
  {
    "ID": 104,
    "Name": "Back pain"
  }
  ...
]
```

&nbsp;

## 5. GET /Symptoms

Description:

- Get list of symptoms from json file

_Response (200 - OK)_

```json
[
  {
    "ID": 10,
    "Name": "Abdominal pain"
  },
  {
    "ID": 238,
    "Name": "Anxiety"
  },
  {
    "ID": 104,
    "Name": "Back pain"
  }
  ...
]
```

&nbsp;

## 6. POST /diagnosis

Description:

- Get diagnosis based on symptoms

Request:

- body:

```json
{
  "symptoms": "array",
  "gender": "string",
  "yearOfBirth": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "Issue": {
            "ID": 495,
            "Name": "Bloated belly",
            "Accuracy": 90,
            "Icd": "R14",
            "IcdName": "Flatulence and related conditions",
            "ProfName": "Meteorism",
            "Ranking": 1
        },
        "Specialisation": [
            {
                "ID": 15,
                "Name": "General practice",
                "SpecialistID": 0
            }
        ]
    },
  ...
]
```

&nbsp;

## 7. POST /coordinate

Description:

- Get coordinate based on location/address

Request:

- body:

```json
{
  "location": "string"
}
```

_Response (200 - OK)_

```json
{
  "type": "FeatureCollection",
  "query": ["palangkaraya"],
  "features": [
    {
      "id": "poi.712964621852",
      "type": "Feature",
      "place_type": ["poi"],
      "relevance": 1,
      "properties": {
        "foursquare": "4d1e1a5f70ca60fc74812b5e",
        "landmark": true,
        "address": "Jl. Kinibalu No. 1",
        "category": "mall, shop"
      },
      "text": "Palangkaraya Mall (PALMA)",
      "place_name": "Palangkaraya Mall (PALMA), Jl. Kinibalu No. 1, Palangka Raya, Kalimantan Tengah 73112, Indonesia",
      "center": [113.9154, -2.20656],
      "geometry": {
        "coordinates": [113.9154, -2.20656],
        "type": "Point"
      },
      "context": [
        {
          "id": "neighborhood.16997225275484410",
          "text": "Palangka"
        },
        {
          "id": "postcode.12390930690966140",
          "text": "73112"
        },
        {
          "id": "locality.12294427510002120",
          "text": "Jekan Raya"
        },
        {
          "id": "place.8784066753119120",
          "text": "Palangka Raya"
        },
        {
          "id": "region.9944266265597850",
          "short_code": "ID-KT",
          "wikidata": "Q3891",
          "text": "Kalimantan Tengah"
        },
        {
          "id": "country.12065990263114360",
          "wikidata": "Q252",
          "short_code": "id",
          "text": "Indonesia"
        }
      ]
    }
  ],
  "attribution": "NOTICE: © 2021 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare."
}
```

&nbsp;

## 8. POST /nearby

Description:

- Get nearby places based on location

Request:

- body:

```json
{
  "location": "string",
  "radius": "number"
}
```

_Response (200 - OK)_

```json
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "name": "Rumah Sakit Bethesda",
                "housenumber": "70",
                "street": "Jalan Jenderal Sudirman",
                "suburb": "Terban",
                "district": "Gondokusuman",
                "city": "Yogyakarta",
                "state": "Special Region of Yogyakarta",
                "postcode": "55223",
                "country": "Indonesia",
                "country_code": "id",
                "lon": 110.37735639227638,
                "lat": -7.78394425,
                "formatted": "Rumah Sakit Bethesda, Jalan Jenderal Sudirman 70, Terban, Yogyakarta 55223, Special Region of Yogyakarta, Indonesia",
                "address_line1": "Rumah Sakit Bethesda",
                "address_line2": "Jalan Jenderal Sudirman 70, Terban, Yogyakarta 55223, Special Region of Yogyakarta, Indonesia",
                "categories": [
                    "healthcare",
                    "healthcare.hospital"
                ],
                "details": [
                    "details",
                    "details.contact"
                ],
                "datasource": {
                    "sourcename": "openstreetmap",
                    "attribution": "© OpenStreetMap contributors",
                    "license": "Open Database Licence",
                    "url": "https://www.openstreetmap.org/copyright"
                },
                "place_id": "514206b82428985b405919bb6cb2a1221fc0f00102f9016fcd87160000000092031452756d61682053616b6974204265746865736461"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    110.37745016070497,
                    -7.783819949995427
                ]
            }
        },
        ...
    ]
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
