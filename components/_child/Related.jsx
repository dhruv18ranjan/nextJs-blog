import Link from "next/link"
import Image from "next/image"
import Author from "./author"
import fetcher from "@/lib/Fetcher"

export default function Related() {
    const{data,isLoading,isError}=fetcher('api/trending')
    if(isLoading) return <div>Loading..</div>
    if(isError) return <div>Error</div>
    return (
        <section className="pt-20">
            <h1 className="font-bold text-3xl py-10">Reated</h1>

            <div className="flex flex-col gap-10">
                {data.map((value,index)=>(
                    <Post key={index} data={value}></Post>
                ))}
            </div>
        </section>
    )
}


function Post({data}) {
    const {title, category,img , published,author}=data;
    return (
        <div className="flex gap-5">
            <div className="image flex flex-col justify-start">
                <Link legacyBehavior href={"/"}><a><Image src={img} className="rounded" width={300} height={200} /></a></Link>
            </div>
            <div className="info flex justify-center flex-col">
                <div className="cat">
                    <Link legacyBehavior href={"/"}><a className="text-orange-600 hover:text-orange-800">{category||"category"}</a></Link>
                    <Link legacyBehavior href={"/"}><a className="text-gray-800 hover:text-gray-600">{published || "date" }</a></Link>
                </div>
                <div className="title">
                    <Link legacyBehavior href={"/"}><a className="text-xl font-bold text-gray-800 hover:text-gray-600">{title||"no title"}</a></Link>
                </div>
                {author?<Author {...author}></Author>:<></>}
            </div>
        </div>
    )
}