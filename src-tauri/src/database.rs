use once_cell::sync::Lazy;
use rusqlite::{Connection, Error, Result};
use std::sync::Mutex;

pub struct Account {
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
pub fn get_account(name: &str) -> Result<Account, Error> {
    let conn = DB.lock().unwrap();

    conn.query_row("SELECT * FROM accounts WHERE name = ?", [name], |row| {
        Ok(Account {
            account_id: row.get(0)?,
            name: row.get(1)?,
            email: row.get(2)?,
            account_type: row.get(3)?,
            country: row.get(4)?,
            industry: row.get(5)?,
            created_at: row.get(6)?,
        })
    })
}
