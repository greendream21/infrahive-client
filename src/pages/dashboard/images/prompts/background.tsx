import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageIcon from '@mui/icons-material/Image';

import promptJS from 'utils/prompts.json';

const Background = (props: any) => {    
    const [prompt, setPrompt] = useState({});

    type PromptArch = {
        [key: string]: { multiple: boolean; data: string[] };
    };
    
    const background: PromptArch = promptJS.Background;

    const handleBackgroundChange = (event: SelectChangeEvent) => {
        for (let key in background) {
            let item = background[key];
            if (!item.multiple) {
                switch(event.target.name) {
                    case `${key}`:
                        setPrompt({  ...prompt, [event.target.name]: event.target.value })
                        break;
                    default:
                        break;
                }
            } else {
                if (event.target instanceof HTMLInputElement) {
                    switch(event.target.checked) {
                        case true:
                            setPrompt({ ...prompt, [event.target.name]: event.target.name })
                            break;
                        case false:
                            setPrompt({ ...prompt, [event.target.name]: '' })
                            break;
                        default:
                            break;
                    }
                }                
            }
        }
    };

    const selectBackgroundItems = [];
    const checkboxBackgroundItems = [];
    for (let key in background) {
        let item = background[key];
        if (!item.multiple) {
            selectBackgroundItems.push (                
                <Grid item xs={6}>
                    <FormControl sx={{ minWidth: 350 }} size="small">
                        <InputLabel id={`select-small-${key}`}>{key}</InputLabel>
                        <Select
                            labelId={`select-small-${key}`}
                            name={key}
                            label="prompt"
                            onChange={handleBackgroundChange}
                        >
                            <MenuItem value=''>
                                None
                            </MenuItem>
                            {
                                item.data.map((content: string, index) => {
                                    return (
                                        <MenuItem value={content} key={index}>
                                            {content}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
            )                                    
        } else {
            checkboxBackgroundItems.push (
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        item.data.map((content: string, index) => {
                            return (
                                <Grid item xs={3}>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox onChange={handleBackgroundChange}/>} label={content} key={index} name={content} />
                                    </FormGroup>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            )
        }
    }

    useEffect(() => {
        props.setprompt(prompt);
    }, [prompt]);

    return (
        <Stack>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                    <Stack sx={{ display: 'flex', flexDirection: 'row', gap: "10px", alignItems: 'center' }}>
                        <ImageIcon color='success'/>
                        <Typography variant='h4' color='primary'>Background</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={4}>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            {selectBackgroundItems}
                        </Grid>
                        {checkboxBackgroundItems}
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Stack>
    )
}

export default Background;