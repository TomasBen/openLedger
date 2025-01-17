import tsql from '@tauri-apps/plugin-sql';

export type AccountType = 'corporate' | 'accounting study' | 'independent accountant' | 'end user';

interface Account {
  account_id: string;
  name: string;
  email: string;
  account_type: AccountType;
  country?: string;
  industry?: string;
  created_at: string;
}

interface AccountSession {
  account_id?: string;
  name?: string;
}

export interface Product {
  code: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  entity_assoc: string;
}

export const DB = await tsql.load('sqlite:accsw.db');

export default class Database {
  static async getAccountantSession({ account_id, name }: AccountSession){
    const operation = await DB.select("SELECT * FROM accountantSession");

    return operation
  }

  static async createAccount({ name, email, account_type, country, industry }: Partial<Account>) {
    const operation = await DB.execute(
      'INSERT INTO accounts (name, email, account_type, country, industry) VALUES (?, ?, ?, ?, ?)',
      [name, email, account_type, country, industry],
    );

    await this.createSelfEntity({ name, email });

    console.log(operation);
  }

  static async getAccount({ name, email, account_type, country, industry }: Partial<Account>){
    const operation: Account = await DB.select("SELECT * FROM accounts");

    return operation
  }

  private static async createSelfEntity({ name, email }: Partial<Account>) {
    const operation = await DB.execute(
      'INSERT INTO entities (name, email, tax_category, associated_account) VALUES (?, ?, ?, ?)',
      [name, email, 'monotributo', name],
    );

    console.log(operation);
  }

  static async createProduct({ code, name, description, price, currency, entity_assoc}: Product) {
    const operation = await DB.execute('INSERT INTO products (code, name, description, price, currency, entity_associated) VALUES (?, ?, ?, ?, ?, ?)',
      [code, name, description, price, currency, entity_assoc]
    );

    return operation
  }
}
