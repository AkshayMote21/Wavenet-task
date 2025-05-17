import { useContext, useState } from 'react';
import Api from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/auth.context';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, dispatch } = useContext(AuthContext);

  const router = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    try {
      const response = await Api.post('/auth/login', { email, password, timezone });
      if(response.data.success){
          dispatch({ type: "LOGIN", payload: response.data.userData});
          console.log("state",state);
          toast.success(response.data.message);
          router("/users");
        }
      if(response?.data?.error){
          console.log("response.data.error",response?.data?.error);
          toast.error(response?.data?.error);
      }
    }catch(error){
      console.log('Login failed');
      toast.error("ERROR",error);
    }
  };

  return (
    <div className="container">
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm mt-[100px]">
          <h2 className="text-2xl font-bold mb-6 uppercase">Login</h2>
          <input className="w-full p-2 border mb-4 rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full p-2 border mb-4 rounded" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Log in</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;