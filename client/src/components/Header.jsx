import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Header = () => {
    let { user, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logoutUser()
        navigate('/login')
    }
    return ( 
        <div>
            <Link to="/"> Home </Link>
            <span> | </span>
            {/* this would be a ternary if and else statement */}
            {user ? (
                <p onClick={handleLogout}> Logout </p>
            ): (
                <Link to="/login"> Login </Link>
            )}

        {user && <p>Hello {user.username}</p>}
        </div>
    );
}

export default Header;