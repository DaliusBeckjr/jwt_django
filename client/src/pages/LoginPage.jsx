import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
    let {loginUser} = useContext(AuthContext)
    const navigate = useNavigate();

    const handlelogin = async (e) =>  {
        e.preventDefault();
        await loginUser(e);

        navigate('/')
    }

    return (
        <div>
            <form onSubmit={handlelogin}>
                <input type="text" name="username" placeholder="Enter Username" />
                <input type="password" name="password" placeholder="Enter Password" />

                <button type="submit">submit</button>
            </form>
        </div>
    )
}

