# HomerUI


## Version: 1.0.0

### /auth/login

#### POST
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Login successful |
| 400 | Bad request |
| 401 | Username or password is incorrect |
| 500 | Internal server error |

### /auth/logout

#### GET
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /service

#### GET
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | List of services |
| 400 | Bad request |
| 401 | Unauthorized |
| 500 | Internal server error |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

#### POST
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Service created |
| 400 | Bad request |
| 401 | Unauthorized |
| 500 | Internal server error |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /service/{id}

#### GET
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Service |
| 400 | Bad request |
| 401 | Unauthorized |
| 404 | Service not found |
| 500 | Internal server error |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

#### PUT
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Service updated |
| 400 | Bad request |
| 401 | Unauthorized |
| 404 | Service not found |
| 500 | Internal server error |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

#### DELETE
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Service deleted |
| 400 | Bad request |
| 401 | Unauthorized |
| 404 | Service not found |
| 500 | Internal server error |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /group

#### GET
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | List of groups |
| 400 | Bad request |
| 401 | Unauthorized |
| 500 | Internal server error |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

#### POST
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Group created |
| 400 | Bad request |
| 401 | Unauthorized |
| 500 | Internal server error |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /group/{id}

#### GET
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Group |
| 400 | Bad request |
| 401 | Unauthorized |
| 404 | Group not found |
| 500 | Internal server error |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

#### PUT
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Group updated |
| 400 | Bad request |
| 401 | Unauthorized |
| 404 | Group not found |
| 500 | Internal server error |

#### DELETE
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Group deleted |
| 400 | Bad request |
| 401 | Unauthorized |
| 404 | Group not found |
| 500 | Internal server error |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /login

#### POST
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |

### /users

#### GET
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |

### /autologin

#### GET
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |

### /settings

#### GET
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 500 | Internal Server Error |

#### POST
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 500 | Internal Server Error |

### /settings/{id}

#### GET
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 500 | Internal Server Error |

#### POST
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 500 | Internal Server Error |

### /addlink

#### POST
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Bad Request |
| 500 | Internal Server Error |

### /deletelink

#### POST
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 500 | Internal Server Error |

### /services

#### GET
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 500 | Internal Server Error |

### /groups

#### GET
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 500 | Internal Server Error |

### /supportedapps

#### GET
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### /supportedapps/config/{appname}

#### GET
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| appname | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 404 | Not Found |
