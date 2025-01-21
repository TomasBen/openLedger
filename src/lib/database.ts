export type AccountType = 'corporate' | 'accounting study' | 'independent accountant' | 'end user';

export interface AccountSessionQuery {
  id: string;
  name: string;
  accountant_name: string;
  email: string;
  account_type: string;
}

interface Account {
  account_id: string;
  name: string;
  email: string;
  account_type: AccountType;
  country?: string;
  industry?: string;
  created_at: string;
}

export interface Product {
  code: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
}

export default class Database {
  static async getAccountantSession({ name }: Partial<Account>): Promise<AccountSessionQuery[]> {
    if (name) {
      const operation: AccountSessionQuery[] = await DB.select("SELECT * FROM accountantSession WHERE name = ?", ['Ovis ammon']);
      return operation
    } else {
      const operation: AccountSessionQuery[] = await DB.select("SELECT * FROM accountantSession");
      return operation
    }
  }

  static async createAccount({ name, email, account_type, country, industry }: Partial<Account>) {
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

  static async createProduct({ code, name, description, price, currency}: Product, entity_name: string | undefined) {
    if (entity_name === undefined) {
      throw new Error('No client selected')
    }

    try {
      const operation = await DB.execute('INSERT INTO products (code, name, description, price, currency, entity_associated) VALUES (?, ?, ?, ?, ?, ?)',
        [code, name, description, price, currency, entity_name]
      );

      return operation
    } catch (error) {
      return new Error('SQL statement failed')
    }
  }
}
