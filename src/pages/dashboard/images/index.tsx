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
  
  const Images = () => {
  
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
  Images.Layout = 'authGuard';
  export default Images;
  