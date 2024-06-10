'use client';

import React, { useEffect } from 'react';
import { useStore } from '@/app/store/store';
import { useRouter } from 'next/navigation';
import CheckoutButton from '@/app/components/CheckoutButton';
import FreeQuinielasButton from "@/app/components/FreeQuinielasButton";
import SingleQuiniela from '@/app/components/quinielas/SingleQuiniela';
import { getCart } from "@/app/services/cartService";
import { fetchLatestJornada } from "@/app/services/jornadaService";
import {
    Box,
    Button,
    Typography,
    Paper,
    Divider,
    Grid,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    background: '#ffffff',
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(3),
}));

const Cart = () => {
    const user = useStore((state) => state.user);
    const jornada = useStore((state) => state.jornada);
    const buyJornada = useStore((state) => state.buyJornada);
    const userCart = useStore((state) => state.cart);
    const quantity = useStore((state) => state.quantity);
    const free = useStore((state) => state.free);
    const totalString = useStore((state) => state.totalString);
    const router = useRouter();


    const allowedCountries = ['US', 'MX'];

    useEffect(() => {
        const loadJornadaAndQuinielas = async () => {
            try {
                const latestJornada = await fetchLatestJornada();
                if (user) {
                    const cartData = await getCart({ jornada: buyJornada ? buyJornada : latestJornada, user: user });
                }
            } catch (error) {
                console.error('Error loading jornada and quinielas:', error);
            }
        };

        if (user) {
            loadJornadaAndQuinielas();
        }
    }, [user]);

    const handleNavigate = () => {
        router.push('/register'); // Replace '/register' with the path you want to navigate to
    };

    const handleClick = () => {
        router.push('/add'); // Replace '/add' with the path you want to navigate to
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Item elevation={6}>
                <Typography variant="h5" component="h2" gutterBottom style={{ color: '#333', fontFamily: '"Roboto", sans-serif' }}>
                    Compra Total
                </Typography>
                <div style={{ margin: 10 }}>
                    <Divider>
                        <ShoppingCartIcon />
                    </Divider>
                </div>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item sm={6} lg={6} xs={6}>
                        <Typography variant="h5" gutterBottom>
                            Quinielas
                        </Typography>
                    </Grid>

                    <Grid item sm={6} lg={6} xs={6}>
                        <Typography variant="h5" gutterBottom>
                            {quantity}
                        </Typography>
                    </Grid>

                    <Grid item sm={6} lg={6} xs={6}>
                        <Typography variant="h5" gutterBottom>
                            Gratis
                        </Typography>
                    </Grid>

                    <Grid item sm={6} lg={6} xs={6}>
                        <Typography variant="h5" gutterBottom>
                            {free}
                        </Typography>
                    </Grid>

                    <Grid item sm={6} lg={6} xs={6}>
                        <Typography variant="h5" gutterBottom>
                            Total
                        </Typography>
                    </Grid>
                    <Grid item sm={6} lg={6} xs={6}>
                        <Typography variant="h5" gutterBottom>
                            ${totalString}
                        </Typography>
                    </Grid>
                    <Grid item sm={12} lg={9} xs={12}>
                        {user ? (
                            allowedCountries.includes(user.country) ? (
                                <Box mt={2}>
                                    <div>
                                        <Button
                                            onClick={handleClick}
                                            style={{
                                                backgroundImage: 'linear-gradient(45deg, #2b9348, #007f5f)',
                                                color: 'white',
                                                padding: '10px 20px',
                                                marginBottom: 12,
                                                borderRadius: '20px',
                                                fontWeight: 'bold',
                                                fontSize: 17
                                            }}
                                        >
                                            agregar otra quiniela
                                        </Button>
                                    </div>

                                    {userCart && userCart.length > 0 && (
                                        <>
                                            {userCart.total > 0 ? (
                                                <CheckoutButton price={buyJornada ? buyJornada.price : jornada.price} country={user.country} user={user.uid} jornadaId={buyJornada ? buyJornada.id : jornada.id} />
                                            ) : (
                                                <FreeQuinielasButton price={buyJornada ? buyJornada.price : jornada.price} country={user.country} user={user.uid} jornadaId={buyJornada ? buyJornada.id : jornada.id} />
                                            )}
                                        </>
                                    )}
                                </Box>
                            ) : (
                                <Typography variant="h6" style={{ textAlign: 'center', color: 'red', marginTop: '20px' }}>
                                    Este servicio solo está disponible para usuarios de EE. UU., México o Argentina.
                                </Typography>
                            )
                        ) : (
                            <Button
                                onClick={handleNavigate}
                                style={{
                                    backgroundImage: 'linear-gradient(45deg, #32cd32, #008080)',
                                    color: 'white',
                                    padding: '10px 20px',
                                    borderRadius: '20px',
                                    fontWeight: 'bold',
                                    boxShadow: '0 3px 5px 2px rgba(50, 205, 50, .3)',
                                    marginTop: '20px'
                                }}
                            >
                                Regístrate para pagar
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Item>

            {userCart && userCart.length > 0 && (
                <Grid container spacing={1} style={{ marginTop: 5 }}>
                    {userCart.map((post, index) => (
                        <SingleQuiniela
                            key={index}
                            quiniela={post}
                            index={index}
                            showDelete={true}
                            showScore={false}
                        />
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default Cart;


