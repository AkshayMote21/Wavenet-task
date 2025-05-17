import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

export const Login = async (req, res) => {
  try{
    const { email, password, timezone } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ uniqueId : user._id, role:user.role}, process.env.JWT_SECRET_KEY);
    const userData = { userId: user.userId, role: user.role , username: user.username};
    await res.cookie("token",token);
    return res.json({success:true,message:"Login successful",userData});

  }catch(error){
    console.log(error,"error");
    return res.json({error:error,success:false});
  }
  
};

export const GetCurrentUser = async(req,res) => {
  try{
    const token = req.cookies.token; 
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token found' });
    }
    const data = await jwt.verify(token,process.env.JWT_SECRET_KEY);
    if(data?.uniqueId){
      const user = await User.findById(data?.uniqueId);
      if(!user){
        return res.json({success:false,message:"user not found"});
      }
      const userData = { userId: user.userId, role: user.role , username: user.username};
      return res.json({success:true,userData});
    }
    
  }catch(error){
    return res.json({error:error,success:false});
  }
};

export const Logout = async(req,res) =>{
  
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token found' });
    }
    const data = await jwt.verify(token,process.env.JWT_SECRET_KEY);
    if(data?.uniqueId){
      const user = await User.findById(data?.uniqueId);
      if(!user){
        return res.json({success:false,message:"Logout unsuccessful"});
      }
      res.clearCookie('token');
       return res.json({ message: `${user.role}Logged out successfully` ,success:true});
    }
};