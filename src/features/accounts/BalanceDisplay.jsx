/* 
1. 在使用useSelector 之前，如何使用redux
2. 通过connect、mapStateToProps 连接redux状态

*/
import { connect, useSelector } from "react-redux";
function formatCurrency(value) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
  }).format(value);
}

function BalanceDisplay({ balance }) {
  const { isLoading } = useSelector((state) => state.account);
  return (
    <div className="balance">
      {isLoading ? "Loading..." : formatCurrency(balance)}
    </div>
  );
}
function mapStateToProps(state) {
  return {
    balance: state.account.balance,
  };
}
// export default BalanceDisplay;
export default connect(mapStateToProps)(BalanceDisplay);
