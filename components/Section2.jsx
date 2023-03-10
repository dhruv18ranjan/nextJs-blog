import Image from "next/image"
import Link from "next/link"
import Author from "./_child/Author"
import fetcher from "@/lib/Fetcher"
const Section2 = () => {
    
    const{data,isLoading,isError}=fetcher('api/posts')
    if(isLoading) return <div>Loading..</div>
    if(isError) return <div>Error</div>
    
    
    return (
        <section className=" container mx-auto md:px-20 py-10">
            <h1 className="font-bold text-4xl py-12 text-center">Latest Post</h1>
            {/* "grid columns" */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
                {data.map((value,index)=>(
                    <Post data={value} key={index} />
                ))}
            </div>
        </section>
    )
}

function Post({data}) {
    const {id,title,category,img,published,author}=data;
    return (
        <div className="item">
            <div className="images">
                <Link legacyBehavior href={`/posts/${id}`}>
                    <a>
                        <Image src={img || "/"} className="rounded" width={500} height={350} />
                    </a>
                </Link>
            </div>
            <div className="info flex justify-center flex-col py-4">
                <div className="cat">
                    <Link legacyBehavior href={`/posts/${id}`}><a  className="text-orange-600 hover:text-orange-800" >{category || "unknown"}</a></Link>
                    <Link legacyBehavior href={`/posts/${id}`} className="text-gray-800 hover:text-gray-600" ><a >{published || "unknonw"}</a></Link>
                </div>
                <div className="title">
                    <Link legacyBehavior href={`/posts/${id}`} ><a className="text-xl  font-bold text-gray-800 hover:text-gray-600">{title ||'title'}</a></Link>
                </div>
                <p className="text-gray-500 py-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, excepturi veniam sunt impedit, eius error itaque distinctio tempore amet eligendi quia iusto modi dolorem ut molestias voluptatum.
                    Aspernatur accusamus eos, voluptatibus inventore mollitia hic?</p>
                    {author?<Author {...author}></Author>:<></>}
            </div>
        </div>
    )
}


export default Section2