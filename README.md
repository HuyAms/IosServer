## Hostname
*http://localhost:3000/
## API
### Official
* [Authen](#auth)
  * [POST/auth/signin](#signin)
* [Users](#users)
  * [POST /api/users](#post-users)
  * [GET /api/users/](#get-users)
  * [GET /api/users/me](#get-users-me)
  * [GET /api/users/:id](#get-users-id)
  * [PUT /api/users/me](#put-users-me)
* [Items](#items)
  * [Get /api/items](#get-items)
  * [POST /api/items](#post-items)
  * [GET /api/items/filter](#get-items-filter)
  * [GET /api/items/me](#get-items-me)
  * [GET /api/items/users/:uId](#get-items-users-uId)
  * [GET /api/items/:id](#get-items-id)
  * [PUT /api/items/:id](#put-items-id)
  * [DELETE /api/items/:id](#delete-items-id)
* [Orders](#orders)
  * [POST /api/orders](#post-orders)
  * [Get /api/orders/me/buyer](#get-orders-me-buyer)
  * [Get /api/orders/me/seller](#get-orders-me-seller)
* [Photos](#photos)
  * [POST /api/photos](#post-photos)
  
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
  "description": "This username has already been used"
}
```

## <a name="auth"></a>Authentication
### <a name="signin"></a>POST/auth/signin
Sign in user

Request body:

| key |	type | description |
| --- | --- | --- |
| username | string | |
| password | string | |

Response payload

| key |	type | description |
| --- | --- | --- |
| token | string | Server Token |

Sample request:

```json
{
  "username": "HuyTrinh",
  "password": "123456",
}
```

Sample response:

```json
{
  "token":"HERE IS THE TOKEN"
}
```

## <a name="users"></a> Users
### <a name="post-users"></a> POST /api/users

Request body:

| key |	type | description |
| --- | --- | --- |
| username | string | |
| password | string | |
| email | string | Email |
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
  "phoneNumber": "0123456789"
}
```

Sample response:

```json
{
  "token":"HERE IS THE TOKEN"
}
```

Register user
### <a name="get-users"></a> GET /api/users/
Get a list of user

Response payload data:

| key |	type | description |
| --- | --- | --- |
| point | int |  |
| id | string |  |
| username | string |  |
| avatarPath | string | optional |

Sample response data:
```json
[
    {
      "point": 1,
      "_id": "5ac77ca090b6512c8000f4ff"
      "username": "test1",
    },
    {
      "point": 10,
      "_id": "5ac77ca090b6512c8000f500"
      "username": "test2",
    }
]
```

### <a name="get-users-me"></a> GET /api/users/me
Get me
Header payload:
| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Response payload data

| key |	type | description |
| --- | --- | --- |
| point | int |  |
| id | string |  |
| username | string |  |
| email | string |  |
| phoneNumber | string |  |
| avatarPath | string | optional |

Sample header:
```json
{
  "authorization":"HERE IS THE TOKEN"
}
```

Sample response data:

```json
{
  "point": 1,
  "_id": "5ac77ca090b6512c8000f4ff"
  "username": "test1",
  "email": "test1@gmail.com"
  "phoneNumber": "0123456789"
}
```

### <a name="get-users-id"></a>  GET /api/users/:id
Get user by id

Response payload

| key |	type | description |
| --- | --- | --- |
| point | int |  |
| id | string |  |
| username | string |  |
| email | string |  |
| phoneNumber | string |  |
| avatarPath | string | optional |

Sample response data:

```json
{
  "point": 1,
  "_id": "5ac77ca090b6512c8000f4ff"
  "username": "test1",
  "email": "test1@gmail.com"
  "phoneNumber": "0123456789"
}
```

### <a name="put-users-me"></a> PUT /api/users/me
Edit me

Request body:

| key |	type | description |
| --- | --- | --- |
| username | string | otional |
| password | string | otional |
| email | string | Email - otional |
| phoneNumber | int | Must be 10 digits - otional |

Sample request:

```json
{
  "username": "HuyTrinh",
  "password": "123456",
  "email": "test@gmail.com",
  "phoneNumber": "0123456789"
}
```
Sample response data:

```json
{
  "username": "HuyTrinh",
  "password": "123456",
  "email": "test@gmail.com",
  "phoneNumber": "0123456789"
}
```

## <a name="items"></a> Items
### <a name="get-items"></a> Get /api/items
Get all items which are available
### <a name="post-items"></a> POST /api/items
Post a new item for sale
Header payload:
| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Sample header:
```json
{
  "authorization":"HERE IS THE TOKEN"
}
```

### <a name="get-items-filter"></a> GET /api/items/filter
Get items filtered by category or price
### <a name="get-items-me"></a> GET /api/items/me
Get all my items
Header payload:
| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Sample header:
```json
{
  "authorization":"HERE IS THE TOKEN"
}
```
### <a name="get-items-users-uId"></a> GET /api/items/users/:uId
Get items of user based on userId
### <a name="get-items-id"></a> GET /api/items/:id
Get one item based on id
### <a name="put-items-id"></a> PUT /api/items/:id
Edit item based on id
Header payload:
| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Sample header:
```json
{
  "authorization":"HERE IS THE TOKEN"
}
```

### <a name="delete-items-id"></a> DELETE /api/items/:id
Delete item based on id
Header payload:
| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Sample header:
```json
{
  "authorization":"HERE IS THE TOKEN"
}
```

## <a name="orders"></a> Orders
### <a name="post-orders"></a> Get /api/orders
Create an order to buy item
Header payload:
| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Sample header:
```json
{
  "authorization":"HERE IS THE TOKEN"
}
```

### <a name="get-orders-me-buyer"></a> Get /api/orders/me/buyer
Get all items bought by me
Header payload:
| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Sample header:
```json
{
  "authorization":"HERE IS THE TOKEN"
}
```

### <a name="get-orders-me-seller"></a> GET /api/orders/me/seller
Get all items sold by me
Header payload:
| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Sample header:
```json
{
  "authorization":"HERE IS THE TOKEN"
}
```

## <a name="photos"></a> Photos
### <a name="post-photos"></a> POST /api/photos
Post a photo to server
Header payload:
| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Sample header:
```json
{
  "authorization":"HERE IS THE TOKEN"
}
```


