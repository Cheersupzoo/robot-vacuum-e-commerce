# Robot Vacuum E-Commerce

## 1. Authentication API

### 1.1 Login

#### URL
`localhost:8081/login`

#### Header
```
POST
Content-Type: application/json
```

#### Body
| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `username`      | string   | required   | User's username. |
| `password`      | string   | required   | User's password. |

#### Body Example
```
{
	"username" : "dev",
	"password" : "1234"
}
```

#### Response Parameter

| Parameter       | Type     | Description                                     |
| -------------   |----------|-------------------------------------------------|
| `uuid`        | string   | User's unique id. (TODO: need to response JWT instead.) |

#### Response Example
```
1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
```

### 1.2 Registration
#### URL
`localhost:8081/registration`

#### Header
```
POST
Content-Type: application/json
```

#### Body Parameter
| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `username`      | string   | required   | User's username. |
| `password`      | string   | required   | User's password. |
| `name`          | string   | required   | User's name and surname. |

#### Body Example
```
{
	"username" : "dev",
	"password" : "1234",
    "name": "Keeva Christian"
}
```

#### Response Parameter

| Parameter       | Type     | Description                                     |
| -------------   |----------|-------------------------------------------------|
| `status`        | string   | User creation successfulness. |


#### Response Example
```
{
    "status": "User created successful!"
}
```


## 2. User Manager API

### 2.1 Get User Profile

#### URL
`localhost:8082/profile`

#### Header
```
GET
Content-Type: application/json
```

#### Body
| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `uuid`      | string   | required   | User's unique id. |


#### Body Example
```
{
	"uuid": "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"
}
```

#### Response Parameter

| Parameter       | Type     | Description                                     |
| -------------   |----------|-------------------------------------------------|
| `status`        | string   | Request status |
| `name`        | string   | User's name |
| `address`        | string   | User's address |
| `payment_method`        | string   | User's payment method |

#### Response Example
```
{
    "status": "successful",
    "name": "Keanu Reeves",
    "address": "9799 S. Beechwood Lane Manchester Township, NJ 08759",
    "payment_method": "credit-card"
}
```

### 2.2 Update User Profile
#### URL
`localhost:8082/profile`

#### Header
```
POST
Content-Type: application/json
```

#### Body Parameter
| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `uuid`      | string   | required   | User's unique id. |
| `name`      | string   | optional   | User's name. |
| `address`          | string   | required   | User's address. |
| `payment_method`          | string   | required   | Payment method: 1. Credit-Card 2. Paypal. |

#### Body Example
```
{
	"uuid": "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
	"name": "Hugo Weaving"
}
```

#### Response Parameter

| Parameter       | Type     | Description                                     |
| -------------   |----------|-------------------------------------------------|
| `status`        | string   | User creation successfulness. |


#### Response Example
```
{
    "status": "update successful",
    "name": "Hugo Weaving",
    "address": "9799 S. Beechwood Lane Manchester Township, NJ 08759",
    "payment_method": "credit-card"
}
```

### 2.2 Get User Purchase History
#### URL
`localhost:8082/history`

#### Header
```
Get
Content-Type: application/json
```

#### Body Parameter
| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `uuid`      | string   | required   | User's unique id. |

#### Body Example
```
{
	"uuid": "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"
}
```

#### Response Parameter

| Parameter       | Type     | Description                                     |
| -------------   |----------|-------------------------------------------------|
| `status`        | string   | User creation successfulness. |
| `history`        | string   | Lists of history purchases. |


#### Response Example
```
{
    "status": "successful",
    "history": [
        {
            "uuid": "15a6ge2d-asfd-56dw-8b6d-ab8dfbbd4net",
            "items": [
                {
                    "product_id": 1,
                    "amount": 2
                }
            ]
        },
        {
            "uuid": "asdfgh2d-asfd-56dw-8b6d-ab8dfb2346as",
            "items": [
                {
                    "product_id": 2,
                    "amount": 1
                },
                {
                    "product_id": 3,
                    "amount": 1
                }
            ]
        }
    ]
}
```