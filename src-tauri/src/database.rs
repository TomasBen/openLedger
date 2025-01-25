use once_cell::sync::Lazy;
use rusqlite::{params, Connection, Result};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;

mod embedded {
    use refinery::embed_migrations;
    embed_migrations!(
        "/var/home/tomas/Documents/Github/openLedger/src-tauri/migrations/0001_initial_tables.sql"
    );
}

#[derive(Serialize, Deserialize)]
pub struct Account {
    account_id: String,
    name: String,
    email: String,
    account_type: String,
    country: Option<String>,
    industry: Option<String>,
}

#[derive(Serialize, Deserialize)]
pub struct AccountQuery {
    account_id: String,
    name: String,
    email: String,
    account_type: String,
    country: Option<String>,
    industry: Option<String>,
    created_at: String,
}

#[derive(Serialize, Deserialize)]
pub struct AccountantSession {
    id: String,
    name: String,
    accountant_name: String,
    email: String,
    account_type: String,
}

#[derive(Serialize, Deserialize)]
pub struct Product {
    code: String,
    name: Option<String>,
    description: Option<String>,
    price: Option<f32>,
    currency: String,
    entity_assoc: String,
}

static DB: Lazy<Mutex<Connection>> = Lazy::new(|| {
    let mut conn = Connection::open("/var/home/tomas/.config/OpenLedger/accsw.db")
        .expect("Filed to establish a conenction to the database");
    embedded::migrations::runner().run(&mut conn).unwrap();
    Mutex::new(conn)
});

#[tauri::command]
pub fn create_account(account: Account) -> Result<usize, String> {
    let conn = DB.lock().unwrap();

    conn.execute(
        "INSERT INTO accounts (account_id, name, email, account_type, country, industry) VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
        params![
            &account.account_id,
            &account.name,
            &account.email,
            &account.account_type,
            &account.country,
            &account.industry,
        ],
    ).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_account(name: &str) -> Result<AccountQuery, String> {
    let conn = DB.lock().unwrap();

    conn.query_row("SELECT * FROM accounts WHERE name = ?", [name], |row| {
        Ok(AccountQuery {
            account_id: row.get(0)?,
            name: row.get(1)?,
            email: row.get(2)?,
            account_type: row.get(3)?,
            country: row.get(4)?,
            industry: row.get(5)?,
            created_at: row.get(6)?,
        })
    })
    .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_accountant_session(name: Option<String>) -> Result<AccountantSession, String> {
    let conn = DB.lock().unwrap();

    match name {
        Some(n) => conn
            .query_row(
                "SELECT * FROM accountantSession WHERE name = ?",
                [n],
                |row| {
                    Ok(AccountantSession {
                        id: row.get(0)?,
                        name: row.get(1)?,
                        accountant_name: row.get(2)?,
                        email: row.get(3)?,
                        account_type: row.get(4)?,
                    })
                },
            )
            .map_err(|e| e.to_string()),
        None => conn
            .query_row("SELECT * FROM accountantSession", [], |row| {
                Ok(AccountantSession {
                    id: row.get(0)?,
                    name: row.get(1)?,
                    accountant_name: row.get(2)?,
                    email: row.get(3)?,
                    account_type: row.get(4)?,
                })
            })
            .map_err(|e| e.to_string()),
    }
}

#[tauri::command]
pub fn create_product(product: Product) -> Result<usize, String> {
    let conn = DB.lock().unwrap();

    conn.execute("INSERT INTO products (code, name, description, price, currency, entity_associated) VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
        params![product.code, product.name, product.description, product.price, product.currency, product.entity_assoc])
    .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_products(entity: String) -> Result<Vec<Product>, String> {
    let conn = DB.lock().unwrap();

    let mut stmt = conn
        .prepare("SELECT * FROM products WHERE entity_associated = ?")
        .map_err(|e| e.to_string())?;

    let products: Result<Vec<Product>, rusqlite::Error> = stmt
        .query_map([entity], |row| {
            Ok(Product {
                code: row.get(0)?,
                name: row.get(1)?,
                description: row.get(2)?,
                price: row.get(3)?,
                currency: row.get(4)?,
                entity_assoc: row.get(5)?,
            })
        })
        .map_err(|e| e.to_string())?
        .collect();

    products.map_err(|e| e.to_string())
}

#[tauri::command]
pub fn search_products(search_term: String, entity: String) -> Result<Vec<Product>, String> {
    let conn = DB.lock().unwrap();

    let mut stmt = conn
        .prepare(
            "SELECT * FROM products WHERE (code LIKE '%' || ?1 || '%'
                                    OR name LIKE '%' || ?1 || '%'
                                    OR currency LIKE '%' || ?1 || '%')
                                    AND entity_associated = ?2",
        )
        .map_err(|e| e.to_string())?;

    let results: Result<Vec<Product>, rusqlite::Error> = stmt
        .query_map([search_term, entity], |row| {
            Ok(Product {
                code: row.get(0)?,
                name: row.get(1)?,
                description: row.get(2)?,
                price: row.get(3)?,
                currency: row.get(4)?,
                entity_assoc: row.get(5)?,
            })
        })
        .map_err(|e| e.to_string())?
        .collect();

    results.map_err(|e| e.to_string())
}
