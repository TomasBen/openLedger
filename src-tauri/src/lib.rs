use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![Migration {
        version: 1,
        description: "initial database creation",
        sql: "CREATE TABLE IF NOT EXISTS representative (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT
            );

            CREATE TABLE IF NOT EXISTS client (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT,
                web_url TEXT,
                associated_rep INTEGER,
                FOREIGN KEY (associated_rep) REFERENCES representative (id)
                    ON UPDATE SET NULL
                    ON DELETE SET NULL
            );",
        kind: MigrationKind::Up,
    }];

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::new()
                .add_migrations("sqlite:accsw.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_shell::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
