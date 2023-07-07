import { Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { loadPrompt } from "actions/image";
import { toNumber } from "lodash";
import { useEffect, useState } from "react";

import { format } from 'date-fns';

const List = (props: any) => {
    // Table
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'prompt', headerName: 'Prompt', width: 450 },
        {
            field: 'createDate',
            headerName: 'Create Date',
            width: 150,
        },
    ];
    
    const [rows, setRows] = useState<{ id: any, prompt: any; createDate: any; }[]>([]);

    console.log(props.mode);

    const loadData = async () => {
        const data = await loadPrompt(props.mode);
        const prompt = data.data;
        for (let key in prompt) {
            let item = prompt[key];
            const originalDate  = new Date(item.createdAt);
            const formattedDate  = format(originalDate, 'yyyy-MM-dd');
            
            const newRow = {
                id: toNumber(key) + 1,
                prompt: item.promptsValue,
                createDate: formattedDate,
            };

            setRows(prevRows => [...prevRows, newRow]);
        }        
    }

    console.log(rows);
    
    useEffect(() => {
        loadData();
    }, []);

    return (
        
        <Stack sx={{ height: "75vh", }}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
            />
        </Stack>
    )
}

export default List;