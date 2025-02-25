CREATE TABLE IF NOT EXISTS accounts (
    account_id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    account_type TEXT NOT NULL CHECK (
        account_type in (
            'corporate',
            'independent accountant',
            'accounting study',
            'end user'
        )
    ),
    country TEXT,
    industry TEXT,
    created_at TEXT DEFAULT (datetime ('now', 'localtime'))
);

CREATE TABLE IF NOT EXISTS taxes (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    division TEXT UNIQUE,
    jurisdiction TEXT NOT NULL,
    billing_freq TEXT NOT NULL,
    associated_document TEXT NOT NULL,
    tax_rate REAL NOT NULL,
    credit_balance REAL DEFAULT 0.0,
    debit_balance REAL DEFAULT 0.0,
    total_balance REAL
);

CREATE TABLE IF NOT EXISTS tax_categories (
    name TEXT UNIQUE PRIMARY KEY,
    division TEXT UNIQUE,
    description TEXT NOT NULL,
    agency TEXT
);

-- INSERT INTO
--     tax_categories (name, division, description, agency)
-- VALUES
--     (
--         'monotributo',
--         'A',
--         'regimen simplificado para pequeñas y medianas empresas',
--         'AFIP'
--     );
CREATE TABLE IF NOT EXISTS entities (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    email TEXT,
    commercial_addr TEXT,
    legal_addr TEXT,
    tax_category TEXT NOT NULL,
    associated_account TEXT NOT NULL,
    taxes TEXT DEFAULT 'VAT',
    created_at TEXT DEFAULT (datetime ('now', 'localtime')),
    FOREIGN KEY (tax_category) REFERENCES tax_categories (name),
    FOREIGN KEY (associated_account) REFERENCES accounts (name)
);

CREATE TABLE IF NOT EXISTS products (
    code TEXT NOT NULL PRIMARY KEY,
    name TEXT,
    description TEXT,
    amount INTEGER DEFAULT 0.00,
    measure_unit TEXT,
    price REAL,
    currency TEXT NOT NULL DEFAULT 'USD',
    storage_unit TEXT,
    entity_name TEXT NOT NULL,
    FOREIGN KEY (entity_name) REFERENCES entities (name) ON DELETE CASCADE ON UPDATE CASCADE
);

-- insert into
--     accounts (
--         account_id,
--         name,
--         email,
--         account_type,
--         country,
--         industry
--     )
-- values
--     (
--         'f1cab4d3-8829-4cfd-b1b5-ffdddf034477',
--         'Tomás',
--         'tomasben@mail.com',
--         'independent accountant',
--         'Uruguay',
--         'finnances and bookeeping'
--     );
CREATE VIEW IF NOT EXISTS accountantSession AS
SELECT
    entities.id,
    entities.name,
    accounts.name as accountant_name,
    accounts.email,
    accounts.account_type
FROM
    accounts
    LEFT JOIN entities ON entities.associated_account = accounts.name;

/*CREATE TABLE IF NOT EXISTS
clients (
id INTEGER PRIMARY KEY,
name TEXT NOT NULL,
email TEXT,
address TEXT,
tax_category TEXT,
associated_entity TEXT NOT NULL,
created_at TEXT DEFAULT (datetime('now', 'localtime')),
FOREIGN KEY (tax_category) REFERENCES tax_categories (name),
FOREIGN KEY (associated_entity) REFERENCES entities (name) ON DELETE CASCADE
); */
