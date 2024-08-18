import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const CouponModal = ({ isOpen, onClose, onApplyCoupon, onRemoveCoupon, appliedCoupons, totalAmount }) => {
    const [couponCode, setCouponCode] = useState('');
    const [totalSavings, setTotalSavings] = useState(0);

    const coupons = [
        { code: 'AURALIS300', discount: 301, type: 'fixed', minPurchase: 1199, expiryDate: '30th September 2024' },
        { code: 'MUSTTAKE10', discount: 10, type: 'percentage', minPurchase: 749, expiryDate: '31st October 2024' },
    ];

    useEffect(() => {
        const savings = appliedCoupons.reduce((total, coupon) => {
            return total + (coupon.type === 'fixed' ? coupon.discount : (totalAmount * coupon.discount / 100));
        }, 0);
        setTotalSavings(savings);
    }, [appliedCoupons, totalAmount]);

    const handleApply = () => {
        const selectedCoupon = coupons.find(coupon => coupon.code === couponCode);
        if (selectedCoupon) {
            onApplyCoupon(selectedCoupon);
            setCouponCode('');
        }
    };

    const handleRemove = (couponToRemove) => {
        onRemoveCoupon(couponToRemove);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">COUPONS</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <AiOutlineClose size={24} />
                    </button>
                </div>

                {appliedCoupons.length > 0 && (
                    <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">{appliedCoupons.length} Coupons applied</span>
                            <span className="text-green-600">You saved additional ₹{totalSavings.toFixed(2)}</span>
                        </div>
                        {appliedCoupons.map((coupon) => (
                            <div key={coupon.code} className="mt-2 flex justify-between items-center">
                                <span>{coupon.code}</span>
                                <button
                                    onClick={() => handleRemove(coupon)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Enter coupon code"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                    />
                </div>
                <button
                    className="mb-4 w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
                    onClick={handleApply}
                >
                    APPLY
                </button>

                <div className="space-y-4">
                    <h3 className="font-semibold">Available Coupons</h3>
                    {coupons.map((coupon) => (
                        <div key={coupon.code} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">{coupon.code}</span>
                                <button
                                    onClick={() => setCouponCode(coupon.code)}
                                    className="text-purple-500 hover:-700"
                                >
                                    APPLY
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                Save ₹{coupon.type === 'fixed' ? coupon.discount : `${coupon.discount}%`}
                            </p>
                            <p className="text-xs text-gray-500">
                                {coupon.type === 'fixed'
                                    ? `₹${coupon.discount} off on minimum purchase of ₹${coupon.minPurchase}`
                                    : `${coupon.discount}% off on minimum purchase of ₹${coupon.minPurchase}`}
                            </p>
                            <p className="text-xs text-gray-500">Expires on: {coupon.expiryDate}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CouponModal;