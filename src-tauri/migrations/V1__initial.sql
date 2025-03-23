CREATE TABLE IF NOT EXISTS accounts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    -- corporate, small business, unipersonal --
    category TEXT NOT NULL,
    country TEXT,
    industry TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime ('now', 'localtime'))
);

CREATE TABLE IF NOT EXISTS taxes (
    id INTEGER PRIMARY KEY UNIQUE NOT NULL,
    name TEXT UNIQUE NOT NULL,
    division TEXT UNIQUE,
    jurisdiction TEXT NOT NULL,
    billing_freq TEXT NOT NULL,
    tax_rate REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS tax_categories (
    name TEXT PRIMARY KEY UNIQUE NOT NULL,
    division TEXT UNIQUE,
    description TEXT NOT NULL,
    agency TEXT
);

CREATE TABLE IF NOT EXISTS entities (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT UNIQUE NOT NULL,
    email TEXT,
    preferred_currency TEXT,
    commercial_addr TEXT,
    legal_addr TEXT,
    -- category still not implemented, it is only a hardcoded string for now --
    tax_category TEXT NOT NULL,
    represented_by TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime ('now', 'localtime')),
    FOREIGN KEY (tax_category) REFERENCES tax_categories (name),
    FOREIGN KEY (represented_by) REFERENCES accounts (name)
);

CREATE TABLE IF NOT EXISTS products (
    code TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT,
    description TEXT,
    amount INTEGER,
    measure_unit TEXT,
    price INTEGER,
    currency TEXT,
    storage_unit TEXT,
    entity TEXT NOT NULL,
    FOREIGN KEY (entity) REFERENCES entities (name) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE VIEW IF NOT EXISTS accountantSession AS
SELECT
    entities.id,
    entities.name,
    entities.email,
    entities.preferred_currency,
    entities.tax_categories,
    accounts.name as accountant_name,
    accounts.email,
    accounts.category
FROM
    accounts
    LEFT JOIN entities ON entities.represented_by = accounts.name;

CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    phone INTEGER,
    address TEXT,
    industry TEXT,
    category TEXT NOT NULL,
    condition TEXT,
    entity TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime ('now', 'localtime')),
    FOREIGN KEY (entity) REFERENCES entities (name) ON DELETE CASCADE
);
