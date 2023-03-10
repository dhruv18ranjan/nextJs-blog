import Author from "@/components/_child/Author";
import Related from "@/components/_child/related";
import Format from "@/layout/Format";
import fetcher from "@/lib/fetcher";
import getPost from "@/lib/helper";
import Image from "next/image";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";



export default function Page({fallback}){

    const router=useRouter()
    const {postId} =router.query

    const {data,isLoading,isError}=fetcher(`api/posts/${postId}`)
    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>ERROR</div>

    return (
        <SWRConfig value={{fallback}}>

            <Article {...data}></Article>
        </SWRConfig>
    )

}


  function Article({title,img,published,description,author,subtitle}){



    return (
        <Format>
            <section className="container mx-auto md:px-2 py-16 w-1/2">
                <div className="flex justify-center">
                {author?<Author {...author}></Author>:<></>}
                </div>
                <div className="post py-10">
                    <h1 className="font-bold text-4xl text-center pb-10">{title||"no title"}
                          </h1>
                    <p className="text-gray-500 text-xl text-center">{subtitle ||"no subtitle"}</p>
                    <div className="py-10">
                        <Image src={img||"/"} height={700} width={900} />
                    </div> 
                    <div className="content text-gray-600 text-lg flex flex-col gap-4">
                        {description||"no description"}
                    </div>
                </div>
                <Related />
            </section>
        </Format>
    )
}

export async function getStaticProps({params}){
    const posts=await getPost(params.postId)
    return {
        props:{
            fallback:{
                'api/posts':posts
            }
        }
    }
}
export async function getStaticPaths(){
    const posts=await getPost();

    const paths=posts.map(value=>{
        return {
            params:{
                postId:value.id.toString()
            }
        }
    })
    return {
        paths,fallback:false
    }

}
