import {
    Button,
    Grid,
    ImageList,
    ImageListItem,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    ThemeProvider,
    createTheme,
    Paper,
    Stack,
    Typography,
    Card,
    CardContent,
    CardActions,
    Chip
  } from '@mui/material';
  import React, { ChangeEvent, FormEvent, ReactComponentElement, useEffect, useState } from 'react';
  import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
  import styled from '@emotion/styled';
  import { toNumber } from 'lodash';
  import { Download } from '@mui/icons-material';
  import { useRouter } from 'next/router';
  
  
  import { gridSpacing } from 'store/constant';
  
  // Download button styled compoennt so it can be displayed on top of the image
  const DownloadBtn = styled('a')`
    position: absolute;
    top: 10px; /* Adjust the top position as needed */
    right: 10px; /* Adjust the left position as needed */
    background-color: #ffffff;
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;
    color: #000000;
    font-weight: bold;
  `;
  
  const Stability = () => {
  
    const router = useRouter();
  
    const goStability = async () => {
        router.push(`/dashboard/images/dream`);
    }
    
    const goDalle = async () => {
        router.push(`/dashboard/images/dalle`);
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
                          OpenAI's Image Models
                      </Typography>
                      <Typography variant='body1'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eismod tempor.
                      </Typography>
                      <Card sx={{ width: 248 }} variant="outlined">
                      <CardContent sx={{ pb: 0 }}>                          
                        <Stack direction="row" spacing={1}>
                            <Chip label="Image" />
                            <Chip label="Language" variant="outlined" />
                        </Stack>
                          <Typography variant="h2" component="div" sx={{ my: 2}}>
                          Dall-E
                          </Typography>
                          <hr />
                          <Typography variant="body2" sx={{ my: 2}}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eismod tempor.
                          </Typography>
                          <Typography sx={{ mb: 2 }} color="text.secondary">
                          image-bison@001
                          </Typography>
                      </CardContent>
                      <hr />
                      <CardActions sx={{ pt: 0, pb: '3px', px: '16px'}}>
                          <Button onClick={goDalle} >View Details</Button>
                      </CardActions>
                      </Card>
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
                        Stability’s Image Models
                      </Typography>
                      <Typography variant='body1'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eismod tempor.
                      </Typography>
                      <Card sx={{ width: 248 }} variant="outlined">
                      <CardContent sx={{ pb: 0 }}>
                        <Stack direction="row" spacing={1}>
                            <Chip label="Image" />
                            <Chip label="Language" variant="outlined" />
                        </Stack>
                          <Typography variant="h2" component="div" sx={{ my: 2}}>
                          Stable Diffusion
                          </Typography>
                          <hr />
                          <Typography variant="body2" sx={{ my: 2}}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eismod tempor.
                          </Typography>
                          <Typography sx={{ mb: 2 }} color="text.secondary">
                          image-bison@001
                          </Typography>
                      </CardContent>
                      <hr />
                      <CardActions sx={{ pt: 0, pb: '3px', px: '16px'}}>
                          <Button onClick={goStability}>View Details</Button>
                      </CardActions>
                      </Card>
                  </Stack>
                  </Paper>
              </Grid>
          </Grid >
    );
  };
  Stability.Layout = 'authGuard';
  export default Stability;
  