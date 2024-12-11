import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId));
    toast.success(`${product.name} has been added to the cart.`);
  };

  return (
    <div className="card m-1" style={{ width: "18rem" }}>
      <div className="p-3">
        <img
          src={product?.image}
          className="card-img-top"
          alt="product"
          style={{
            height: "300px", // Set the desired fixed height
            objectFit: "cover", // Ensures the image covers the area without distortion
          }}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{product?.name}</h5>
        <p className="card-text">
          {product.description.length > 20
            ? product.description.slice(0, 40) + "..."
            : product.description}
        </p>
        <p>₹{product?.price}</p>
        <button
          onClick={() => handleAddToCart(product._id)}
          className="btn btn-primary float-end w-100"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
