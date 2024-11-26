import { useEffect, useState } from "react";
//importo la librería de informes
import MaterialTable, { Column } from "@material-table/core";
//Importo la librería que nos permite exportar a CSV y PDF
import { ExportCsv, ExportPdf } from "@material-table/exporters";
//Creo la interfaz para los tipos de los campos (field) de la tabla.
//La tabla tendrá los campos firstName: string, lastName: string, birthYear: number

function EjemploInforme() {
    const [tableData, setTableData] = useState<itemtype[]>([]);

    const getitems = async () => {
        const response = await fetch('http://localhost:3030/GetItems');
        const data = await response.json();
        setTableData(data.data);
    };

    interface itemtype {
        id?: number;
        nombre: string;
        marca: string;
        tipo: string;
        precio: number;
    }

    useEffect(() => {
        getitems();
    }, []);

    const col: Array<Column<itemtype>> = [
        { title: "Nombre", field: "nombre", filtering: false },
        { title: "Marca", field: "marca", filtering: true },
        { title: "Tipo", field: "tipo", filtering: true },
        { title: "Precio", field: "precio", type: "numeric", filtering: false }
    ];

    // Función para calcular la suma de la columna "Precio"
    const calculateTotalPrice = (data: itemtype[]) => {
        return data.reduce((total, item) => total + (item.precio || 0), 0);
    };

    return (
        <div>
            <MaterialTable
                columns={col}
                data={tableData}
                title="Tabla Colección"
                options={{
                    headerStyle: {
                        backgroundColor: '#0a2837',
                        color: '#fff'
                    },
                    columnsButton: true,
                    filtering: true,
                    exportMenu: [
                        {
                            label: "Exportar a PDF",
                            exportFunc: (cols, datas) => ExportPdf(cols, datas, "Informe"),
                        },
                        {
                            label: "Exportar a CSV",
                            exportFunc: (cols, datas) => ExportCsv(cols, datas, "Informe"),
                        },
                    ],
                }}
            />
            <div style={{ padding: '10px', textAlign: 'right' }}>
                <strong>Precio Total: {calculateTotalPrice(tableData).toFixed(2)}</strong>
            </div>
        </div>
    );
}

export default EjemploInforme;