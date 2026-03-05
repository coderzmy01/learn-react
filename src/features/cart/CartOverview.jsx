function CartOverview() {
  return (
    <div className="flex items-center justify-between rounded-md bg-yellow-500 p-4 text-sm uppercase text-stone-200 md:text-base">
      <p className="space-x-4 font-bold text-stone-700">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <a href="/cart">Open cart &rarr;</a>
    </div>
  );
}

export default CartOverview;
