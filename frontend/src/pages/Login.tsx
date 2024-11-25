import { Box, Button, TextField, Typography } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../store/authSlice';
import { RootState } from "../store";
import Menu from '../components/Menu';


function Login() {

    const dispatch = useDispatch()


    const [data, setData] = useState({ usuario: '', contrasena: '' })
    const [alert, setAlert] = useState({ message: '', severity: '' })
    const navigate = useNavigate()
    const userData = useSelector((state: RootState) => state.authenticator)
    console.log(userData)


    const handleSubmit = (e: any) => {
        e.preventDefault()

        fetch(`http://localhost:3030/login?user=${data.usuario}&password=${data.contrasena}`)
            .then(response => response.json())
            .then(response => {
                console.log('Lo que nos llega de la base de datos: ')
                console.log(response.data)
                if (response.data.length !== 0) {
                    dispatch(authActions.login({
                        name: response.data.nombre,
                        rol: response.data.rol
                    }))
                    navigate('/Home')
                } else {
                    setAlert({ message: 'Acceso denegado.', severity: 'error' });
                    console.log('Usuario: ', data.usuario, '\nContraseña: ', data.contrasena)
                }
            })
    };

    const boxStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '500px',
        margin: '20px auto',
        flexDirection: 'column',
        marginTop: 200,
        gap: 10,
    };

    return (
        <>
            <Menu/>
            <Box style={boxStyle}
                component='form'
                onSubmit={handleSubmit}
            >
                <Typography>
                    SISTEMA DE ACCESO
                </Typography>

                <LockIcon />

                <TextField
                    required
                    fullWidth
                    id="Usuario"
                    label="Usuario"
                    value={data.usuario} onChange={(e) => setData({ ...data, usuario: e.target.value })}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />

                <TextField
                    required
                    type='password'
                    fullWidth
                    id="Contrasena"
                    label="Contrasena"
                    value={data.contrasena} onChange={(e) => setData({ ...data, contrasena: e.target.value })}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />

                <Button variant='contained' fullWidth type='submit'>Acceder</Button>

                {alert.message && (
                    <Alert severity={alert.severity} style={{ marginTop: '10px', width: '100%' }}>
                        {alert.message}
                    </Alert>
                )}

            </Box>
        </>
    )
}

export default Login;