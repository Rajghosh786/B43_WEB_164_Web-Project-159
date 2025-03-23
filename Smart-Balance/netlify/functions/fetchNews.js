
const axios = require("axios");

exports.handler = async function (event, context) {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'finance',
        pageSize: 8,
        page: event.queryStringParameters.page,
        apiKey: 'e0cdf2ea62e94fccb775cd4c6a07144d', 
      }
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching data' }),
    };
  }
};
