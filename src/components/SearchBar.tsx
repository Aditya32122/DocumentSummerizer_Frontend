import {  useRef } from "react"
import { SearchIcon } from "./icons/SearchIcon";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { activeDocumentId, isAIResultLoading, messages } from "../atoms";
import axios from "axios";
import { useParams } from "react-router-dom";
export const AISearch =()=>{
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const setIsLoading = useSetRecoilState(isAIResultLoading)
    const setMessages = useSetRecoilState(messages)  
    const activeDocId = useRecoilValue(activeDocumentId)
    console.log(activeDocId)

    const params = useParams()
    console.log(params.id,"params")
    const handleInputQuery= async ()=>{

        console.log(activeDocId)
        if(!inputRef.current?.value ){
            return
        }

        if(inputRef.current.value.length  < 1){
            return
        }
        const input = inputRef.current.value
        if(!inputRef.current) return
        setMessages(prev=>[...prev,{message:input,sentBy:'user'}])
        try{

            setIsLoading(true)
            const response = await axios.post(`http://localhost:3003/api/v1/query/${params.id}`,{
                query:inputRef.current.value, 
                

            },
            {
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            }
            )
            
            setIsLoading(false)
            console.log(response)
            setMessages(prev=>[...prev,{message:response.data.answer,sentBy:'bot'}])


        }
        catch(e){
       
            console.log(e)
        }

    }

    return(
    <div className="w-[90vw] md:w-[50vw] min-h-[3rem] md:min-h-[5rem] rounded-2xl bg-[#191919] font-primary border border-gray-500/20 flex flex-col p-2 md:p-4">
        <textarea 
            ref={inputRef}
            className="bg-[#191919] text-white w-full font-primary p-2 resize-none flex-grow outline-none 
                font-medium text-sm md:text-md placeholder:text-white/40
                transition-colors duration-200 focus:ring-0 rounded-2xl"
            placeholder="Ask your PDF..."
        ></textarea>
        
        <div className="w-full flex justify-end items-center mt-2 p-2">
            <button 
                onClick={handleInputQuery}
                className="border border-white bg-white border-opacity-40 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-50 transition"
            >
                <SearchIcon classname="w-5 h-5 text-black" />
            </button>
        </div>
    </div>



    )
}