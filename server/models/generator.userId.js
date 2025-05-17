
import User from './user.models.js';

 const GenerateUserId = async (role) => {
  console.log("role",role)
  let prefix;
  switch (role) {
    case 'SUPER_ADMIN': prefix = 'SA'; break;
    case 'ADMIN': prefix = 'A'; break;
    case 'UNIT_MANAGER': prefix = 'UM'; break;
    case 'USER': prefix = 'U'; break;
    default: throw new Error('Invalid role');
  }

  const count = await User.countDocuments({ role });
  return `${prefix}${count + 1}`;
};
export default GenerateUserId;