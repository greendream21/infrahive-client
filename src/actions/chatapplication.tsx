import Axios from 'utils/axios';
import axios from 'axios';
import { BASE_URL } from 'config';

// ==============================|| Auth actions ||============================== //
const documentSubmit = async (values: any) => {
  const data = await axios({
    method: 'POST',
    url: `${BASE_URL}/api/chatapp/documentSubmit`,
    data: values,
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
};
const webURLSubmit = async (email: String, orignal_name: String) => {
  const data = await Axios.post('/api/chatapp/webURLSubmit', { email, orignal_name });
  return data;
};
const redocumentSubmit = async (values: any) => {
  const data = await axios({
    method: 'POST',
    url: `${BASE_URL}/api/chatapp/redocumentSubmit`,
    data: values,
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
};
const rewebURLSubmit = async (filename: String, orignal_name: String) => {
  const data = await Axios.post('/api/chatapp/rewebURLSubmit', { filename, orignal_name });
  return data;
};
const loadAlldocuments = async (email: String) => {
  const data = await Axios.post('/api/chatapp/loadDcouments', { email });
  return data;
};
const loadOnedocument = async (filename: String) => {
  const data = await Axios.post('/api/chatapp/loadOneDcoument', { filename });
  return data;
};
const getChatText = async (message: String, prompt: String, email: String) => {
  const data = await Axios.post('/api/chatapp/getChatText', { message, prompt, email });
  return data;
};
const apideleteFile = async (email: String, filename: String) => {
  const data = await Axios.post('/api/chatapp/deleteFile', { email, filename });
  return data;
};
const publishChatbot = async (email: String, filename: String, publishURL: String, publishType: String) => {
  const data = await Axios.post('/api/chatapp/publishChatbot', { email, filename, publishURL, publishType });
  return data;
}

export { documentSubmit, redocumentSubmit, loadAlldocuments, loadOnedocument, getChatText, apideleteFile, publishChatbot, webURLSubmit, rewebURLSubmit };
