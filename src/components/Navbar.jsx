import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";



const Navbar = () => {
const {cart}= useSelector((state)=>state)

  return(
    <div>
      <nav className="flex flex-row justify-between items-center h-20 max-w-6xl mx-auto">
          <NavLink to='/'>
            <div className="flex flex-row justify-between items-center gap-x-6 text-slate-100">
              <div className="ml-6">
                  <img src="https://upload.wikimedia.org/wikipedia/en/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png" className="h-14" alt="logo"/>  
              </div>
              <div>
                  <h1 >To Pimp A Butterfly</h1>
              </div>
             
            </div>
          </NavLink>

          <div className="flex flex-row items-center gap-x-6 mr-6 text-slate-100">
            <NavLink to='/'>
             <p>Home</p>
            </NavLink>
            
            <NavLink to='/cart'>
              <div className="relative">
                <FaShoppingCart/>
                {
                  cart.length > 0 &&
                  <span className="absolute -top-1 -right-2 bg-green-600 rounded-full text-sm w-5 h-5 grid justify-items-center animate-bounce text-white">{cart.length}</span>
                }
                
              </div>
            </NavLink>
            
          </div>
      </nav>

    </div>
  )
};

export default Navbar;
