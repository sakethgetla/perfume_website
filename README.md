scent searcher


# BACKEND

## Install
`$ npm i`

## Run front-end
`$ npm run client`

## Run backend
`$ npm run server`

## Run backend and frontend at the same time
`$ npm run dev`

### TODO
- [x] add rating field in comments.
- [x] add msg rooms.
- [x] add msg room messages.
- [x] add msg room members.
- [x] remake / refactor backend
- [x] add routes for likes.
- [ ] add routes for rooms.
- [x] add update & delete routes for user.
- [ ] add perfume info table?

## Implemented requests
``` http
### GET POST PUT DELETE
http://localhost:8000/perfume

### GET POST PUT DELETE
http://localhost:8000/user

### GET POST DELETE
http://localhost:8000/user/admin

### GET POST DELETE
http://localhost:8000/user/setting/bookmark

### GET POST DELETE
http://localhost:8000/user/setting/like

### GET POST DELETE
http://localhost:8000/user/setting/dislike

### GET POST PUT DELETE
http://localhost:8000/perfume/comment

### GET 
http://localhost:8000/perfume/search

```


## Examples

#### GET

http://localhost:8000/perfume?brand=Blackbird

http://localhost:8000/perfume?brand=Ajmal

http://localhost:8000/user?first_name=John

http://localhost:8000/user?last_name=Doe

http://localhost:8000/perfume/search?search=indian paco

http://localhost:8000/perfume/comment




#### DELETE
```
http://localhost:8000/user

body
{
    "user_id": 1
}

```


#### PUT
```
http://localhost:8000/user

body
{
    "user_id": 1,
    "last_name": "few"
}

```


#### POST


```

http://localhost:8000/user/settings/bookmark
body
{
    "user_id": 1
    "perfume_id": 1
}

http://localhost:8000/user/settings/like
body
{
    "user_id": 1
    "perfume_id": 1
}

http://localhost:8000/user/admin
body
{
    "user_id": 1
}


http://localhost:8000/user

body
{
    "email": "joedoe@gmail.com",
    "first_name": "Joe",
    "last_name": "Doe",
    "password": "p"
}
```
```
http://localhost:8000/perfume/comment

body
{
    "comment": "FIEST",
    "user_id": 1,
    "perfume_id": 1,
    "sent_time": 1,
    "rating": 3
}
```
```
http://localhost:8000/user/message

body
{
    "message": "first",
    "sender_user_id": 1,
    "recipient_user_id": 2
}
```

### perfumes fields

| column                 | type    | Info                                                                                                                |
|---|---|---|
| **brand**              | object  | Indicates to the perfume's boutique of each perfume                                                                   |
| **name**               | object  | Indicates to the name of each perfume                                                                                 |
| **department**         | object  | represent the gender for each perfume, feminine perfume for women, the masculine perfume for men, unisex and for kids |
| **old_price**          | float64 | Indicates to the price of each perfume before sale                                                                    |
| **new_price**          | float64 | Indicates to the price of each perfume after sale                                                                     |
| **ml**                 | int64   | Indicates to the capacity of a perfume bottle                                                                         |
| **concentration**      | object  | Indicates to the Fragrancef concentrations or strengths                                                               |
| **scents**             | object  | Indicates to the represents the general scents for each perfume                                                       |
| **base_note**          | object  | Indicates to the base notes that bring depth and solidity to a perfume.                                               |
| **middle_note**        | object  | Indicates to the  the main theme of a perfume.                                                                        |
| **item_rating**        | float64 | Indicates to all the vote  of each certain perfume.                                                                   |
| **seller**             | object  | Indicates to the seller  of each certain perfume.                                                                     |
| **seller_rating**      | float64 | Indicates to all the vote  of each certain seller.                                                                    |
| **num_seller_ratings** | object  | Indicates the number of people they voted for each certain seller, k means thousand                                   |

## Schema
### users
#### can be chaged easily
``` sql


CREATE TABLE users (
    user_id INTEGER PRIMARY KEY, 
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE counters (
    counterName TEXT NOT NULL,
    counter INTEGER NOT NULL
);

CREATE TABLE admins (
    user_id INTEGER UNIQUE,
    FOREIGN KEY(user_id) REFERENCES users
);

CREATE TABLE organisations (
    org_id INTEGER PRIMARY KEY, 
    name TEXT NOT NULL
);

CREATE TABLE org_users (
    user_id INTEGER NOT NULL,
    org_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users,
    FOREIGN KEY(org_id) REFERENCES organisations,
    UNIQUE(user_id, org_id)
);

    
CREATE TABLE ratings (
    user_id INTEGER NOT NULL,
    perfume_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users,
    FOREIGN KEY(perfume_id) REFERENCES perfumes,
    UNIQUE(user_id, perfume_id)
);

CREATE TABLE likes (
    user_id INTEGER NOT NULL,
    perfume_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users,
    FOREIGN KEY(perfume_id) REFERENCES perfumes,
    UNIQUE(user_id, perfume_id)
);

CREATE TABLE dislikes (
    user_id INTEGER NOT NULL,
    perfume_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users,
    FOREIGN KEY(perfume_id) REFERENCES perfumes,
    UNIQUE(user_id, perfume_id)
);

CREATE TABLE bookmarks (
    user_id INTEGER NOT NULL,
    perfume_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users,
    FOREIGN KEY(perfume_id) REFERENCES perfumes,
    UNIQUE(user_id, perfume_id)
);

CREATE TABLE comments (
    comment_id INTEGER PRIMARY KEY,
    comment TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    perfume_id INTEGER NOT NULL,
    sent_time INTEGER NOT NULL,
    rating INTEGER NOT NULL,
    CHECK (rating >= 0 AND rating <= 5),
    FOREIGN KEY(user_id) REFERENCES users,
    FOREIGN KEY(perfume_id) REFERENCES perfumes
);

CREATE TABLE messages (
    message_id INTEGER PRIMARY KEY,
    message TEXT NOT NULL,
    sender_user_id INTEGER,
    recipient_user_id INTEGER,
    sent_time INTEGER NOT NULL,
    FOREIGN KEY(sender_user_id) REFERENCES users (user_id),
    FOREIGN KEY(recipient_user_id) REFERENCES users
);



CREATE TABLE perfumes (
    perfume_id INTEGER PRIMARY KEY,
    brand TEXT NOT NULL,
    name TEXT NOT NULL,
    old_price REAL,
    new_price REAL,
    ml INTEGER,
    concentration TEXT,
    department TEXT,
    scents TEXT,
    base_note TEXT,
    middle_note TEXT,
    item_rating REAL,
    seller TEXT,
    seller_rating REAL,
    num_seller_ratings TEXT
);

```

