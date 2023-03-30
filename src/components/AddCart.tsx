import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/cartsSlice";
import { RootState } from "../redux/store";
import { Product } from "../types";

const AddCart: React.FC = () => {
  const [userId, setUserId] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>({
    title: "",
    price: 0,
    quantity: 0,
    discountPercentage: 0,
    total: 0,
  });

  const { carts, loading } = useSelector((state: RootState) => state.carts);
  const dispatch = useDispatch();

  const handleProductInput = (e: any) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value as number,
    });
  };

  const handleProduct = () => {
    setProducts((prev) => [
      ...prev,
      {
        ...product,
        total: product.price * product.quantity,
      },
    ]);
    setProduct({
      title: "",
      price: 0,
      quantity: 0,
      discountPercentage: 0,
      total: 0,
    });
  };

  const addNewCart = (e: any) => {
    e.preventDefault();
    const newItem = {
      id: new Date().getTime().toString(),
      products: products,
      total: products.reduce((acc, product) => acc + product.total, 0),
      discountedTotal: products.reduce(
        (acc, product) =>
          acc +
          product.total -
          (product.total * product.discountPercentage) / 100,
        0
      ),
      userId,
    };

    const newCarts = [...carts, newItem];
    dispatch(update({ carts: newCarts }));
    setProducts([]);
  };

  return (
    <div className="add-cart-container">
      <h2>Add a cart</h2>
      <form className="add-cart" onSubmit={addNewCart}>
        <label htmlFor="id">User ID</label>
        <input
          id="id"
          type="number"
          value={userId}
          name="id"
          placeholder="User ID..."
          required
          onChange={(e) => setUserId(parseInt(e.target.value))}
        />

        <>
          <h3 className="products-title">Products</h3>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Title"
            name="title"
            value={product.title}
            onChange={handleProductInput}
          />
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            placeholder="Price"
            name="price"
            step="0.01"
            value={product.price}
            onChange={handleProductInput}
          />
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            type="number"
            placeholder="Quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleProductInput}
          />
          <label htmlFor="discount-percentage">Discount Percentage</label>
          <input
            id="discount-percentage"
            type="number"
            placeholder="Discount Percentage"
            name="discountPercentage"
            value={product.discountPercentage}
            onChange={handleProductInput}
            min="0"
            max="100"
          />
          <button
            type="button"
            className="btn add-product-btn"
            onClick={handleProduct}
          >
            Add product
          </button>
        </>
        <div>
          <h3>Product list:</h3>
          {products.map((product) => (
            <div key={product.title} style={{ display: "flex" }}>
              <p className="product">
                {product.title} {product.price} x{product.quantity}{" "}
                {product.discountPercentage}%
              </p>
            </div>
          ))}
        </div>

        <button type="submit" className="btn add-cart-btn">
          Add cart
        </button>
      </form>
    </div>
  );
};

export default AddCart;
