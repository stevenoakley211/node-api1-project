import React,{useState,useEffect} from 'react';
import './App.css';
import UserList from "./Components/UserList"
import axios from 'axios'


function App() {

  const[userList,setUserlist] = useState([]);
  
  const getUserList = () =>{
    axios
      .get("http://localhost:5000/api/users")
      .then(res =>{
        console.log(res)
        setUserlist(res.data)
      })
      .catch(
      error => console.log(error)
    )
  }
  useEffect(()=>{
    getUserList()
  },[])
  return (
    <div className="App">
     <UserList users={userList}/>
    </div>
  );
}

export default App;
