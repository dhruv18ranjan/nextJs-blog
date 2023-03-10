import Image from "next/image"
import Link from "next/link"
import Author from "./_child/Author"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperCore, { Autoplay } from "swiper";
import fetcher from "@/lib/fetcher";

const Section1 = () => {

    const{data,isLoading,isError}=fetcher('api/trending')
    if(isLoading) return <div>Loading..</div>
    if(isError) return <div>Error</div>

    SwiperCore.use([Autoplay])

    const bg = {
        background: "url('/images/banner.png') no-repeat",
        backgroundPosition: "right"
    }

    return (
        <section className="py-16" style={bg}>
            <div className="container mx-auto md:px-20">
                <h1 className="font-bold text-4xl pb-12 text-center">Trending</h1>

                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 2000
                    }}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {data.map((value,index)=>(
                        <SwiperSlide key={index}><Slide data={value} ></Slide></SwiperSlide>
                    ))}
                </Swiper>



            </div>
        </section>
    )
}

function Slide({data}) {

    const {id,title,category,img,published,author,description}=data;

    return (
        <div className="grid md:grid-cols-2">
            <div className="image">
                <Link legacyBehavior href={`/posts/${id}`}>
                    <a>
                        <Image src={img || "/"} width={600} height={600} />
                    </a>
                </Link>
            </div>
            <div className="info flex justify-center flex-col">
                <div className="cat">
                    <Link legacyBehavior href={`/posts/${id}`}><a  className="text-orange-600 hover:text-orange-800" >{category || "category"}</a></Link>
                    <Link legacyBehavior href={`/posts/${id}`} className="text-gray-800 hover:text-gray-600" ><a >{published || "unknown"}</a></Link>
                </div>
                <div className="title">
                    <Link legacyBehavior href={`/posts/${id}`} ><a className="text-3xl md:text-6xl font-bold text-gray-800 hover:text-gray-600">{title||"unknown"}</a></Link>
                </div>
                <p className="text-gray-500 py-3">{description || "description"}</p>
                {author?<Author {...author}></Author>:<></>}
            </div>
        </div>
    )
}

export default Section1