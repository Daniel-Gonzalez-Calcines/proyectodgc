import { useEffect, useState } from "react";
//importo la librería de informes
import MaterialTable, { Column } from "@material-table/core";
//Importo la librería que nos permite exportar a CSV y PDF
import { ExportCsv, ExportPdf } from "@material-table/exporters";
//Creo la interfaz para los tipos de los campos (field) de la tabla.
//La tabla tendrá los campos firstName: string, lastName: string, birthYear: number

function InformeUsers() {
    const [tableData, setTableData] = useState<itemtype[]>([]);

    const getitems = async () => {
        const response = await fetch('http://localhost:3030/GetUsers');
        const data = await response.json();
        setTableData(data.data);
    };

    interface itemtype {
        id?: number;
        nombre: string;
        login: string;
        password: string;
        rol: string;
    }

    useEffect(() => {
        getitems();
    }, []);

    const col: Array<Column<itemtype>> = [
        { title: "Nombre", field: "nombre", filtering: true },
        { title: "Login", field: "login", filtering: false },
        { title: "Password", field: "password", filtering: false },
        { title: "Rol", field: "rol", filtering: false }
    ];

    return (
        <div>
            <MaterialTable
                columns={col}
                data={tableData}
                title="Tabla Usuarios"
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
                            exportFunc: (cols, datas) => ExportPdf(cols, datas, "Informe_Usuarios"),
                        },
                        {
                            label: "Exportar a CSV",
                            exportFunc: (cols, datas) => ExportCsv(cols, datas, "Informe_Usuarios"),
                        },
                    ],
                }}
            />
        </div>
    );
}

export default InformeUsers;