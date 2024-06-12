import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <Box position="relative" display="flex" alignItems="center">
            <IconButton
                onClick={prevImage}
                sx={{ position: 'absolute', left: 0, zIndex: 1 }}
            >
                <ArrowBackIosIcon />
            </IconButton>
            <Box
                component="img"
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                sx={{ width: '100%', height: 'auto' }}
            />
            <IconButton
                onClick={nextImage}
                sx={{ position: 'absolute', right: 0, zIndex: 1 }}
            >
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    );
};

export default Carousel;
