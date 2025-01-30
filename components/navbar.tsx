"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createBrowserClient } from "@supabase/ssr";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";


export default function Navbar() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Loader for name
  const [menuOpen, setMenuOpen] = useState(false); // Toggle for the dropdown menu

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        redirect("/sign-in");
      } else {
        setUser(data?.user ?? null);
        if (data?.user?.id) {
          fetchUserProfile(data.user.id);
        }
      }
      setLoading(false);
    };

    const fetchUserProfile = async (userId: string) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("first_name")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setFirstName(data?.first_name ?? "User");
      }
    };

    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setMenuOpen(false); // Close menu on sign out
  };

  return (
    <nav className="flex justify-between items-center h-16 mt-2 bg-white text-black relative mb-10 p-4" role="navigation">
      {/* Logo */}
      <a href="/" className="text-xl md:text-2xl font-medium tracking-tight">
        Gate<span className="text-indigo-700">Guard</span>
      </a>

      {/* Center Image */}
      <Image
        src="https://brdlzzxucjbcvetyfqpt.supabase.co/storage/v1/object/public/assets/taa.png"
        alt="The Airport Authority Logo"
        className="w-40 md:w-60"
        width={200}
        height={250}
      />

      {/* User Info / Profile Dropdown */}
      <div className="relative flex items-center space-x-4">
        {user ? (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="scroll-m-20 text-2xl font-semibold tracking-tight"
          >
            {loading ? "Loading..." : `Welcome, ${firstName}`}
          </button>
        ) : (
          <p className="text-sm text-gray-500">Not logged in</p>
        )}


        {/* Pop-up Menu (Directly Below Name) */}
        {menuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
            {/* Close Button */}
            <div className="flex justify-between items-center p-3 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-700">Account</p>
              <button onClick={() => setMenuOpen(false)} className="text-gray-500 hover:text-gray-700 text-lg">
                ×
              </button>
            </div>
            <ul className="py-2">
              <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                Profile
              </li>
              <li
                className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                onClick={handleSignOut}
              >
                Sign Out
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
