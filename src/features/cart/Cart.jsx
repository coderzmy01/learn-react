import LinkButton from '../../components/LinkButton';
import Button from '../../components/Button';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import { clearCart } from './cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from './cartSlice';

function Cart() {
  // const cart = fakeCart;
  const cart = useSelector(getCartItems);
  const username = useSelector(
    (state) => state.user.userName,
  );

  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  if (cart.length === 0) {
    return <EmptyCart />;
  }
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <LinkButton to="/menu">
          &larr; Back to menu
        </LinkButton>
        <h2 className="mt-8 text-2xl font-semibold">
          Your cart, {username}
        </h2>

        <>
          <ul className="mt-4 divide-y divide-stone-300 border-b">
            {cart.map((item) => (
              <CartItem key={item.pizzaId} item={item} />
            ))}
          </ul>
          <div className="mt-4 space-x-4">
            <Button to="/order/create">Order pizzas</Button>
            <Button
              type="secondary"
              onClick={handleClearCart}
            >
              Clear cart
            </Button>
          </div>
        </>
      </div>
    </>
  );
}

export default Cart;
