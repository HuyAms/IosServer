## Hostname
*http://localhost:3000/
## API
### Official
* Authen
  * POST/auth/signin
* Users
  * [POST /api/users](#authentication)
  * GET /api/users/
  * GET /api/users/:id
  * PUT /api/users/me
  * DELETE /api/users/:id
  
## Errors handling
Http status code should be checked for at least following error conditions:
* 400 Bad Request 
* 401 Unauthorized
* 403 Forbidden 
* 404 Not Found 
* 405 Method Not Allowed
* 406 Not Acceptable
* 415 Unsupported Media Type
* 500 Internal Server Error
* 503 Service Unavailable

**Error payload:**

| key |	type | description |
| --- | --- | --- |
| status | string | HttpStatus |
| description | string | Error Description |

**Sample error:**
```json
{
  "status": 400,
  "description": "This username has already be used"
}
```

## Authentication
### POST/auth/signin
Sign in user

Request body:

| key |	type | description |
| --- | --- | --- |
| username | string | |
| password | string | Email form |
| email | string | |
| phoneNumber | int | Must be 10 digits |

Response payload

| key |	type | description |
| --- | --- | --- |
| token | string | Server Token |

Sample request:

```json
{
  "username": "HuyTrinh",
  "password": "123456",
  "email": "test@gmail.com",
  "phoneNumber": "0123456789",
}
```

Sample response:

```json
{
  "token":"HERE IS THE TOKEN"
}
```

## Users
### POST /api/users
### GET /api/users/
### GET /api/users/:id
### PUT /api/users/me
### DELETE /api/users/:id
 
