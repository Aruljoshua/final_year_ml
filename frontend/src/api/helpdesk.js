import axios from 'axios';

export const getHelpdeskdata = async (inputData) => {
  try {
    console.log("entered");
    const options = {
  method: 'POST',
  url: 'https://chatgpt-best-price.p.rapidapi.com/v1/chat/completions',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '311ca5084fmsh6153cecccd5a36ap1ec74bjsn48d12626560d',
    'X-RapidAPI-Host': 'chatgpt-best-price.p.rapidapi.com'
  },
  data: {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: 'Hello, how are you?'
      }
    ],
    web_access: false,
    system_prompt: '',
    temperature: 0.9,
    top_k: 5,
    top_p: 0.9,
    max_tokens: 256
  }
};

      let response = await axios(options);
      console.log (response.data.choices[0].message.content);
      console.log("entered");

    return response.data.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
};