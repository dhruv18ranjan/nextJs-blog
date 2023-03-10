import Image from "next/image"
import Link from "next/link"

const Author = ({name,designation,img}) => {
  if(!name && !img) return <></>;

  return (
    <div className="author flex py-5">
        <Image src={img||"/"} height={60} width={60} className="rounded-full" />
        <div className="flex flex-col justify-center px-4">
            <Link legacyBehavior href={"/"}><a className="text-md font-bold text-gray-800 hover:text-gray-600 ">{name||"no name"}</a></Link>
            <span className="text-sm text-gray-500">{designation||"no designation"}</span>
        </div>
    </div>
  )
}

export default Author