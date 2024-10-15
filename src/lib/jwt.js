
const jwt = require('jsonwebtoken');

TOKEN_SECRET= process.env.TOKEN_SECRET || 'some key';

async function createAccessToken(payload)
{
    return new Promise((resolve,reject) => {
        jwt.sign(
            {
              payload, 
            },
            process.env.TOKEN_SECRET,
            {
              expiresIn:"1d",
            },
            (err,token)=>
            {
              if(err) reject(err);
              resolve(token);
            }
          );
    });
}


module.exports = {
  createAccessToken
};
