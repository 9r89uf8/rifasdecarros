'use client';

import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import { createPost } from '@/app/services/postService';

const CreatePost = () => {
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        images: [],
        videos: [],
        price: '',
        dealPrice: '',
        dealQuantity: '',
        ticketsAvailable: '',
        message: '',
        expiryDate: '',
        amount1kWinners: '',
        amount500Winners: '',
    });
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedVideos, setSelectedVideos] = useState([]);
    const router = useRouter();

    const handleInputChange = (event) => {
        setPostData({ ...postData, [event.target.name]: event.target.value });
    };

    const handleImagesChange = (event) => {
        let files = Array.from(event.target.files);
        setPostData((prevData) => ({ ...prevData, images: [...prevData.images, ...files] }));
        setSelectedImages((prevImages) => [...prevImages, ...files.map(file => URL.createObjectURL(file))]);
    };

    const handleVideosChange = (event) => {
        let files = Array.from(event.target.files);
        setPostData((prevData) => ({ ...prevData, videos: [...prevData.videos, ...files] }));
        setSelectedVideos((prevVideos) => [...prevVideos, ...files.map(file => URL.createObjectURL(file))]);
    };

    const handleDeleteImage = (index) => {
        setPostData((prevData) => ({ ...prevData, images: prevData.images.filter((_, i) => i !== index) }));
        setSelectedImages(selectedImages.filter((_, i) => i !== index));
    };

    const handleDeleteVideo = (index) => {
        setPostData((prevData) => ({ ...prevData, videos: prevData.videos.filter((_, i) => i !== index) }));
        setSelectedVideos(selectedVideos.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('title', postData.title);
        formData.append('content', postData.content);
        formData.append('price', postData.price);
        formData.append('dealPrice', postData.dealPrice);
        formData.append('dealQuantity', postData.dealQuantity);
        formData.append('ticketsAvailable', postData.ticketsAvailable);
        formData.append('message', postData.message);
        formData.append('expiryDate', postData.expiryDate);
        formData.append('amount1kWinners', postData.amount1kWinners);
        formData.append('amount500Winners', postData.amount500Winners);

        postData.images.forEach((image, index) => {
            formData.append('images', image);
        });
        postData.videos.forEach((video, index) => {
            formData.append('videos', video);
        });

        try {
            const addedPost = await createPost(formData);
            if (addedPost) {
                router.push('/posts');
            }
        } catch (error) {
            console.log('error');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Create Post
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                    name="title"
                    label="Title"
                    value={postData.title}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="content"
                    label="Content"
                    value={postData.content}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                />
                <TextField
                    name="price"
                    label="Price"
                    type="number"
                    value={postData.price}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="dealPrice"
                    label="dealPrice"
                    type="number"
                    value={postData.dealPrice}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="dealQuantity"
                    label="dealQuantity"
                    type="number"
                    value={postData.dealQuantity}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="ticketsAvailable"
                    label="Tickets Available"
                    type="number"
                    value={postData.ticketsAvailable}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="message"
                    label="Message"
                    value={postData.message}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="expiryDate"
                    label="Expiry Date"
                    type="date"
                    value={postData.expiryDate}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    name="amount1kWinners"
                    label="Amount $1k Winners"
                    type="number"
                    value={postData.amount1kWinners}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="amount500Winners"
                    label="Amount $500 Winners"
                    type="number"
                    value={postData.amount500Winners}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <Box sx={{ mb: 2 }}>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="postImages"
                        type="file"
                        onChange={handleImagesChange}
                        multiple
                    />
                    <label htmlFor="postImages">
                        <Button variant="outlined" component="span">
                            Upload Images
                        </Button>
                    </label>
                </Box>
                {selectedImages.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt="preview" height="100" />
                        <Button onClick={() => handleDeleteImage(index)}>Delete</Button>
                    </div>
                ))}
                <Box sx={{ mb: 2 }}>
                    <input
                        accept="video/*"
                        style={{ display: 'none' }}
                        id="postVideos"
                        type="file"
                        onChange={handleVideosChange}
                        multiple
                    />
                    <label htmlFor="postVideos">
                        <Button variant="outlined" component="span">
                            Upload Videos
                        </Button>
                    </label>
                </Box>
                {selectedVideos.map((video, index) => (
                    <div key={index}>
                        <video src={video} height="100" controls />
                        <Button onClick={() => handleDeleteVideo(index)}>Delete</Button>
                    </div>
                ))}
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Create
                </Button>
            </Box>
        </Container>
    );
};

export default CreatePost;



