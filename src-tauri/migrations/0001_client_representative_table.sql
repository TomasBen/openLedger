CREATE TABLE IF NOT EXISTS representative (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT
);

CREATE TABLE IF NOT EXISTS client (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    web_url TEXT,
    associated_rep TEXT,
    FOREIGN KEY (associated_rep) REFERENCES representative (name) ON UPDATE SET NULL ON DELETE SET NULL
);
