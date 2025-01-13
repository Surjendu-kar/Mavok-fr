import CartHeader from '@/components/cart/cart-header';
import CartItems from '@/components/cart/cart-items';
import OrderSummary from '@/components/cart/order-summary';
import ExpressCheckout from '@/components/cart/express-checkout';
import { PaymentPartners } from '@/components/common/payment-partners';

export default function CartPage() {
  return (
    <div className="text-black flex flex-col mt-14 lg:mt-16 bg-secondary min-h-screen">
      <div className="flex flex-col px-5 lg:px-20 py-5 lg:py-10 gap-6">
        {/* Header */}
        <CartHeader />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Items List */}
          <div className="flex-grow">
            <CartItems />
          </div>

          <div className="flex flex-col gap-4">
            {/* Order Summary */}
            <OrderSummary />

            <hr className="border-[#E5E5E5] my-2" />

            {/* Express Checkout */}
            <ExpressCheckout />

            <hr className="border-[#E5E5E5] my-2" />

            {/* payment icons */}
            <div className="flex flex-col justify-center items-center gap-1 lg:gap-2">
              <p className="text-primary font-bold uppercase text-sm">
                PAYMENT METHODS WE ACCEPT
              </p>
              <PaymentPartners />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
