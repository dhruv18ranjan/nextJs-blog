import fetcher from '@/lib/fetcher'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import Author from './_child/Author'

const Section3 = () => {

    const{data,isLoading,isError}=fetcher('api/popular')
    if(isLoading) return <div>Loading..</div>
    if(isError) return <div>Error</div>

    return (
        <div className='container mx-auto md:px-20 py-16'>
            <h1 className="font-bold text-4xl py-12 text-center">Most Popular</h1>
            {/* swipper */}

            <Swiper 
                breakpoints={{
                    640:{
                        slidesPerView:2,
                        spaceBetween:30
                    }
                }}
            >
                {data.map((value,index)=>(
                        <SwiperSlide key={index}><Post data={value} ></Post></SwiperSlide>
                    ))}
            </Swiper>

        </div>
    )
}

function Post({data}) {
    const {id,title,category,img,published,author,description}=data;
    return (
        <div className="grid">
            <div className="images">
                <Link legacyBehavior href={`/posts/${id}`}>
                    <a>
                        <Image src={img||"/"} width={600} height={400} />
                    </a>
                </Link>
            </div>
            <div className="info flex justify-center flex-col py-4">
                <div className="cat">
                    <Link legacyBehavior href={`/posts/${id}`}><a  className="text-orange-600 hover:text-orange-800" >{category ||"category"}</a></Link>
                    <Link legacyBehavior href={`/posts/${id}`} className="text-gray-800 hover:text-gray-600" ><a >{published||"unknown"}</a></Link>
                </div>
                <div className="title">
                    <Link legacyBehavior href={`/posts/${id}`} ><a className="text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600">{title||"title"}</a></Link>
                </div>
                <p className="text-gray-500 py-3">{description||"description"}</p>
                {author?<Author {...author}></Author>:<></>}
            </div>
        </div>
    )
}


export default Section3