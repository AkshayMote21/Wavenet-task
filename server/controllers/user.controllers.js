// import bcrypt from 'bcrypt';
// import User from '../models/user.models.js';

// export const createUser = async (req, res) => {
//   const { username, email, password, role } = req.body;
//   const creator = req.user;

//   if (
//     (creator.role === 'SUPER_ADMIN' && role !== 'ADMIN') ||
//     (creator.role === 'ADMIN' && role !== 'UNIT_MANAGER') ||
//     (creator.role === 'UNIT_MANAGER' && role !== 'USER')
//   ) {
//     return res.status(403).json({ error: 'Role not allowed to create this user' });
//   }

//   const hash = await bcrypt.hash(password, 10);
//   const idPrefix = role === 'ADMIN' ? 'A' : role === 'UNIT_MANAGER' ? 'UM' : 'U';
//   const count = await User.countDocuments({ role });
//   const userId = `${idPrefix}${count + 1}`;

//   const newUser = new User({
//     userId,
//     username,
//     email,
//     password: hash,
//     role,
//     createdBy: creator.userId,
//   });

//   await newUser.save();
//   res.json(newUser);
// };



import User from '../models/user.models.js';
import  GenerateUserId  from '../models/generator.userId.js';
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
  try {
    const { username, email, password, role, createdBy } = req.body;

    // Check for existing email
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    // Generate userId like SA1, A2, etc.
    const userId = await GenerateUserId(role);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      userId,
      username,
      email,
      password: hashedPassword,
      role,
      createdBy,
    });

    res.status(201).json({message:`${role} created`,success:true});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while creating user' });
  }
};

export const GetAllUsers = async(req,res) =>{
    try{
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ message: "token not found" });
      const data = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(data.uniqueId);
      if (!user) {
        return res.status(401).json({ success: false, error: "Data not found" });
      }
      const allUsers = await User.find({role:data.role});
      return res.json({success:true,allUsers})
    }catch(error){
        return res.json({success:false,error});
    }
};