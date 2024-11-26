import { Box, Grid2, Typography, TextField, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Menu from "../components/Menu";
import { useEffect, useState } from "react";





function Reports() {

    const [tableData, setTableData] = useState<itemtype[]>([])

    interface itemtype {
        id?: number
        nombre: string
        login: string
        password: string
        rol: string
    }

    const itemInitialState: itemtype = {
        nombre: '',
        login: '',
        password: '',
        rol: ''
    }

    const [item, setItem] = useState(itemInitialState)

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setItem({ nombre: '', login: '', password: '', rol: '' });
        fetch(`http://localhost:3030/addUsuario?nombre=${item.nombre}&login=${item.login}&password=${item.password}&rol=${item.rol}`)
            .then(response => response.json())
        getitems()
    }

    const getitems = async () => {
        const response = await fetch('http://localhost:3030/GetUsers');
        const data = await response.json();
        setTableData(data.data);
    };

    const boxStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        margin: '20px auto',
        flexDirection: 'column',
        marginTop: 200,
        gap: 10,
    };

    useEffect(() => {
        getitems();
    }, []);

    return (
        <>
            <Menu />

            <Box style={boxStyle}
                component='form'
                onSubmit={handleSubmit}
            >
                <Grid2 container spacing={2} rowSpacing={1}>
                    <Grid2 size={12}>
                        <Typography>
                            INTRODUCCIÓN DE DATOS
                        </Typography>
                    </Grid2>

                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <TextField
                            required
                            fullWidth
                            id="Nombre"
                            label="Nombre"
                            value={item.nombre} onChange={(e) => setItem({ ...item, nombre: e.target.value })}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                    </Grid2>

                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <TextField
                            required
                            fullWidth
                            id="Login"
                            label="Login"
                            value={item.login} onChange={(e) => setItem({ ...item, login: e.target.value })}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                    </Grid2>

                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <TextField
                            required
                            fullWidth
                            id="Password"
                            label="Password"
                            value={item.password} onChange={(e) => setItem({ ...item, password: e.target.value })}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                    </Grid2>

                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <TextField
                            required
                            fullWidth
                            id="Rol"
                            label="Rol"
                            value={item.rol} onChange={(e) => setItem({ ...item, rol: e.target.value })}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                    </Grid2>

                    <Grid2 size={12}>
                        <Button variant='contained' fullWidth type='submit'>Insertar datos</Button>
                    </Grid2>

                </Grid2>

            </Box>

            <Box  style={boxStyle}>

                <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="Tabla Colecciones">
                        <TableHead sx={{ backgroundColor: "#0a2837" }}>
                            <TableRow>
                                <TableCell sx={{ color: "white" }}>Nombre</TableCell>
                                <TableCell sx={{ color: "white" }}>Login</TableCell>
                                <TableCell sx={{ color: "white" }}>Password</TableCell>
                                <TableCell sx={{ color: "white" }}>Rol</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.length > 0 ? (
                                tableData.map((row: itemtype) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.nombre}</TableCell>
                                        <TableCell>{row.login}</TableCell>
                                        <TableCell>{row.password}</TableCell>
                                        <TableCell>{row.rol}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No hay datos disponibles.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>

        </>
    )
}

export default Reports;
