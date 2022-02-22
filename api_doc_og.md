# 2Pac API Documentation

&nbsp;

## Models:

_User_

```
- email : string, required
- username : string, required
- password : string, required
- yearOfBirth : integer, required
```

_Category_

```
- name : string, required
```

_Joke_

```
- setup : string, required
- punchline : string, required
```

_Meme_

```
- title : string, required
- imageUrl : string, required
- imageDir : string, required
- nsfw : string, required
- categoryId : integer, required
```

_like_

```
- UserId : integer, required
- MemeId : integer, required
```

## Endpoints :

- `POST /register`
- `POST /login`

- `GET /jokes`

- `GET /memes`
- `POST /memes`

- `GET /likes`
- `POST /likes/:memeId`
- `DELETE /likes/:id`
