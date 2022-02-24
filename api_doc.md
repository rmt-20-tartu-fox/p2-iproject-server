# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /users/register`
- `POST /users/login`
- `GET /operators`
- `GET /operators/:operatorId`
- `GET /maps`
- `POST /friends`
- `GET /friends`
- `GET /strats`
- `GET /strats/:stratId`
- `POST /strats`
- `GET /mystrats`
- `DELETE /mystrats/:stratId`


&nbsp;

## 1. POST /users/register

Description:
Create New User (role player)

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
  "payload":{
    "id": "integer",
    "username":"string",
    "email": "string",
    "role": "player"
  },
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username is required"
}
OR
{
  "message": "Username Has Been Take"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid Email format"
}
OR
{
  "message": "Email Has Been Taken"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /users/login

Description:
Log In user

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
}
```

_Response (200 - OK)_

```json
{ 
  "payload":{
    "id": "integer",
    "username":"string",
    "email": "string",
    "role": "role",
  },
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid Email or Password"
}
```
&nbsp;

## 3. GET /operators

Description:
Get all operators data


_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Kapkan",
        "iconUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/797q7C5YA89eFqw4RB40ka/f9435d1b4d13d41472e22d305c961cb9/Y0R6_BADGE_Kapkan_L.png",
        "imageUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4DCZD6bED0srAvUDbciDgO/f7b915b1d07854638973fbc23aa0ad9b/R6-operator-kapkan.png",
        "ability": "Entry Denial Device",
        "quote": "There are many different kinds of cunning. Fortunately, survival requires only one.",
        "content": "Kapkan is a trap Operator and a deadly addition to a Defending team. Kapkan is equipped with a Entry Denial Device (EDD-MK II). This trap is a packed C4 charge activated when motion is detected. It can be placed on door and window frames -- denying key entry points for attackers.",
        "role": "Defender",
        "videoUrl": "https://youtu.be/3ktw-fnNH2Q",
        "createdAt": "2022-02-23T12:57:44.611Z",
        "updatedAt": "2022-02-23T12:57:44.611Z"
    },
    ...
]
```

&nbsp;

## 4. GET /operators/:operatorId

Description:
Get one operators data

Request:
- params:

```json
{
  "operatorId": "integer"
}
```

_Response (200 - OK)_

```json

{
    "id": 1,
    "name": "Kapkan",
    "iconUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/797q7C5YA89eFqw4RB40ka/f9435d1b4d13d41472e22d305c961cb9/Y0R6_BADGE_Kapkan_L.png",
    "imageUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4DCZD6bED0srAvUDbciDgO/f7b915b1d07854638973fbc23aa0ad9b/R6-operator-kapkan.png",
    "ability": "Entry Denial Device",
    "quote": "There are many different kinds of cunning. Fortunately, survival requires only one.",
    "content": "Kapkan is a trap Operator and a deadly addition to a Defending team. Kapkan is equipped with a Entry Denial Device (EDD-MK II). This trap is a packed C4 charge activated when motion is detected. It can be placed on door and window frames -- denying key entry points for attackers.",
    "role": "Defender",
    "videoUrl": "https://youtu.be/3ktw-fnNH2Q",
    "createdAt": "2022-02-23T12:57:44.611Z",
    "updatedAt": "2022-02-23T12:57:44.611Z"
}
    
```

_Response (404 - Not Found)_

```json
{
  "message": "Operator Not Found"
}
```
&nbsp;


## 5. GET /maps

Description:
Get all maps data


_Response (200 - OK)_

```json
[
   {
        "id": 1,
        "name": "Kafe Dostoyevsky",
        "imgUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2nIuPSHvbM57TK90VSwBEm/70144ada56cf1ba72103aeb4ece9ed1a/r6-maps-kafe.jpg",
        "createdAt": "2022-02-23T12:57:44.599Z",
        "updatedAt": "2022-02-23T12:57:44.599Z"
    },
    ...
]
```

&nbsp;

## 6. POST /friends

Description:
Get statistic of other players

Request:

- body:

```json
{
  "friends": "string",
}
```

_Response (200 - OK)_

```json
{
    "username": "Kytesune",
    "statistic": {
        "rank": "Unranked",
        "mmr": 2500,
        "icon": "https://github.com/danielwerg/r6api.js/raw/master/assets/ranks/v3/Unranked.png",
        "KD": 0.78,
        "wins": 1105,
        "losses": 1013,
        "winRate": "52.17%"
    }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Player Not Found"
}
```
&nbsp;

## 7. GET /friends

Description:
Get all news from ubisoft


_Response (200 - OK)_

```json
[
    {
        "id": "6lcAdRyl50pd77gdnyUSZe",
        "title": "Top Issues and Community Concerns",
        "abstract": "We will be updating the following list regularly to outline the status of certain issues that are currently pressing for our community.",
        "thumbnail": {
            "url": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1hGlsaoaTeJTt8ilhGfmyP/98bd9138dc538a91de1e5e41ba4e91cb/R6S_Top_Issues_Thumbnail.png",
            "description": ""
        },
        "content": "TEXT",
        "categories": [
            "rainbow-six-siege",
            "rainbow-six",
            "toxicity",
            "anti-cheat"
        ],
        "tag": "BR-rainbow-six GA-siege",
        "placement": null,
        "type": "news",
        "readTime": 5,
        "url": "https://www.ubisoft.com/en-gb/game/rainbow-six/siege/news-updates/6lcAdRyl50pd77gdnyUSZe/top-issues-and-community-concerns",
        "date": "Tue Feb 22 2022 17:00:00 GMT+0000 (Coordinated Universal Time)"
    },
    ...
]
```

&nbsp;

## 8. GET /strats
Description:
Get all strategies


_Response (200 - OK)_

```json
[
    {
        "id": 2,
        "currentRole": "Attack",
        "MapId": 1,
        "Op1Id": 11,
        "Op2Id": 15,
        "Op3Id": 18,
        "Op4Id": 19,
        "Op5Id": 17,
        "UserId": 1,
        "description": "STRING",
        "createdAt": "2022-02-23T15:30:45.404Z",
        "updatedAt": "2022-02-23T15:30:45.404Z",
        "Map": {
            "id": 1,
            "name": "Kafe Dostoyevsky",
            "imgUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2nIuPSHvbM57TK90VSwBEm/70144ada56cf1ba72103aeb4ece9ed1a/r6-maps-kafe.jpg",
            "createdAt": "2022-02-23T12:57:44.599Z",
            "updatedAt": "2022-02-23T12:57:44.599Z"
        },
        "User": {
            "id": 1,
            "username": "Lily",
            "email": "L1@gmail.com",
            "role": "player",
            "createdAt": "2022-02-23T13:11:21.566Z",
            "updatedAt": "2022-02-23T13:11:21.566Z"
        },
        "myOperators": [
            {
                "id": 11,
                "name": "Glaz",
                "iconUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5UAZVgyOutPh6bLTV3fGXf/c59d484fd599d09a947ec423b2119620/Y0R6_BADGE_Glaz_L.png",
                "imageUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1xYMcXH9CNiKHI5Wqoxw8y/ac8414157d7647ea8377dd5c7ce6d2bb/R6-operator-glaz.png",
                "ability": "Flip Sight",
                "quote": "string",
                "content": "string",
                "role": "Attacker",
                "videoUrl": "https://youtu.be/-fezVmNKHoE",
                "createdAt": "2022-02-23T12:57:44.621Z",
                "updatedAt": "2022-02-23T12:57:44.621Z"
            },
            {
                "id": 15,
                "name": "Twitch",
                "iconUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3YgCpOSM2R4SDgExstxm7P/ff84e6ac53bd9f690deee78870f9c23b/Y0R6_BADGE_Twitch_L.png",
                "imageUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5jaeo9LkOu6deQz4mOF9a2/9a07011ac08bc25d58cbfc828b442e3a/R6-operator-twitch.png",
                "ability": "Shock Drones",
                "quote": "string",
                "content": "string",
                "role": "Attacker",
                "videoUrl": "https://youtu.be/xEuaxniVNV4",
                "createdAt": "2022-02-23T12:57:44.621Z",
                "updatedAt": "2022-02-23T12:57:44.621Z"
            },
            {
                "id": 18,
                "name": "Ash",
                "iconUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/58Y4Q2x7msL8uQUoiA7LGM/b204acc9c5a015029140723ef2e435bb/Y0R6_BADGE_Ash_L.png",
                "imageUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4uyWdmCF6zI9vcn4vKp9zx/1b9393a63e1071daeccb95732e530d40/r6-operator-ash_229846.png",
                "ability": "Breaching Rounds",
                "quote": "string",
                "content": "string",
                "role": "Attacker",
                "videoUrl": "https://youtu.be/S4fSk1EcVPs",
                "createdAt": "2022-02-23T12:57:44.621Z",
                "updatedAt": "2022-02-23T12:57:44.621Z"
            },
            {
                "id": 19,
                "name": "Thatcher",
                "iconUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5NbqTdEPmYy9qOZmN9StVT/f75b0f2610a37f9e5bdcb8ba9d551a38/Y0R6_BADGE_Thatcher_L.png",
                "imageUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4yGZXsXNG7gxH0YIwnii6F/e895af50867dc913f192050c10913abd/R6-operator-thatcher.png",
                "ability": "EMP Grenade",
                "quote": "string",
                "content": "string",
                "role": "Attacker",
                "videoUrl": "https://youtu.be/ueveGDiv_OQ",
                "createdAt": "2022-02-23T12:57:44.621Z",
                "updatedAt": "2022-02-23T12:57:44.621Z"
            },
            {
                "id": 17,
                "name": "Thermite",
                "iconUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6tow5mqLao5TrJVL52csSc/46aa934c9f3f02189e9c04df0114a081/Y0R6_BADGE_Thermite_L.png",
                "imageUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4c4cEUFWUwXTT4p3V5wAjm/e755c2a37a050de118eabc667c55c511/R6-operator-thermite.png",
                "ability": "Exothermic Charge",
                "quote": "string",
                "content": "string",
                "role": "Attacker",
                "videoUrl": "https://youtu.be/vwOfi7Wg9TY",
                "createdAt": "2022-02-23T12:57:44.621Z",
                "updatedAt": "2022-02-23T12:57:44.621Z"
            }
        ]
    }
    ...
]
```

&nbsp;

## 9. GET /strats/:stratId
Description:
Get One strategies

Request:

- params:

```json
{
  "stratId": "integer",
}
```

_Response (200 - OK)_

```json

    {
        "id": 2,
        "currentRole": "Attack",
        "MapId": 1,
        "Op1Id": 11,
        "Op2Id": 15,
        "Op3Id": 18,
        "Op4Id": 19,
        "Op5Id": 17,
        "UserId": 1,
        "description": "STRING",
        "createdAt": "2022-02-23T15:30:45.404Z",
        "updatedAt": "2022-02-23T15:30:45.404Z",
        "Map": {
            "id": 1,
            "name": "Kafe Dostoyevsky",
            "imgUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2nIuPSHvbM57TK90VSwBEm/70144ada56cf1ba72103aeb4ece9ed1a/r6-maps-kafe.jpg",
            "createdAt": "2022-02-23T12:57:44.599Z",
            "updatedAt": "2022-02-23T12:57:44.599Z"
        },
        "User": {
            "id": 1,
            "username": "Lily",
            "email": "L1@gmail.com",
            "role": "player",
            "createdAt": "2022-02-23T13:11:21.566Z",
            "updatedAt": "2022-02-23T13:11:21.566Z"
        },
        "myOperators": [
            {
                "id": 11,
                "name": "Glaz",
                "iconUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5UAZVgyOutPh6bLTV3fGXf/c59d484fd599d09a947ec423b2119620/Y0R6_BADGE_Glaz_L.png",
                "imageUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1xYMcXH9CNiKHI5Wqoxw8y/ac8414157d7647ea8377dd5c7ce6d2bb/R6-operator-glaz.png",
                "ability": "Flip Sight",
                "quote": "string",
                "content": "string",
                "role": "Attacker",
                "videoUrl": "https://youtu.be/-fezVmNKHoE",
                "createdAt": "2022-02-23T12:57:44.621Z",
                "updatedAt": "2022-02-23T12:57:44.621Z"
            },
            {
                "id": 15,
                "name": "Twitch",
                "iconUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3YgCpOSM2R4SDgExstxm7P/ff84e6ac53bd9f690deee78870f9c23b/Y0R6_BADGE_Twitch_L.png",
                "imageUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5jaeo9LkOu6deQz4mOF9a2/9a07011ac08bc25d58cbfc828b442e3a/R6-operator-twitch.png",
                "ability": "Shock Drones",
                "quote": "string",
                "content": "string",
                "role": "Attacker",
                "videoUrl": "https://youtu.be/xEuaxniVNV4",
                "createdAt": "2022-02-23T12:57:44.621Z",
                "updatedAt": "2022-02-23T12:57:44.621Z"
            },
            {
                "id": 18,
                "name": "Ash",
                "iconUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/58Y4Q2x7msL8uQUoiA7LGM/b204acc9c5a015029140723ef2e435bb/Y0R6_BADGE_Ash_L.png",
                "imageUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4uyWdmCF6zI9vcn4vKp9zx/1b9393a63e1071daeccb95732e530d40/r6-operator-ash_229846.png",
                "ability": "Breaching Rounds",
                "quote": "string",
                "content": "string",
                "role": "Attacker",
                "videoUrl": "https://youtu.be/S4fSk1EcVPs",
                "createdAt": "2022-02-23T12:57:44.621Z",
                "updatedAt": "2022-02-23T12:57:44.621Z"
            },
            {
                "id": 19,
                "name": "Thatcher",
                "iconUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5NbqTdEPmYy9qOZmN9StVT/f75b0f2610a37f9e5bdcb8ba9d551a38/Y0R6_BADGE_Thatcher_L.png",
                "imageUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4yGZXsXNG7gxH0YIwnii6F/e895af50867dc913f192050c10913abd/R6-operator-thatcher.png",
                "ability": "EMP Grenade",
                "quote": "string",
                "content": "string",
                "role": "Attacker",
                "videoUrl": "https://youtu.be/ueveGDiv_OQ",
                "createdAt": "2022-02-23T12:57:44.621Z",
                "updatedAt": "2022-02-23T12:57:44.621Z"
            },
            {
                "id": 17,
                "name": "Thermite",
                "iconUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6tow5mqLao5TrJVL52csSc/46aa934c9f3f02189e9c04df0114a081/Y0R6_BADGE_Thermite_L.png",
                "imageUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4c4cEUFWUwXTT4p3V5wAjm/e755c2a37a050de118eabc667c55c511/R6-operator-thermite.png",
                "ability": "Exothermic Charge",
                "quote": "string",
                "content": "string",
                "role": "Attacker",
                "videoUrl": "https://youtu.be/vwOfi7Wg9TY",
                "createdAt": "2022-02-23T12:57:44.621Z",
                "updatedAt": "2022-02-23T12:57:44.621Z"
            }
        ]
    }
    ...

```

_Response (404 - Not Found)_

```json
{
  "message": "Strategy Not Found"
}
```

&nbsp;

## 10. POST /strats

Description:
Create New Strat

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
  "currentRole": "string",
  "description": "string",
  "Op1Id" : "integer",
  "Op2Id" : "integer",
  "Op3Id" : "integer",
  "Op4Id" : "integer",
  "Op5Id" : "integer",
  "MapId" : "integer",
  "UserId" : "integer"
}
```

_Response (200 - OK)_

```json
{ 
  "MapId" : "integer",
  "Op1Id" : "integer",
  "Op2Id" : "integer",
  "Op3Id" : "integer",
  "Op4Id" : "integer",
  "Op5Id" : "integer",
  "currentRole" : "string",
  "UserId": "integer",
  "description" : "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Choose Another Operator"
}
OR
{
  "message": "Choose A Map"
}
```
&nbsp;

## 11. GET /mystrats
Description:
Get all personal strategies

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
        "id": 2,
        "currentRole": "Attack",
        "MapId": 1,
        "Op1Id": 11,
        "Op2Id": 15,
        "Op3Id": 18,
        "Op4Id": 19,
        "Op5Id": 17,
        "UserId": 1,
        "description": "STRING",
        "createdAt": "2022-02-23T15:30:45.404Z",
        "updatedAt": "2022-02-23T15:30:45.404Z",
        "Map": {
            "id": 1,
            "name": "Kafe Dostoyevsky",
            "imgUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2nIuPSHvbM57TK90VSwBEm/70144ada56cf1ba72103aeb4ece9ed1a/r6-maps-kafe.jpg",
            "createdAt": "2022-02-23T12:57:44.599Z",
            "updatedAt": "2022-02-23T12:57:44.599Z"
        },
        "User": {
            "id": 1,
            "username": "Lily",
            "email": "L1@gmail.com",
            "role": "player",
            "createdAt": "2022-02-23T13:11:21.566Z",
            "updatedAt": "2022-02-23T13:11:21.566Z"
        },
        "myOperators": [
            {
                "id": 11,
                "name": "Glaz",
                "iconUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5UAZVgyOutPh6bLTV3fGXf/c59d484fd599d09a947ec423b2119620/Y0R6_BADGE_Glaz_L.png",
                "imageUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1xYMcXH9CNiKHI5Wqoxw8y/ac8414157d7647ea8377dd5c7ce6d2bb/R6-operator-glaz.png",
                "ability": "Flip Sight",
                "quote": "string",
                "content": "string",
                "role": "Attacker",
                "videoUrl": "https://youtu.be/-fezVmNKHoE",
                "createdAt": "2022-02-23T12:57:44.621Z",
                "updatedAt": "2022-02-23T12:57:44.621Z"
            },
            {
                "id": 15,
                "name": "Twitch",
                "iconUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3YgCpOSM2R4SDgExstxm7P/ff84e6ac53bd9f690deee78870f9c23b/Y0R6_BADGE_Twitch_L.png",
                "imageUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5jaeo9LkOu6deQz4mOF9a2/9a07011ac08bc25d58cbfc828b442e3a/R6-operator-twitch.png",
                "ability": "Shock Drones",
                "quote": "string",
                "content": "string",
                "role": "Attacker",
                "videoUrl": "https://youtu.be/xEuaxniVNV4",
                "createdAt": "2022-02-23T12:57:44.621Z",
                "updatedAt": "2022-02-23T12:57:44.621Z"
            },
            {
                "id": 18,
                "name": "Ash",
                "iconUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/58Y4Q2x7msL8uQUoiA7LGM/b204acc9c5a015029140723ef2e435bb/Y0R6_BADGE_Ash_L.png",
                "imageUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4uyWdmCF6zI9vcn4vKp9zx/1b9393a63e1071daeccb95732e530d40/r6-operator-ash_229846.png",
                "ability": "Breaching Rounds",
                "quote": "string",
                "content": "string",
                "role": "Attacker",
                "videoUrl": "https://youtu.be/S4fSk1EcVPs",
                "createdAt": "2022-02-23T12:57:44.621Z",
                "updatedAt": "2022-02-23T12:57:44.621Z"
            },
            {
                "id": 19,
                "name": "Thatcher",
                "iconUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5NbqTdEPmYy9qOZmN9StVT/f75b0f2610a37f9e5bdcb8ba9d551a38/Y0R6_BADGE_Thatcher_L.png",
                "imageUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4yGZXsXNG7gxH0YIwnii6F/e895af50867dc913f192050c10913abd/R6-operator-thatcher.png",
                "ability": "EMP Grenade",
                "quote": "string",
                "content": "string",
                "role": "Attacker",
                "videoUrl": "https://youtu.be/ueveGDiv_OQ",
                "createdAt": "2022-02-23T12:57:44.621Z",
                "updatedAt": "2022-02-23T12:57:44.621Z"
            },
            {
                "id": 17,
                "name": "Thermite",
                "iconUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6tow5mqLao5TrJVL52csSc/46aa934c9f3f02189e9c04df0114a081/Y0R6_BADGE_Thermite_L.png",
                "imageUrl": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4c4cEUFWUwXTT4p3V5wAjm/e755c2a37a050de118eabc667c55c511/R6-operator-thermite.png",
                "ability": "Exothermic Charge",
                "quote": "string",
                "content": "string",
                "role": "Attacker",
                "videoUrl": "https://youtu.be/vwOfi7Wg9TY",
                "createdAt": "2022-02-23T12:57:44.621Z",
                "updatedAt": "2022-02-23T12:57:44.621Z"
            }
        ]
    }
    ...
]
```

&nbsp;
## 12. DELETE /mystrats/:stratId

Description:
Delete strategy

Request:

- headers:

```json
{
  "access_token": "string",
}
```

- params:

```json
{
  "stratId": "integer",
}
```

_Response (200 - OK)_

```json
{
    "message": "Your Strat Has Been Banned"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Player Not Found"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
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
