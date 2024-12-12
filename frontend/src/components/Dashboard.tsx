import { Box, Typography, TextField, Button, Grid2, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function Dashboard() {

    const [tableData, setTableData] = useState<itemtype[]>([])
    const userData = useSelector((state: RootState) => state.authenticator)
    const rol = userData.userRol

    const getitems = async () => {

        const response = await fetch('http://localhost:3030/GetItems');
        const data = await response.json();
        setTableData(data.data);
/*

        fetch(`http://localhost:3030/GetItems`)
            .then((response) => response.json())
            .then((response) => {
                const data = response.json();
                setTableData(data.data);
            })
            .catch((error) => console.error('Error fetching data:', error));
            */
    };

    useEffect(() => {
        getitems();
    }, []);
/*
    useEffect(() => {
        console.log(tableData);
    }, [tableData]);
*/
    interface itemtype {
        id?: number
        nombre: string
        marca: string
        tipo: string
        precio: number
    }

    const itemInitialState: itemtype = {
        nombre: '',
        marca: '',
        tipo: '',
        precio: (0)
    }

    const [item, setItem] = useState(itemInitialState)

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

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setItem({ nombre: '', marca: '', tipo: '', precio: (0) });
        console.log(item)
        fetch(`http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio}`)
            .then(response => response.json())
            setTimeout(getitems, 200);
    }

    const handleDeleteItem = (item: itemtype) => {
        console.log(item)
        fetch(`http://localhost:3030/deleteItem?id=${item.id}`)
            .then(response => response.json())
            setTimeout(getitems, 200);
    }

    return (
        <>
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
                            id="Marca"
                            label="Marca"
                            value={item.marca} onChange={(e) => setItem({ ...item, marca: e.target.value })}
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
                            id="Tipo"
                            label="Tipo"
                            value={item.tipo} onChange={(e) => setItem({ ...item, tipo: e.target.value })}
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
                            id="Precio"
                            label="Precio"
                            value={item.precio} onChange={(e) => setItem({ ...item, precio: parseFloat(e.target.value) || 0 })}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                    </Grid2>

                    <Grid2 size={12}>
                        {rol != 'admin' ? (
                            <Button variant='contained' disabled fullWidth type='submit'>Insertar datos</Button>
                        ) : (
                            <Tooltip title="Insertar datos" arrow>
                                <Button variant='contained' fullWidth type='submit'>Insertar datos</Button>
                            </Tooltip>
                        )}
                    </Grid2>

                </Grid2>

            </Box>
            <Box>
                {rol == 'admin' ? (
                    <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="Tabla Colecciones">
                            <TableHead sx={{ backgroundColor: "#0a2837" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "white" }}>Nombre</TableCell>
                                    <TableCell sx={{ color: "white" }}>Marca</TableCell>
                                    <TableCell sx={{ color: "white" }}>Tipo</TableCell>
                                    <TableCell sx={{ color: "white" }}>Precio</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.length > 0 ? (
                                    tableData.map((row: itemtype) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.nombre}</TableCell>
                                            <TableCell>{row.marca}</TableCell>
                                            <TableCell>{row.tipo}</TableCell>
                                            <TableCell>{row.precio}</TableCell>
                                            <TableCell>
                                                <Tooltip title="Borrar registro" arrow>
                                                    <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        onClick={() => handleDeleteItem(row)} // Asegúrate de pasar el id
                                                    >
                                                        <DeleteForeverIcon />
                                                    </Button>
                                                </Tooltip>
                                            </TableCell>
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
                ) :
                    <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="Tabla Colecciones">
                            <TableHead sx={{ backgroundColor: "#0a2837" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "white" }}>Nombre</TableCell>
                                    <TableCell sx={{ color: "white" }}>Marca</TableCell>
                                    <TableCell sx={{ color: "white" }}>Tipo</TableCell>
                                    <TableCell sx={{ color: "white" }}>Precio</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.length > 0 ? (
                                    tableData.map((row: itemtype) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.nombre}</TableCell>
                                            <TableCell>{row.marca}</TableCell>
                                            <TableCell>{row.tipo}</TableCell>
                                            <TableCell>{row.precio}</TableCell>
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
                }


            </Box>
        </>
    );
}

export default Dashboard;