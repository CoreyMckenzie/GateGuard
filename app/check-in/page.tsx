"use client";

import React, { useState } from "react";
import Navbar from "../../Components/navbar";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import Footer from "../../Components/footer";
import { createClient } from "@supabase/supabase-js";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../Components/ui/popover";
import { Button } from "@/Components/ui/button";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [selectedEntity, setSelectedEntity] = useState("TAA");
  const [errorPopoverOpen, setErrorPopoverOpen] = useState(false);
  const [successPopoverOpen, setSuccessPopoverOpen] = useState(false);
  const [denyPopoverOpen, setDenyPopoverOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const id = formData.get("id") as string;
    const department = formData.get("department") as string;
    const entity = formData.get("entity") as string;
    const visitorReason = formData.get("visitorReason") as string;
    const contactPerson = formData.get("contactPerson") as string;

    // Check if the person is on the stop list
    const { data: stopListData, error: stopListError } = await supabase
      .from("Stop List")
      .select("name")
      .eq("name", name);

    if (stopListError) {
      console.error("Error checking stop list: ", stopListError);
      return;
    }

    if (stopListData && stopListData.length > 0) {
      setDenyPopoverOpen(true);
      setTimeout(() => setDenyPopoverOpen(false), 3000); // Auto-close deny popover after 3 seconds
      return;
    }

    const record = {
      Name: name,
      person_id: id,
      department: department,
      entity: entity,
      reason_for_visit: entity === "Visitor" ? visitorReason : null,
      current_officer: "J.Doe",
      escort_name: entity === "Visitor" ? contactPerson : null,
      temp_badge_num : entity === "Visitor" ? formData.get("escortbadge") as string : null ,
    };

    const { error } = await supabase.from("Check-In").insert([record]);

    if (error) {
      setErrorPopoverOpen(true);
      setTimeout(() => setErrorPopoverOpen(false), 3000); // Auto-close error popover after 3 seconds
    } else {
      setSuccessPopoverOpen(true);
      setTimeout(() => {
        setSuccessPopoverOpen(false);
        window.location.reload(); // Reset form after success
      }, 3000);
    }
  };

  return (
    <>
      <Navbar />

      <h1 className="scroll-m-20 md:text-4xl text-xl font-medium tracking-tight text-center">
        Terminal B - Security Check Point
      </h1>

      <div className="border w-11/12 max-w-3xl mx-auto mt-10 rounded-2xl">
        <section>
          <div className="flex flex-col justify-center h-16 mt-2 bg-white relative mb-10 gap-1 mx-auto text-center">
            <h3 className="mt-8 scroll-m-20 text-xl sm:text-2xl font-normal tracking-tight underline">
              Employee / Visitor Check-In Form
            </h3>
            <p className="text-xs sm:text-sm text-[#878787]">
              Verify All Personal Information From ID Card
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-6 px-4"
          >
            <div className="flex flex-col items-start w-full max-w-sm">
              <label htmlFor="name" className="block font-medium mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                className="border-2 border-gray-300 p-2 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex flex-col items-start w-full max-w-sm">
              <label htmlFor="id" className="block font-medium mb-1">
                ID# <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="id"
                placeholder="Eg: 34693"
                className="border-2 border-gray-300 p-2 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex flex-col items-start w-full max-w-sm">
              <label htmlFor="department" className="block font-medium mb-1">
                Department <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="department"
                placeholder="Eg: Maintenance"
                className="border-2 border-gray-300 p-2 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex flex-col items-start w-full max-w-sm">
              <label htmlFor="entity" className="block font-medium mb-1">
                Entity <span className="text-red-500">*</span>
              </label>
              <div className="relative w-full">
                <select
                  id="entity"
                  name="entity"
                  className="w-full appearance-none rounded-lg bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={(e) => setSelectedEntity(e.target.value)}
                  value={selectedEntity}
                >
                  <option value="TAA">TAA</option>
                  <option value="NAD">NAD</option>
                  <option value="Visitor">Visitor</option>
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="absolute right-2 top-0 bottom-0 m-auto h-4 w-4 text-gray-500"
                />
              </div>
            </div>

            {selectedEntity === "Visitor" && (
              <div className="flex flex-col items-start w-full max-w-sm">
                <label htmlFor="visitorReason" className="block font-medium mb-1">
                  Reason for Visit <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="visitorReason"
                  placeholder="Enter reason for visit"
                  className="border-2 border-gray-300 p-2 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />

                <label htmlFor="contactPerson" className="block font-medium mt-4 mb-1">
                  Escort Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  placeholder="Enter contact person"
                  className="border-2 border-gray-300 p-2 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />

                <label htmlFor="escortbadge" className="block font-medium mt-4 mb-1">
                  Temp Badge # <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="escortbadge"
                  placeholder="Enter contact person"
                  className="border-2 border-gray-300 p-2 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="text-lg font-medium px-6 py-2 mb-20 bg-[#F4F4F5] text-black rounded-xl hover:bg-[#686868] hover:text-white"
            >
              Submit
            </button>
          </form>

          {/* Success Popover */}
          <Popover open={successPopoverOpen}>
            <PopoverTrigger asChild>
              <div />
            </PopoverTrigger>
            <PopoverContent className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md p-4 text-center bg-green-100 border-green-500 border-2 rounded-xl shadow-xl">
              <h1 className="text-xl font-bold text-green-700 mb-2">✅ Success!</h1>
              <p>Employee / Visitor successfully checked in.</p>
            </PopoverContent>
          </Popover>

          {/* Error Popover */}
          <Popover open={errorPopoverOpen}>
            <PopoverTrigger asChild>
              <div />
            </PopoverTrigger>
            <PopoverContent className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md p-4 text-center bg-red-100 border-red-500 border-2 rounded-xl shadow-xl">
              <h1 className="text-xl font-bold text-red-700 mb-2">⚠️ Error</h1>
              <p>Employee Not Checked In. Please try again.</p>
            </PopoverContent>
          </Popover>

          {/* Deny Popover */}
          <Popover open={denyPopoverOpen}>
            <PopoverTrigger asChild>
              <div />
            </PopoverTrigger>
            <PopoverContent className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md p-4 text-center bg-red-100 border-red-500 border-2 rounded-xl shadow-xl">
              <h1 className="text-xl font-bold text-red-700 mb-2">❌ Denied</h1>
              <p>Employee / Visitor is on the stop list.</p>
            </PopoverContent>
          </Popover>
        </section>
      </div>

      <Footer />
    </>
  );
}