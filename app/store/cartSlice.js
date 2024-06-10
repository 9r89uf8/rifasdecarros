// store/postSlice.js
export const createCartSlice = (set) => ({
    cart: null,
    price: 0,
    quantity: 0,
    total: 0,
    free: 0,
    totalString: 0,
    loadingCart: false,
    clearCart: () => set({ cart: null, price: 0, quantity: 0, total: 0, totalString: 0, free: 0 }),
    setCart: (cart) => set({ cart }),
    setPrice: (price) => set({ price }),
    setFree: (free) => set({ free }),
    setQuantity: (quantity) => set({ quantity }),
    setTotal: (total) => set({ total }),
    setTotalString: (totalString) => set({ totalString }),
    setLoadingCart: (loadingCart) => set({ loadingCart })
});