import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
    const { products, currency, cartItems, calculateDeliveryFee, totalPrice, setTotalPrice } = useContext(ShopContext);
    // const [totalPrice, setTotalPrice] = useState({
    //     subtotal: 0,
    //     delivery: 0,
    //     grandTotal: 0
    // });

    useEffect(() => {
        let subtotal = 0;

        // Calculate subtotal
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                const product = products.find(p => p._id === itemId);
                if (product) {
                    subtotal += product.price * cartItems[itemId][size];
                }
            }
        }

        const delivery = calculateDeliveryFee(subtotal);
        const grandTotal = subtotal + delivery;

        setTotalPrice({
            subtotal: parseFloat(subtotal.toFixed(2)),
            delivery: parseFloat(delivery.toFixed(2)),
            grandTotal: parseFloat(grandTotal.toFixed(2))
        });
    }, [cartItems, products, setTotalPrice]);

    return (
        <>
            <div className='max-w-xl ml-auto space-y-4'>
                <div className="text-2xl">
                    <Title title1={'CART'} title2={'TOTALS'} />
                </div>
                <div className='flex flex-col gap-2 '>
                    <div className="flex justify-between items-center">
                        <span className='text-gray-600'>Subtotal:</span>
                        <span className='text-right'>{currency}{totalPrice.subtotal}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className='text-gray-600'>Delivery Fee:</span>
                        <span className='text-right'>{currency}{totalPrice.delivery}</span>
                    </div>


                    <div className="flex justify-between items-center border-t-gray">
                        <span className='font-semibold mt-2'>Grand Total:</span>
                        <span className='text-right font-semibold mt-2'>{currency}{totalPrice.grandTotal}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartTotal