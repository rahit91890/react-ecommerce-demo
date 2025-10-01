import React, { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);

  // Sample products
  const products = [
    { id: 1, name: 'Laptop', price: 999, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Smartphone', price: 699, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Headphones', price: 199, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Keyboard', price: 89, image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Mouse', price: 49, image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Monitor', price: 299, image: 'https://via.placeholder.com/150' },
  ];

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Navigation Bar Component
  const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#" onClick={() => setCurrentPage('home')}>E-Shop</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => setCurrentPage('home')}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => setCurrentPage('shop')}>Shop</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => setCurrentPage('cart')}>
                Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

  // Home Page Component
  const HomePage = () => (
    <div className="container mt-5">
      <div className="jumbotron text-center bg-light p-5 rounded">
        <h1 className="display-4">Welcome to E-Shop</h1>
        <p className="lead">Your one-stop destination for quality electronics and accessories.</p>
        <hr className="my-4" />
        <p>Browse our collection of premium products at great prices.</p>
        <button className="btn btn-primary btn-lg" onClick={() => setCurrentPage('shop')}>
          Start Shopping
        </button>
      </div>
    </div>
  );

  // Shop Page Component
  const ShopPage = () => (
    <div className="container mt-5">
      <h2 className="mb-4">Our Products</h2>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price}</p>
                <button 
                  className="btn btn-primary mt-auto"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Cart Page Component
  const CartPage = () => (
    <div className="container mt-5">
      <h2 className="mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="alert alert-info">Your cart is empty. Start shopping!</div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>
                      <div className="input-group" style={{width: '120px'}}>
                        <button 
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <input 
                          type="text" 
                          className="form-control text-center" 
                          value={item.quantity} 
                          readOnly 
                        />
                        <button 
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${item.price * item.quantity}</td>
                    <td>
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-end">
            <h4>Total: ${getTotalPrice()}</h4>
            <button className="btn btn-success btn-lg mt-3">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );

  // Render appropriate page based on currentPage state
  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'cart':
        return <CartPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="App">
      <Navbar />
      {renderPage()}
    </div>
  );
}

export default App;
