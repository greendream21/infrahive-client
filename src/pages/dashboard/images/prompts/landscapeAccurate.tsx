import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LandscapeIcon from '@mui/icons-material/Landscape';

import promptJS from 'utils/prompts.json';

const LandscapeAccurate = (props: any) => {    
    const [prompt, setPrompt] = useState({});

    type PromptArch = {
        [key: string]: { multiple: boolean; data: string[] };
    };

    const landscapeAccurate: PromptArch = promptJS.LandscapeAccurate;

    const handleLandscapeAccurateChange = (event: SelectChangeEvent) => {
        for (let key in landscapeAccurate) {
            let item = landscapeAccurate[key];
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

    const selectLandscapeAccurateItems = [];
    const checkboxLandscapeAccurateItems = [];
    for (let key in landscapeAccurate) {
        let item = landscapeAccurate[key];
        if (!item.multiple) {
            selectLandscapeAccurateItems.push (                
                <Grid item xs={6}>
                    <FormControl sx={{ minWidth: 350 }} size="small">
                        <InputLabel id={`select-small-${key}`}>{key}</InputLabel>
                        <Select
                            labelId={`select-small-${key}`}
                            name={key}
                            label="prompt"
                            onChange={handleLandscapeAccurateChange}
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
            checkboxLandscapeAccurateItems.push (
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        item.data.map((content: string, index) => {
                            return (
                                <Grid item xs={3}>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox onChange={handleLandscapeAccurateChange}/>} label={content} key={index} name={content} />
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
                        <LandscapeIcon color='secondary'/>
                        <Typography variant='h4' color='primary'>LandscapeAccurate</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={4}>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            {selectLandscapeAccurateItems}
                        </Grid>
                        {checkboxLandscapeAccurateItems}
                    </Stack>
                </AccordionDetails>
            </Accordion>                            
        </Stack>
    )
}

export default LandscapeAccurate;