import {User} from "../Profile-model/user.js";
const registerUser = async (req,res) => {

    try{ const {email, username, password,semester,fieldofstudy,university,role} = req.body;

     if (!username||!email||!password||!semester||!fieldofstudy||!university||!role) {
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
      fieldofstudy,
      university,
      semester,
      role,
      loggedIn: false, /* loggedIn should be true when registration is complete --??--*/
      
     });

     res.status(201).json({message:" You succesfully created an account",
      user:{id: user._id, email:user.email, username: user.username} 
     });
     console.log("User",userSchema);

    } catch (error){
      res.status(500).json({message: "Technical issue", error} )
    };
};



 const loginUser = async (req,res) => {

 try{
   

   const {email,password} = req.body;
   const user = await User.findOne({
      email:email.toLowerCase()
   });

   if (!user) return res.status(400).json({message:"user not found"});
   

   const isMatch = await user.comparePassword(password);
   if (!isMatch) return res.status(400).json({
      message:"wrong password"
   })

   
   res.status(200).json({
   message: "You succesfully logged in",
   user:{
      id: user._id ,
   email: user.email,
   username: user.username,
   semester: user.semester,
   fieldofstudy: user.fieldofstudy,
   university: user.university,
   role: user.role


   } 
   })
  

} catch (error){
   res.status(500).json({
         message: "Technical issue",
         error

   });



}


};

const logoutUser = async (req, res)  => {
   

   try {
            return res.status(200).json({ message: "Successfully logged out" });

   } catch (error) {
      res.status(500).json({
         message: "technical issue", error
      })
      
   }
   {

   }

}

const profileForUser = async (req, res) => {
   try {
      const { userId } = req.body;
      const user = await User.findById(userId).select('-password'); /* -password to exclude the password from the response */
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ user });
   } catch (error) {
      res.status(500).json({ message: "Technical issue", error });
   }
};

const deleteUser = async (req, res) => {
   try {
      const { userId } = req.body;
      await User.findByIdAndDelete(userId);
      res.status(200).json({ message: "User deleted successfully" });
      /* res.json({ message: "User deleted successfully" }); */
   } catch (error) {
      res.status(500).json({ message: "Technical issue", error });
   }
};

export{loginUser,logoutUser,registerUser,profileForUser,deleteUser};