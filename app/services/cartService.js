import { useStore } from '../store/store'; // Ensure you import the correct store

export const getCart = async (formData) => {
    const setCart = useStore.getState().setCart;
    const setPrice = useStore.getState().setPrice;
    const setTotal = useStore.getState().setTotal;
    const setQuantity = useStore.getState().setQuantity;
    const setTotalString = useStore.getState().setTotalString;
    const setFree = useStore.getState().setFree;


    try {
        const response = await fetch('/api/cart/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const cart = await response.json();
            setCart(cart.quinielas);
            setPrice(cart.price)
            setTotal(cart.total)
            setQuantity(cart.quantity)
            setFree(cart.free)
            setTotalString(cart.totalString)
            return cart;
        } else {
            throw new Error('Failed to update jornada');
        }
    } catch (error) {
        console.error('Error updating jornada:', error);
        return null;
    }
};