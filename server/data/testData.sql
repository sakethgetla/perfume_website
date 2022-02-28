
-- test unique members

-- test comments rating in range
INSERT INTO comments (comment_id, comment, user_id, perfume_id, sent_time, rating)
VALUES (1, "FIEST", 1, 8, 1, 3);

INSERT INTO comments (comment_id, comment, user_id, perfume_id, sent_time, rating)
VALUES (1, "FIEST", 1, 1, 1, 9);

INSERT INTO comments (comment_id, comment, user_id, perfume_id, sent_time, rating)
VALUES (1, "FIEST", 1, 1, 1, -1);

INSERT INTO admins (user_id)
VALUES(5);

-- rest update
UPDATE users SET password = 'update p' WHERE user_id = 3;
