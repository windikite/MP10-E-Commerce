import { Routes, Route } from 'react-router-dom';
import CustomerOrders from './components/CustomerOrders';
import NavigationBar from './components/NavigationBar';
import CustomerFormWrapper from './components/CustomerFormWrapper';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import NotFound from './components/NotFound';
import HomePage from './components/Home';
import Cart from './components/Cart';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App(){
    return (
        <div className='app-container mx-auto'>
          <NavigationBar />
          <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/add-customer/' element={<CustomerFormWrapper />} />
              <Route path='/edit-customer/:id' element={<CustomerFormWrapper />} />
              <Route path='/customers' element={<CustomerOrders />} />
              <Route path='/add-product' element={<ProductForm />} />
              <Route path='/edit-product/:id' element={<ProductForm />} />
              <Route path='/products' element={<ProductList />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
    )
}

export default App;