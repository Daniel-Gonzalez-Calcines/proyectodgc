<<<<<<< Updated upstream
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button} from '@mui/material';

function Login() {
=======
import { Box, Button, TextField, Typography } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../store/authSlice';
import { RootState } from "../store";


function Login() {

    const dispatch = useDispatch()


    const [data, setData] = useState({ usuario: '', contrasena: '' })
    const [alert, setAlert] = useState({ message: '', severity: '' })
    const navigate = useNavigate()
    const userData = useSelector((state: RootState) => state.authenticator)
    console.log(userData)


    const handleSubmit = (e: any) => {
        e.preventDefault()

        if (data.usuario === bduser && data.contrasena === bdpasswd) {
            setAlert({ message: 'Acceso permitido.', severity: 'success' });
            console.log('Usuario: ', data.usuario, '\nContraseña: ', data.contrasena)
            dispatch(authActions.login({
                name: data.usuario, //data.user es el nombre de usuario que ha ingresado el usuario
                rol: 'administrador'
            }))
            navigate('/Home')
        } else {
            setAlert({ message: 'Acceso denegado.', severity: 'error' });
            console.log('Usuario: ', data.usuario, '\nContraseña: ', data.contrasena)
        }
    };

    const bduser = 'daniel'
    const bdpasswd = '1234'

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

>>>>>>> Stashed changes
    return (
            <Container maxWidth="sm">
                    <Typography variant="h1" color='primary'>
                        Texto en h1
                    </Typography>
                    <Typography variant="h2" color='secondary'>
                        Texto en h2
                    </Typography>
                    <Typography variant="h3" color='error'>
                        Texto en h3
                    </Typography>
                    <Typography variant="h4" color='warning'>
                        Texto en h4
                    </Typography>
                    <Typography variant="subtitle1" color='info'>
                        Texto en subtitle1
                    </Typography>
                    <Typography variant="body1" color='success'>
                        Texto en body1
                    </Typography>
                    <Typography variant="caption" color='primary'>
                        Texto en caption
                    </Typography>
                    <Button variant='text' color='primary'>
                        Boton 1
                    </Button>
                    <Button variant='text' color='secondary'>
                        Boton 1
                    </Button>
                    <Button variant='text' color='error'>
                        Boton 1
                    </Button>
                    <Button variant='text' color='warning'>
                        Boton 1
                    </Button>
                    <Button variant='text' color='info'>
                        Boton 1
                    </Button>
                    <Button variant='text' color='success'>
                        Boton 1
                    </Button>
                    <Button variant='contained' color='primary'>
                        Boton 2
                    </Button>
                    <Button variant='contained' color='secondary'>
                        Boton 2
                    </Button>
                    <Button variant='contained' color='error'>
                        Boton 2
                    </Button>
                    <Button variant='contained' color='warning'>
                        Boton 2
                    </Button>
                    <Button variant='contained' color='info'>
                        Boton 2
                    </Button>
                    <Button variant='contained' color='success'>
                        Boton 2
                    </Button>
                    <Button variant='outlined' color='primary'>
                        Boton 3
                    </Button>
                    <Button variant='outlined' color='secondary'>
                        Boton 3
                    </Button>
                    <Button variant='outlined' color='error'>
                        Boton 3
                    </Button>
                    <Button variant='outlined' color='warning'>
                        Boton 3
                    </Button>
                    <Button variant='outlined' color='info'>
                        Boton 3
                    </Button>
                    <Button variant='outlined' color='success'>
                        Boton 3
                    </Button>
            </Container>
    )
}

export default Login;
