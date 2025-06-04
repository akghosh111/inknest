
import { Avatar } from "./BlogCard"
export const Appbar = () => {
  return (
    <div className="border-b border-slate-200 flex justify-between px-10 py-4">
        <div className="flex flex-col justify-center">
            Inknest
        </div>
        <div>
            <Avatar name="tirtha" size={"big"}/>
        </div>
      
    </div>
  )
}

