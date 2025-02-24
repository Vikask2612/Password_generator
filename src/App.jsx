// as
// import React from 'react'
  import { useCallback, useState, useEffect, useRef} from "react"

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed ] = useState(false)
  const [charAllowed, setCharAllowed ] = useState(false)
  const [password, setPassword ] = useState("")

  //useref hook
    const passwordRef = useRef(null)


  const passwordGenerator = useCallback(()=>{
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

        if(numberAllowed){
          str += "0123456789"
        }
        
        if(charAllowed){
          str += "!@#$%^&*()_+{}:|[;'~']"
        }

        for(let i=1; i<=length; i++){
          let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
        }

        setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  const copyPasswordToClipboard = useCallback(() =>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,99) 
    window.navigator.clipboard.writeText(password)
  },[password])
  // as


  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg
      px-8 py-4 my-8 text-black bg-gray-800 ">

      <div className="text-white text-center rounded ">Password generator
      
       <div className="flex shadow rounded-lg
       overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none text-orange-500 bg-white text-bold w-full py-1 px-3"
          placeholder="password"      
          readOnly
          ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
         className="bg-blue-600 text-white
         px-3 py-1 shrink-0"
        >copy</button>
       </div>


       <div className="flex text-sm gap-x-2">
        <div className="flex items-center text-orange-500 gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Length:{length}</label>
        </div>


       <div className="flex items-center gap-x-1 text-orange-500">
          <input
                  type="checkbox"
                  defaultChecked={numberAllowed}
                  id="numberInput"
                  onChange={() => {
                    setNumberAllowed((prev)=>
                    !prev);
                  }}
          />
          <label htmlFor="numberInput">Numbers</label>
       </div>


       <div className="flex items-center gap-x-1 text-orange-500">
        <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={()=>{
              setCharAllowed((prev)=>
              !prev);
            }}
            />
          <label htmlFor="characterInput">Characters
          </label>
       </div>

       
       </div>
      </div>   
      </div>  
    </>
  )
}

export default App