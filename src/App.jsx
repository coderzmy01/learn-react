import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import store from "./store";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
function App() {
  const { fullName } = useSelector((state) => state.customer);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>

      {!fullName && <CreateCustomer />}
      {fullName && (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
