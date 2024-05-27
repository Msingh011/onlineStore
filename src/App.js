import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/views/Home/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllProducts from './components/views/AllProducts';
import Contact from './components/views/Contact';
import SingleProductPage from './components/views/SingleProduct';
import 'antd/dist/antd.min.css';

function App() {
  return (

    <BrowserRouter>
      <Header />
      <div className="app-container">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Home' element={<Home />}></Route>
          {/* <Route path='/store' element={<Store />}></Route> */}
          <Route path='/allProducts' element={<AllProducts/>}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/singleProductPage/:title/:id' element={<SingleProductPage/>}></Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>


  );
}

export default App;
