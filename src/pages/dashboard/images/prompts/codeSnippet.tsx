import { Accordion, AccordionDetails, AccordionSummary, Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from "@mui/material"

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';
import { toNumber } from "lodash";

import { BASE_URL } from 'config';

import { promptCode } from "actions/image";
import { useEffect, useState } from "react";

// Variable containing all available image sizes
const sizes: string[][] = [
    ['7:4', '896x512'],
    ['3:2', '768x512'],
    ['4:3', '683x512'],
    ['5:4', '640x512'],
    ['1:1', '512x512'],
    ['4:5', '512x640'],
    ['3:4', '512x683'],
    ['2:3', '512x768'],
    ['4:7', '512x896']
];

// Array of Dalle supported Image sizes
const dalleSizes: string[][] = [
['1:1', '256x256'],
['1:1', '512x512'],
['1:1', '1024x1024']
];

const CodeSnippet = (props: any) => {
    const [code, setCode] = useState('');
    const [codeType, setCodeType] = useState("Node");
    const { promptsValue, imageStyle, imageSize, mode } = props;

    const value = toNumber(imageSize);

    console.log(value);

    let width: string | String;
    let height: string | String;
    let size: string | String;

    if (mode === 'dream') {        
        [width, height] = sizes[value][1].split('x');
    } else {
        size = dalleSizes[value][1];
    }

    const getCode = async () => {
        const response = await promptCode(promptsValue, imageStyle, mode, width, height, size, codeType);
        
        setCode(response.data);
    }

    const handleCodeTypeChange = (event: SelectChangeEvent) => {
        setCodeType(event.target.value);
    };

    useEffect(() => {
        getCode();
    }, [promptsValue, imageStyle, imageSize, codeType]);    

    return (        
        <Stack>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                    <Stack sx={{ display: 'flex', flexDirection: 'row', gap: "10px", alignItems: 'center' }}>
                        <CodeIcon color='info'/>
                        <Typography variant='h4' color='primary'>Code Snippet</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack sx={{mb: 2}}>
                        <FormControl sx={{ minWidth: 350 }} >
                            <InputLabel id='code-type'>Code Type</InputLabel>
                            <Select
                                labelId="code-type"
                                name="Code Type"
                                label="Code Type" 
                                onChange={handleCodeTypeChange}
                                value={codeType}
                            >
                                <MenuItem value={"Node"} key={0}>
                                    Node
                                </MenuItem>
                                <MenuItem value={"Python"} key={1}>
                                    Python
                                </MenuItem>
                                <MenuItem value={"cURL"} key={2}>
                                    cURL
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack spacing={4}>
                        <Typography component="pre" sx={{ p: 1, bgcolor: '#F1F5F9', fontFamily: 'Consolas', fontSize: '16px', overflow: "auto" }}>
                            {code}
                        </Typography>
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Stack>
    )
}

export default CodeSnippet;