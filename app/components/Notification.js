'use client';

import React, { useEffect } from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { useStore } from '@/app/store/store'; // Ensure this path is correct according to your structure

const Notification = ({ id, type, message }) => {
    const removeNotification = useStore((state) => state.removeNotification);

    useEffect(() => {
        const timer = setTimeout(() => {
            removeNotification(id);
        }, 5000);

        return () => clearTimeout(timer);
    }, [id, removeNotification]);

    return (
        <Alert severity={type} onClose={() => removeNotification(id)}>
            <AlertTitle>{type.charAt(0).toUpperCase() + type.slice(1)}</AlertTitle>
            {message}
        </Alert>
    );
};

export default Notification;

