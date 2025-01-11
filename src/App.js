import './App.css';
import geminiImage from '../src/assets/google-gemini-ai.png';
import user from '../src/assets/userimg.jpg'
import {useState} from 'react';
import axios from 'axios';

function App() {
  const [question,setquestion]=useState('');
  const [response,setresponse]=useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const submitHandler=(e)=>{
    e.preventDefault();
    console.log(question);
    setIsLoading(true);
    axios.post('http://localhost:4000/getResponse',{question:question})
    .then(res=>{
      console.log(res.data.response);
      setresponse(res.data.response);
      
    })
    .catch(err=>{
      console.log(err);
      setresponse('Error fetching response');
    })
    .finally(() => {
      setIsLoading(false); 
    });
  }

  const speakHandler=()=>{
    const textToSpeech=new SpeechSynthesisUtterance(response);
    window.speechSynthesis.speak(textToSpeech);
  }

  const stopSpeakingHandler = () => {
    window.speechSynthesis.cancel();
  };
  return (
   <div className="App">
     <div className='flex items-center justify-center h-[50px] w-full mb-10 text-3xl text-white font-bold bg-cyan-400'>
      GEMINI VOICEMATE
     </div>
     <div className=" flex">
     <div className="w-[50%] flex flex-col justify-center items-center text-white gap-10">
      <div className="profile w-[200px] h-[200px] rounded-full shadow-[5px_5px_10px_royalblue] overflow-hidden">
      <img src={user} className="w-[200px] h-[216px] z-1" alt="user-ai"></img>
      </div>
      <h1 className='font-bold text-3xl text-violet-600'>Ask your Question</h1>
      <textarea className="w-[80%] h-[300px] border-black bg-transparent rounded-lg shadow-[5px_5px_10px_white] p-4 text-2xl "
        onChange={(e)=>{setquestion(e.target.value)}}
      />
      <button className="mb-10 w-[80%] border-none outline-none bg-indigo-600 rounded-lg p-2 cursor-pointer"
      onClick={submitHandler}>
        SEND
      </button>
     </div>
     <div className="w-[50%] flex flex-col justify-center items-center text-white gap-10">
        <div className="profile w-[200px] h-[200px] rounded-full overflow-hidden">
        <img src={geminiImage} className="w-[200px] h-[200px] z-1" alt="gemini-ai"></img>
        </div>
        <h1 className='text-violet-600 font-bold text-3xl'>Gemini Response</h1>
        <textarea className="flex items-center justify-center w-[80%] h-[300px] border-none  bg-transparent rounded-lg shadow-[5px_5px_10px_white] p-4 resize-none overflow-auto [-ms-overflow-style:none] [scrollbar-width:none] text-2xl text-cyan-900"
                  value={isLoading ? 'Loading...' : response}
         />
       <div className='flex gap-4'>
       <button className="mb-10 border-none outline-none bg-indigo-600 rounded-lg p-2 cursor-pointer w-72"
                onClick={speakHandler}>
          SPEAK
        </button>
        <button className="mb-10 border-none outline-none bg-indigo-600 rounded-lg p-2 cursor-pointer w-72"
                onClick={stopSpeakingHandler}>
          STOP
        </button>
       </div>

     </div>
    
    </div>
    
   </div>
  );
}

export default App;
