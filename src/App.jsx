import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Products from './components/Products';
import Product from './components/Product';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import axios from 'axios';

import Header from './components/Header';

function App() {

  const [products, setProducts] = useState([]);
  const [dataReload, setDataReload] = useState(true);
  useEffect(() => {
    
    if (dataReload) {
      const getApiData = async () => {
        const result = await axios.get('http://localhost:4000/dishes');
        setProducts(result.data);
      }
      getApiData();
    }
    setDataReload(false);
  }, [dataReload]);

  return (
    <Router>
      <Header/>
      <main className="container mt-5">
        <Switch>
          <Route exact path="/products" render={() => (
              <Products
                products={products}
                setDataReload={setDataReload}
              />
          )} />
          <Route exact path="/products/new" render={() => (
            <AddProduct
              setDataReload={setDataReload}
            />
          )} />
          <Route exact path="/products/:id" component={Product} />
          <Route exact path="/products/edit/:id" render={(props) => {
            const idProd = parseInt(props.match.params.id);
            const product = products.find(p => p.id === idProd);
            return (
              <EditProduct
                setDataReload={setDataReload}
                product={product}
              />
            );
          }} />
        </Switch>
      </main>
      <p className="mt-4 p2 text-center">All rights reserved</p>
    </Router>
  );
}

export default App;
