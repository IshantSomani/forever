import { createContext, useCallback, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from 'react-toastify';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopeContextProvider = ({ children }) => {

    const currency = '₹';
    const delivery_fee = 50;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const [totalPrice, setTotalPrice] = useState({
        subtotal: 0,
        delivery: 0,
        grandTotal: 0
    });

    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Please select a product size');
            return;
        }

        const cartData = { ...cartItems };

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = { [size]: 1 };
        }
        setCartItems(cartData);

        if (token) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/cart/addItem`,
                    { itemId, size },
                    { headers: { token } }
                );
                if (response.status === 200 || response.status === 201) {
                    toast.success('Item added to cart');
                } else {
                    toast.error('Failed to add item to cart');
                }
            } catch (error) {
                console.error('Failed to add item to cart:', error);
                toast.error(error?.response?.data?.message || 'Failed to add item to cart');
            }
        }
    }

    const removeFromCart = async (itemId, size, quantity = 1) => {
        if (!cartItems[itemId] || !cartItems[itemId][size]) return;

        try {
            if (token) {
                const response = await axios.delete(
                    `${import.meta.env.VITE_BACKEND_URI}/cart/removeItem`,
                    {
                        data: { itemId, size, quantity },
                        headers: { token }
                    }
                );

                if (response.status === 200 || response.status === 201) {
                    toast.info(`${quantity} item(s) removed from cart`);

                    setCartItems(prevCartItems => {
                        const updatedCart = { ...prevCartItems };

                        if (updatedCart[itemId] && updatedCart[itemId][size]) {

                            // Decrease quantity, but prevent negative values
                            updatedCart[itemId][size] = Math.max(0, updatedCart[itemId][size] - quantity);

                            // If quantity reaches zero, remove the size entry
                            if (updatedCart[itemId][size] === 0) {
                                delete updatedCart[itemId][size];

                                // If no sizes left, remove item completely
                                if (Object.keys(updatedCart[itemId]).length === 0) {
                                    delete updatedCart[itemId];
                                }
                            }
                        }

                        return updatedCart;
                    });
                } else {
                    toast.error('Failed to remove item from cart');
                }
            } else {

                // If no token, update local cart state
                setCartItems(prevCartItems => {
                    const updatedCart = { ...prevCartItems };

                    if (updatedCart[itemId] && updatedCart[itemId][size]) {
                        updatedCart[itemId][size] = Math.max(0, updatedCart[itemId][size] - quantity);

                        if (updatedCart[itemId][size] === 0) {
                            delete updatedCart[itemId][size];

                            if (Object.keys(updatedCart[itemId]).length === 0) {
                                delete updatedCart[itemId];
                            }
                        }
                    }

                    return updatedCart;
                });

                toast.info(`${quantity} item(s) removed from cart (local storage)`);
            }
        } catch (error) {
            console.error('Failed to remove item from cart:', error);
            toast.error(error?.response?.data?.message || 'Failed to remove item from cart');
        }
    };


    const getCartData = async (token) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/cart/getCart`,
                { headers: { token } }
            );
            if (response.status === 200 || response.status === 201) {
                setCartItems(response.data.data);
            } else {
                toast.error('Failed to fetch cart data');
            }
        } catch (error) {
            console.error('Failed to fetch cart data:', error);
            toast.error(error?.response?.data?.message || 'Failed to fetch cart data');
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            const sizes = cartItems[itemId];
            for (const size in sizes) {
                const quantity = sizes[size];
                if (quantity > 0) {
                    totalCount += quantity;
                }
            }
        }
        return totalCount;
    }

    const getProductsData = useCallback(async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/products/allProduct`);

            if (response.data?.message) {
                setProducts(response.data.data);
            } else {
                toast.error(response.data?.message || 'Failed to fetch products')
            }
        } catch (error) {
            console.error('Fetch error:', error)
            toast.error(error.response?.data?.message || error.message || 'Something went wrong')
        }
    }, [])

    useEffect(() => {
        getProductsData();
    }, [getProductsData]);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getCartData(localStorage.getItem('token'));
        }
    }, [token]);


    const calculateDeliveryFee = (subtotal) => {
        if (subtotal === 0) return 0;
        if (subtotal >= 4000) return 0; // Free delivery over ₹4000
        if (subtotal >= 3000) return 5;  // Reduced fee over ₹3000
        if (subtotal >= 2000) return 10;  // Reduced fee over ₹2000
        if (subtotal >= 1000) return 20;  // Reduced fee over ₹1000
        return delivery_fee; // Base fee
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
        navigate('/login')
        toast.success('Logged out successfully');
    }

    const value = {
        products,
        currency,
        delivery_fee,
        search, setSearch,
        showSearch, setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        removeFromCart,
        logout,
        calculateDeliveryFee,
        token, setToken,
        setCartItems,
        totalPrice, setTotalPrice
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopeContextProvider;