import { useState, useEffect, useContext } from "react";
import AuthContext from '../context/AuthContext'

const HomePage = () => {
  const [notes, setNotes] = useState([])
  let {authTokens, logoutUser} = useContext(AuthContext)

  useEffect(()=> {
    getNotes()
  },[])

  let getNotes = async() => {
    let res = await fetch('http://127.0.0.1:8000/api/notes/',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    })

    let data = await res.json()

    if(res.status === 200){
      setNotes(data)
    }else if(res.statusText === 'unauthorized'){
      logoutUser()
    }

  }

  return (
    <>
      <p>Welcome to the homepage</p>

      <ul>
        {notes.map(note => (
          <li key={note.id}>{note.body}</li>
        ))}
      </ul>
    </>
  );
}

export default HomePage;

