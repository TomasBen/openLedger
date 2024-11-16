import { BaseDirectory } from "@tauri-apps/plugin-fs";

export default async function getDatabasePath() {
  const db_path = BaseDirectory.AppData;
  console.log(db_path);
}
