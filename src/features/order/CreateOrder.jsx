import { useState } from 'react';
import { createOrder } from '../../services/apiRestaurant';
import EmptyCart from '../cart/EmptyCart';
import {
  redirect,
  Form,
  useNavigation,
} from 'react-router-dom';
import Button from '../../components/Button';
import { useActionData } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import store from '../../store';
import {
  clearCart,
  getTotalPrice,
} from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import { featchAddressAsync } from '../user/userSlice';
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector((state) => state.cart.items);
  const {
    position,
    address,
    status: addressStatus,
    errorMessage,
    userName,
  } = useSelector((state) => state.user);
  const totalPrice = useSelector(getTotalPrice);
  const priorityPrice =
    withPriority === 'on' ? totalPrice * 0.2 : 0;
  const finalPrice = totalPrice + priorityPrice;
  const navigation = useNavigation();
  const formErrors = useActionData();
  const dispatch = useDispatch();
  const isSubmitting = navigation.state === 'submitting';
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-8 text-2xl font-semibold">
        Ready to order? Let's go!
      </h2>

      <Form method="post">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            className="input grow"
            required
          />
        </div>

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">
            Phone number
          </label>
          <div className="grow">
            <input
              type="tel"
              name="phone"
              className="input w-full"
              required
            />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 px-2 py-1 text-sm text-red-500">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="relative grow">
            <input
              type="text"
              name="address"
              className="input w-full"
              defaultValue={address}
              required
            />
            {!position && (
              <Button
                disabled={addressStatus === 'loading'}
                type="small"
                className="absolute right-0 top-[4px] z-10"
                onClick={() =>
                  dispatch(featchAddressAsync())
                }
              >
                Add Address
              </Button>
            )}
            {errorMessage && (
              <p className="mt-2 rounded-md bg-red-100 px-2 py-1 text-sm text-red-500">
                {errorMessage}
              </p>
            )}
          </div>
        </div>

        <div className="mb-8 flex items-center gap-2">
          <input
            className="mr-2 h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) =>
              setWithPriority(
                e.target.checked ? 'on' : 'off',
              )
            }
          />
          <label htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input
            type="hidden"
            name="cart"
            value={JSON.stringify(cart)}
          />
          <input
            type="hidden"
            name="position"
            value={
              position?.latitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button
            disabled={
              isSubmitting || addressStatus === 'loading'
            }
            type="primary"
          >
            {isSubmitting
              ? 'Submitting...'
              : `Order now (Total: $${formatCurrency(finalPrice)})`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export const action = async ({ request }) => {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);
  const order = {
    customer: data.customer,
    phone: data.phone,
    address: data.address,
    priority: data.priority === 'on',
    cart: JSON.parse(data.cart),
    position: data.position,
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
};
export default CreateOrder;
