import { useSelector } from "react-redux";
function Customer() {
  const { fullName } = useSelector((state) => state.customer);
  return <h2>👋 Welcome, {fullName}!</h2>;
}

export default Customer;
