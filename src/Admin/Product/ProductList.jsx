import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import styles from '../Admin.module.css';

const ProductList = () => {
  const { products, deleteProduct } = useAdmin();

  return (
    <div className={styles.productListContainer}>
      <h2>All Products</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className={styles.productList}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>₹{product.price}</p>
              <p>{product.description}</p>
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
