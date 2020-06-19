# Robot Vacuum E-Commerce

An e-commerce services example using microservice design. There are totally 4 services: Authentication service, User manager service, Product service, Order Management services.

### Install

#### Clone this repo

```
git clone https://github.com/Cheersupzoo/robot-vacuum-e-commerce.git
```

#### Install dependencies

```
cd .\robot-vacuum-e-commerce\
npm install
```

### Usage

#### Run the all the service

```
npm start
```

## todo
- salt password
- Add user created date field
- Add Ordered date field
- Add services discovery service
- Check validity of request
- Better naming of API endpoint
- Add Automate Testing

# Robot Vacuum E-Commerce API

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

### 2.3 Get User Purchase History
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

### 2.4 Add User profile
#### URL
`localhost:8082/adduser`

#### Header
```
POST
Content-Type: application/json
```

#### Body Parameter
| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `uuid`      | string   | required   | User's unique id. |
| `name`      | string   | required   | User's name. |

#### Body Example
```
{
	"uuid": "2d180ae0-ff11-4ea8-803c-94cb3da4d5b1",
	"name": "Hugo Weavings"
}
```

#### Response Parameter

| Parameter       | Type     | Description                                     |
| -------------   |----------|-------------------------------------------------|
| `status`        | string   | User creation successfulness. |

#### Response Example
```
{
    "status": "successful"
}
```

## 3. Product API

### 3.1 List All Products

#### URL
`localhost:8083/product`

#### Header
```
GET
Content-Type: application/json
```

#### Response Parameter

| Parameter       | Type     | Description                                     |
| -------------   |----------|-------------------------------------------------|
| `status`        | string   | Request's status |
| `product_list`   | string   | List of all products. |


#### Response Example
```
{
    "status": "successful",
    "product_list": [
        {
            "product_id": 1,
            "name": "Xiaomi Mijia"
        },
        {
            "product_id": 2,
            "name": "AUTOBOT ROBOT VACUUM CLEANER MINI WHITE"
        },
        {
            "product_id": 3,
            "name": "Xiaomi Robot 1C Vacuum Mop"
        }
    ]
}
```

### 3.2 Get Product Detail

#### URL
`localhost:8083/product/{{product_id}}`

#### Header
```
GET
Content-Type: application/json
```

#### Response Parameter

| Parameter       | Type     | Description                                     |
| -------------   |----------|-------------------------------------------------|
| `product_id`        | string   | Product ID |

#### Request Example
 `localhost:8083/product/3`



#### Response Example
```
{
    "product_id": 3,
    "name": "Xiaomi Robot 1C Vacuum Mop",
    "image_url": "http://localhost:8083/img/5dba546aNaa3b4992.jpg!q70.jpg",
    "price": 5528,
    "smartness": "Medium"
}
```

## 4. OrderManagement API

### 4.1 Get User's Current Order List

#### URL
`localhost:8084/order`

#### Header
```
GET
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
| `status`        | string   | Request's status |
| `items`   | string   | List of item in current order. |


#### Response Example
```
{
    "status": "successful",
    "items": [
        {
            "product_id": 1,
            "amount": 1
        }
    ]
}
```

### 4.2 Add Product to Order
#### URL
`localhost:8084/order/add`

#### Header
```
POST
Content-Type: application/json
```

#### Body Parameter
| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `uuid`      | string   | required   | User's unique ID. |
| `product_id`      | int   | required   | Product unique ID. |
| `amount`      | int   | required   | Amount of product to want to purchase. |

#### Body Example
```
{
	"uuid": "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
	"product_id": 2, 
	"amount": 2
}
```

#### Response Parameter

| Parameter       | Type     | Description                                     |
| -------------   |----------|-------------------------------------------------|
| `status`        | string   | User creation successfulness. |
| `items`        | array   | List of item order. |

#### Response Example
```
{
    "status": "Add item successful",
    "items": [
        {
            "product_id": 2,
            "amount": 10
        }
    ]
}
```

### 4.3 Add New User
#### URL
`localhost:8084/adduser`

#### Header
```
POST
Content-Type: application/json
```

#### Body Parameter
| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `uuid`      | string   | required   | User's unique id. |

#### Body Example
```
{
	"uuid": "2d180ae0-ff11-4ea8-803c-94cb3da4d5b1"
}
```

#### Response Parameter

| Parameter       | Type     | Description                                     |
| -------------   |----------|-------------------------------------------------|
| `status`        | string   | User creation successfulness. |

#### Response Example
```
{
    "status": "successful"
}
```

### 4.4 Place User Order
#### URL
`localhost:8084/order/placeorder`

#### Header
```
POST
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

#### Response Example
```
{
    "status": "Place order successful"
}
```