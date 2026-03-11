import { useSelector } from 'react-redux';
import {
  getTotalPizzaCount,
  getTotalPrice,
} from './cartSlice';
import LinkButton from '../../components/LinkButton';
function CartOverview() {
  const totalPizzaCount = useSelector(getTotalPizzaCount);
  const totalPrice = useSelector(getTotalPrice);
  return (
    totalPizzaCount > 0 && (
      <div className="flex items-center justify-between rounded-md bg-yellow-500 p-4 text-sm uppercase text-stone-200 md:text-base">
        <p className="space-x-4 font-bold text-stone-700">
          <span>{totalPizzaCount} pizzas</span>
          <span>${totalPrice.toFixed(2)}</span>
        </p>
        <LinkButton to="/cart">Open cart &rarr;</LinkButton>
      </div>
    )
  );
}

export default CartOverview;
