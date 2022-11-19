const axios=require('axios')

 const instance = axios.create({
    baseURL: 'https://localhost:5000/chat',
  });

  module.exports=instance