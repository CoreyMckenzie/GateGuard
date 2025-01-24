"use client";

import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";

// Define the type for Stop List data
interface StopList {
  name: string;
  id_num: number | null;
  person_img?: string | null;
  entity: string | null;
}

interface StopListPopupProps {
  stopList: StopList[];
  onClose: () => void;
}

const StopListPopup: React.FC<StopListPopupProps> = ({ stopList, onClose }) => {
  const [detailsPopup, setDetailsPopup] = useState<StopList | null>(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Stop List</h2>
        <Table className="w-full border border-gray-300 rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stopList.map((entry, index) => (
              <TableRow
                key={index}
                className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}
              >
                <TableCell className="font-medium">{entry.name}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => setDetailsPopup(entry)}
                  >
                    View More
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          className="mt-4 bg-red-600 text-white hover:bg-red-700"
          onClick={onClose}
        >
          Close
        </Button>
      </div>

      {detailsPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Details</h3>
            <p><strong>Name:</strong> {detailsPopup.name}</p>
            <p><strong>ID#:</strong> {detailsPopup.id_num || "N/A"}</p>
            <p><strong>Entity:</strong> {detailsPopup.entity || "N/A"}</p>
            {detailsPopup.person_img && (
              <img
                src={detailsPopup.person_img}
                alt="Person"
                className="mt-4 w-full h-auto rounded-lg"
              />
            )}
            <Button
              className="mt-4 bg-red-600 text-white hover:bg-red-700"
              onClick={() => setDetailsPopup(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StopListPopup;
