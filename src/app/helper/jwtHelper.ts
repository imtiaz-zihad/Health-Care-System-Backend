import jwt, { Secret, SignOptions } from "jsonwebtoken";
import config from "../../config";


const generateToken = (payload:any,secret: Secret,expiresIn: string) =>{

    
      const token =  jwt.sign(payload,secret,
        {
          algorithm: config.token.algorithm,
          expiresIn: config.token.expireIn,
        } as SignOptions
      );

      return token;
      
}

export const jwtHelper= {
    generateToken
}