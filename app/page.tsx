import React from "react";
import Link from "next/link";

export default function HeroPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="public/hero_vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
        <h1 className="text-2xl font-bold">Gate<span className='text-indigo-700'>Guard</span></h1>
      </header>

      {/* Main Content */}
      <main className="z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Welcome to Gate<span className='text-indigo-700'>Guard</span></h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10">
          GateGuard is your all-in-one solution for secure and efficient visitor and employee
          management. From check-ins to stop lists, we ensure a seamless and professional experience
          tailored to your needs.
        </p>
        <Link href="/sign-in" className="px-8 py-3 bg-blue-600 text-white font-semibold text-lg rounded-xl shadow-md hover:bg-gray-400 hover:text-black transition duration-300">
            Sign In
        </Link>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 w-full p-4 text-center text-sm text-gray-300 z-10">
        &copy; {new Date().getFullYear()} GateGuard. All rights reserved.
      </footer>
    </div>
  );
}
