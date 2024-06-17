// components/CheckoutButton.jsx
'use client';

import React from 'react';
import { Button } from '@mui/material';
import {createCheckoutSession} from "@/app/services/stripeService";
import { useStore } from '@/app/store/store';

const CheckoutButton = ({user, country, price, raffleId, quantity}) => {
    const loading = useStore((state) => state.loading);
    const paymentData = { ticketTotal: quantity, userId: user, country: country, price: price, postId: raffleId};

    const handleCheckout = () => {
        createCheckoutSession(paymentData); // example amount
    };

    return (
        <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginBottom: '1rem' }}
            onClick={handleCheckout}
            disabled={loading}
        >
            {loading ? 'Processing...' : `Comprar ${quantity} Boletos`}
        </Button>
    );
};

export default CheckoutButton;

