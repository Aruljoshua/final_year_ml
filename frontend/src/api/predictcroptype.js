import axios from 'axios';

export const PredictCropType = async (inputData) => {
  try {
    const options = {
        method: 'POST',
        url: 'http://127.0.0.1:5000//get_selected_value',
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