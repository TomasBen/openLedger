import { invoke } from '@tauri-apps/api/core';
import { create } from 'zustand';

export type Entity = {
  id: string;
  name: string;
  email?: string;
  preferred_currency?: string;
  taxCategory?: string;
};

export interface AccountantSession {
  name: string;
  email: string;
  category: string;
  entities: Entity[];
  currently_representing: Entity | undefined;
}

export interface AccountSessionQuery {
  id: string;
  name: string;
  account_name: string;
  account_email: string;
  account_category: string;
}

interface AccountantStoreType {
  accountant: AccountantSession | undefined;
  updateAccountant: (update: Partial<AccountantSession>) => void;
}

export const useAccountantStore = create<AccountantStoreType>((set) => ({
  accountant: undefined,

  updateAccountant: async (update: Partial<AccountantSession>) => {
    set((state) => ({
      accountant: state.accountant
        ? { ...state.accountant, ...update }
        : (update as AccountantSession),
    }));
  },
}));

const initializeStore = async () => {
  let query: AccountSessionQuery[] = await invoke('get_accountant_session', {
    accountantName: 'Tomás',
  });

  if (query) {
    let initialSession: AccountantSession = {
      name: query[0].account_name,
      email: query[0].account_email,
      category: query[0].account_category,
      entities: [],
      currently_representing: undefined,
    };

    initialSession.entities = query.map((item) => ({
      id: item.id,
      name: item.name,
    }));

    useAccountantStore.setState({ accountant: initialSession });
  }
};

initializeStore();
