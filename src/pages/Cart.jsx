import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import CouponModal from "../components/CouponModal";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { applyCoupon, removeCoupon } from "../redux/Slices/CartSlice";
import { toast } from 'react-hot-toast';
import { MdOutlineLocalOffer } from "react-icons/md";
import Checkout from "./Checkout";


const PriceDetails = ({ totalAmount, appliedCoupons, discountAmount, finalAmount }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <span className="text-gray-600">Total MRP</span>
      <span className="font-semibold">₹{totalAmount.toFixed(2)}</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-gray-600">Discount on MRP</span>
      <span className="font-semibold text-green-600">- ₹{(totalAmount * 0.1).toFixed(2)}</span>
    </div>
    {appliedCoupons.length > 0 && (
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Coupon Discount</span>
        <span className="font-semibold text-green-600">- ₹{discountAmount.toFixed(2)}</span>
      </div>
    )}
    <div className="border-t border-gray-200 my-4"></div>
    <div className="flex justify-between items-center font-semibold text-lg">
      <span>Total Amount</span>
      <span>₹{finalAmount.toFixed(2)}</span>
    </div>
  </div>
);

const ApplyCoupons = ({ appliedCoupons, setIsCouponModalOpen }) => {
  return (
    <>
      <div className="flex gap-4 align-middle mt-2 py-3 border-b-2 border-b-slate-200">
        <div className="pt-2 pl-2 w-[10%]">
          <MdOutlineLocalOffer />
        </div>
        <span className="pt-1 w-[50%]">{appliedCoupons.length > 0 ? `${appliedCoupons.length} coupon applied` : "Apply coupon"}</span>
        <button
          className="border border-purple-500 py-1 w-[40%]"
          onClick={() => setIsCouponModalOpen(true)}
        >
          {appliedCoupons.length > 0 ? "EDIT" : "APPLY"}
        </button>
      </div>
    </>
  )
}

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [appliedCoupons, setAppliedCoupons] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0));
  }, [cart]);

  const handleApplyCoupon = (selectedCoupon) => {
    if (totalAmount < selectedCoupon.minPurchase) {
      console.log("Minimum purchase not met");
      toast.error(`Minimum purchase of ₹${selectedCoupon.minPurchase} required to apply this coupon.`);
      return;
    }
    setAppliedCoupons([...appliedCoupons, selectedCoupon]);
    dispatch(applyCoupon(selectedCoupon));
    toast.success("Coupon applied successfully!");
  };

  const handleRemoveCoupon = (couponToRemove) => {
    setAppliedCoupons(appliedCoupons.filter(coupon => coupon.code !== couponToRemove.code));
    dispatch(removeCoupon(couponToRemove));
    toast.success("Coupon removed successfully!");
  };

  const calculateDiscount = () => {
    return appliedCoupons.reduce((total, coupon) => {
      if (coupon.type === 'fixed') {
        return total + coupon.discount;
      } else {
        return total + (totalAmount * coupon.discount / 100);
      }
    }, 0);
  };

  const discountAmount = calculateDiscount();
  const finalAmount = totalAmount - (totalAmount * 0.1) - discountAmount;

  const handleCheckout = () => {
    navigate('/checkout', {state: {finalAmount}})
  };

  if (cart.length === 0) {
    return (
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
    );
  }

  if (isCheckout) {
    return <Checkout finalAmount={finalAmount} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8 mx-48 p-10">
        <div className="lg:w-2/3 space-y-6">
          <h2 className="text-2xl font-medium mb-4">Product Details</h2>
          {cart.map((item, index) => (
            <CartItem key={item.id} item={item} itemIndex={index} />
          ))}
        </div>
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6 border border-gray-300">
            <h2 className="text-2xl font-medium mb-6">
              Price Details ({cart.reduce((acc, item) => acc + item.quantity, 0)} Items)
            </h2>
            <PriceDetails
              totalAmount={totalAmount}
              appliedCoupons={appliedCoupons}
              discountAmount={discountAmount}
              finalAmount={finalAmount}
            />
            <ApplyCoupons appliedCoupons={appliedCoupons} setIsCouponModalOpen={setIsCouponModalOpen} />
            <p className="text-xs text-gray-500 mt-4 mb-6">
              Clicking on 'Place Order' will not deduct any money
            </p>
              <button className="w-full bg-purple-600 text-white py-3 rounded font-semibold hover:bg-purple-700 transition duration-300"
              onClick={handleCheckout}>
                PLACE ORDER
              </button>
            <div className="flex items-center mt-6 bg-blue-50 p-4 rounded">
              <AiFillSafetyCertificate className="mr-4 size-14 text-blue-600" />
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
      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={() => setIsCouponModalOpen(false)}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        appliedCoupons={appliedCoupons}
        totalAmount={totalAmount}
      />
    </div>
  );
};

export default Cart;