import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

    const storedTokens = localStorage.getItem('authTokens');

    let [authTokens, setAuthTokens] = useState(() => 
        storedTokens
        ? JSON.parse(storedTokens)
        : null
    );
    let [user, setUser] = useState(() => 
        storedTokens
        ? jwtDecode(storedTokens)
        : null
    );
    let [loading, setLoading] = useState(true)


    let loginUser = async (e) => {
        e.preventDefault();
        let res = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await res.json()

        if(res.ok){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))

        }else{
            alert('Something went wrong!')
        }
    }

    let logoutUser = () => {
        setAuthTokens(null);
        setUser(null)
        localStorage.removeItem('authTokens')
        // navigate('/login')
    }

    let updateToken = async () => {
        console.log("update token called")
        let res = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refresh':authTokens.refresh})
        })
        let data = await res.json()

        if(res.ok){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

    useEffect(() => {

        if(loading){
            updateToken()
        }

        let fourMin = 1000 * 60 * 4;

        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, fourMin)

        return () => clearInterval(interval)


    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null: children}
        </AuthContext.Provider>
    )
}