import CreateCustomer from "./CreateCustomer";
import Customer from "./Customer";
import AccountOperations from "./AccountOperations";
import BalanceDisplay from "./BalanceDisplay";
import store from "./store";
function App() {
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      <CreateCustomer />
      <Customer />
      <AccountOperations />
      <BalanceDisplay />
    </div>
  );
}

export default App;
