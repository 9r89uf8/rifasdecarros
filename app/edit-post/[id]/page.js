'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Container, TextField, Button, Typography, CircularProgress, Alert } from '@mui/material';
import {fetchPostById, editPost} from "@/app/services/postService";
import { useStore } from '@/app/store/store';

const EditPost = () => {
    const router = useRouter();
    const { id } = useParams();
    const posts = useStore((state) => state.posts);


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        let i = fetchPostById(id)
    }, []);

    useEffect(() => {
        const post = posts.find(post => post.id === id);
        if (post) {
            setTitle(post.title);
            setContent(post.content);
        }
    }, [posts, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let post = {title, content}
        let updatedPost = await editPost(id,post)
        if (updatedPost) {
            router.push('/posts');
        }

    };


    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Edit Post
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Update
                </Button>
            </form>
        </Container>
    );
};

export default EditPost;


