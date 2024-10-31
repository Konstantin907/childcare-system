import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import User from '../../models/user.model/user.model.js'




//RETGISTER A SINGLE USER AS AN ADMIN:
export const registerAdmin = async(req, res) => {
    try {
        const { email, pin } = req.body;

        // if there's no pin or email:
        if(!pin && !email){
            res.status(400).json({ message: 'No PIN or Email' });       
        }

        // hashing pin num:
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.pin, salt)

        const newUser = new User({
            pin: hash,
            email: email,
            role: 'admin',
        });

        await newUser.save();

        res.status(200).json({ message: 'User created', newUser })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' })
    }
}


// login

export const loginAdmin = async(req, res) =>{
   try {
    
    const { pin, email } = req.body;

    // validation:
    if (!email) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!pin) {
        return res.status(400).json({ message: 'PIN is required' });
    }
    // 
    const user = await User.findOne({ email })

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

    const isPinValid = await bcrypt.compare(pin, user.pin);
    if (!isPinValid) {
        return res.status(400).json({ message: 'Invalid PIN' });
    }

    // token:

    const token = jwt.sign(
        { email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )

    res.cookie('token', token, {
        httpOnly: true,  
        maxAge: 60 * 60 * 1000
    });

    res.status(200).json({ message: 'User authenticated', user });

   } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' })
   }
}

// Logout:

export const logoutAdmin = async (req, res) => {
    try {
         res.clearCookie('token', {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
         })

         res.status(200).json({ message: 'Successfully logged out' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' })
    }
}


// admin credentials:
// {
//     "email": "example@gmail.com",
//     "pin": "1234"
// }