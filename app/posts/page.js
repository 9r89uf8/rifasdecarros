'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Button, Grid, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { fetchPosts, deletePost } from "@/app/services/postService";
import { useStore } from '@/app/store/store';
import Carousel from "@/app/components/carousel";
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

const Posts = () => {
    const posts = useStore((state) => state.posts);
    const router = useRouter();

    useEffect(() => {
        const loadPost = async () => {
            await fetchPosts()
        }
        loadPost();
    }, []);

    const handleDelete = async (id) => {
        await deletePost(id);
    };

    const handleEnterRaffle = (id) => {
        router.push(`/posts/${id}`);
    };

    const calculateTimeLeft = (expiryDate) => {
        const difference = new Date(expiryDate._seconds * 1000) - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                días: Math.floor(difference / (1000 * 60 * 60 * 24)),
                horas: Math.floor((difference / (1000 * 60 * 60)) % 24)
            };
        }

        return timeLeft;
    };

    const CountdownTimer = ({ expiryDate }) => {
        const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expiryDate));

        useEffect(() => {
            const timer = setTimeout(() => {
                setTimeLeft(calculateTimeLeft(expiryDate));
            }, 3600000);

            return () => clearTimeout(timer);
        });

        const timerComponents = [];

        Object.keys(timeLeft).forEach((interval) => {
            if (!timeLeft[interval]) {
                return;
            }

            timerComponents.push(
                <span key={interval}>
                    {timeLeft[interval]} {interval}{" "}
                </span>
            );
        });

        return (
            <Typography variant="h5" color="textSecondary">
                La rifa se cierra en: {timerComponents.length ? timerComponents : <span>Expired</span>}
            </Typography>
        );
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Posts
            </Typography>
            {posts && posts.length > 0 && posts.map((post) => (
                <Card key={post.id} sx={{ marginBottom: '1rem' }}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {post.title}
                        </Typography>
                        <Typography variant="body2" component="p" sx={{ marginBottom: '1rem' }}>
                            {post.content}
                        </Typography>
                        {post.images && post.images.length > 0 && (
                            <Carousel images={post.images} />
                        )}
                        <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
                            <Grid item xs={6}>
                                <Typography variant="h5" color="textSecondary">
                                    Precio: ${post.price}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <CountdownTimer expiryDate={post.expiryDate} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" color="textSecondary">
                                    Boletos Disponibles
                                </Typography>
                                <BorderLinearProgress
                                    variant="determinate"
                                    value={(post.ticketsSold / post.ticketsAvailable) * 100}
                                    sx={{ marginTop: '0.5rem' }}
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleEnterRaffle(post.id)}
                            >
                                Comprar Boleto
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
};

export default Posts;


