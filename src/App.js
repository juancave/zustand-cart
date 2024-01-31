import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import useCartStore from './store/store';

function CurrentProducts() {
  const [products, setProducts] = useState([]);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddItem = (product) => {
    const newItem = { id: product.id, name: product.title, price: product.price };
    addItem(newItem);
  };

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then(json => setProducts(json))
  }, []);

  return (
    <div className='Current-Products'>
      {products.map((product) => (
        <div key={product.id} className='Product-Container'>
          <img className='Product-Image' src={product.image} alt={`Product - ${product.title}`} />
          <div className='Product-Information'>
            <h3 className='Product-Title text-left'>{product.title}</h3>
            <div className='text-left'><b>Description:</b> <span>{product.description}</span></div>
          </div>
          <div className='Product-Actions'>
            <b>$ {product.price}</b>
            <button onClick={() => handleAddItem(product)}>Add</button>
          </div>
        </div>
      ))}
      <div></div>
    </div>
  );
}

function CartBadge() {
  const totalPrice = useCartStore((state) => state.totalPrice())

  return (
    <div className='Cart-Price'>Cart price: $ {totalPrice}</div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Shopping App example using Zustand
        </p>
      </header>
      <CartBadge />
      <CurrentProducts />
    </div>
  );
}

export default App;
