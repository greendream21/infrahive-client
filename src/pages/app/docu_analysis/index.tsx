import { useEffect, useState } from 'react';
import { useSelector } from 'store';
import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Paper, Stack, Typography, Button, TableHead, TableRow, TableCell, Checkbox, TableSortLabel, Box, Toolbar, TableContainer, Table, TableBody, IconButton, Modal, Select, FormControl, MenuItem, InputLabel, } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { visuallyHidden } from '@mui/utils';

import DeleteIcon from '@mui/icons-material/Delete';
import ForumIcon from '@mui/icons-material/Forum';
import ShareIcon from '@mui/icons-material/Share';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import PublicIcon from '@mui/icons-material/Public';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

// project imports
import { gridSpacing } from 'store/constant';
import snackbar from 'utils/snackbar';
// file module imports
import { FileUploader } from "react-drag-drop-files";
// action imports
import { documentSubmit, loadAlldocuments, apideleteFile, publishChatbot } from 'actions/application';
import { useRouter } from 'next/router';
import { bgcolor, margin } from '@mui/system';
// ==============================|| Documnet Analysis ||============================== //

const DocmumentAnalysis = () => {
    const theme = useTheme();
    const router = useRouter();
    const user = useSelector(state => state.auth.user);

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('primary_keywords');
    const [selected, setSelected] = useState([]);
    const [rows, setRows] = useState([]);
    const [botId, setBotId] = useState<String>('');    
    const [publishURL, setPublishURL] = useState<String>('');
    const [publish1URL, setPublish1URL] = useState<String>('');
    const [publishType, setPublishType] = useState('unpublish');

    const [open, setOpen] = useState(false);

    const email = user.email;
    // const email = "holy.dev.902@gmail.com";
    /* file drag and drop*/
    const [file, setFile] = useState<File | undefined>(undefined);
    const fileTypes = ["pdf", "txt", "docx"];

    const fileHandleChange = (file: any) => {
        setFile(file);
    };
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
        }
    }
    const init = async () => {
        const result = await loadAlldocuments(email);
        setRows(result.data);
    }
    useEffect(() => {
        init();
    }, []);

    // display the table
    const goChatGPT = async (filename: String) => {
        router.push(`/app/chatGPT/${filename}`);
    }
    const deleteFile = async (filename: String) => {
        const result = await apideleteFile(email, filename);
        if (result.status == 200) {
            snackbar("File deleted successfully.");
            init();
        }
    }

    // const shareBot = async (filename: String) => {
    //     setOpen(true);
    //     setBotId(filename);
    // }

    const publishModal =async (item: any) => {
        setOpen(true);
        setBotId(item.filename);
        setPublish1URL(item.publishURL);
    }

    const handleClose = () => setOpen(false);

    const handleChange = (event: SelectChangeEvent) => {
        setPublishType(event.target.value as string);
    };
    
    useEffect(() => {
        const URL = `http://localhost:3000/chatbot/${botId}`;
        switch (publishType) {
            case 'public':
                setPublishURL(URL);
            case 'private':
                setPublishURL(URL);
        }
    }, [publishType]);

    const publish = async (filename:String) => {
        const result = await publishChatbot(email, filename, publishURL, publishType);
        if (result.status == 200) {
            snackbar("Chatbot publish successfully.");
            init();
        }
        setOpen(false);
        setPublishType('');
    }

    const unpublish = async (filename:String) => {
        setPublishURL('');
        setPublishType('unpublish');
        const result = await publishChatbot(email, filename, '', 'unpublish');
        if (result.status == 200) {
            snackbar("Chatbot unpublish successfully.");
            init();
        }
        setOpen(false);
    }

    const headCells = [
        {
            id: 'number',
            // numeric: true,
            disablePadding: true,
            label: 'No',
        },
        {
            id: 'filename',
            // numeric: true,
            disablePadding: false,
            label: 'File Name',
        },

        {
            id: 'action',
            // numeric: true,
            disablePadding: false,
            label: 'Action',
        },
    ];

    const EnhancedTableHead = (props: any) => {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property: any) => (event: any) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={"center"}
                            // align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
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
                <Stack direction={"row"} sx={{ width: numSelected > 0 ? "40%" : "30%" }} justifyContent={"flex-start"} gap={"5px"}>
                    Your files
                </Stack>
            </Toolbar>
        );
    }
    EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
    };
    EnhancedTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={12} md={12}>
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
            </Grid>
            <Grid item xs={12} lg={12} md={12}>
                <Paper sx={{ width: '100%' }}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                        <Table
                            // sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={() => { }}
                                onRequestSort={() => { }}
                                rowCount={rows.length}

                            />
                            <TableBody>
                                {rows.map((item: any, i) =>
                                    <TableRow
                                        hover
                                        aria-checked={false}
                                        tabIndex={-1}
                                        sx={{ cursor: 'pointer' }}
                                        key={i}
                                    >
                                        <TableCell
                                            align='center'
                                        >
                                            {i + 1}
                                        </TableCell>
                                        <TableCell
                                            align='center'
                                        >
                                            {item.orignal_name}
                                            <br />
                                            <Typography variant="body1" component="pre" sx={{ p: 2, color: 'Green', textDecoration: 'underline', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                                                <a href={`${item.publishURL}`} target='_blank'>{!item.publishURL ? '' : item.publishURL}</a>
                                                {!item.publishURL ? '' : item.publishType === 'public' ? <PublicIcon fontSize="inherit" /> : <PeopleAltIcon fontSize="inherit" />}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ gap: "3px" }} align="center">
                                            <IconButton onClick={() => goChatGPT(item.filename)} aria-label="Forum" size="large" color='primary'>
                                                <ForumIcon fontSize="inherit" />
                                            </IconButton>
                                            {/* <IconButton onClick={() => shareBot(item.filename)} aria-label="share" size="large" color='secondary'>
                                                <ShareIcon fontSize="inherit" />
                                            </IconButton> */}
                                            <IconButton onClick={() => publishModal(item)} aria-label='publish' size='large' color='success'>
                                                {!publishURL ? <PublishedWithChangesIcon fontSize="inherit" /> : 
                                                <UnpublishedIcon fontSize="inherit" />}
                                            </IconButton>
                                            <IconButton onClick={() => deleteFile(item.filename)} aria-label="delete" size="large" color='error'>
                                                <DeleteIcon fontSize="inherit" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 550,
                        bgcolor: 'background.paper',
                        border: 'none',
                        borderRadius: 2,
                        p: 3,
                    }}>
                        {/* <Typography id="modal-modal-title" variant="h3" component="h2" sx={{ mx: 2 }}>
                            Embed on Website
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ m: 2 }}>
                            To add the chatbot any where on your website, add this iframe to your html code
                        </Typography>
                        <Typography variant="body1" component="pre" sx={{ p: 2, bgcolor: '#F1F5F9' }}>
                            {`<iframe
    src="http://localhost:3000/bot-iframe/${botId}"
    width="100%"
    height="700"
    frameborder="0"
></iframe>`}
                        </Typography> */}
                        {!publish1URL ?
                        (<div>
                        <Typography id="modal-modal-title" variant="h3" component="h2" sx={{ mx: 2 }}>
                            Publish Chatbot
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ m: 2 }}>
                            Choose who can access this App
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={publishType}
                                label="Type"
                                onChange={handleChange}
                            >
                                <MenuItem value="public">Public</MenuItem>
                                <MenuItem value="private">Private</MenuItem>
                            </Select>
                        </FormControl>
                        <Button onClick={() => publish(botId)} sx={{ mt: 2, float: 'right' }} variant="contained">Publish</Button> </div>): 
                        (<div>
                        <Typography id="modal-modal-title" variant="h3" component="h2" sx={{ mx: 2 }}>
                            Unpublish Chatbot
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ m: 2 }}>
                            Are you sure want to unpublish the app? This will make the app unaccessible to anyone it was already shared with.
                        </Typography>
                        <Button onClick={() => unpublish(botId)} sx={{ mt: 2, float: 'right' }} variant="contained">Unpublish</Button> </div>)}
                    </Box>
                </Modal>
            </Grid>
        </Grid >
    );
};
DocmumentAnalysis.Layout = 'authGuard';
export default DocmumentAnalysis;