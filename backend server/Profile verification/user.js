import {User} from "../Profile model/user.js";
const registerUser = async (req,res) => {

    try{ const {email, username, password} = req.body 

     if (!username||!email||!password) {
        return res.status(400).json({ message:"Fill all your information"})
     };

     const existing = await user.findOne({email: email.toLowerCase()})
     if (existing) {
        return res.status(400).json({message:"email already exist"})
     };

     const user = await User.create( {
      username,
      email: email.toLowerCase(),
      password,
      loggendIn: false,
      
     });

     res.status(201).json({message:" You succesfully created an account",
      user:{id: user._id, email:user.email, username: user.username} 
     });

    } catch (error){

      res.status(500).json({message: "Technical issue", error: error. message} )
      

    };

    

    
};
export {registerUser};