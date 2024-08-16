import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
    const { cart } = useSelector((state) => state.cart);
    const location = useLocation();
    const finalAmount = location.state?.finalAmount;
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="bg-white rounded-lg shadow-2xl p-6">
                <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Customer Info</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={handleInputChange}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={handleInputChange}
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone"
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={handleInputChange}
                            />
                        </div>

                        <h2 className="text-xl font-semibold mt-6 mb-4">Shipping Address</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="zipCode"
                                placeholder="Zip Code"
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={handleInputChange}
                            />
                        </div>

                        <h2 className="text-xl font-semibold mt-6 mb-4">Payment</h2>
                        <div className="space-y-4">
                            <div className="flex space-x-2">
                                <div className="px-2 bg-gray-200 rounded">Rupay</div>
                                <div className="px-2 bg-gray-200 rounded">Visa</div>
                            </div>
                            <input
                                type="text"
                                name="cardNumber"
                                placeholder="Card Number"
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="cardName"
                                placeholder="Name on Card"
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={handleInputChange}
                            />
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    name="expiryDate"
                                    placeholder="MM/YY"
                                    className="w-1/2 p-2 border border-gray-300 rounded"
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="cvv"
                                    placeholder="CVV"
                                    className="w-1/2 p-2 border border-gray-300 rounded"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">Your Purchases</h2>
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between items-center">
                                    <div className="flex items-center space-x-4 ">
                                        {/* <div className="w-16 h-16 bg-gray-200 rounded-lg"></div> */}
                                        <img src={item.image} alt={item.title} className="w-16 h-16 rounded object-scale-down" />
                                        <div>
                                            <h3 className="font-semibold">{item.name}</h3>
                                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold">₹{item.price * item.quantity}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{finalAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>₹0</span>
                                </div>
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>₹{finalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                            <button className="w-full bg-purple-800 text-white py-3 rounded-lg font-semibold mt-4 hover:bg-gray-800 transition duration-300">
                                PROCEED TO PAYMENT
                            </button>
                        </div>
                    </div>
                </div>

                {/* <div className="mt-12 border-t pt-6">
                    <h2 className="text-xl font-semibold mb-4">Leather Like Wood</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <h3 className="font-semibold">About Us</h3>
                            <ul className="mt-2 space-y-1">
                                <li>Story</li>
                                <li>Clients</li>
                                <li>Testimonials</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold">Services</h3>
                            <ul className="mt-2 space-y-1">
                                <li>Marketing</li>
                                <li>Consulting</li>
                                <li>Development</li>
                                <li>Design</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold">Contact Us</h3>
                            <ul className="mt-2 space-y-1">
                                <li>United States</li>
                                <li>leatherlikewood@email.com</li>
                                <li>+1 234 567 8900</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold">Socials</h3>
                            <ul className="mt-2 space-y-1">
                                <li>Facebook</li>
                                <li>Instagram</li>
                                <li>Twitter</li>
                            </ul>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Checkout;