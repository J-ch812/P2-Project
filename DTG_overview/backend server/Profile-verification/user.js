import {User} from "../Profile-model/user.js";
const registerUser = async (req,res) => {

    try{ const {email, username, password} = req.body;

     if (!username||!email||!password) {
        return res.status(400).json({ message:"Fill in all your information"})
     };

     const existing = await User.findOne({email: email.toLowerCase()})
     if (existing) {
        return res.status(400).json({message:"email already exist"})
     };

     const user = await User.create( {
      username,
      email: email.toLowerCase(),
      password,
      loggedIn: false,
      
     });

     res.status(201).json({message:" You succesfully created an account",
      user:{id: user._id, email:user.email, username: user.username} 
     });

    } catch (error){

      res.status(500).json({message: "Technical issue", error: error.message} )
      

    };

    

    
};

export { registerUser,

};

 const loginUser = async (req,res) => {

 try{
   

   const {email,password, username} = req.body;
   const user = await User.findOne({
      email:email.toLowerCase()
   });

   if (!user||!password||!username) return res.status(400).json({message:"user not found"});

   const existing = await User.findOne({ email: email.toLowerCase ()});
   if (existing){
      return res.status(400).json({message:"user already exist"});

      const user = await User.create({
         username,
         email: email.toLowerCase(),
         password,
         loggedIn: false,

      });
   

   }

   const isMatch = await user.comparePassword(password);
   if (!isMatch) return res.status(400).json({
      message:"wrong password"
   })

   
   res.status(201).json({
   message: "You succesfully logged in",
   user:{
      id: user.id_,
   email: user.email,
   username: user.username,

   } 
   })
  

} catch (error){
   res.status(500).json({
         message: "Technical issue",
         error: error.message,

   });



}



};

export{loginUser,
   
};