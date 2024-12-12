import { Box, Grid2, Typography, TextField, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import Menu from "../components/Menu";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";





function GestionPrestamos() {

    const [tableData, setTableData] = useState<itemtype[]>([])
    const userData = useSelector((state: RootState) => state.authenticator)
    const rol = userData.userRol

    interface itemtype {
        id?: number
        articulo: string
        persona: string
        fecha: string
    }

    const itemInitialState: itemtype = {
        articulo: '',
        persona: '',
        fecha: '',
    }

    const [item, setItem] = useState(itemInitialState)

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setItem({ articulo: '', persona: '', fecha: ''});
        fetch(`http://localhost:3030/addPrestamo?articulo=${item.articulo}&persona=${item.persona}&fecha=${item.fecha}`)
            .then(response => response.json())
            setTimeout(getitems, 200);
    }

    const getitems = async () => {
        const response = await fetch('http://localhost:3030/GetPrestamos');
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
                {rol == 'admin' ? (
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
                            id="articulo"
                            label="articulo"
                            value={item.articulo} onChange={(e) => setItem({ ...item, articulo: e.target.value })}
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
                            id="persona"
                            label="persona"
                            value={item.persona} onChange={(e) => setItem({ ...item, persona: e.target.value })}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                    </Grid2>

                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <TextField
                            type='date'
                            required
                            fullWidth
                            id="fecha"
                            label="fecha"
                            value={item.fecha} onChange={(e) => setItem({ ...item, fecha: e.target.value })}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                    </Grid2>

                    <Grid2 size={12}>
                        <Tooltip title="Insertar datos" arrow placement="bottom" >
                            <Button variant='contained' fullWidth type='submit'>Insertar datos</Button>
                        </Tooltip>
                    </Grid2>

                </Grid2>
                ) : null}

            </Box>

            <Box style={boxStyle}>

                <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="Tabla Colecciones">
                        <TableHead sx={{ backgroundColor: "#0a2837" }}>
                            <TableRow>
                                <TableCell sx={{ color: "white" }}>Artículo</TableCell>
                                <TableCell sx={{ color: "white" }}>Persona</TableCell>
                                <TableCell sx={{ color: "white" }}>Fecha</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.length > 0 ? (
                                tableData.map((row: itemtype) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.articulo}</TableCell>
                                        <TableCell>{row.persona}</TableCell>
                                        <TableCell>{row.fecha}</TableCell>
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

export default GestionPrestamos;
