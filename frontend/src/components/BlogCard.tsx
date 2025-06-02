
interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate
}:BlogCardProps) => {
  return (
    <div>
      <div className="flex">
        <div className="flex justify-center flex-col">

        <Avatar name={authorName}/>
        </div>
        <div className="font-light pl-2">
            {authorName}
        </div>
            <div className="pl-2 font-thin">
                
                {publishedDate}
            </div>
      </div>
      <div>
        {title}
      </div>
      <div>
        {/* add a check if the content is greater than 100 */}
        {content.slice(0,100)+ "..."}
      </div>
      <div>
        {`${Math.ceil(content.length / 100)} minutes`}
      </div>
      <div className="bg-slate-200 h-1 w-full">

      </div>
    </div>
  )
}

function Avatar({ name }: { name: string }) {
    return (
        <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-200 rounded-full">
            <span className="text-xs font-extralight text-gray-600">{name[0]}</span>
        </div>
    )
}


