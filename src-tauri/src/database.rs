use once_cell::sync::Lazy;
use rusqlite::{params, Connection, Result};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;

mod embedded {
    use refinery::embed_migrations;
    embed_migrations!("./migrations");
}

#[derive(Serialize)]
pub struct DatabaseError {
    name: String,
    message: String,
    sqlite_error: String,
}

impl DatabaseError {
    fn from_sqlite_error(error: rusqlite::Error) -> Self {
        let name = error.to_string();

        let message = match error {
            rusqlite::Error::QueryReturnedNoRows => String::from("did not get any results"),
            rusqlite::Error::InvalidColumnName(ref name) => {
                String::from(format!("column {} doesn't exist", name))
            }
            rusqlite::Error::InvalidParameterCount(given, expected) => String::from(format!(
                "expected {expected} parameters, were given {given} instead"
            )),
            _ => String::from("failed to retrieve a message"),
        };

        DatabaseError {
            name,
            message,
            sqlite_error: error.to_string(),
        }
    }
}

#[derive(Serialize, Deserialize)]
pub struct Account {
    id: String,
    name: String,
    email: String,
    category: String,
    country: Option<String>,
    created_at: Option<String>,
}

#[derive(Serialize)]
pub struct AccountantSession {
    entity_id: String,
    entity_name: String,
    entity_email: String,
    entity_preferred_currency: String,
    entity_tax_category: String,
    account_name: String,
    account_email: String,
    account_category: String,
}

#[derive(Serialize, Deserialize)]
pub struct Entity {
    id: String,
    name: String,
    email: String,
    tax_category: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Client {
    id: u64,
    name: String,
    email: Option<String>,
    phone: Option<u32>,
    address: Option<String>,
    industry: Option<String>,
    category: String,
    condition: Option<String>,
    entity: String,
    created_at: Option<String>,
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

// #[derive(Debug, Deserialize)]
// struct ARCAFactura {
//     fecha_de_emision: String,
//     tipo_de_comprobante: u8,
//     punto_de_venta: u8,
//     nro_desde: u16,
//     nro_hasta: u16,
//     cod_auth: u64,
//     tipo_doc_receptor: u8,
//     nro_doc_receptor: u64,
//     nombre_receptor: String,
//     cambio: u64,
//     moneda: String,
//     imp_neto_gravado: u64,
//     imp_neto_exento: u64,
//     imp_op_exentas: u64,
//     otros_tributos: u64,
//     iva: u64,
//     imp_total: u64,
// }

static DB: Lazy<Mutex<Connection>> = Lazy::new(|| {
    let mut conn = Connection::open("/var/home/tomas/.config/OpenLedger/main.db")
        .expect("[Database::migrations] Failed to open a connection to the database");
    embedded::migrations::runner().run(&mut conn).unwrap();
    Mutex::new(conn)
});

#[tauri::command]
pub fn create_account(account: Account) -> Result<usize, DatabaseError> {
    let conn = DB.lock().unwrap();

    conn.execute(
        "INSERT INTO accounts (id, name, email, category, country) VALUES (?1, ?2, ?3, ?4, ?5)",
        params![
            &account.id,
            &account.name,
            &account.email,
            &account.category,
            &account.country,
        ],
    )
    .map_err(|e| DatabaseError::from_sqlite_error(e))
}

#[tauri::command]
pub fn get_account(name: &str) -> Result<Account, DatabaseError> {
    let conn = DB.lock().unwrap();

    conn.query_row("SELECT * FROM accounts WHERE name = ?", [name], |row| {
        Ok(Account {
            id: row.get(0)?,
            name: row.get(1)?,
            email: row.get(2)?,
            category: row.get(3)?,
            country: row.get(4)?,
            created_at: row.get(5)?,
        })
    })
    .map_err(|e| DatabaseError::from_sqlite_error(e))
}

#[tauri::command]
pub fn get_accountant_session(accountant_name: String) -> Result<Vec<AccountantSession>, String> {
    let conn = DB.lock().unwrap();
    let mut stmt = conn
        .prepare("SELECT * FROM accountantSession WHERE accountant_name = ?1")
        .map_err(|e| e.to_string())?;

    let results: Result<Vec<AccountantSession>, rusqlite::Error> = stmt
        .query_map([accountant_name], |row| {
            Ok(AccountantSession {
                entity_id: row.get(0)?,
                entity_name: row.get(1)?,
                entity_email: row.get(2)?,
                entity_preferred_currency: row.get(3)?,
                entity_tax_category: row.get(4)?,
                account_name: row.get(5)?,
                account_email: row.get(6)?,
                account_category: row.get(7)?,
            })
        })
        .map_err(|e| e.to_string())?
        .collect();

    results.map_err(|e| e.to_string())
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
pub fn create_client(client: Client) -> Result<usize, DatabaseError> {
    let conn = DB.lock().unwrap();

    println!("received client: {:?}", client);
    conn.execute("INSERT INTO clients (id, name, email, phone, address, industry, category, condition, entity_name) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)", params![
        &client.id,
        &client.name,
        &client.email,
        &client.phone,
        &client.address,
        &client.industry,
        &client.category,
        &client.condition,
        &client.entity
    ]).map_err(|e| { DatabaseError::from_sqlite_error(e)})
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
                phone: row.get(3)?,
                address: row.get(4)?,
                industry: row.get(5)?,
                category: row.get(6)?,
                condition: row.get(7)?,
                entity: row.get(8)?,
                created_at: row.get(9)?,
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

/* CSV */

// #[tauri::command]
// fn import_csv(path: &Path, has_headers: bool, separator: char) -> anyhow::Result<Vec<FacturaARCA>> {
//     let file = File::open(path).expect("failed to open file");
//     let reader = BufReader::new(file);

//     let mut facturas: Vec<FacturaARCA> = Vec::new();

//     let mut lines = reader.lines();
//     if has_headers {
//         let _header = lines.next();
//     }

//     for line in lines {
//         let line = line?;
//         let fields: Vec<&str> = line.split(separator).collect();

//         let factura = Factura {
//             fecha_de_emision: fields[0].trim().to_string(),
//             tipo_de_comprobante: fields[1].trim().replace(",", ".").parse()?,
//             punto_de_venta: fields[2].trim().replace(",", ".").parse()?,
//             nro_desde: fields[3].trim().replace(",", ".").parse()?,
//             nro_hasta: fields[4].trim().replace(",", ".").parse()?,
//             cod_auth: fields[5].trim().replace(",", ".").parse()?,
//             tipo_doc_receptor: fields[6].trim().replace(",", ".").parse()?,
//             nro_doc_receptor: fields[7].trim().replace(",", ".").parse()?,
//             nombre_receptor: fields[8].trim().to_string(),
//             cambio: fields[9].trim().replace(",", ".").parse()?,
//             moneda: fields[10].trim().to_string(),
//             imp_neto_gravado: fields[11].trim().replace(",", ".").parse()?,
//             imp_neto_exento: fields[12].trim().replace(",", ".").parse()?,
//             imp_op_exentas: fields[13].trim().replace(",", ".").parse()?,
//             otros_tributos: fields[14].trim().replace(",", ".").parse()?,
//             iva: fields[15].trim().replace(",", ".").parse()?,
//             imp_total: fields[16].trim().replace(",", ".").parse()?,
//         };

//         facturas.push(factura);
//     }

//     Ok(facturas)
// }
