import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Drawer,
    Grid,
    IconButton,
    Paper,
    Stack,
    Tab,
    TextField,
    Typography,
} from '@mui/material';
import React, { ChangeEvent, FormEvent, ReactComponentElement, useEffect, useState } from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import AddIcon from '@mui/icons-material/Add';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { useRouter } from 'next/router';


import { gridSpacing } from 'store/constant';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import Prompts from './prompts';
import List from './list';

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  
  const Dalle = () => {

    const [value, setValue] = React.useState('1');
    const [state, setState] = React.useState<boolean>(false);
    const [promptFlag, setPromptFlag] = React.useState<boolean>(false);

    const router = useRouter();

    const back =async () => {
        router.push('/dashboard/images');
    };

    const goImageGenerate =async () => {
        router.push('/image-generate/dalle');
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    
    const toggleDrawer = async (open: boolean) => {
        setState(open);
    };

    const goEditPrompt =async (open: boolean) => {
        setPromptFlag(open)
    }
  
    return (
      <Grid container spacing={gridSpacing}>
              <Grid item xs={12} lg={12} md={12}>
                <Button sx={{m: '3px'}} onClick={() => back()} startIcon={<ReplyIcon />} color='secondary'>
                    Back
                </Button>
                  <Paper sx={{ width: '100%', p: 5, pb: 0 }}>                  
                    <Stack justifyContent={"center"} spacing={3} p={1} sx={{
                        width: '75%',
                            '& label': {
                                height: "200px !important",
                                width: "100%",
                                minWidth: "none"
                            },
                            '& span': {
                                fontSize: "1rem !important"
                            },
                            '& svg': {
                                display: "none !important"
                            },
                            '& label div span:nth-child(2)': {
                                display: "none !important"
                            }
                        }}>
                        <Typography variant='h1'>
                            OpenAI's Image Models
                        </Typography>
                        <Typography variant='caption'>
                            Fine-tuned to follow natural language instructions and is suitable for a variety of language tasks, such as: classification, extraction, summarization and content generation.
                        </Typography>                        
                        <Stack direction="row" spacing={2}>
                            <Button color='primary' variant='contained' onClick={goImageGenerate}>OPEN PROMPT DESIGN</Button>
                            <Button color='warning' variant='contained' onClick={() => toggleDrawer(true)}>VIEW API CODE</Button>
                            <Drawer
                                anchor={'right'}
                                open={state}
                                onClose={() => toggleDrawer(false)}
                            >
                                <Stack justifyContent={"center"} spacing={3} p={6} >
                                    {
                                        !promptFlag ?
                                        (
                                            
                                            <Stack width={'750px'} justifyContent={"center"} spacing={3} >                                    
                                                <Typography variant='h2'>
                                                    API Code
                                                </Typography>
                                                <Button color='primary' variant='outlined' startIcon={<AddIcon />} sx={{width: '200px'}} onClick={() => goEditPrompt(true)}>Create PROMPT</Button>
                                                <hr />
                                                <List mode='dalle' />
                                            </Stack>
                                        ) 
                                        :
                                        (
                                            <Stack width={'750px'} justifyContent={"center"} spacing={3} >                                    
                                                <Typography variant='h2'>
                                                    Prompts Generator
                                                </Typography>
                                                <Button color='primary' variant='outlined' startIcon={<ReplyAllIcon />} sx={{width: '200px'}} onClick={() => goEditPrompt(false)}>Back</Button>
                                                <hr />
                                                <Prompts mode='dalle' setPromptFlag={setPromptFlag}/>
                                            </Stack> 
                                        )
                                    }
                                </Stack>
                            </Drawer>
                        </Stack>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="OVERVIEW" value="1" />
                                <Tab label="USE CASES" value="2" />
                                <Tab label="DOCUMENTATION" value="3" />
                            </TabList>
                            </Box>
                            <TabPanel value="1" sx={{ px: 2 }}>
                                <Typography variant='h2'>
                                    Overview
                                </Typography>
                                <Typography variant='body1' sx={{ py: 2 }}>
                                    <b>text-bison</b> is the name of the PaLM 2 for text large language model that understands and generates language. It's a foundation model that performs well at a variety of natural language tasks such as sentiment analysis, entity extraction, and content creation. The type of content that <b>text-bison</b> can create includes document summaries, answers to questions, and labels that classify content.
                                </Typography>
                                <Typography variant='body1'>
                                    The PaLM 2 for text is ideal for tasks that can be completed with one API response, without the need for continuous conversation. For text tasks that require back-and-forth interactions, use the PaLM 2 for chat.
                                </Typography>                           
                            </TabPanel>
                            <TabPanel value="2" sx={{ px: 2 }}>
                                <Typography variant='h2'>
                                    Use cases
                                </Typography>
                                <Stack sx={{ py: 2 }}>
                                    <Typography variant='body1'>
                                        {bull}<b>Summarization:</b> Create a shorter version of a document that incorporates pertinent information from the original text. For example, you might want to summarize a chapter from a textbook. Or, you could create a succinct product description from a long paragraph that describes the product in detail.
                                    </Typography>
                                    <Typography variant='body1'>
                                        {bull}<b>Question answering:</b> Provide answers to questions in text. For example, you might automate the creation of a Frequently Asked Questions (FAQ) document from knowledge base content.
                                    </Typography>
                                    <Typography variant='body1'>
                                        {bull}<b>Classification:</b> Assign a label to provided text. For example, a label might be applied to text that describes how grammatically correct it is.
                                    </Typography>
                                    <Typography variant='body1'>
                                        {bull}<b>Sentiment analysis:</b> This is a form of classification that identifies the sentiment of text. The sentiment is turned into a label that's applied to the text. For example, the sentiment of text might be polarities like positive or negative, or sentiments like anger or happiness.
                                    </Typography>
                                    <Typography variant='body1'>
                                        {bull}<b>Entity extraction:</b> Extract a piece of information from text. For example, you can extract the name of a movie from the text of an article.
                                    </Typography>
                                </Stack>
                            </TabPanel>
                            <TabPanel value="3" sx={{ px: 2 }}>
                                <Typography variant='h2'>
                                    Documentation
                                </Typography>
                                <Stack sx={{ py: 2 }}>
                                    <Stack sx={{ py: 2 }}>
                                        <Typography variant='h3'>
                                            Get started
                                        </Typography>
                                        <Typography variant='body1' sx={{ py: 2 }}>
                                            You can use Vertex AI's Generative AI Studio to experiment with the text-bison model in the Google Cloud console. The text-bison model also supports Python.
                                        </Typography>
                                        <Typography variant='body1'>
                                            Note: The PaLM 2 is available only in the US.
                                        </Typography>
                                    </Stack>
                                    <Stack sx={{ py: 2 }}>
                                        <Typography variant='h3'>
                                            Setup the PaLM 2 for text
                                        </Typography>
                                        <Typography variant='body1' sx={{ py: 2 }}>
                                            To use the PaLM 2 for text in the Google Cloud console, open it in Vertex AI's Generative AI Studio. To use it programmatically, you need to set it up in Python. Use the following topics to get started:
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </TabPanel>
                        </TabContext>
                    </Stack>
                  </Paper>
              </Grid>
          </Grid >
    );
  };
  Dalle.Layout = 'authGuard';
  export default Dalle;
  