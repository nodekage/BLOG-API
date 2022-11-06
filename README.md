# BLOG-API

##### A blogging-API built in the fulfilment of the Altschool of Engineering focused in Backend Engineering (NodeJS) Second Semester Requirement

## Backend NodeJS Second Semester Examination Project

<!-- AltSchool Requirements -->

## Requirements

<details>

<summary> <strong>Requirements for the examination project</strong> </summary>

- [x] Users should have a first_name, last_name, email, password,

- [x] A user should be able to sign up and sign in into the blog app

- [x] Use JWT as authentication strategy and expire the token after 1 hour

- [x] A blog can be in two states; draft and published

- [x] Logged in and not logged in users should be able to get a list of published blogs created

- [x] Logged in and not logged in users should be able to to get a published blog

- [x] Logged in users should be able to create a blog.

- [x] When a blog is created, it is in draft state

- [x] The owner of the blog should be able to update the state of the blog to published

- [x] The owner of a blog should be able to edit the blog in draft or published state

- [x] The owner of the blog should be able to delete the blog in draft or published state

- [x] The owner of the blog should be able to get a list of their blogs.

- [x] The endpoint should be paginated

- [x] It should be filterable by state

- [x] Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.

- [x] The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated:

- [x] default it to 20 blogs per page.

- [x] It should also be searchable by author, title and tags.

- [x] It should also be orderable by read_count, reading_time and timestamp

- [x] When a single blog is requested, the api should return the user information (the author) with the blog. The read_count of the blog too should be updated by 1

- [x] Come up with any algorithm for calculating the reading_time of the blog.

- [x] Write tests for all endpoints


---


**Helpful links**
 ---
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)


### BLOG-API IMPLEMENTATION/USAGE

---
#### Tools/Language
- Nodejs
- Express
- Passport-JWT
- SuperTest
- Jest
- mongoDB
- mongoose

## Setup
- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm run start:dev`

---
---

## Setup
- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm run start`


---

</details>

<br>

## Development

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/docs/manual/installation/)

#### Install project dependencies

```sh
npm install
```

### Models

#### User

| field     | data_type     | constraints      |
| --------- | ------------- | ---------------- |
| username  | string        | required, unique |
| firstName | string        | required         |
| lastName  | string        | required         |
| email     | string        | required, unique |
| password  | string        | required         |
| articles  | ref - Article |                  |

#### Article

| field        | data_type  | constraints                                              |
| ------------ | ---------- | -------------------------------------------------------- |
| title        | string     | required, unique                                         |
| description  | string     | optional                                                 |
| author       | ref - User |                                                          |
| owner        | string     |                                                          |
| state        | string     | required, default: 'draft', enum: ['draft', 'published'] |
| read_count   | Number     | default: 0                                               |
| reading_time | Number     |                                                          |
| tags         | array      | optional                                                 |
| body         | string     | required                                                 |


---

## Usage

### Creating a user

- Route: /api/signup
- Method: POST

:point_down: Body

```json
{
  "firstname": "john",
  "lastname": "doe",
  "username": "johndoe",
  "email": "johndoe@gmail.com",
  "password": "Password0!"
}
```

:point_down: Response

```json
{
  "status": "success",
  "data": {
    "firstname": "john",
    "lastname": "doe",
    "username": "johndoe",
    "email": "johndoe@gmail.com",
    "blog": [],
    "_id": "6367c296ba7522bd8561e4f6"
  }
}
```


---

### Logging in

- Route: /auth/login
- Method: POST

:point_down: Body

```json
{
  "email": "johndoe@gmail.com",
  "password": "Password0!"
}
```

:point_down: Response

```json
{
  "token": { token },
  "username": "johndoe",
  "name": "john"
}
```


---

### Create a Blog

- Route: /posts/create
- Method: POST
- Header
  - Authorization: Bearer {token}

:point_down: Body

```json
{
  "title": "The Adventures of John",
  "tags": ["memoirs", "expose", "fun"],
  "description": "Fun times as Johnny",
  "body": "A very fun article that is long enough to be fun, and short enough to be ..fun!"
}
```

:point_down: Response

```json
{
  "status": "success",
  "data": {
    "title": "The Adventures of John",
    "description": "Fun times as Johnny",
    "author": "6367c296ba7522bd8561e4f6",
    "state": "draft",
    "read_count": 0,
    "tags": ["memoirs", "expose", "fun"],
    "body": "A very fun article that is long enough to be fun, and short enough to be ..fun!",
    "_id": "6367cc2271c384885108032f",
    "createdAt": "2022-11-06T15:00:50.202Z",
    "updatedAt": "2022-11-06T15:00:50.202Z",
    "reading_time": 1
  }
}
```


---

### Update the state of a Blog

- Route: /posts/:articleId
- Method: PATCH
- Header
  - Authorization: Bearer {token}

:point_down: Body

```json
{
  "state": "published"
}
```

:point_down: Response

```json
{
  "status": "success",
  "data": {
    "_id": "6367cc2271c384885108032f",
    "title": "The Adventures of John",
    "description": "Fun times as Johnny",
    "author": "6367c296ba7522bd8561e4f6",
    "state": "published",
    "read_count": 0,
    "tags": ["memoirs", "expose", "fun"],
    "body": "A very fun article that is long enough to be fun, and short enough to be ..fun!",
    "createdAt": "2022-11-06T15:00:50.202Z",
    "updatedAt": "2022-11-06T16:17:45.137Z",
    "reading_time": 1
  }
}
```



---

### Update the contents of a Blog

- Route: /posts/update/:blogId
- Method: PUT
- Header
  - Authorization: Bearer {token}

:point_down: Body

```json
{
  "tags": ["memoirs", "expose"],
  "body": "A very fun article that is long enough to be fun, and short enough to be ..fun! A sailor went to sea to see what he could see but all that he could see was the bottom of the deep blue sea."
}
```

:point_down: Response

```json
{
  "status": "success",
  "data": {
    "_id": "6367cc2271c384885108032f",
    "title": "The Adventures of John",
    "description": "Fun times as Johnny",
    "author": "6367c296ba7522bd8561e4f6",
    "state": "published",
    "read_count": 0,
    "tags": ["memoirs", "expose"],
    "body": "A very fun article that is long enough to be fun, and short enough to be ..fun! A sailor went to sea to see what he could see but all that he could see was the bottom of the deep blue sea.",
    "createdAt": "2022-11-06T15:00:50.202Z",
    "updatedAt": "2022-11-06T16:22:29.326Z",
    "reading_time": 1
  }
}
```


---

## Learning Outcome

While building this project, I learned about:

- Test Driven Development
- Testing the backend
- Database Modelling
- Database Management
- Debugging
- User Authentication
- User Authorization
- Documentation



## PROJECT OWNER
- NAME: Anthony Uzoho 
- ALTSCHOOL EMAIL: anthonycuzoho@gmail.com
- TRACK: Backend Engineering (NodeJS)
---
