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


