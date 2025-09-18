import React, { useState } from 'react'
import images from '../assets/images'
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import { HiHeart } from "react-icons/hi2";

const Home = () => {

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const cards = [
        {
            img: images.Card1,
            title: "Easy to Use",
            desc: "TrunkTrust keeps things simple—just send requests and inspect responses without needing to learn complex setups or scripts.",
        },
        {
            img: images.Card2,
            title: "Beginner Friendly",
            desc: "Perfect for new developers who need a lightweight tool for API testing without the heavy overhead of full-featured platforms.",
        },
        {
            img: images.Card3,
            title: "Totally Free",
            desc: "Open-source and MIT licensed, so you can use, modify, and extend it freely across Windows, macOS, and Linux.",
        },
    ];

    const faqs = [
        {
            q: "What is TrunkTrust?",
            a: "TrunkTrust is a lightweight, cross-platform API testing tool built with Neutralino.js. It helps developers quickly test HTTP requests without heavy apps like Postman.",
        },
        {
            q: "Which HTTP methods are supported?",
            a: "You can test GET, POST, PUT, PATCH, and DELETE requests with custom headers and request bodies.",
        },
        {
            q: "Does it work offline?",
            a: "Yes! TrunkTrust has offline-friendly UI support, so you can keep working even without an internet connection.",
        },
        {
            q: "What makes it lightweight?",
            a: "Since it’s built with Neutralino.js instead of Electron, TrunkTrust uses far less memory and loads faster.",
        },
        {
            q: "Is it beginner friendly?",
            a: "Absolutely. The interface is clean and simple—no steep learning curve or extra configuration required.",
        },
        {
            q: "Is it free and open source?",
            a: "Yes. TrunkTrust is open-source under the MIT license. You can use, modify, and contribute to it freely.",
        },
    ];

    return (
        <div className='font-dmsans min-h-screen'>
            <div>
                {/* Navbar */}
                <div className='h-24 shadow-md md:flex items-center px-12 justify-between'>
                    <div className='flex items-center space-x-2'>
                        <img src={images.Logo2} className='w-16 h-16 rounded-xl' alt="Trunk Trust Logo" />
                        <h1 className='font-bold text-4xl tracking-tighter text-dark/90'>Trunk Trust</h1>
                    </div>
                    <div className='text-xl hidden md:flex space-x-3 tracking-tighter'>
                        <a
                            href="https://github.com/thinakaranmanokaran/TrunkTrust"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='hover:text-dark hover:bg-gray/50 px-4 py-2 text-dark/70 rounded-xl transition-all duration-300'
                        >
                            GitHub
                        </a>
                        <a
                            href="https://www.thinakaran.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='hover:text-dark hover:bg-gray/50 px-4 py-2 text-dark/70 rounded-xl transition-all duration-300'
                        >
                            Developer
                        </a>
                    </div>
                </div>

                {/* Hero Section */}
                <div className='w-full flex flex-col items-center py-12'>
                    <img src={images.LogoTR} className='w-60 h-60' alt="Trunk Trust Icon" />

                    <h1 className='text-6xl font-bold tracking-tighter w-2/4 text-center leading-tight'>
                        The No.1 Lightweight API Testing Software on the Internet.
                    </h1>

                    {/* Download Button */}
                    <a
                        href="/TrunkTrust-win_x64_Packed.exe"
                        download
                        className='my-2 mt-8 bg-[#2a4fec] px-8 min-w-60 min-h-18 cursor-pointer 
                                   hover:brightness-110 transition-all duration-300 
                                   hover:scale-105 active:scale-95 flex items-center justify-center rounded-full 
                                   text-xl text-white text-center'
                    >
                        Download
                    </a>

                    <p className='text-dark/70 tracking-tight'>For Windows 11/10 (64-bit)</p>

                    <p className='text-dark/70 tracking-tight text-lg mt-4'>
                        Download other versions for macOS and Linux&nbsp;
                        <a
                            href="https://github.com/thinakaranmanokaran/TrunkTrust/tree/main/dist/TrunkTrust"
                            className='text-[#3939ff]'
                        >
                            here
                        </a>.
                    </p>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='bg-gray p-4 w-fit rounded-3xl'>
                        <motion.img
                            src={images.Screenshot}
                            alt="Screenshot"
                            className="rounded-2xl"
                            initial={{ width: "1300px" }}
                            whileInView={{ width: "1000px" }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            viewport={{ amount: 0.2, once: true }} // triggers when 40% visible
                        />
                    </div>
                </div>
                <div className='flex flex-col  items-center my-12 '>
                    <h1 className='text-6xl font-bold tracking-tighter w-3/5 text-center  leading-tight '>Supercharge your Development Speed with Trunk Trust built right in</h1>
                    <div className="my-12 flex w-4/5 space-x-6">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className="shadow-md p-4 pb-12 w-1/3 rounded-3xl flex flex-col items-center"
                            >
                                <img src={card.img} className="rounded-2xl" alt={card.title} />
                                <h2 className="text-3xl font-semibold tracking-tighter text-center">
                                    {card.title}
                                </h2>
                                <h2 className="text-lg text-dark/70 mt-3 w-4/5 tracking-tighter text-center">
                                    {card.desc}
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col items-center my-12'>
                    <h1 className='text-6xl font-bold tracking-tighter w-3/5 text-center  leading-tight '>Frequently asked questions</h1>
                    <div className="my-16 w-full max-w-2/5 mx-auto">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border-b-2 border-b-dark/40 py-6 pb-3 ">
                                {/* Header */}
                                <div
                                    className="flex text-2xl justify-between items-center cursor-pointer"
                                    onClick={() => toggleFAQ(i)}
                                >
                                    <h3 className=" font-medium tracking-tight">{faq.q}</h3>
                                    <FiPlus className={` ${openIndex === i ? "-rotate-45" : "rotate-0"} transition-transform duration-300 `} />
                                </div>

                                {/* Answer with animation */}
                                <AnimatePresence>
                                    {openIndex === i && (
                                        <motion.div
                                            key="content"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="mt-3 text-dark/80 text-xl">{faq.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='bg-dark h-20 flex justify-center items-center '>
                <h1 className='text-xl tracking-tighter text-white flex  items-center'><span className="text-light/60  mr-1"> Developed by</span> <a href="https://www.thinakaran.dev/" target="_blank" rel="noopener noreferrer">Thinakaran Manokaran</a><HiHeart className='ml-1 ' /> </h1>
            </div>
        </div>
    )
}

export default Home
