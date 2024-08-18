import React from 'react';
import { useDispatch } from "react-redux";
import { remove, updateQuantity } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";
import { FcRating } from "react-icons/fc";


const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.error("Item Removed");
  };

  const handleQuantityChange = (newQuantity) => {
    dispatch(updateQuantity({id: item.id, quantity: newQuantity}));
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-300">
      <div className="p-4 flex items-center space-x-4">
        <div className="w-16 h-16 flex-shrink-0">
          <img src={item.image} alt={item.title} className="w-full h-full object-scale-down" />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-base text-gray-800">{item.title}</h3>
            <button className="text-fuchsia-600 text-sm font-semibold">EDIT</button>
          </div>
          <p className="text-gray-900 font-bold mt-1">₹{item.price}</p>
          <div className="flex items-center mt-1 text-sm text-gray-600">
            <span>{item.rating.rate}</span>
            <FcRating />
            <span className="mx-2">•</span>
            <div className="flex items-center">
              <span className="mr-2">Qty:</span>
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center"
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 pb-3">
        <button
          onClick={removeFromCart}
          className="text-gray-500 text-sm flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          REMOVE
        </button>
      </div>
      <div className="border-t border-gray-300 px-4 py-3 flex justify-between items-center text-sm">
        <span className="text-gray-600"></span>
        <span className="text-gray-600">Free Delivery</span>
      </div>
    </div>
  );
};

export default CartItem;