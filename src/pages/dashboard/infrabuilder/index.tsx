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
                    </Stack>
                  </Paper>
              </Grid>
          </Grid >
    );
  };
  Texts.Layout = 'authGuard';
  export default Texts;
  