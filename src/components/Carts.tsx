import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, update } from "../redux/cartsSlice";
import store, { RootState } from "../redux/store";
import { Cart } from "../types";
import CartsItem from "./CartsItem";

interface Props {
  selectedCart: Cart | null;
  setSelectedCart: (cart: Cart | null) => void;
}

const Carts: React.FC<Props> = ({ selectedCart, setSelectedCart }) => {
  const { carts, loading } = useSelector((state: RootState) => state.carts);
  const dispatch: typeof store.dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const removeCart = useCallback(
    (id: string) => {
      const newCarts = carts.filter((cart) => cart.id !== id);
      dispatch(update({ carts: newCarts }));
    },
    [carts, dispatch]
  );

  return (
    <div>
      <h1 className="title">Cart list</h1>
      <table>
        {carts.map((cart) => (
          <CartsItem
            data-testid="cart-item"
            cart={cart}
            removeCart={removeCart}
            selectedCart={selectedCart}
            setSelectedCart={setSelectedCart}
          />
        ))}
      </table>
    </div>
  );
};

export default Carts;
