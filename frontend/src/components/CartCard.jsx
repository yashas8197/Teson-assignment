import { useDispatch } from "react-redux";
import {
  deleteCartItem,
  quantityUpdate,
  removeCartItem,
  updateCartItem,
} from "../utils/cartSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog";

const CartCard = ({ item }) => {
  const { product, quantity } = item;
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleQuantity = (newQuantity) => {
    if (newQuantity > 10) {
      toast.error("Maximum quantity reached.");
    } else if (newQuantity < 1) {
      toast.error("Minimum quantity is 1.");
    } else {
      const updateData = { quantity: newQuantity, productId: product._id };
      dispatch(quantityUpdate(updateData));
      dispatch(updateCartItem(updateData));
    }
  };

  const handleRemoveItem = () => {
    setShowModal(true);
  };

  const confirmRemoveItem = () => {
    dispatch(removeCartItem(product._id));
    dispatch(deleteCartItem(product._id));
    toast.success(`${product.name} has been removed from the cart.`);
    setShowModal(false); // Close the modal after confirmation
  };

  const cancelRemoveItem = () => {
    setShowModal(false); // Close the modal without doing anything
  };

  return (
    <div className="card shadow-sm">
      <div className="p-4">
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
          style={{ height: "400px", objectFit: "cover" }}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text text-muted">Price: ₹{product.price}</p>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <button
              onClick={() => handleQuantity(quantity - 1)}
              className="btn btn-outline-secondary btn-sm"
            >
              -
            </button>
            <span className="mx-2">{quantity}</span>
            <button
              onClick={() => handleQuantity(quantity + 1)}
              className="btn btn-outline-secondary btn-sm"
            >
              +
            </button>
          </div>
          <button onClick={handleRemoveItem} className="btn btn-danger btn-sm">
            Remove
          </button>
        </div>
      </div>

      {showModal && (
        <ConfirmationDialog
          onConfirm={confirmRemoveItem}
          onCancel={cancelRemoveItem}
        />
      )}
    </div>
  );
};

export default CartCard;
