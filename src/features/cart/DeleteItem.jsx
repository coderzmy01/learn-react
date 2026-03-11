import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import { removeFromCart } from './cartSlice';

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button
      type="small"
      onClick={() => dispatch(removeFromCart(pizzaId))}
    >
      Delete
    </Button>
  );
}

export default DeleteItem;
