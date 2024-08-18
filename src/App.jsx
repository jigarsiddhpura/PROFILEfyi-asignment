import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout";


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

    </div>
  )
};

export default App;