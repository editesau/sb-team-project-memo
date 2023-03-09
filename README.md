
# Memorika



![Logo](https://user-images.githubusercontent.com/111222143/221550000-5a881d2e-4389-4077-b688-38867df88667.png)

Fullstack SPA in Memo-games style
## Features
On release v0.1.0 we have next features available:
- User SignUp/SignIn using JWT
- User cabinet with change password/email/avatar functions
- Game mechanic with difficult level and game theme selectors


## Screenshots
#### Sign up form
![SignUpForm](https://user-images.githubusercontent.com/111222143/221550898-124a4150-9390-4b0e-9293-d02a13e5ed7b.png)

#### Sign in form
![SignInForm](https://user-images.githubusercontent.com/111222143/221549658-6f755e0e-6775-4978-8941-5e525bd7c2de.png)

#### Main menu
![MainGameMenu](https://user-images.githubusercontent.com/111222143/221550746-3e1a98fb-b9ac-4aa2-85ad-b7096b8009a7.png)

#### New game settings
![GameSettings](https://user-images.githubusercontent.com/111222143/221551044-242faf41-7fee-40f3-8e55-cc70fc5aad38.png)

#### Game process
![GameProcess](https://user-images.githubusercontent.com/111222143/221551358-fe049827-596b-41e8-b0be-f401d27e7bb8.png)
## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Base Color 1 | ![#5D0E9F](https://via.placeholder.com/10/5D0E9F?text=+) #5D0E9F |
| Base Color 2 | ![#FFF44B](https://via.placeholder.com/10/FFF44B?text=+) #FFF44B |



## Tech Stack

**Frontend:** React.js

**Backend:** Node.js, Express, MongoDB


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file of backend

`MONGO_HOST` DNS or IP MongoDB 

`MONGO_PORT` MongoDB port

`MONGO_CA_PATH` **Full** path to MongoDB CA certificate

`MONGO_CLIENT_CRT_PATH` **Full** path to MongoDB client auth certificate

`APP_PORT` Express application port

`API_VERSION` API version, used in endpoints

`JWT_SECRET` Sign secret for JWT tokens

`JWT_ACCESS_LIFE` Access token lifetime in seconds

`JWT_REFRESH_LIFE` Refresh token lifetime in seconds

`BCRYPT_SALT` Salt value for BCRYPT password crypting

`MORGAN_ENV` Env value for morgan logger


## API Reference

Api reference described [here](https://app.swaggerhub.com/apis-docs/ALEXEYPO121/sb-memo/1.0.0)


## Deployment

To run this project you need a [secured mongoDB](https://www.mongodb.com/docs/manual/tutorial/configure-x509-client-authentication/) instance, and set .env described in Environment variables section, then:

### In /app run 
```bash
  npm i
  npm run dev
```
### In /srv run
```bash
  npm i
  node src/index.js
```


## Authors

- [@editesau](https://github.com/editesau) Aleksei Morozov
- [@RamilKhos](https://github.com/RamilKhos) 
Ramil Khosnetdinov
- [@SadreevArtem](https://github.com/SadreevArtem) Artem Sadreev
- [@111LegendaryDude111](https://github.com/111LegendaryDude111) David Sukhashvili

