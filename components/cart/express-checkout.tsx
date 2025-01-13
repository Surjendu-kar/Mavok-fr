import Image from 'next/image';

export default function ExpressCheckout() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-secondary-light text-md font-bold">Express Checkout</p>

      <div className="flex flex-col gap-4">
        <button className="flex items-center bg-background justify-center gap-3 w-full border border-gray-200 py-4 rounded-lg hover:bg-gray-50 transition-colors">
          <Image
            src="/payement-methods/paypal.svg"
            alt="Paypal"
            width={20}
            height={20}
            className="w-[20px] h-[20px]"
          />
          <span className="font-bold uppercase">PayPal</span>
        </button>

        <button className="flex items-center bg-background justify-center gap-3 w-full border border-gray-200 py-4 rounded-lg hover:bg-gray-50 transition-colors">
          <Image
            src="/payement-methods/amazon-pay.svg"
            alt="Amazon Pay"
            width={24}
            height={24}
            className="w-[24px] h-[24px]"
          />
          <span className="font-bold uppercase">Amazon Pay</span>
        </button>
      </div>
    </div>
  );
}
