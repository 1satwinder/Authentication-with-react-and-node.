import { getDbConnection} from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid'; 
import {sendEmail} from '../util/sendEmail'

export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        const {email, password} = req.body;

        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({ email });

        if (user) {
            return res.sendStatus(409); // 409 is the "conflict" error code
        }

         // Encrypt the password
         const passwordHash = await bcrypt.hash(password, 10);
        
        const verificationString = uuid(); 

         // Store email and password hash in database (i.e. create user) - you'll also want to get the id
        const startingInfo = {
            hairColor: '',
            favoriteFood: '',
            bio: '',
        }
        const result = await db.collection('users').insertOne({
            email,
            isVerified: false,
            passwordHash,
            info: startingInfo,
            verificationString
        });
        const { insertedId } = result;
        
        try {
            await sendEmail({
                to: email,
                from: 'kaurmanjit4056@gmail.com',
                subject: 'Please verify your email',
                text: `Thanks for signing up! To verify your email, click here:
                      http://localhost:3000/verify-email/${verificationString}`
            });
        } catch (e){
            console.log(e);
            res.sendStatus(500);
        }
        
        jwt.sign({
            id: insertedId,
            isVerified: false,
            email, 
            info: startingInfo,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '2d',
        },
        (err, token) => {
            if (err) {
                return res.status(500).send(err);
                console.log(err);
            }
            res.status(200).send({ token });
            console.log(token)
        });
    }
}