import tsql from "@tauri-apps/plugin-sql";

export type Representative = {
  name: string;
  email?: string;
};

export const DB = await tsql.load("sqlite:accsw.db");

export default class Database {
  static async getAllRepresentatives() {
    let response = await DB.select("SELECT * FROM representative");

    return response;
  }

  static async createRepresentative({ name, email }: Representative) {
    let response = await DB.execute(
      "INSERT INTO representative (name, email) VALUES ($1, $2)",
      [name, email],
    );

    return response;
  }
}
