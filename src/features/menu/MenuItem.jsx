import Button from '../../components/Button';
import { UpdateItemCount } from '../cart/UpdateItemCount';
import { formatCurrency } from '../../utils/helpers';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  addToCart,
  getCurrentCountById,
  incrementQuantity,
  decrementQuantity,
} from '../../features/cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';
function MenuItem({ pizza }) {
  const {
    id,
    name,
    unitPrice,
    ingredients,
    soldOut,
    imageUrl,
  } = pizza;
  const dispatch = useDispatch();
  const count = useSelector((state) =>
    getCurrentCountById(state, id),
  );
  const isInCart = count > 0;
  return (
    <li className="flex gap-4 py-4">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 object-cover ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col">
        <p className="text-lg font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-600">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-600">
              Sold out
            </p>
          )}
          {isInCart && (
            <div className="flex items-center gap-6 px-4">
              <DeleteItem pizzaId={id} />
              <UpdateItemCount
                count={count}
                onIncrement={() =>
                  dispatch(
                    incrementQuantity({
                      pizzaId: id,
                    }),
                  )
                }
                onDecrement={() =>
                  dispatch(
                    decrementQuantity({
                      pizzaId: id,
                    }),
                  )
                }
              />
            </div>
          )}
          {!soldOut && !isInCart && (
            <div className="flex items-center gap-2 px-4">
              <Button
                onClick={() =>
                  dispatch(
                    addToCart({
                      pizzaId: id,
                      quantity: 1,
                      unitPrice,
                      name,
                      totalPrice: unitPrice,
                    }),
                  )
                }
                type="small"
              >
                Add to cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
