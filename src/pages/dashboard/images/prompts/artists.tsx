import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArticleIcon from '@mui/icons-material/Article';

import promptJS from 'utils/prompts.json';

const Artists = (props: any) => {    
    const [prompt, setPrompt] = useState({});

    type PromptArch = {
        [key: string]: { multiple: boolean; data: string[] };
    };
    
    const artists: PromptArch = promptJS.Artists;

    const handleSArtistsChange = (event: SelectChangeEvent) => {
        for (let key in artists) {
            let item = artists[key];
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

    const selectArtistsItems = [];
    const checkboxArtistsItems = [];
    for (let key in artists) {
        let item = artists[key];
        if (!item.multiple) {
            selectArtistsItems.push (                
                <Grid item xs={6}>
                    <FormControl sx={{ minWidth: 350 }} size="small">
                        <InputLabel id={`select-small-${key}`}>{key}</InputLabel>
                        <Select
                            labelId={`select-small-${key}`}
                            name={key}
                            label="prompt"
                            onChange={handleSArtistsChange}
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
            checkboxArtistsItems.push (
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        item.data.map((content: string, index) => {
                            return (
                                <Grid item xs={3}>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox onChange={handleSArtistsChange}/>} label={content} key={index} name={content} />
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
                        <ArticleIcon color='warning'/>
                        <Typography variant='h4' color='primary'>Artists</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={4}>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            {selectArtistsItems}
                        </Grid>
                        {checkboxArtistsItems}
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Stack>
    )
}

export default Artists;