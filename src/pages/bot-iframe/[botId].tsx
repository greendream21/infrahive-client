import { useEffect, useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Grid, Paper, Stack, Table, TableBody, TableContainer, TableRow, Typography } from '@mui/material';

import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';

// project imports
import { gridSpacing } from 'store/constant';
// action imports
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
// action imports
import { getChatText } from 'actions/application';
import { moveScroll } from 'utils/scroll';
import { useSelector } from 'store';
// ==============================|| ChatGPT part ||============================== //

const ChatGPT = () => {
  const theme = useTheme();
  const router = useRouter();
  const [prompt, setPrompt] = useState<String>('');
  const [totalMessage, setTotalMessage] = useState<any>([]);
  const [message, setMessage] = useState<String>('');
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const email = user.email;

  const messageKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      if (message != '') {
        sendMessage();
      }
    }
  };

  const sendMessage = async () => {
    setLoading(true);
    if (message === '') return;
    setMessage('');
    setTotalMessage((prev: []) => {
      return [...prev, { type: 'me', message }];
    });
    moveScroll('');
    const { data } = await getChatText(message, prompt || '', email);
    setTotalMessage((prev: []) => {
      return [...prev, { type: 'ai', message: data.text }];
    });
    setLoading(false);
    moveScroll('');
  };
  
  const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0
    }
  }));
  useEffect(() => {
    if (router.isReady) {
      setPrompt(String(router.query['botId']));
    }
  }, []);
  return (
    <Grid container spacing={gridSpacing}>
    {loading ? (
          <div className="spinner">
            <img src='/assets/animation/Book.gif' />
          </div>
        ) : null}
      <Grid item xs={12} lg={12} md={12}>
        <Paper sx={{ width: '100%', p: theme.breakpoints.down('sm') ? 0 : 5, height: '100vh', position: 'relative' }}>
          <TableContainer component={Paper} id="chat-box" sx={{ height: '90vh' }}>
            <Table aria-label="customized table">
              <TableBody sx={{ width: '100%', height: '90vh', overflow: 'auto', display: 'contents' }}>
                {totalMessage.map((item: any, i: any) => {
                  if (item.type === 'me') {
                    return (
                      <StyledTableRow key={i}>
                        <Stack direction={'row'} padding={5} spacing={2}>
                          <Avatar alt="User" />
                          <Typography marginTop={'10px !important'}>{item.message}</Typography>
                        </Stack>
                      </StyledTableRow>
                    );
                  } else {
                    return (
                      <StyledTableRow key={i}>
                        <Stack direction={'row'} padding={5} spacing={2}>
                          <Avatar src="/assets/images/logo_chat.png" alt="AI" />
                          <Typography marginTop={'10px !important'}>{item.message}</Typography>
                        </Stack>
                      </StyledTableRow>
                    );
                  }
                })}
                {totalMessage.length == 0 && (
                  <StyledTableRow>
                    <Stack direction={'row'} padding={5} spacing={2}>
                      <Avatar src="/assets/images/logo_chat.png" alt="AI" />
                      <Typography marginTop={'10px !important'}>
                        Enter your message to start a chat. This could be a question, a statement, or any other text.
                      </Typography>
                    </Stack>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Paper
            elevation={1}
            sx={{
              p: '2px 2px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              position: 'absolute',
              bottom: '0',
              width: '100%'
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Please input the text."
              inputProps={{ 'aria-label': 'search google maps' }}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyDown={messageKeyDown}
            />
            <IconButton type="button" sx={{ p: '10px' }} onClick={sendMessage} aria-label="search">
              <SendIcon />
            </IconButton>
          </Paper>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ChatGPT;
