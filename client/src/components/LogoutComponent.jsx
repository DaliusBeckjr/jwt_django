import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const {logoutUser} = useContext(AuthContext)
    const navigate = useNavigate

    const handleLogout = () =>{
        logoutUser()

        navigate('/login')
    }
}
export default Logout;