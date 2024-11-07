import { Box, Button, TextField, Typography } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert';


function Login() {

    const [data, setData] = useState({ usuario: '', contrasena: '' })
    const [alert, setAlert] = useState({ message: '', severity: '' })
    const navigate = useNavigate()


    const handleSubmit = (e: any) => {
        e.preventDefault()

        if (data.usuario === bduser && data.contrasena === bdpasswd) {
            setAlert({ message: 'Acceso permitido.', severity: 'success' });
            console.log('Usuario: ', data.usuario,'\nContraseña: ', data.contrasena)
            navigate('/Home')
        } else {
            setAlert({ message: 'Acceso denegado.', severity: 'error' });
            console.log('Usuario: ', data.usuario,'\nContraseña: ', data.contrasena)
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

    return (
        <>

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