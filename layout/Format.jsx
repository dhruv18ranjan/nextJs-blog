import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";


export default function Format({children}){
    return (
        <>
        <Head>
            <title>Blog</title>
        </Head>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}