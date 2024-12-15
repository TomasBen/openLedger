CREATE TABLE accounts (
	account_id TEXT PRIMARY KEY,
	name TEXT UNIQUE NOT NULL,
	email TEXT NOT NULL,
	account_type TEXT NOT NULL CHECK (account_type in ('corporate', 'independent accountant', 'accounting study', 'end user')),
	country TEXT,
	industry TEXT,
	created_at TEXT DEFAULT (datetime('now', 'localtime'))
);

CREATE TRIGGER generate_accountId
	AFTER INSERT
	on accounts
	FOR EACH ROW
BEGIN
	UPDATE accounts
	SET account_id = CAST(STRFTIME('%s', 'now') as INTEGER) * 1000 || NEW.rowid
	WHERE rowid = NEW.rowid;
END;

CREATE TABLE addresses (
    id INTEGER PRIMARY KEY,
    entity_name TEXT NOT NULL,
    city TEXT NOT NULL,
    street TEXT NOT NULL,
    state TEXT,
    country TEXT,
    FOREIGN KEY (entity_name) REFERENCES entities (name) ON DELETE CASCADE
);

DROP TABLE addresses;

CREATE TABLE taxes (
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

CREATE TRIGGER calculate_tax_balance
	AFTER UPDATE
	ON taxes
	FOR EACH ROW
BEGIN
	UPDATE taxes
	SET total_balance = NEW.credit_balance - NEW.debit_balance
	WHERE id = NEW.id;
END;

CREATE TABLE tax_categories (
	name TEXT UNIQUE PRIMARY KEY,
	description TEXT NOT NULL
);

INSERT INTO tax_categories (name, description) VALUES ('monotributo', 'regimen simplificado de la AFIP');

CREATE TABLE entities (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    email TEXT,
    commercial_address TEXT,
    legal_address TEXT,
    tax_category TEXT NOT NULL,
    associated_account TEXT NOT NULL,
    taxes TEXT DEFAULT 'VAT',
    created_at TEXT DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (tax_category) REFERENCES tax_categories (name),
    FOREIGN KEY (associated_account) REFERENCES accounts (name)
  );
