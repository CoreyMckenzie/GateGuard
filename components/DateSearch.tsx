"use client";

import React from "react";

interface DatePickerProps {
  selectedDate: string;
  onChange: (date: string) => void;
}

export default function DatePicker({ selectedDate, onChange }: DatePickerProps) {
  return (
    <input
      type="date"
      value={selectedDate}
      onChange={(e) => onChange(e.target.value)}
      className="w-full md:w-40 px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300"
    />
  );
}
