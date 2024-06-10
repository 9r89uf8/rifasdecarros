'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Button, CircularProgress, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import {fetchPosts, deletePost} from "@/app/services/postService";
import { useStore } from '@/app/store/store';


const Posts = () => {
    const posts = useStore((state) => state.posts);
    const router = useRouter();

    useEffect(() => {
        if(!posts){
            let i = fetchPosts();
        }

    }, []);


    const handleDelete = async (id) => {
        let result = await (deletePost(id))
    };




    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Posts
            </Typography>
            {posts&&posts.length&&posts.map((post) => (
                <Card key={post.id} style={{ marginBottom: '1rem' }}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {post.title}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {post.content}
                        </Typography>
                        <Button onClick={() => router.push(`/edit-post/${post.id}`)} variant="contained" color="primary">
                            Edit
                        </Button>
                        <Button onClick={() => handleDelete(post.id)} variant="contained" color="secondary">
                            Delete
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
};

export default Posts;
