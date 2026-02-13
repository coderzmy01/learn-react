/* 
1. 在使用useSelector 之前，如何使用redux
2. 通过connect、mapStateToProps 连接redux状态

*/
import { connect } from "react-redux";
function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}
function mapStateToProps(state) {
  return {
    balance: state.account.balance,
  };
}
// export default BalanceDisplay;
export default connect(mapStateToProps)(BalanceDisplay);
