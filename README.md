# calendar-mern
Aplicación de Calendario utilizando React, Node, Mongo y Express

- Estandar de códigos
https://www.restapitutorial.com/httpstatuscodes

# REFERENCIA DE API
### GET Auth - Revalidar JWT
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

### GET Evento - Obtener eventos
    localhost:4000/api/events/

### POST Evento - Crear nuevo evento
    localhost:4000/api/events/
```
{
    "title": "Evento para borrar",
    "start": 1,
    "end": 10000,
    "notes": "Hay que borrar el evento"
}
```
### PUT Evento - Actualizar evento
    localhost:4000/api/events/{id}
```
{
    "title": "Pendiente por hacer...!!",
    "start": 1,
    "end": 10000,
    "notes": "Actualizar evento"
}
```

### DELETE Evento - Borrar evento
    localhost:4000/api/events/{id}