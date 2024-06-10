// components/CheckoutButton.jsx
'use client';

import React from 'react';
import { Button } from '@mui/material';
import {createCheckoutSession} from "@/app/services/stripeService";
import { useStore } from '@/app/store/store';

const CheckoutButton = ({user, country, price, jornadaId}) => {
    const loading = useStore((state) => state.loading);
    const paymentData = { userId: user, country: country, price: price, jornadaId: jornadaId};

    const handleCheckout = () => {
        createCheckoutSession(paymentData); // example amount
    };

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={handleCheckout}
            disabled={loading}
        >
            {loading ? 'Processing...' : 'Pagar'}
        </Button>
    );
};

export default CheckoutButton;

