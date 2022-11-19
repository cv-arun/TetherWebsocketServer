const axios=require('axios')

 const instance = axios.create({
    baseURL: 'https://tetherapi.cyclic.app/chat',
  });

  module.exports=instance