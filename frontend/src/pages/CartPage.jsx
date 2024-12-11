import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../utils/cartSlice";
import CartCard from "../components/CartCard";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart, status } = useSelector((state) => state.cart);
  console.log(cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  return (
    <>
      <div className="container my-4">
        <h1 className="text-center mb-4">Shopping Cart</h1>
        <div className="row">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div className="col-md-6 col-lg-4 mb-4" key={item._id}>
                <CartCard item={item} />
              </div>
            ))
          ) : (
            <p className="text-center">Your cart is empty!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
