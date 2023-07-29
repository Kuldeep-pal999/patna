import User from "../model/User.js";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";

export const signup = async (req, res) => {
    try {
      const { FullName, email,mobile, Password ,ConfirmPassword} = req.body;
  
      let existingUser;
      existingUser = await User.findOne({email});
      if(existingUser){
        return res.status(400).json({message:"this user is already exist"});
     }
   
      const user = new User({
        FullName,
        email,
      
        mobile,
        Password ,
        ConfirmPassword
      });
      await user.save();
      return res.status(201).json({ user });
    }
     catch (err) {
      return res.status(400).json({ message: "error" });
    }
  };



  export const login = async (req, res, next) => {
    try{
      const { email, password } = req.body;
      let existingUser;
     
     existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res
          .status(404)
          .json({ message: "user not found with this email please signup " });
      }
      const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect password" });
      }
      return res.status(200).json({ message: "Login Successfuly" });
    }
    catch (err) {
      console.log(err);
    }
    
  };
  


  