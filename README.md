## Hostname
**Endpoint:** https://fin-recycler.herokuapp.com
## API
### Handling
* [Success request](#success)
* [Error request](#error)
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
  * [Get /api/orders/:id](#get-orders-id)
  * [Get /api/orders/me/buyer](#get-orders-me-buyer)
  * [Get /api/orders/me/seller](#get-orders-me-seller)
* [Photos](#photos)
  * [POST /api/photos](#post-photos)
  
## <a name="error"></a> Errors handling
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

## <a name="success"></a> Success response

**Success payload:**

| key |	type | description |
| --- | --- | --- |
| status | string | HttpStatus |
| data | data | Response payload data |

**Sample success payload:**
```json
{
  "status": 200,
  "data": {
   HERE IS THE RESPONSE PAYLOAD
  }
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

Response payload data

| key |	type | description |
| --- | --- | --- |
| status | string | **available** |
| time | time |  |
| id | string |  |
| itemName | string |  |
| description | string |  |
| price | int |  |
| category | string |  |
| imgPath | string |  |
| lat | int  |optional |
| lng | int | optional |
| seller | user |  |

**seller** in detail

| key |	type | description |
| --- | --- | --- |
| id | string | |
| username | string |  |
| avatarPath | optional |  |

Sample response data:

```json
[
    {
      "status": "available",
      "time": "2018-04-06T15:31:26.363Z",
      "_id": "5ac792ce4038d91b8c78c711",
      "itemName": "mobile",
      "description": "testDescription",
      "price": 1,
      "category": "devices",
      "imgPath": "testPath",
      "seller": {
        "_id": "5ac792cb4038d91b8c78c70e"
        "username": "test1"
      }
    },
    {
      "status": "available",
      "time": "2018-04-06T15:31:26.363Z",
      "_id": "5ac792ce4038d91b8c78c711",
      "itemName": "laptop",
      "description": "testDescription",
      "price": 1,
      "category": "devices",
      "imgPath": "testPath",
      "seller": {
        "_id": "5ac792cb4038d91b8c78c70e"
        "username": "test1"
      }
    }
]
```

### <a name="post-items"></a> POST /api/items
Post a new item for sale

Header payload:

| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Request body:

| key |	type | description |
| --- | --- | --- |
| itemName | string |  |
| description | string |  |
| price | int | |
| category | string | Valid values: **clothing**, **homewares**, **accessories**, **devices** and **others** |
| imgPath | string | |
| lat | int | otional |
| lng | int | otional |

Response payload data

| key |	type | description |
| --- | --- | --- |
| status | string | **available** |
| time | time |  |
| id | string |  |
| itemName | string |  |
| description | string |  |
| price | int |  |
| category | string |  |
| imgPath | string |  |
| lat | int  |optional |
| lng | int | optional |
| seller | user |  |

**seller** in detail

| key |	type | description |
| --- | --- | --- |
| id | string | |
| username | string |  |
| avatarPath | optional |  |

Sample request:

```json
{
  "itemName": "laptop",
  "description": "nice",
  "price": 100,
  "category": "devices",
  "imgPath": "testPath",
  "lat": "60.192059",
  "lng": "24.945831",
}
```

Sample response data:

```json
[
    {
      "status": "available",
      "time": "2018-04-06T15:31:26.363Z",
      "_id": "5ac792ce4038d91b8c78c711",
      "itemName": "mobile",
      "description": "testDescription",
      "price": 1,
      "category": "devices",
      "imgPath": "testPath",
      "seller": {
        "_id": "5ac792cb4038d91b8c78c70e"
        "username": "test1"
      }
    },
    {
      "status": "available",
      "time": "2018-04-06T15:31:26.363Z",
      "_id": "5ac792ce4038d91b8c78c711",
      "itemName": "laptop",
      "description": "testDescription",
      "price": 1,
      "category": "devices",
      "imgPath": "testPath",
      "seller": {
        "_id": "5ac792cb4038d91b8c78c70e"
        "username": "test1"
      }
    }
]
```

### <a name="get-items-filter"></a> GET /api/items/filter
Get items filtered by category or price

Request params:

| key |	type | description |
| --- | --- | --- |
| category | string | Valid values: **clothing**, **homewares**, **accessories**, **devices** and **others** - optional |
| price | int | optional |

Response payload data

| key |	type | description |
| --- | --- | --- |
| status | string | **available** |
| time | time |  |
| id | string |  |
| itemName | string |  |
| description | string |  |
| price | int |  |
| category | string |  |
| imgPath | string |  |
| lat | int  |optional |
| lng | int | optional |
| seller | user |  |

**seller** in detail

| key |	type | description |
| --- | --- | --- |
| id | string | |
| username | string |  |
| avatarPath | optional |  |


Sample request:

```json
{
  "category": "devices",
  "price": 0,
}
```

Sample response data:

```json
[
    {
      "status": "available",
      "time": "2018-04-06T15:31:26.363Z",
      "_id": "5ac792ce4038d91b8c78c711",
      "itemName": "mobile",
      "description": "testDescription",
      "price": 0,
      "category": "devices",
      "imgPath": "testPath",
      "seller": {
        "_id": "5ac792cb4038d91b8c78c70e"
        "username": "test1"
      }
    },
    {
      "status": "available",
      "time": "2018-04-06T15:31:26.363Z",
      "_id": "5ac792ce4038d91b8c78c711",
      "itemName": "laptop",
      "description": "testDescription",
      "price": 0,
      "category": "devices",
      "imgPath": "testPath",
      "seller": {
        "_id": "5ac792cb4038d91b8c78c70e"
        "username": "test1"
      }
    }
]
```

### <a name="get-items-me"></a> GET /api/items/me
Get all my items

Header payload:

| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Response payload data

| key |	type | description |
| --- | --- | --- |
| status | string | **available** or **sold** |
| time | time |  |
| id | string |  |
| itemName | string |  |
| description | string |  |
| price | int |  |
| category | string |  |
| imgPath | string |  |
| lat | int  |optional |
| lng | int | optional |
| seller | string | My id |

Sample header:
```json
{
  "authorization":"HERE IS THE TOKEN"
}
```

Sample response data:

```json
[
    {
      "status": "available",
      "time": "2018-04-06T15:31:26.363Z",
      "_id": "5ac792ce4038d91b8c78c711",
      "itemName": "mobile",
      "description": "testDescription",
      "price": 0,
      "category": "devices",
      "imgPath": "testPath",
      "seller": "5ac792cb4038d91b8c78c70e"
    },
    {
      "status": "sold",
      "time": "2018-04-06T15:31:26.363Z",
      "_id": "5ac792ce4038d91b8c78c711",
      "itemName": "laptop",
      "description": "testDescription",
      "price": 0,
      "category": "devices",
      "imgPath": "testPath",
      "seller": "5ac792cb4038d91b8c78c70e"
    }
]
```

### <a name="get-items-users-uId"></a> GET /api/items/users/:uId
Get items of user based on userId

| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Response payload data

| key |	type | description |
| --- | --- | --- |
| status | string | **available** or **sold** |
| time | time |  |
| id | string |  |
| itemName | string |  |
| description | string |  |
| price | int |  |
| category | string |  |
| imgPath | string |  |
| lat | int  |optional |
| lng | int | optional |
| seller | user |  |

**seller** in detail

| key |	type | description |
| --- | --- | --- |
| id | string | |
| username | string |  |
| avatarPath | optional |  |

Sample response data:

```json
[
    {
      "status": "available",
      "time": "2018-04-06T15:31:26.363Z",
      "_id": "5ac792ce4038d91b8c78c711",
      "itemName": "mobile",
      "description": "testDescription",
      "price": 0,
      "category": "devices",
      "imgPath": "testPath",
      "seller": {
        "_id": "5ac792cb4038d91b8c78c70e"
        "username": "test1"
      }
    },
    {
      "status": "sold",
      "time": "2018-04-06T15:31:26.363Z",
      "_id": "5ac792ce4038d91b8c78c711",
      "itemName": "laptop",
      "description": "testDescription",
      "price": 0,
      "category": "devices",
      "imgPath": "testPath",
      "seller": {
        "_id": "5ac792cb4038d91b8c78c70e"
        "username": "test1"
      }
    }
]
```

### <a name="get-items-id"></a> GET /api/items/:id
Get one item based on id

Response payload data

| key |	type | description |
| --- | --- | --- |
| status | string | **available** or **sold** |
| time | time |  |
| id | string |  |
| itemName | string |  |
| description | string |  |
| price | int |  |
| category | string |  |
| imgPath | string |  |
| lat | int  |optional |
| lng | int | optional |
| seller | user |  |

**seller** in detail

| key |	type | description |
| --- | --- | --- |
| id | string | |
| username | string |  |
| avatarPath | optional |  |

Sample response data:

```json
{
   "status": "available",
   "time": "2018-04-06T15:31:26.363Z",
   "_id": "5ac792ce4038d91b8c78c711",
   "itemName": "mobile",
   "description": "testDescription",
   "price": 0,
   "category": "devices",
   "imgPath": "testPath",
   "seller": {
     "_id": "5ac792cb4038d91b8c78c70e"
     "username": "test1"
   }
```

### <a name="put-items-id"></a> PUT /api/items/:id
Edit item based on id

Header payload:

| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Header payload:

| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Request body:

| key |	type | description |
| --- | --- | --- |
| itemName | string | optional |
| description | string | optional |
| price | int | optional |
| category | string | Valid values: **clothing**, **homewares**, **accessories**, **devices** and **others** - optional |
| imgPath | string | optional |
| lat | int | otional |
| lng | int | otional |

Response payload data

| key |	type | description |
| --- | --- | --- |
| status | string | **available** |
| time | time |  |
| id | string |  |
| itemName | string |  |
| description | string |  |
| price | int |  |
| category | string |  |
| imgPath | string |  |
| lat | int  |optional |
| lng | int | optional |
| seller | user |  |

**seller** in detail

| key |	type | description |
| --- | --- | --- |
| id | string | |
| username | string |  |
| avatarPath | optional |  |

Sample header:
```json
{
  "authorization":"HERE IS THE TOKEN"
}
```

Sample request:

```json
{
  "itemName": "laptop",
  "description": "nice",
  "price": 100,
  "category": "devices",
  "imgPath": "testPath",
  "lat": "60.192059",
  "lng": "24.945831",
}
```

Sample response data:

```json
{
   "status": "available",
   "time": "2018-04-06T15:31:26.363Z",
   "_id": "5ac792ce4038d91b8c78c711",
   "itemName": "mobile",
   "description": "testDescription",
   "price": 0,
   "category": "devices",
   "imgPath": "testPath",
   "seller": {
     "_id": "5ac792cb4038d91b8c78c70e"
     "username": "test1"
   }
```

### <a name="delete-items-id"></a> DELETE /api/items/:id
Delete item based on id

Header payload:

| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Response payload data

| key |	type | description |
| --- | --- | --- |
| status | string | **available** |
| time | time |  |
| id | string |  |
| itemName | string |  |
| description | string |  |
| price | int |  |
| category | string |  |
| imgPath | string |  |
| lat | int  |optional |
| lng | int | optional |
| seller | user |  |

**seller** in detail

| key |	type | description |
| --- | --- | --- |
| id | string | |
| username | string |  |
| avatarPath | optional |  |

Sample header:

```json
{
  "authorization":"HERE IS THE TOKEN"
}
```
Sample response data:

```json
{
   "status": "available",
   "time": "2018-04-06T15:31:26.363Z",
   "_id": "5ac792ce4038d91b8c78c711",
   "itemName": "mobile",
   "description": "testDescription",
   "price": 0,
   "category": "devices",
   "imgPath": "testPath",
   "seller": {
     "_id": "5ac792cb4038d91b8c78c70e"
     "username": "test1"
   }
```

## <a name="orders"></a> Orders
### <a name="post-orders"></a> Post /api/orders
Create an order to buy item

Header payload:

| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Request body:

| key |	type | description |
| --- | --- | --- |
| itemId | string | optional |

Response payload data:

| key |	type | description |
| --- | --- | --- |
| id | string |  |
| item | string | itemId |
| seller | string | sellerId |
| buyer | string | buyerId |
| time | time |  |

Sample header:

```json
{
  "authorization":"HERE IS THE TOKEN"
}
```

Sample request body:

```json
{
  "itemId":"5ac7bdc7f3085a41446ed2f0"
}
```

Sample response payload data:

```json
{
  "id": "5ac7be29f3085a41446ed2f1",
  "item": "5ac7bdc7f3085a41446ed2f0",
  "seller": "5ac7bdc4f3085a41446ed2ed",
  "buyer": "5ac7bdc4f3085a41446ed2eb",
  "time": "2018-04-06T18:36:25.101Z",
}
```

### <a name="get-orders-id"></a> Get /api/orders/:id

Response payload data:

| key |	type | description |
| --- | --- | --- |
| time | string |  |
| id | string | itemId |
| item | item |  |
| seller | user |  |
| buyer | user | |

**item** in detail

| key |	type | description |
| --- | --- | --- |
| id | string | |
| itemName | string |  |
| description | string |  |
| price | int |  |
| category | string |  |

**seller, buyer** in detail

| key |	type | description |
| --- | --- | --- |
| id | string | |
| username | string |  |
| avatarPath | optional |  |

Sample response payload data:

```json
{
  "time": "2018-04-06T18:45:40.908Z",
  "_id": "5ac7c0548ed2e90ac0030158",
  "item": {
      "_id": "5ac7c0338ed2e90ac0030156",
      "itemName": "laptop",
      "description": "testDescription",
      "price": 1,
      "category": "devices"
   },
   "seller": {
      "_id": "5ac7c0308ed2e90ac0030153",
      "username": "test2",
      "email": "test2@gmail.com",
      "phoneNumber": 121111111
   },
   "buyer": {
      "_id": "5ac7c61d055422106862b75c",
      "username": "test1",
      "email": "test1@gmail.com",
      "phoneNumber": 131111111
   }
}
```

### <a name="get-orders-me-buyer"></a> Get /api/orders/me/buyer
Get all items bought by me

Header payload:

| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Response payload data:

| key |	type | description |
| --- | --- | --- |
| time | string |  |
| id | string | itemId |
| item | item |  |
| seller | user |  |
| buyer | string | myId |

**item** in detail

| key |	type | description |
| --- | --- | --- |
| id | string | |
| itemName | string |  |
| description | string |  |
| price | int |  |
| category | string |  |

**seller** in detail

| key |	type | description |
| --- | --- | --- |
| id | string | |
| username | string |  |
| avatarPath | optional |  |

Sample header:
```json
{
  "authorization":"HERE IS THE TOKEN"
}
```

Sample response payload data:

```json
[
 {
   "time": "2018-04-06T18:45:40.908Z",
   "_id": "5ac7c0548ed2e90ac0030158",
   "item": {
       "_id": "5ac7c0338ed2e90ac0030156",
       "itemName": "laptop",
       "description": "testDescription",
       "price": 1,
       "category": "devices"
    },
    "seller": {
       "_id": "5ac7c0308ed2e90ac0030153",
       "username": "test2",
       "email": "test2@gmail.com",
       "phoneNumber": 121111111
    },
    "buyer": "5ac7c0308ed2e90ac0030152",
 }
]
```

### <a name="get-orders-me-seller"></a> GET /api/orders/me/seller
Get all items sold by me

Header payload:

| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Response payload data:

| key |	type | description |
| --- | --- | --- |
| time | string |  |
| id | string | itemId |
| item | item |  |
| seller | string | myId |
| buyer | user |  |

**item** in detail

| key |	type | description |
| --- | --- | --- |
| id | string | |
| itemName | string |  |
| description | string |  |
| price | int |  |
| category | string |  |

**buyer** in detail

| key |	type | description |
| --- | --- | --- |
| id | string | |
| username | string |  |
| avatarPath | optional |  |

Sample header:
```json
{
  "authorization":"HERE IS THE TOKEN"
}
```

Sample response payload data:

```json
[
 {
   "time": "2018-04-06T18:45:40.908Z",
   "_id": "5ac7c0548ed2e90ac0030158",
   "item": {
       "_id": "5ac7c0338ed2e90ac0030156",
       "itemName": "laptop",
       "description": "testDescription",
       "price": 1,
       "category": "devices"
    },
    "buyer": {
       "_id": "5ac7c0308ed2e90ac0030153",
       "username": "test2",
       "email": "test2@gmail.com",
       "phoneNumber": 121111111
    },
    "seller": "5ac7c0308ed2e90ac0030152"
 }
]
```

## <a name="photos"></a> Photos
### <a name="post-photos"></a> POST /api/photos
Post a photo to server

Header payload:

| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Request body:

| key |	type | description |
| --- | --- | --- |
| photo | file | jpeg, jpg, png |

Response payload data:

| key |	type | description |
| --- | --- | --- |
| filename | string | |

Sample header:
```json
{
  "authorization":"HERE IS THE TOKEN"
}
```

Sample response payload data:
```json
{
  "filename": "1523041333190-photo.PNG"
}
```
**Note:** photoPath: {endpoint}/photos/{filename}

