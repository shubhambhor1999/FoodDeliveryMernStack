
import './App.css';
import Home from './views/Home';

import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from './views/Login';
import SignUp from './views/SignUp';
import MyOrders from './views/MyOrders'
import { CartProvider } from './components/ConReducer';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import  '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

function App() {
  return (
    <CartProvider>
    <Router>
    <div >
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/CreateUser" element={<SignUp/>}/>
        <Route exact path="/MyOrders" element={<MyOrders/>}/>
      </Routes>
    </div>
    </Router>
    </CartProvider>
    
  );
}

export default App;
