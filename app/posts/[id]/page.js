'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Container, Typography, Card, CardContent, Button, Grid, Box, List, ListItem, ListItemText } from '@mui/material';
import { fetchPostById } from '@/app/services/postService';
import Carousel from '@/app/components/carousel';
import CheckoutButton from "@/app/components/CheckoutButton";
import { useStore } from '@/app/store/store';
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

const WinnerListItem = styled(ListItem)(({ theme, prizetype }) => {
    let backgroundColor;
    switch (prizetype) {
        case 'car':
            backgroundColor = 'linear-gradient(45deg, #0077b6 30%, #00b4d8 90%)';
            break;
        case '1k':
            backgroundColor = 'linear-gradient(45deg, #57cc99 30%, #80ed99 90%)';
            break;
        case '500':
            backgroundColor = 'linear-gradient(45deg, #adb5bd 30%, #ced4da 90%)';
            break;
        default:
            backgroundColor = 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)';
    }

    return {
        background: backgroundColor,
        borderRadius: theme.shape.borderRadius,
        color: '#343a40',
        marginBottom: theme.spacing(1),
        justifyContent: 'center',
        textAlign: 'center',
        '&:hover': {
            background: backgroundColor,
        },
    };
});

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const user = useStore((state) => state.user);

    useEffect(() => {
        if (id) {
            fetchPostById(id).then((data) => {
                setPost(data);
            });
        }
    }, [id]);

    const calculateTimeLeft = (expiryDate) => {
        const difference = new Date(expiryDate._seconds * 1000) - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24)
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
        }, [expiryDate]);

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
            <Typography variant="h6" color="textSecondary" textAlign="center">
                La rifa se cierra en: {timerComponents.length ? timerComponents : <span>Expired</span>}
            </Typography>
        );
    };

    const renderWinnersList = () => {
        const winnersList = [];
        winnersList.push({ text: "1 lugar: Gana un coche", type: 'car' });
        for (let i = 1; i <= post.amount1kWinners; i++) {
            winnersList.push({ text: `${i + 1} lugar: Gana $1000`, type: '1k' });
        }
        for (let i = 1; i <= post.amount500Winners; i++) {
            winnersList.push({ text: `${post.amount1kWinners + i + 1} lugar: Gana $500`, type: '500' });
        }
        return winnersList;
    };

    if (!post) {
        return (
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>
                    Loading...
                </Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Card sx={{ marginBottom: '1rem', padding: '1rem' }}>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {post.title}
                    </Typography>
                    <Typography variant="body1" component="p" sx={{ marginBottom: '1.5rem' }}>
                        {post.content}
                    </Typography>
                    {post.images && post.images.length > 0 && (
                        <Carousel images={post.images} />
                    )}
                    <Grid container spacing={2} sx={{ marginTop: '1.5rem' }}>
                        <Grid item xs={12}>
                            <CountdownTimer expiryDate={post.expiryDate} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" color="textSecondary" sx={{ marginBottom: '0.5rem', textAlign: 'center' }}>
                                ${post.price} por 1 Boleto
                            </Typography>
                            {/*<Button*/}
                            {/*    variant="contained"*/}
                            {/*    color="primary"*/}
                            {/*    fullWidth*/}
                            {/*    onClick={() => alert(`Purchasing 1 ticket for post with id: ${id}`)}*/}
                            {/*    sx={{ marginBottom: '1rem' }}*/}
                            {/*>*/}
                            {/*    Comprar 1 Boleto*/}
                            {/*</Button>*/}
                            <CheckoutButton quantity={1} price={post.price} country={user?user.country:null} user={user?user.uid:null} raffleId={post.id} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" color="textSecondary" sx={{ marginBottom: '0.5rem', textAlign: 'center' }}>
                                ${post.dealPrice} por {post.dealQuantity} Boletos
                            </Typography>
                            {/*<Button*/}
                            {/*    variant="contained"*/}
                            {/*    color="primary"*/}
                            {/*    fullWidth*/}
                            {/*    onClick={() => alert(`Purchasing ${post.dealQuantity} tickets for post with id: ${id}`)}*/}
                            {/*    sx={{ marginBottom: '1rem' }}*/}
                            {/*>*/}
                            {/*    Comprar {post.dealQuantity} Boletos*/}
                            {/*</Button>*/}
                            <CheckoutButton quantity={post.dealQuantity} price={post.dealPrice} country={user?user.country:null} user={user?user.uid:null} raffleId={post.id} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" color="textSecondary" textAlign="center">
                                Boletos Disponibles
                            </Typography>
                            <BorderLinearProgress
                                variant="determinate"
                                value={(post.ticketsSold / post.ticketsAvailable) * 100}
                                sx={{ marginTop: '0.5rem' }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card sx={{ padding: '1rem' }}>
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom style={{textAlign: 'center'}}>
                        Premios para los ganadores
                    </Typography>
                    <List>
                        {renderWinnersList().map((winner, index) => (
                            <WinnerListItem key={index} prizetype={winner.type}>
                                <ListItemText
                                    primary={winner.text}
                                    primaryTypographyProps={{
                                    fontSize: 20,
                                    fontWeight: 'medium'}}
                                    sx={{ textAlign: 'center' }}
                                />
                            </WinnerListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Post;






