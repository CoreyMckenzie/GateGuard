"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import StopListPopup from "@/components/stoplistpop";

// Define the type for check-in data
interface CheckIn {
  Name: string;
  department: string;
  entity: string;
  person_id: number;
  created_at: string; // ISO date string
  reason_for_visit: string;
  current_officer: string;
  temp_badge_num: number;

}

interface StopList {
  name: string;
  id_num: number | null;
  person_img?: string | null;
  entity: string | null;
}

export default function Page() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]); // All check-ins
  const [filteredCheckIns, setFilteredCheckIns] = useState<CheckIn[]>([]); // Filtered check-ins
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [stopList, setStopList] = useState<StopList[]>([]); // Stop list entries
  const [loading, setLoading] = useState(true); // Loading state
  const [showStopListPopup, setShowStopListPopup] = useState(false); // Stop List Popup visibility
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const entriesPerPage = 10; // Entries per page

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      const { data: checkInData, error: checkInError } = await supabase
        .from("Check-In")
        .select("Name, department, entity, person_id, created_at, reason_for_visit, current_officer, temp_badge_num")
        .order("created_at", { ascending: false }); // Newest to oldest

      if (checkInError) {
        console.error("Error fetching check-in data: ", checkInError);
      } else {
        setCheckIns(checkInData as CheckIn[]); // Cast the data to the CheckIn type
        setFilteredCheckIns(checkInData as CheckIn[]); // Initialize filtered data
      }

      const { data: stopListData, error: stopListError } = await supabase
        .from("Stop List")
        .select("name, id_num, person_img, entity");

      if (stopListError) {
        console.error("Error fetching stop list data: ", stopListError);
      } else {
        setStopList(stopListData as StopList[]);
      }

      setLoading(false); // Set loading to false after fetching data
    };

    fetchData();
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = checkIns.filter(
      (entry) =>
        entry.Name.toLowerCase().includes(lowerCaseQuery) ||
        entry.department.toLowerCase().includes(lowerCaseQuery) ||
        entry.entity.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredCheckIns(filtered);
    setCurrentPage(1); // Reset to the first page after search
  };

  // Pagination logic
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredCheckIns.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredCheckIns.length / entriesPerPage);

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <section className="mt-0">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mx-2">
          <h1 className="mt-10 scroll-m-20 text-2xl underline font-semibold tracking-tight transition-colors first:mt-0">
            Recent Check-Ins
          </h1>
          <div className="flex gap-2 w-full md:w-auto">
            <Input
              type="text"
              placeholder="Search by Name, Entity, or Department"
              className="w-full md:w-80 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className="bg-green-600 text-white hover:bg-green-900 rounded-xl" onClick={handleSearch}>
              Search
            </Button>
            <Button
              className="bg-red-600 text-white hover:bg-red-700 rounded-xl"
              onClick={() => setShowStopListPopup(true)}
            >
              Stop List
            </Button>
          </div>
        </div>
      </section>
      <main className="mt-6 px-4">
        {loading ? (
          // Loading spinner
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          // Table content
          <Table className="w-full border border-gray-300 rounded-lg">
            <TableCaption className="font-semibold text-xl">
              Recent visitor check-ins
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>ID#</TableHead>
                <TableHead>Check-In Date</TableHead>
                <TableHead>Check-In Time</TableHead>
                <TableHead>Reason For Visit</TableHead>
                <TableHead>Officer Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentEntries.length > 0 ? (
                currentEntries.map((checkIn, index) => (
                  <TableRow
                    key={index}
                    className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}
                  >
                    <TableCell className="font-medium">{checkIn.Name}</TableCell>
                    <TableCell>{checkIn.department}</TableCell>
                    <TableCell>{checkIn.entity}</TableCell>
                    <TableCell>{checkIn.person_id}</TableCell>
                    <TableCell>
                      {new Date(checkIn.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(checkIn.created_at).toLocaleTimeString()}
                    </TableCell>
                    <TableCell>{checkIn.reason_for_visit}</TableCell>
                    <TableCell>{checkIn.current_officer}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    No check-ins available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}

        <Pagination className="mt-4 flex justify-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={index + 1 === currentPage}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {totalPages > 5 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
      <Footer />
      {showStopListPopup && (
        <StopListPopup
          stopList={stopList}
          onClose={() => setShowStopListPopup(false)}
        />
      )}
    </div>
  );
}
