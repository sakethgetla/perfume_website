--PRAGMA foreign_keys = ON;

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

--CREATE TABLE rooms(
--    room_id INTEGER PRIMARY KEY,
--    room_name TEXT NOT NULL,
--    room_info TEXT NOT NULL,
--    creator_user_id INTEGER,
--    created_time INTEGER NOT NULL,
--    FOREIGN KEY(creator_user_id) REFERENCES users
--);
--
--CREATE TABLE room_messages (
--    room_message_id INTEGER PRIMARY KEY,
--    room_message TEXT NOT NULL,
--    sender_user_id INTEGER,
--    room_id INTEGER,
--    sent_time INTEGER NOT NULL,
--    FOREIGN KEY(sender_user_id) REFERENCES users,
--    FOREIGN KEY(room_id) REFERENCES rooms
--);
--
--CREATE TABLE room_members (
--    user_id INTEGER NOT NULL,
--    room_id INTEGER NOT NULL,
--    FOREIGN KEY(user_id) REFERENCES users,
--    FOREIGN KEY(room_id) REFERENCES rooms,
--    UNIQUE(user_id, room_id)
--);

