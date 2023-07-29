import axios from 'axios'
import {useNavigate } from 'react-router-dom'

const Hello = () => {
    const navigate=useNavigate()

    const handleLogout=()=>{
        axios.get('http://127.0.0.1:8000/user/logout',{
            
        }).then((response)=>{
            console.log(response)
            if(response.data.msg==="user logout"){
                navigate("/")
              }
              
            })
            .catch((error)=>{
              console.log(error)
        })
    }
  return (
    <div>
      Welcome User!
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Hello;
