import Axios from 'utils/axios';

const promptSubmit = async (log: any) => {
    const { promptsName, promptsValue, imageStyle, size, mode } = log
    const data = await Axios.post('/api/image/promptSubmit', { promptsName, promptsValue, imageStyle, size, mode });
    return data;
}

const loadPrompt = async (mode: String) => {
    const data = await Axios.post('/api/image/loadPrompt', { mode });
    return data;
}

const promptCode = async (promptsValue: String, imageStyle: String, mode: String, width: String, height: String, size: String, type: String) => {
    const data = await Axios.post('/api/image/promptCode', { promptsValue, imageStyle, mode, width, height, size, type });
    return data;
}

export { promptSubmit, loadPrompt, promptCode };