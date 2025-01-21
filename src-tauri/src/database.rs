use once_cell::sync::Lazy;
use rusqlite::{params, Connection, Result};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;

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

static DB: Lazy<Mutex<Connection>> = Lazy::new(|| {
    let conn = Connection::open("/var/home/tomas/.config/OpenLedger/accsw.db")
        .expect("Filed to establish a conenction to the database");
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
