import Button from '../../components/Button';
import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteItem';
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-4 sm:flex sm:items-center sm:justify-between">
      <p className="mb-2 text-lg font-medium sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-4">
        <p className="text-sm font-bold">
          {formatCurrency(totalPrice)}
        </p>
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
