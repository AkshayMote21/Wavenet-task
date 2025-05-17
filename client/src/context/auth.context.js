import { createContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import Api from "../axiosConfig";

function reducer(state, action) {
  console.log(state, action, "inside reducer function..");
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
}

const initialState = { user: null };

export const AuthContext = createContext();

function MyContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function getCurrentUser(){
    try{
        
      const response = await Api.get('/auth/get-current-user');
      if(response.data.success){
        
        dispatch({ type: "LOGIN", payload: response.data.userData });
      }
    }catch(error){
      toast.error(error?.response?.data?.error);
    }
  }
  useEffect(()=>{
    getCurrentUser();
  },[])
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
    
  );
}

export default MyContextProvider;