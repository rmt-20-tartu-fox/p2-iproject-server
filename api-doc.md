# NICE REPICE

## End Point

- POST /wishlist/:RecipeId
- GET /wishlist
- GET /recipes/:recipeId
- DELETE /wishlist/:id

## POST "/wishlist/:RecipeId

- Reqeust:

Body

```json
{
  "recipe": {
    "uri": "string",
    "label": "string",
    "image": "string",
    "ingredientLines": ["string"],
    "calories": "number"
  }
}
```

Response (201 - Created)

```json
{
  "message": "created"
}
```

response (400 - CustomError)

```json
{
  "message": "You have already add this recipe to your wishlist"
}
```

## GET /wishlist

Get all whislist recipe from database

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ1c2VyMUBicmFuZGVkLmNvbSIsInJvbGUiOiJzdGFmZiIsImlhdCI6MTY0MzczMjA5OH0.uXhP6tAxhLVlBJBaTbd9dT_nKubTB941kvm7rkPoTV4"
}
```

Request

```json
[
  {
    "recipe": {
      "recipe": {
        "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_672c9e7e3fbc6240477d99152ba8f6b3",
        "label": "Burnt-Scallion Fish",
        "image": "https://www.edamam.com/web-img/a96/a967fbe797803dbe8418a668cf304b53.jpg",
        "ingredientLines": [
          "2 bunches scallions",
          "8 tbsp. butter",
          "2 8-oz. fish filets"
        ],
        "calories": 1322.2806752000001
      },
      "_links": {
        "self": {
          "href": "https://api.edamam.com/api/recipes/v2/recipe_672c9e7e3fbc6240477d99152ba8f6b3/672c9e7e3fbc6240477d99152ba8f6b3?type=public&app_id=37739ed6&app_key=2d43044520cc6293d202b58fb76aa198",
          "title": "Self"
        }
      }
    },
    "id": 11,
    "UserId": 12,
    "RecipeId": "recipe_672c9e7e3fbc6240477d99152ba8f6b3",
    "createdAt": "2022-02-23T20:07:58.383Z",
    "updatedAt": "2022-02-23T20:07:58.383Z"
  }
]
```

## GET /recipes/:recipeId

Get all recipe from edamam api database

Body

```json
{
  "recipe": {
    "uri": "string",
    "label": "string",
    "image": "string",
    "ingredientLines": ["string"],
    "calories": "number"
  }
}
```

Response (200 - OK)

## DELETE /wishlist/:id

Description:

- Delete Product by id

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ1c2VyMUBicmFuZGVkLmNvbSIsInJvbGUiOiJzdGFmZiIsImlhdCI6MTY0MzczMjA5OH0.uXhP6tAxhLVlBJBaTbd9dT_nKubTB941kvm7rkPoTV4"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

Response (200 - OK)

```json
{ "message": "Successfully delete your wishlist" }
```

Response (404 - Not Found)

```json
{ "message": "Wishlist not Found" }
```

## POST/users/register

Headers:

Body :

```json
{
  "username": "string",
  "password": "string"
}
```

Response (201 - Created)

response (400 -SequelizeValidationError)

```json
{
  "message": "email must not be empty",
  "message": "password is needed"
}
```

response (400 - SequelizeUniqueConstraintError)

```json
{
  "message": "Email already registered"
}
```

## POST/users/login

Headers:

Body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response (200 - OK)

Response (401 - unauthorized)

```json
{ "message": "Invalid Email or Password" }
```

## GET/bmi

get bmi from BIM rapid api

Params:

```json
{
  "height": "string",
  "weight": "string"
}
```

response (200-OK)

```json
{
  "bmi": "number",
  "weight": "string",
  "height": "string",
  "weightCategory": ""
}
```
