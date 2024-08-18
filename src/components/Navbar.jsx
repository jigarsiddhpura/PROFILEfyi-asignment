import React, { useState } from 'react';
import { FaShoppingCart, FaBars } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const NavItem = ({ to, children, className }) => (
  <NavLink to={to} className={`flex flex-col items-center text-lg hover:text-brand-primary font-semibold ${className}`}>
    {children}
  </NavLink>
);

const Navbar = ({searchTerm, onSearchChange, showSearchBar}) => {
  const { cart } = useSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchInput = (e) => {
    onSearchChange(e.target.value);
  }

  return (
    <div className="border-b-2 bg-slate-100 border-slate-400">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <NavLink to='/' className="text-brand-primary text-2xl md:text-3xl font-bold">
            Auralis
          </NavLink>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars className="text-brand-primary text-2xl" />
          </button>

          {/* Desktop navigation */}
          {/* on small screen - `hidden` class takes effect while on >= `medium` screen, diplay:flex overrides it */}
          <div className="hidden md:flex flex-1 justify-end items-center space-x-4 lg:space-x-12">
            {showSearchBar && (
            <div className="relative w-full max-w-sm lg:max-w-md xl:max-w-lg border border-slate-300">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchInput}
                className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 rounded-sm focus:outline-none focus:bg-white focus:border focus:border-purple-500"
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            )}
            <NavItem to="/">Home</NavItem>
            <NavItem to='/cart'>
              <div className="relative">
                <FaShoppingCart className="size-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-purple-700 rounded-full text-sm w-5 h-5 grid justify-items-center animate-bounce text-white">
                    {cart.length}
                  </span>
                )}
              </div>
            </NavItem>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-2">
            {showSearchBar && (
            <div className="relative mb-4 bg-">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchInput}
                className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 rounded-sm focus:outline-none focus:bg-white border border-slate-300 focus:border-purple-500 "
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            )}
            <NavItem to="/" className="mb-2">Home</NavItem>
            <NavItem to='/cart' className="mb-2">
              <div className="relative">
                <FaShoppingCart className="size-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-purple-700 rounded-full text-sm w-5 h-5 grid justify-items-center animate-bounce text-white">
                    {cart.length}
                  </span>
                )}
              </div>
            </NavItem>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;