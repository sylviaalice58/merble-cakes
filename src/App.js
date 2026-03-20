
import './App.css';
import "./index.css"; // make sure this imports the CSS above

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Signin from './component/Signin';
import Signup from './component/Signup';
import Addproducts from './component/Addproducts';
import Getproducts from './component/Getproducts';
import Makepayment from './component/Makepayment';
import Notfound from './component/Notfound';


function App() {
  return (
    <Router>

      <div className="App">
      <header className="App-header">
       <h2>MERBLES CAKES</h2>
      </header>

       

      <Routes>
        <Route path ='/' element={<Getproducts />} />
        <Route path ='/addproducts' element ={<Addproducts />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
         <Route path='/makepayment'element={<Makepayment />}/>
          <Route path='*' element={<Notfound />} />
      </Routes>
    </div>
  
    </Router>
  );
}

export default App;
