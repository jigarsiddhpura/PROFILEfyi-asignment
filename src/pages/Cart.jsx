import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CartItem from "../components/CartItem";
import { AiFillSafetyCertificate } from "react-icons/ai";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  return (
    <div className="container mx-auto px-4 py-8">
      {cart.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8  mx-48 p-10">
          <div className="lg:w-2/3 space-y-6">
            <h2 className="text-2xl font-medium mb-4">Product Details </h2>
            {cart.map((item, index) => (
              <div key={item.id} >
                <CartItem item={item} itemIndex={index} />
              </div>
            ))}
          </div>
          <div className="lg:w-1/3 ">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6 border border-gray-300">
              <h2 className="text-2xl font-medium mb-6">Price Details ({cart.length} Items)</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center"> 
                  <span className="text-gray-600">Total Product Price</span>
                  <span className="font-semibold">+ ₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 my-4"></div>
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Order Total</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 mb-6">
                Clicking on 'Continue' will not deduct any money
              </p>
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300">
                Continue
              </button>
              <div className="flex items-center mt-6 bg-blue-50 p-4 rounded-lg">
                <AiFillSafetyCertificate className="mr-4 size-14"/>
                <div>
                  <h3 className="font-semibold text-blue-800">Your Safety, Our Priority</h3>
                  <p className="text-sm text-gray-600">
                    We make sure that your package is safe at every point of contact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] flex flex-col justify-center items-center">
          <h1 className="text-gray-700 font-semibold text-xl mb-2">
            Your cart is empty!
          </h1>
          <NavLink to="/">
            <button className="uppercase bg-green-600 p-3 px-10 rounded-lg text-white mt-6 font-semibold tracking-wider hover:bg-purple-50 duration-300 transition-all ease-in hover:text-green-600 border-2 border-green-600">
              shop now
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Cart;