import {
    Button,
    Grid,
    Paper,
    Stack,
    Typography,
    Card,
    CardContent,
    CardActions,
    Chip
  } from '@mui/material';
  import React from 'react';
  import { useRouter } from 'next/router';
  
  import { gridSpacing } from 'store/constant';
  
  const Texts = () => {
  
    const router = useRouter();
  
    const goGpt3 = async () => {
        router.push(`/generative-des-ui/gpt3`);
    }
    
    const goChatgpt = async () => {
        router.push(`/generative-des-ui/chatgpt`);
    }
  
    const goGpt4 = async () => {
        router.push(`/generative-des-ui/gpt4`);
    }
    
    const goClausev = async () => {
        router.push(`/generative-des-ui/clause-v1`);
    }
    
    const goClauseInstantv = async () => {
        router.push(`/generative-des-ui/clause-instant-v1`);
    }
    
    const goCommand = async () => {
        router.push(`/generative-des-ui/command`);
    }
    
    const goCommandLight = async () => {
        router.push(`/generative-des-ui/command-light`);
    }
  
    return (
      <Grid container spacing={gridSpacing}>
              <Grid item xs={12} lg={12} md={12}>
                  <Paper sx={{ width: '100%', p: 5 }}>                  
                    <Stack justifyContent={"center"} spacing={3} p={1} pb={4} sx={{
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
                        <Typography variant='h3'>
                            OpenAI
                        </Typography>
                        <Typography variant='body1'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eismod tempor.
                        </Typography>
                        <Stack direction={'row'} spacing={4}>
                            <Card sx={{ width: 248 }} variant="outlined">
                                <CardContent sx={{ pb: 0 }}>                          
                                    <Stack direction="row" spacing={1}>
                                        <Chip label="Text" />
                                        <Chip label="Language" variant="outlined" />
                                    </Stack>
                                    <Typography variant="h2" component="div" sx={{ my: 2}}>
                                        GPT-3
                                    </Typography>
                                    <hr />
                                    <Typography variant="body2" sx={{ my: 2}}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eismod tempor.
                                    </Typography>
                                    <Typography sx={{ mb: 2 }} color="text.secondary">
                                        text-bison@001
                                    </Typography> 
                                </CardContent>
                                <hr />
                                <CardActions sx={{ pt: 0, pb: '3px', px: '16px'}}>
                                    <Button onClick={goGpt3}>View Details</Button>
                                </CardActions>
                            </Card>
                            <Card sx={{ width: 248 }} variant="outlined">
                                <CardContent sx={{ pb: 0 }}>                          
                                    <Stack direction="row" spacing={1}>
                                        <Chip label="Text" />
                                        <Chip label="Language" variant="outlined" />
                                    </Stack>
                                    <Typography variant="h2" component="div" sx={{ my: 2}}>
                                        ChatGPT
                                    </Typography>
                                    <hr />
                                    <Typography variant="body2" sx={{ my: 2}}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eismod tempor.
                                    </Typography>
                                    <Typography sx={{ mb: 2 }} color="text.secondary">
                                        text-bison@001
                                    </Typography> 
                                </CardContent>
                                <hr />
                                <CardActions sx={{ pt: 0, pb: '3px', px: '16px'}}>
                                    <Button onClick={goChatgpt}>View Details</Button>
                                </CardActions>
                            </Card>
                            <Card sx={{ width: 248 }} variant="outlined">
                                <CardContent sx={{ pb: 0 }}>                          
                                    <Stack direction="row" spacing={1}>
                                        <Chip label="Text" />
                                        <Chip label="Language" variant="outlined" />
                                    </Stack>
                                    <Typography variant="h2" component="div" sx={{ my: 2}}>
                                        GPT-4
                                    </Typography>
                                    <hr />
                                    <Typography variant="body2" sx={{ my: 2}}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eismod tempor.
                                    </Typography>
                                    <Typography sx={{ mb: 2 }} color="text.secondary">
                                        text-bison@001
                                    </Typography> 
                                </CardContent>
                                <hr />
                                <CardActions sx={{ pt: 0, pb: '3px', px: '16px'}}>
                                    <Button onClick={goGpt4}>View Details</Button>
                                </CardActions>
                            </Card>
                        </Stack>
                    </Stack>
                    <hr />
                    <Stack justifyContent={"center"} spacing={3} p={1} py={4} sx={{
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
                        <Typography variant='h3'>
                            Anthropic
                        </Typography>
                        <Typography variant='body1'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eismod tempor.
                        </Typography>
                        <Stack direction={'row'} spacing={4}>
                            <Card sx={{ width: 248 }} variant="outlined">
                                <CardContent sx={{ pb: 0 }}>
                                    <Stack direction="row" spacing={1}>
                                        <Chip label="Text" />
                                        <Chip label="Language" variant="outlined" />
                                    </Stack>
                                    <Typography variant="h2" component="div" sx={{ my: 2}}>
                                        Clause-v1
                                    </Typography>
                                    <hr />
                                    <Typography variant="body2" sx={{ my: 2}}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eismod tempor.
                                    </Typography>
                                    <Typography sx={{ mb: 2 }} color="text.secondary">
                                        text-bison@001
                                    </Typography>
                                </CardContent>
                                <hr />
                                <CardActions sx={{ pt: 0, pb: '3px', px: '16px'}}>
                                    <Button onClick={goClausev}>View Details</Button>
                                </CardActions>
                            </Card>
                            <Card sx={{ width: 248 }} variant="outlined">
                                <CardContent sx={{ pb: 0 }}>
                                    <Stack direction="row" spacing={1}>
                                        <Chip label="Text" />
                                        <Chip label="Language" variant="outlined" />
                                    </Stack>
                                    <Typography variant="h2" component="div" sx={{ my: 2}}>
                                        Clause-instant-v1
                                    </Typography>
                                    <hr />
                                    <Typography variant="body2" sx={{ my: 2}}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eismod tempor.
                                    </Typography>
                                    <Typography sx={{ mb: 2 }} color="text.secondary">
                                        text-bison@001
                                    </Typography>
                                </CardContent>
                                <hr />
                                <CardActions sx={{ pt: 0, pb: '3px', px: '16px'}}>
                                    <Button onClick={goClauseInstantv}>View Details</Button>
                                </CardActions>
                            </Card>
                        </Stack>
                    </Stack>
                    <hr />
                    <Stack justifyContent={"center"} spacing={3} p={1} pt={4} sx={{
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
                        <Typography variant='h3'>
                            Cohere
                        </Typography>
                        <Typography variant='body1'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eismod tempor.
                        </Typography>
                        <Stack direction={'row'} spacing={4}>
                            <Card sx={{ width: 248 }} variant="outlined">
                                <CardContent sx={{ pb: 0 }}>
                                    <Stack direction="row" spacing={1}>
                                        <Chip label="Text" />
                                        <Chip label="Language" variant="outlined" />
                                    </Stack>
                                    <Typography variant="h2" component="div" sx={{ my: 2}}>
                                        Command
                                    </Typography>
                                    <hr />
                                    <Typography variant="body2" sx={{ my: 2}}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eismod tempor.
                                    </Typography>
                                    <Typography sx={{ mb: 2 }} color="text.secondary">
                                        text-bison@001
                                    </Typography>
                                </CardContent>
                                <hr />
                                <CardActions sx={{ pt: 0, pb: '3px', px: '16px'}}>
                                    <Button onClick={goCommand}>View Details</Button>
                                </CardActions>
                            </Card>
                            <Card sx={{ width: 248 }} variant="outlined">
                                <CardContent sx={{ pb: 0 }}>
                                    <Stack direction="row" spacing={1}>
                                        <Chip label="Text" />
                                        <Chip label="Language" variant="outlined" />
                                    </Stack>
                                    <Typography variant="h2" component="div" sx={{ my: 2}}>
                                        Command-light
                                    </Typography>
                                    <hr />
                                    <Typography variant="body2" sx={{ my: 2}}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eismod tempor.
                                    </Typography>
                                    <Typography sx={{ mb: 2 }} color="text.secondary">
                                        text-bison@001
                                    </Typography>
                                </CardContent>
                                <hr />
                                <CardActions sx={{ pt: 0, pb: '3px', px: '16px'}}>
                                    <Button onClick={goCommandLight}>View Details</Button>
                                </CardActions>
                            </Card>
                        </Stack>
                    </Stack>
                  </Paper>
              </Grid>
          </Grid >
    );
  };
  Texts.Layout = 'authGuard';
  export default Texts;
  