import axios from 'axios';

export const PredictFertilizerRecommend = async (inputData) => {
  try {
    const options = {
        method: 'POST',
        url: 'http://127.0.0.1:5000///fertilizer_recommendation',
        headers: {
          'content-type': 'application/json',
        },
        data:inputData
    };


      let response = await axios(options);
      return response.data;


  } catch (error) {
    console.error(error.response.data); 
  }
};