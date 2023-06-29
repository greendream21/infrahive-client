import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SubjectIcon from '@mui/icons-material/Subject';

import promptJS from 'utils/prompts.json';

const Subject = (props: any) => {    
    const [prompt, setPrompt] = useState({});

    type PromptArch = {
        [key: string]: { multiple: boolean; data: string[] };
    };

    const subject: PromptArch = promptJS.Subject;

    const handleSubjectChange = (event: SelectChangeEvent) => {
        for (let key in subject) {
            let item = subject[key];
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

    const selectSubjectItems = [];
    const checkboxSubjectItems = [];
    for (let key in subject) {
        let item = subject[key];
        if (!item.multiple) {
            selectSubjectItems.push (                
                <Grid item xs={6}>
                    <FormControl sx={{ minWidth: 350 }} size="small">
                        <InputLabel id={`select-small-${key}`}>{key}</InputLabel>
                        <Select
                            labelId={`select-small-${key}`}
                            name={key}
                            label="prompt"
                            onChange={handleSubjectChange}
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
            checkboxSubjectItems.push (
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        item.data.map((content: string, index) => {
                            return (
                                <Grid item xs={3}>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox onChange={handleSubjectChange}/>} label={content} key={index} name={content} />
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
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Stack sx={{ display: 'flex', flexDirection: 'row', gap: "10px", alignItems: 'center' }}>
                        <SubjectIcon color='error'/>
                        <Typography variant='h4' color='primary'>Subject</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={4}>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            {selectSubjectItems}
                        </Grid>
                        {checkboxSubjectItems}
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Stack>
    )
}

export default Subject;