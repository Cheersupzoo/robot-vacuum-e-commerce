# Robot Vacuum E-Commerce

## 1. Authentication API

### 1.1 Login

#### URL
`localhost:8081/login`

#### Header
```
POST /v1/tokens HTTP/1.1
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
POST /v1/tokens HTTP/1.1
Content-Type: application/json
```

#### Body Parameter
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
| `status`        | string   | User creation successfulness. |


#### Response Example
```
{
    "status": "User created successful!"
}
```