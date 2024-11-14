# calendar-mern
Aplicación de Calendario utilizando React, Node, Mongo y Express

- Estandar de códigos
https://www.restapitutorial.com/httpstatuscodes

# REFERENCIA DE API
## GET Auth - Revalidar JWT
localhost:4000/api/auth/renew

Request Headers x-token
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....uKr8531fjUc4nrCuJ2mNUkqGot246AYWz9w1xqQQhgQ
```
### POST Auth - Crear usuario
localhost:4000/api/auth/new

Body raw (json) json
```
{
    "name": "jose",
    "email": "josetamaronir@gmail.com",
    "password": "1234"
}
```
### POST Auth - Login
localhost:4000/api/auth/

Body raw (json) json
```
{
    "email": "josetamaronir@gmail.com",
    "password": "1234"
}
```