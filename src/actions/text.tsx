import Axios from 'utils/axios';

const promptCode = async (prompt: String, model: String, temperature: String, max_tokens: String, top_p: String, n: String, presence_penalty: String, frequency_penalty: String, best_of: String, codeType: String, top_k: String ) => {
    let data;
    if (model === "gpt3" || model === "chatgpt" || model === 'gpt4') {
        data = await Axios.post('/api/text/code', { prompt, model, temperature, max_tokens, top_p, n, presence_penalty, frequency_penalty, best_of, codeType });
    } else if (model === "clause-v1" || model === "clause-instant-v1") {
        data = await Axios.post('/api/text/code', { prompt, model, max_tokens, temperature, top_k, top_p, codeType });
    } else {
        data = await Axios.post('/api/text/code', { prompt, model, max_tokens, n, top_k, top_p, frequency_penalty, presence_penalty, temperature, codeType });
    }
    return data;
}

export { promptCode };