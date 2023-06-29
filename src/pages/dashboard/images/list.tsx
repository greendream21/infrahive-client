import { Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const List = () => {
    // Table
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'appName', headerName: 'App Name', width: 130 },
        { field: 'appType', headerName: 'App Type', width: 130 },
        {
            field: 'published',
            headerName: 'Published',
            width: 90,
        },
        {
            field: 'progressing',
            headerName: 'Progressing',
            width: 130,
        },
        {
            field: 'wordCount',
            headerName: 'Word count',
            width: 130,
        },
    ];
    
    const rows = [
    { id: 1, appName: 'Lorem Ipsum', appType: 'Cash Bot', published: 'checked', progressing: 'Approved', wordCount: 'Dec 2, 2022 - Fri' },
    { id: 2, appName: 'Lorem Ipsum', appType: 'Cash Bot', published: 'checked', progressing: 'Approved', wordCount: 'Dec 2, 2022 - Fri' },
    { id: 3, appName: 'Lorem Ipsum', appType: 'Cash Bot', published: 'checked', progressing: 'Approved', wordCount: 'Dec 2, 2022 - Fri' },
    { id: 4, appName: 'Lorem Ipsum', appType: 'Cash Bot', published: 'checked', progressing: 'Approved', wordCount: 'Dec 2, 2022 - Fri' },
    { id: 5, appName: 'Lorem Ipsum', appType: 'Cash Bot', published: 'unchecked', progressing: 'Declined', wordCount: 'Dec 2, 2022 - Fri' },
    { id: 6, appName: 'Lorem Ipsum', appType: 'Cash Bot', published: 'checked', progressing: 'Approved', wordCount: 'Dec 2, 2022 - Fri' },
    { id: 7, appName: 'Lorem Ipsum', appType: 'Cash Bot', published: 'checked', progressing: 'Approved', wordCount: 'Dec 2, 2022 - Fri' },
    { id: 8, appName: 'Lorem Ipsum', appType: 'Cash Bot', published: 'unchecked', progressing: 'Declined', wordCount: 'Dec 2, 2022 - Fri' },
    { id: 9, appName: 'Lorem Ipsum', appType: 'Cash Bot', published: 'checked', progressing: 'Approved', wordCount: 'Dec 2, 2022 - Fri' },
    ];

    return (
        
        <Stack sx={{ height: "75vh" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
            />
        </Stack>
    )
}

export default List;