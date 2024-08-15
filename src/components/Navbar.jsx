import React from 'react';
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { AiOutlineMobile } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const {cart}= useSelector((state)=>state)
  return (
    <div className="border-b-2 bg-slate-100 border-slate-400">
      <nav className="max-w-7xl mx-auto px-4 ">
        <div className="flex justify-between items-center py-2">
          <NavLink to='/' className="text-purple-700 text-3xl font-bold">
            Auralis
          </NavLink>
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative border border-slate-500">
              <input
                type="text"
                placeholder="Try Saree, Kurti or Search by Product Code"
                className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 rounded-sm focus:outline-none focus:bg-white focus:border focus:border-black-500 focus:bg-purple-700"
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center space-x-12 text-sm">

            {/* <NavLink to="/profile" className="flex flex-col items-center">
              <FaUser className=""/>
              Profile
            </NavLink> */}
            <NavLink to="/" className="flex flex-col items-center text-lg hover:bg-purple-700 font-medium">
              {/* <FaUser className=""/> */}
              Home
            </NavLink>
            <NavLink to='/cart'>
              <div className="relative">
                <FaShoppingCart className="size-5"/>
                {
                  cart.length > 0 &&
                  <span className="absolute -top-1 -right-2 bg-purple-700 rounded-full text-sm w-5 h-5 grid justify-items-center animate-bounce text-white">{cart.length}</span>
                }
                
              </div>
            </NavLink>
          </div>
        </div>
        
      </nav>
    </div>
  );
};

export default Navbar;