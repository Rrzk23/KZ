import  SignIn from '../components/signIn/SignIn';
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/Context";


const LoginPage = () => {
    const context = useAppContext();
    const setAdmin = context.setAdmin;
    const navigate = useNavigate();
    return (
        <SignIn
        onHide={()=>{}}
        onLoginSuccessfully= {(admin)=>{
          setAdmin(admin);
          navigate('/')
        }}
      />
    )
}

export default LoginPage;