"use client";

import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

export default function EventSearch() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const times = [
    "09:15 AM",
    "10:00 AM",
    "13:15 AM",
    "15:00 AM",
    "17:00 AM",
    "20:15 AM",
  ];

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    console.log("[v0] Selected date:", newDate);
    console.log("[v0] Current search data:", {
      date: newDate,
      time: selectedTime,
    });
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    console.log("[v0] Selected time:", time);
    console.log("[v0] Current search data:", { date, time });
  };

  const handleSearch = () => {
    console.log("[v0] Search event triggered");
    console.log("[v0] Final search data:", {
      date: date?.toISOString(),
      dateFormatted: date?.toLocaleDateString(),
      time: selectedTime,
      timestamp: new Date().toISOString(),
    });
    setIsExpanded(false);
  };

  return (
    <div className=" bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Collapsed Search Bar */}
        {!isExpanded && (
          <div className="flex items-center gap-4 rounded-3xl bg-[#d4ff4c] p-6 shadow-lg">
            <button
              onClick={() => setIsExpanded(true)}
              className="flex flex-1 items-center gap-3 text-left"
            >
              <h1 className="font-serif text-3xl text-black md:text-4xl">
                Search events By date →
              </h1>
            </button>
            <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm md:min-w-[300px]">
              <CalendarIcon className="h-6 w-6 text-gray-500" />
              <input
                type="text"
                placeholder="Search here"
                className="flex-1 bg-transparent text-gray-600 placeholder:text-gray-400 outline-none"
                onFocus={() => setIsExpanded(true)}
              />
            </div>
          </div>
        )}

        {/* Expanded Date & Time Picker */}
        {isExpanded && (
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <div className="bg-[#d4ff4c] p-6">
              <h1 className="text-center font-serif text-2xl text-black md:text-3xl">
                Search Up coming events By date
              </h1>
            </div>

            <div className="grid gap-6 bg-white p-6 md:grid-cols-2">
              {/* Date Picker Section */}
              <div>
                <h2 className="mb-4 text-lg font-medium text-gray-900">
                  Select a date
                </h2>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateChange}
                  className="w-full"
                />
              </div>

              {/* Time Selection Section */}
              <div>
                <h2 className="mb-4 text-lg font-medium text-gray-900">
                  Select time (Optional)
                </h2>
                <div className="space-y-3">
                  {times.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeChange(time)}
                      className={`w-full rounded-lg border px-4 py-3 text-left transition-colors ${
                        selectedTime === time
                          ? "border-black bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Close/Collapse Button */}
            <div className="bg-white px-6 pb-6">
              <button
                onClick={handleSearch}
                className="w-full rounded-lg bg-black px-4 py-3 text-white transition-colors hover:bg-gray-800"
              >
                Search Events
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
