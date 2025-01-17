import Database from "@/lib/database"
import { invoke } from "@tauri-apps/api/core"
import { useAccountantStore } from "@/stores/accountantStore";

interface Account {
  account_id: string;
  name: string;
  email: string;
  account_type: string;
  country: string;
  industry: string;
  created_at: string;
}

export default function Dashboard(){
  const { accountant } = useAccountantStore();

  const handleClick = async () => {
    console.log(accountant);
  }

  return (
    <>
      <button
        style={{ height: "50px", width: "auto", margin: "auto" }}
        onClick={() => handleClick()}
      >
        print Accountant Session
      </button>
    </>
  )
}
