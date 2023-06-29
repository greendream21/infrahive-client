import { useEffect, useState } from 'react';
import { useSelector } from 'store';
import PropTypes from 'prop-types';
// material-ui
import { Grid, Paper, Stack, Typography, Button, Toolbar, TextField, } from '@mui/material';

import ReplyIcon from '@mui/icons-material/Reply';
import DescriptionIcon from '@mui/icons-material/Description';
import LanguageIcon from '@mui/icons-material/Language';

// project imports
import { gridSpacing } from 'store/constant';
import snackbar from 'utils/snackbar';
// file module imports
import { FileUploader } from "react-drag-drop-files";
// action imports
import { documentSubmit, loadAlldocuments, webURLSubmit, } from 'actions/chatapplication';
import { useRouter } from 'next/router';
// ==============================|| Documnet Analysis ||============================== //

const newApp = () => {
    
    const user = useSelector(state => state.auth.user);
    const [rows, setRows] = useState([]);
    const [createType, setCreateType] = useState('unselect');
    
    const [url, setUrl] = useState('');

    const router = useRouter();
    
    const email = user.email;
    
    /* file drag and drop*/
    const [file, setFile] = useState<File | undefined>(undefined);    
    const fileTypes = ["pdf", "txt", "docx"];

    const [selected, setSelected] = useState([]);

    const docCreate =async () => {
        setCreateType('documents');
    };

    const webCreate =async () => {
        setCreateType('website');
    };

    const back =async () => {
        router.push('/app/cust_support');
    };

    const backApp =async () => {
        router.push('/app/newapp');
        setCreateType('unselect');
    };

    const fileHandleChange = (file: any) => {
        setFile(file);
    };
    
    const init = async () => {
        const result = await loadAlldocuments(email);
        setRows(result.data);
    }
    useEffect(() => {
        init();
    }, []);
    
    const submitFile = async () => {
        if (!file) {
            snackbar("Please select the file.", "error")
            return;
        }
        const data = new FormData();
        data.append('file', file || "");
        data.append('email', email);
        const result = await documentSubmit(data);
        if (result.status == 200) {
            snackbar("File Uploaded successfully.");
            setFile(undefined);
            init();
            router.push("/app/cust_support");
        }
    }

    const submitURL = async () => {
        if (!url) {
            snackbar("Please submit URL.", "error")
            return;
        }

        const result = await webURLSubmit(email, url);        
        
        if (result.status == 200) {
            snackbar("File Uploaded successfully.");
            init();
            router.push("/app/cust_support");
        }
    }

    const EnhancedTableToolbar = (props: any) => {
        const { numSelected } = props;
        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    justifyContent: "flex-start"
                }}
            >
                <Stack direction={"row"} sx={{ my: '10px', width: '100%', alignItems: 'center' }} justifyContent={"center"} gap={"5px"}>
                    <Typography variant='h1'>
                        Create New App
                    </Typography>            
                </Stack>
            </Toolbar>
        );
    }
    EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={12} md={12}>    
                {
                    createType === 'unselect' ?
                    (<div>
                        <Button sx={{m: '3px'}} onClick={() => back()} startIcon={<ReplyIcon />} color='secondary'>
                            Back
                        </Button>
                        <Paper sx={{ width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column', gap: '20px', pb: '50px'}}>
                            <EnhancedTableToolbar numSelected={selected.length} />                    
                            <Typography variant='h2'>
                                Data source
                            </Typography>                    
                            <Button sx={{width: '40%', height: '45px', fontSize: '24px'}} onClick={() => docCreate()} endIcon={<DescriptionIcon />} color='secondary' variant="contained">
                                Documents - 
                            </Button> 
                            <Button sx={{width: '40%', height: '45px', fontSize: '24px'}} onClick={() => webCreate()} endIcon={<LanguageIcon />} color='secondary' variant="contained">
                                Website - 
                            </Button> 
                        </Paper>
                    </div>) :
                    createType === 'documents' ?
                    (
                    <div>
                        <Button sx={{m: '3px'}} onClick={() => backApp()} startIcon={<ReplyIcon />} color='secondary'>
                            Back
                        </Button>
                        <Paper sx={{ width: '100%', p: 5 }}>
                            <Stack justifyContent={"center"} spacing={3} p={1} sx={{
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
                                <Typography variant='h4'>
                                    Document Upload
                                </Typography>
                                <Typography variant='body1'>
                                    File
                                </Typography>
                                <FileUploader
                                    multiple={false}
                                    handleChange={fileHandleChange}
                                    name="file"
                                    types={fileTypes}
                                    maxSize={5}
                                    label={`Drag 'n' drop some files here,or click to select files.Maxinum size of each file is 5MB`}
                                    id="file"
                                    maxWidth="100%"
                                />
                                <Typography variant='body2'>
                                    File to be processed
                                </Typography>
                            </Stack>
                            <Stack direction={"row"} justifyContent={"flex-start"}>
                                <Button variant='contained' onClick={submitFile}>Submit</Button>
                            </Stack>
                        </Paper>
                    </div>) :
                    (
                    <div>
                        <Button sx={{m: '3px'}} onClick={() => backApp()} startIcon={<ReplyIcon />} color='secondary'>
                            Back
                        </Button>
                        <Paper sx={{ width: '100%', p: 5 }}>
                            <Stack justifyContent={"center"} spacing={3} p={1} sx={{
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
                                <Typography variant='h4'>
                                    Website URL
                                </Typography>
                                <Typography variant='body1'>
                                    Crawl
                                </Typography>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: 'space-between', gap: '10px'}}>
                                    <TextField helperText="This will crawl all the links starting with the URL (not including files on the website)." fullWidth label="Website URL" id="fullWidth" placeholder="https://www.example.com/" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setUrl(event.target.value);}}/>
                                    <Button variant='contained' onClick={submitURL} size="large" >Submit</Button>
                                </div>
                            </Stack>
                        </Paper>
                    </div>)
                }
            </Grid>
        </Grid >
    );
};
newApp.Layout = 'authGuard';
export default newApp;