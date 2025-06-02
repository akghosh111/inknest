import type { ChangeEvent } from "react";
import  { useState} from "react";
import { Link } from "react-router-dom"
import type { SingupInput } from "@anukiranghosh/inknest-common";
export const Auth = ({type}: {type: "signup" | "signin"}) => {
    const [postInputs, setPostInputs] = useState<SingupInput>({
        name: "",
        email: "",
        password: ""
    })
  return (
    <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>

                <div className="text-3xl font-extrabold">
                    Create an account
                </div>
            <div className="text-slate-500">
                Already have an account? 
                <Link className="pl-2 underline" to={"/signin"}>Login</Link>
                
            </div>
            <LabelledInput label="Name" placeholder="Tirtha Sarkar" onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    name: e.target.value
                })

            }}/>
            <LabelledInput label="Email" placeholder="tirtha@gmail.com" onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    email: e.target.value
                })

            }}/>
            <LabelledInput label="Password" type= {"password"} placeholder="******" onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    password: e.target.value
                })

            }}/>
            </div>
        </div>
      
    </div>
  )
}


interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput ({ label, placeholder, onChange,type }: LabelledInputType) {
    return (

    <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
    </div>
    )
}

