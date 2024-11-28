import { Button, Tooltip, Typography } from "@mui/material";
import Menu from '../components/Menu';
import EjemploInforme from "../components/InformeColeccion";
import { useState } from "react";

function Reports() {
    const [mostrar, setMostrar] = useState(false);

    const settrue = () => {
        setMostrar(true);
        console.log(mostrar);
    }

    return (
        <>
            <Menu />

            <Tooltip title="Generar informe" arrow>
                <Button variant="contained" style={{ marginTop: '50px' }} onClick={settrue}>
                    Generar informe
                </Button>
            </Tooltip>

            {mostrar ? (
                <EjemploInforme />
            ) : null}
        </>
    )
}

export default Reports;