use once_cell::sync::Lazy;
use rusqlite::{params, Connection, Result};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;

mod embedded {
    use refinery::embed_migrations;
    embed_migrations!("/var/home/tomas/Documents/Github/openLedger/src-tauri/migrations");
}

#[derive(Serialize, Deserialize)]
pub struct DatabaseError {
    sqlite_error: String,
    is_critical: bool,
    help: Option<String>,
}

impl DatabaseError {
    fn from_sqlite_error(error: rusqlite::Error) -> Self {
        let is_critical = match error {
            rusqlite::Error::SqliteFailure(_, _) => true,
            rusqlite::Error::QueryReturnedNoRows => false,
            rusqlite::Error::InvalidColumnName(_) => false,
            rusqlite::Error::InvalidParameterCount(_, _) => false,
            _ => false,
        };

        let help = match error {
            rusqlite::Error::QueryReturnedNoRows => Some("did not get any results".to_string()),
            rusqlite::Error::InvalidColumnName(ref name) => {
                Some(format!("column {} doesn't exist", name))
            }
            rusqlite::Error::InvalidParameterCount(given, expected) => Some(format!(
                "expected {expected} parameters, were given {given} instead"
            )),
            _ => None,
        };

        DatabaseError {
            sqlite_error: error.to_string(),
            is_critical,
            help,
        }
    }
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
pub struct Entity {
    id: String,
    name: String,
    email: String,
    tax_category: String,
}

#[derive(Serialize, Deserialize)]
pub struct Client {
    id: u64,
    name: String,
    email: Option<String>,
    address: Option<String>,
    industry: Option<String>,
    category: String,
    condition: Option<String>,
    entity_name: String,
}

#[derive(Serialize, Deserialize)]
pub struct Product {
    code: String,
    name: Option<String>,
    description: Option<String>,
    amount: Option<f32>,
    measure_unit: Option<String>,
    price: Option<f32>,
    currency: Option<String>,
    storage_unit: Option<String>,
    entity_name: String,
}

static DB: Lazy<Mutex<Connection>> = Lazy::new(|| {
    let mut conn = Connection::open("/var/home/tomas/.config/OpenLedger/accsw.db")
        .expect("[Database::migrations]Failed to establish a conenction to the database");
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
pub fn get_accountant_session(
    accountant_name: Option<String>,
) -> Result<Vec<AccountantSession>, String> {
    let conn = DB.lock().unwrap();
    let mut stmt = conn
        .prepare("SELECT * FROM accountantSession WHERE accountant_name = ?1")
        .map_err(|e| e.to_string())?;

    if accountant_name.is_some() {
        let results: Result<Vec<AccountantSession>, rusqlite::Error> = stmt
            .query_map([accountant_name], |row| {
                Ok(AccountantSession {
                    id: row.get(0)?,
                    name: row.get(1)?,
                    accountant_name: row.get(2)?,
                    email: row.get(3)?,
                    account_type: row.get(4)?,
                })
            })
            .map_err(|e| e.to_string())?
            .collect();

        results.map_err(|e| e.to_string())
    } else if accountant_name.is_none() {
        let mut stmt = conn
            .prepare("SELECT * FROM accountantSession;")
            .map_err(|e| e.to_string())?;

        let results: Result<Vec<AccountantSession>, rusqlite::Error> = stmt
            .query_map([], |row| {
                Ok(AccountantSession {
                    id: row.get(0)?,
                    name: row.get(1)?,
                    accountant_name: row.get(2)?,
                    email: row.get(3)?,
                    account_type: row.get(4)?,
                })
            })
            .map_err(|e| e.to_string())?
            .collect();

        results.map_err(|e| e.to_string())
    } else {
        Err("Error: No accountant_name provided".to_string())
    }
}

#[tauri::command]
pub fn get_entity(entity_id: String, accountant: String) -> Result<Entity, String> {
    let conn = DB.lock().unwrap();

    conn.query_row(
        "SELECT id, name, email, tax_category FROM entities WHERE id = ?1 AND associated_account = ?2",
        [entity_id, accountant],
        |row| {
            Ok(Entity {
                id: row.get(0)?,
                name: row.get(1)?,
                email: row.get(2)?,
                tax_category: row.get(3)?,
            })
        },
    )
    .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_clients(entity: String) -> Result<Vec<Client>, DatabaseError> {
    let conn = DB.lock().unwrap();

    let mut stmt = conn
        .prepare("SELECT * FROM clients WHERE associated_entity = ?")
        .unwrap();

    let products: Result<Vec<Client>, rusqlite::Error> = stmt
        .query_map([entity], |row| {
            Ok(Client {
                id: row.get(0)?,
                name: row.get(1)?,
                email: row.get(2)?,
                address: row.get(3)?,
                industry: row.get(4)?,
                category: row.get(5)?,
                condition: row.get(6)?,
                entity_name: row.get(7)?,
            })
        })
        .map_err(|e| DatabaseError::from_sqlite_error(e))?
        .collect();

    products.map_err(|e| DatabaseError::from_sqlite_error(e))
}

#[tauri::command]
pub fn create_product(product: Product) -> Result<usize, String> {
    let conn = DB.lock().unwrap();

    conn.execute("INSERT INTO products (code, name, description, amount, measure_unit, price, currency, storage_unit, entity_name) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)",
        params![product.code, product.name, product.description, product.amount, product.measure_unit, product.price, product.currency, product.storage_unit, product.entity_name])
    .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_products(entity: String) -> Result<Vec<Product>, DatabaseError> {
    let conn = DB.lock().unwrap();

    let mut stmt = conn
        .prepare("SELECT * FROM products WHERE entity_name = ?")
        .unwrap();

    let products: Result<Vec<Product>, rusqlite::Error> = stmt
        .query_map([entity], |row| {
            Ok(Product {
                code: row.get(0)?,
                name: row.get(1)?,
                description: row.get(2)?,
                amount: row.get(3)?,
                measure_unit: row.get(4)?,
                price: row.get(5)?,
                currency: row.get(6)?,
                storage_unit: row.get(7)?,
                entity_name: row.get(8)?,
            })
        })
        .map_err(|e| DatabaseError::from_sqlite_error(e))?
        .collect();

    products.map_err(|e| DatabaseError::from_sqlite_error(e))
}
