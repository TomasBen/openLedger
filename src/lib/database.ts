import tsql from '@tauri-apps/plugin-sql';

export type AccountType = 'corporate' | 'accounting study' | 'independent accountant' | 'end user';

export interface Account {
  name: string;
  email: string;
  account_type: AccountType;
  country?: string;
  industry?: string;
}

export const DB = await tsql.load('sqlite:accsw.db');

export default class Database {
  static async createAccount({ name, email, account_type, country, industry }: Account) {
    const operation = await DB.execute(
      'INSERT INTO accounts (name, email, account_type, country, industry) VALUES (?, ?, ?, ?, ?)',
      [name, email, account_type, country, industry],
    );

    await this.createSelfEntity({ name, email });

    console.log(operation);
  }

  private static async createSelfEntity({ name, email }: Partial<Account>) {
    const operation = await DB.execute(
      'INSERT INTO entities (name, email, tax_category, associated_account) VALUES (?, ?, ?, ?)',
      [name, email, 'monotributo', name],
    );

    console.log(operation);
  }
}
