import { useState } from "react";
import axios from "axios"
import styles from './Chatboot.module.css'
function Chatbot() {

  //Styles
  const {ChatbootHeader,ChatbootContenar,InputContenar,ResultContenar,InfoMessage,InfoResponse} = styles

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = (e) =>{
    axios.post("http://localhost:5000/chatbot",{
      prompt:message
    }).then((res)=>{
        console.log(res)
        setResponse([res.data.content])
        setChatHistory((pre)=>[
            ...pre,{
            Hmessage:message,
            Hresponse:res.data.content
          }]
        
        )
    }).catch((error)=>{
        console.log(error)
    })
  }
  return (
    <section className={ChatbootContenar}>

    <div className={ChatbootHeader}>
      <h1>ChatBoot</h1>
    </div>

    <div className={ResultContenar}>
      {
        chatHistory.map((pre)=>{
          const {Hmessage,Hresponse} = pre
          return(
            <>
              <p className={InfoMessage}> {Hmessage}</p>
              <br />
              <p className={InfoResponse}>{Hresponse? Hresponse: "Ask me anything you want....."}</p>
            </>
          )
        })
      }
    </div>

    <div className={InputContenar}>
      <input type="text" onChange={(e)=>setMessage(e.target.value)} />
      <button onClick={()=>sendMessage()}>Send</button>
    </div>

    </section>
  )
}


export default Chatbot;
