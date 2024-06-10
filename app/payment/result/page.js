// pages/result.jsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, CircularProgress } from '@mui/material';
import { useStore } from '@/app/store/store';
import { verifySession } from '@/app/services/stripeService';

const page = () => {
    const router = useRouter();
    const loading = useStore((state) => state.loading);
    const status = useStore((state) => state.status);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const sessionId = queryParams.get('session_id');

        if (sessionId) {
            verifySession(sessionId);
        } else {
            useStripeStore.getState().setStatus('cancel');
            useStripeStore.getState().setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <Container maxWidth="sm">
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            {status === 'success' ? (
                <Typography variant="h4" component="h1" gutterBottom>
                    Payment Successful!
                </Typography>
            ) : (
                <Typography variant="h4" component="h1" gutterBottom>
                    Payment Canceled
                </Typography>
            )}
        </Container>
    );
};

export default page;
