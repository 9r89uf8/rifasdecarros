import React, {Fragment, useEffect, useState} from "react";
import {editUser} from "@/app/services/authService";

import FormControl from "@mui/material/FormControl";

import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';

import TextField from "@mui/material/TextField";


//end material ui

const EditUser = ({id, name, email, phone}) => {

    const [formData, setFormData] = useState({
        show: false,
        showInfo: true,
        uid:'',
        name: null,
        email: null,
        phone: null
    });

    useEffect(() => {
        setFormData({...formData, name: name, email: email, uid: id, phone: phone})

    }, []);


    const payReady = async (e) => {
        e.preventDefault();
        await editUser(formData);
        // history.push('/')
    };

    return (
        <Fragment>
            <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                <form onSubmit={payReady}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item sm={12} lg={12} xs={10}>
                            <FormControl>
                                <TextField
                                    label="Número de teléfono"
                                    name='phone'
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                    required
                                    fullWidth
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={11} lg={7} xs={11}>
                            <FormControl>
                                <TextField
                                    label="Nombre de usuario"
                                    name='name'
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                    required
                                    fullWidth
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={12} lg={12} xs={10}>
                            <FormControl>
                                <TextField
                                    label="Correo electrónico"
                                    name='email'
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                    required
                                    fullWidth
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button style={{margin: '20px 0 10px'}} type='submit' variant="contained" color="primary">
                        Enviar
                    </Button>
                </form>
            </Grid>
        </Fragment>
    );

};

export default EditUser;