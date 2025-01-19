import { create } from 'zustand';
import Database from '@/lib/database';
import { AccountSessionQuery } from '@/lib/database';

type Entity = {
  id: string;
  name: string;
};

export interface AccountantSession {
  name: string;
  email: string;
  account_type: string;
  entities: Entity[];
  currently_representing: Entity | undefined;
}

interface AccountantStoreType {
  accountant: AccountantSession | undefined;
  updateAccountant: (update: Partial<AccountantSession>) => void;
}

export const useAccountantStore = create<AccountantStoreType>((set) => ({
  accountant: undefined,

  updateAccountant: async (update: Partial<AccountantSession>) => {
    set(state => ({
      accountant: state.accountant
        ? { ...state.accountant, ...update}
        : update as AccountantSession,
    }))
  }
}));

const initializeStore = async () => {
  let query: AccountSessionQuery[] = await Database.getAccountantSession({ });

  if (query) {
    let initialSession: AccountantSession = {
      name: query[0].accountant_name,
      email: query[0].email,
      account_type: query[0].account_type,
      entities: [],
      currently_representing: undefined,
    }

    initialSession.entities = query.map(item => ({
      id: item.id,
      name: item.name
    }))

    useAccountantStore.setState({ accountant: initialSession });
  }
}

initializeStore();
