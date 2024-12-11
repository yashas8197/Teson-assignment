import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../utils/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (!products) return;
  return (
    <>
      {status === "loading" ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container my-4">
          <div className="row">
            {products.map((product) => (
              <div
                className="col-12 col-sm-6 col-md-4 d-flex justify-content-center"
                key={product._id}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
