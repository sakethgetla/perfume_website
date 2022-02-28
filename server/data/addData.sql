
INSERT INTO users (user_id, email, first_name, last_name, password)
VALUES(2, 'johndoe@gmail.com', 'John', 'Doe', 'p');
INSERT INTO users (user_id, email, first_name, last_name, password)
VALUES(1, 'samdoe@gmail.com', 'sam', 'Doe', 'p');
INSERT INTO users (user_id, email, first_name, last_name, password)
VALUES(3, 'baydoe@gmail.com', 'sam', 'Doe', 'p');

INSERT INTO admins (user_id)
VALUES(1);

INSERT INTO admins (user_id)
VALUES(2);

INSERT INTO counters (counterName, counter)
VALUES('users', 4);
INSERT INTO counters (counterName, counter)
VALUES('messages', 4);
INSERT INTO counters (counterName, counter)
VALUES('comments', 4);
INSERT INTO counters (counterName, counter)
VALUES('orgs', 4);
INSERT INTO counters (counterName, counter)
VALUES('perfumes', 4000);
INSERT INTO counters (counterName, counter)
VALUES('rooms', 4);

--INSERT INTO admins (user_id)
--VALUES(3);




