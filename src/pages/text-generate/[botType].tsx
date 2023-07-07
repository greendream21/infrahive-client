import React, { ChangeEvent, useEffect, useState } from 'react';

import { AccordionProps, AccordionSummaryProps, Box, Button, Divider, FormControl, Grid, IconButton, Input, InputLabel, MenuItem, Paper, Select, Slider, Stack, TextField, Typography, styled, SelectChangeEvent, Backdrop, CircularProgress } from '@mui/material';

import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CodeIcon from '@mui/icons-material/Code';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

import snackbar from 'utils/snackbar';

import { gridSpacing } from 'store/constant';
import { BASE_URL } from 'config';

import { useRouter } from 'next/router';

import { promptSubmit } from "actions/image";
import { promptCode } from 'actions/text';

import OpenAiSetting from './openaiSetting';
import AnthropicSetting from './anthropicSetting';
import CohereSetting from './cohereSetting';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const texts = () => {

    const router = useRouter();

    // State to track api being used
    const [mode, setMode] = useState('');
    const [code, setCode] = useState<string>("");
    const [codeType, setCodeType] = useState("Node");
    const [codeFlag, setCodeFlag] = useState<boolean>(false);
    const [backDropOpen, setBackDropOpen] = useState<boolean>(false);
    const [textBox, setTextBox] = useState('');
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const [messages, setMessages] = useState('');

    // OpenAI Slider Value
    const [temperatureValue, setTemperatureValue] = React.useState<number | string | Array<number | string>>(
        0.7,
    );
    const [max_tokensValue, setMax_tokensValue] = React.useState<number | string | Array<number | string>>(
        1000,
    );
    const [top_pValue, setTop_pValue] = React.useState<number | string | Array<number | string>>(
        router.query['botType'] === 'gpt3' || router.query['botType'] === 'chatgpt' || router.query['botType'] === 'gpt4' ? 1 : router.query['botType'] === 'clause-v1' || router.query['botType'] === 'clause-instant-v1' ? -1 : 0.75,
    );
    const [top_kValue, setTop_kValue] = React.useState<number | string | Array<number | string>>(
        router.query['botType'] === 'clause-v1' || router.query['botType'] === 'clause-instant-v1' ? -1 : 0,
    );
    const [n, setNValue] = React.useState<number | string | Array<number | string>>(
        1,
    );
    const [presence_penalty, setPresence_penaltyValue] = React.useState<number | string | Array<number | string>>(
        0,
    );
    const [frequency_penalty, setFrequency_penaltyValue] = React.useState<number | string | Array<number | string>>(
        0,
    );
    const [best_of, setBest_ofValue] = React.useState<number | string | Array<number | string>>(
        1,
    );

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTextBox(event.target.value);
    };

    const handleSendMessage = async () => {
        if (!mode) {
            snackbar('Error', 'error')
            router.push(`/dashboard/texts`);
            setMode('');
        } else {
            const data = {
                prompt: textBox,
                model: mode,
                temperature: temperatureValue,
                max_tokens: max_tokensValue,
                top_p: top_pValue,
                top_k: top_kValue,
                n: n,
                presence_penalty: presence_penalty,
                frequency_penalty: frequency_penalty,
                best_of: best_of,
            };

            const reqOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            let url = '';
            let chatBot = '';
            mode === "gpt3" || mode === "chatgpt" || mode === 'gpt4' ?
                chatBot = 'Open AI' :
                mode === "clause-v1" || mode === "clause-instant-v1" ?
                    chatBot = 'Anthropic' :
                    chatBot = 'Cohere'
            switch (chatBot) {
                case 'Open AI':
                    url = `${BASE_URL}/api/text/openai`;
                    console.log(url);
                    break;
                case 'Anthropic':
                    url = `${BASE_URL}/api/text/anthropic`;
                    console.log(url);
                    break;
                case 'Cohere':
                    url = `${BASE_URL}/api/text/cohere`;
                    console.log(url);
                    break;
                default:
                    console.log('Case not working');
                    break;
            }
            
            setBackDropOpen(true);

            const res = await fetch(url, reqOptions);
            const body = await res.text();
            console.log(body);

            setMessages(body);
            
            setBackDropOpen(false);
        }
    };

    const handleRevert = () => {
        setTemperatureValue(0.7);
        setMax_tokensValue(1000);
        setTop_pValue(router.query['botType'] === 'gpt3' || router.query['botType'] === 'chatgpt' || router.query['botType'] === 'gpt4' ? 1 : router.query['botType'] === 'clause-v1' || router.query['botType'] === 'clause-instant-v1' ? -1 : 0.75);
        setTop_kValue(router.query['botType'] === 'clause-v1' || router.query['botType'] === 'clause-instant-v1' ? -1 : 0)
        setNValue(1);
        setPresence_penaltyValue(0);
        setFrequency_penaltyValue(0);
        setBest_ofValue(1);
    }

    const handleCodeTypeChange = (event: SelectChangeEvent) => {
        setCodeType(event.target.value);
    };

    const getCode = async () => {
        const response = await promptCode(textBox, mode, String(temperatureValue), String(max_tokensValue), String(top_pValue), String(n), String(presence_penalty), String(frequency_penalty), String(best_of), codeType, String(top_kValue));

        setCode(String(response.data));
    }

    const back = async () => {
        if (mode) {
            router.push(`/generative-des-ui/${mode}`);
        } else {
            router.push(`/dashboard/texts`);
        }
    }

    const save = async () => {
        if (textBox === '') {
            snackbar("Please input prompt!", "warning");
        } else {
            let data = {
                promptsValue: textBox,
                mode: mode,
            };
            const result = await promptSubmit(data);
            if (result.status == 200) {
                snackbar("File Uploaded successfully.");
            }
        }
    }

    const viewCode = () => {
        console.log("Hello");

        if (codeFlag) {
            setCodeFlag(false);
        } else {
            setCodeFlag(true);
        }
    }

    useEffect(() => {
        if (router.isReady) {
            setMode(String(router.query['botType']));
        }
    }, []);

    useEffect(() => {
        getCode();
    }, [codeFlag, codeType, textBox]);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={12} md={12}>
                <Paper sx={{ width: '100%', p: 5 }}>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={backDropOpen}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={2}
                        justifyContent="space-between"
                    >
                        <Stack
                            direction="column"
                            divider={<Divider orientation="horizontal" flexItem />}
                            spacing={2}
                            width="100%"
                        >
                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                            >
                                <IconButton aria-label="delete" onClick={back} color='primary'>
                                    <ArrowBackIcon />
                                </IconButton>
                                <Typography variant='h2'>
                                    {
                                        mode === "gpt3" || mode === "chatgpt" || mode === 'gpt4' ?
                                            `OpenAI's ${mode}` :
                                            mode === "clause-v1" || mode === "clause-instant-v1" ?
                                                `Anthropic's ${mode}` :
                                                `Cohere's ${mode}`
                                    }
                                </Typography>
                            </Stack>
                            <Stack
                                direction="column"
                                spacing={5}
                            >
                                <Stack>
                                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                            <Typography variant='h3'>Prompt</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <TextField
                                                id="standard-multiline-flexible"
                                                multiline
                                                maxRows={4}
                                                variant="standard"
                                                value={textBox}
                                                placeholder='Write your prompt here'
                                                onChange={handleInputChange}
                                                fullWidth={true}
                                                rows={10}
                                                sx={{
                                                    fontSize: 32,
                                                    p: 2,
                                                    resize: 'vertical',
                                                    backgroundColor: "white",
                                                }}
                                            />
                                        </AccordionDetails>
                                    </Accordion>
                                </Stack>
                                <Stack>
                                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                            <Typography variant='h3'>Response</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {
                                                messages ?
                                                    (
                                                        <Typography sx={{ p: 2 }}>
                                                            {messages}
                                                        </Typography>
                                                    ) :
                                                    (
                                                        <Typography sx={{ p: 2 }}>
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                                            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                                                            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                                            sit amet blandit leo lobortis eget.
                                                        </Typography>
                                                    )
                                            }
                                        </AccordionDetails>
                                    </Accordion>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack
                            direction="column"
                            divider={<Divider orientation="horizontal" flexItem />}
                            spacing={2}
                        >
                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                            >
                                <Button startIcon={<SaveAltIcon />} onClick={save}>
                                    SAVE
                                </Button>
                                <Button startIcon={<CodeIcon />} onClick={viewCode}>
                                    VIEW CODE
                                </Button>
                            </Stack>
                            <Stack
                                direction="column"
                                spacing={2}
                            >
                                {
                                    codeFlag ?
                                        (
                                            <Stack sx={{ width: 300 }}>
                                                <Stack sx={{ mb: 2 }}>
                                                    <FormControl >
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
                                            </Stack>
                                        ) :
                                        (
                                            <Stack>
                                                {
                                                    mode === "gpt3" || mode === "chatgpt" || mode === 'gpt4' ?
                                                        (
                                                            <OpenAiSetting
                                                                mode={mode}
                                                                temperatureValue={temperatureValue}
                                                                setTemperatureValue={setTemperatureValue}
                                                                max_tokensValue={max_tokensValue}
                                                                setMax_tokensValue={setMax_tokensValue}
                                                                top_pValue={top_pValue}
                                                                setTop_pValue={setTop_pValue}
                                                                n={n}
                                                                setNValue={setNValue}
                                                                presence_penalty={presence_penalty}
                                                                setPresence_penaltyValue={setPresence_penaltyValue}
                                                                frequency_penalty={frequency_penalty}
                                                                setFrequency_penaltyValue={setFrequency_penaltyValue}
                                                                best_of={best_of}
                                                                setBest_ofValue={setBest_ofValue}
                                                            />
                                                        ) : mode === "clause-v1" || mode === "clause-instant-v1" ?
                                                            (
                                                                <AnthropicSetting
                                                                    temperatureValue={temperatureValue}
                                                                    setTemperatureValue={setTemperatureValue}
                                                                    max_tokensValue={max_tokensValue}
                                                                    setMax_tokensValue={setMax_tokensValue}
                                                                    top_pValue={top_pValue}
                                                                    setTop_pValue={setTop_pValue}
                                                                    top_kValue={top_kValue}
                                                                    setTop_kValue={setTop_kValue}
                                                                />
                                                            ) :
                                                            (
                                                                <CohereSetting
                                                                    temperatureValue={temperatureValue}
                                                                    setTemperatureValue={setTemperatureValue}
                                                                    max_tokensValue={max_tokensValue}
                                                                    setMax_tokensValue={setMax_tokensValue}
                                                                    top_pValue={top_pValue}
                                                                    setTop_pValue={setTop_pValue}
                                                                    top_kValue={top_kValue}
                                                                    setTop_kValue={setTop_kValue}
                                                                    n={n}
                                                                    setNValue={setNValue}
                                                                    presence_penalty={presence_penalty}
                                                                    setPresence_penaltyValue={setPresence_penaltyValue}
                                                                    frequency_penalty={frequency_penalty}
                                                                    setFrequency_penaltyValue={setFrequency_penaltyValue}
                                                                />
                                                            )
                                                }
                                                <Stack
                                                    direction="row"
                                                    spacing={2}
                                                    alignItems="center"
                                                >
                                                    <Button onClick={handleSendMessage}>
                                                        SUBMIT
                                                    </Button>
                                                    <Button color='secondary' onClick={handleRevert}>
                                                        REVERT DEFAULT SETTING
                                                    </Button>
                                                </Stack>
                                            </Stack>
                                        )
                                }
                            </Stack>
                        </Stack>
                    </Stack>
                </Paper>
            </Grid>
        </Grid>
    );
};
texts.Layout = 'authGuard';
export default texts;
