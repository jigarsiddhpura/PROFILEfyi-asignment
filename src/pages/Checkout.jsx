import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AnimatedButton } from '../utility/AnimatedButton';
import Navbar from '../components/Navbar';

const FormSection = ({ title, children }) => (
    <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const FormInput = ({ name, placeholder, type = "text", onChange }) => (
    <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded"
        onChange={onChange}
    />
);

const OrderSummary = ({ cart, finalAmount }) => (
    <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
            {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <img src={item.image} alt={item.title} className="w-16 h-16 rounded object-cover" />
                        <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                    </div>
                    <p className="font-semibold">₹{item.price * item.quantity}</p>
                </div>
            ))}
            <div className="border-t pt-4 mt-4">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{finalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹0</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-2">
                    <span>Total</span>
                    <span>₹{finalAmount.toFixed(2)}</span>
                </div>
            </div>
        </div>
    </div>
);

const Checkout = () => {
    const { cart } = useSelector((state) => state.cart);
    const location = useLocation();
    const finalAmount = location.state?.finalAmount;

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        address: '', city: '', zipCode: '',
        cardNumber: '', cardName: '', expiryDate: '', cvv: '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="bg-slate-900">
                <Navbar showSearchBar={false} />
            </div>
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="bg-white rounded-lg shadow-2xl p-6">
                    <h1 className="text-3xl md:text-4xl font-semibold mb-6">Checkout</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <FormSection title="Customer Info">
                                <FormInput name="firstName" placeholder="First Name" onChange={handleInputChange} />
                                <FormInput name="lastName" placeholder="Last Name" onChange={handleInputChange} />
                                <FormInput name="email" placeholder="Email" type="email" onChange={handleInputChange} />
                                <FormInput name="phone" placeholder="Phone" type="tel" onChange={handleInputChange} />
                            </FormSection>

                            <FormSection title="Shipping Address">
                                <FormInput name="address" placeholder="Address" onChange={handleInputChange} />
                                <FormInput name="city" placeholder="City" onChange={handleInputChange} />
                                <FormInput name="zipCode" placeholder="Zip Code" onChange={handleInputChange} />
                            </FormSection>

                            <FormSection title="Payment">
                                <div className="flex space-x-2 mb-4">
                                    <div className="px-2 py-1 bg-gray-200 rounded text-sm">Rupay</div>
                                    <div className="px-2 py-1 bg-gray-200 rounded text-sm">Visa</div>
                                </div>
                                <FormInput name="cardNumber" placeholder="Card Number" onChange={handleInputChange} />
                                <FormInput name="cardName" placeholder="Name on Card" onChange={handleInputChange} />
                                <div className="flex space-x-4">
                                    <FormInput name="expiryDate" placeholder="MM/YY" onChange={handleInputChange} />
                                    <FormInput name="cvv" placeholder="CVV" onChange={handleInputChange} />
                                </div>
                            </FormSection>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-4">Your Purchases</h2>
                            <OrderSummary cart={cart} finalAmount={finalAmount} />
                            <div className="mt-6">
                                <AnimatedButton>
                                    PROCEED TO PAYMENT
                                </AnimatedButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;