import { create } from 'zustand';

type Accountant = {
  account_id: string;
  name: string;
  email: string;
  account_type: string;
  entities: string[];
  currently_representing: string;
}

interface AccountantStoreType {
  accountant: Accountant | undefined;
  updateAccountant: (update: Partial<Accountant>) => void;
}

export const useAccountantStore = create<AccountantStoreType>((set) => ({
  accountant: undefined,

  updateAccountant: async (update: Partial<Accountant>) => {
    set(state => ({
      accountant: state.accountant
        ? { ...state.accountant, ...update}
        : update as Accountant,
    }))
  }
}));
