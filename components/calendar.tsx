"use client";
import React, { useState } from "react";
const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  const getMonths = (year: number, month: number) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startDayOfWeek = firstDayOfMonth.getDay();
    const monthData = [];
    let dayCounter = 1;
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < startDayOfWeek) || dayCounter > daysInMonth) {
          week.push(null);
        } else {
          week.push(dayCounter);
          dayCounter++;
        }
      }
      monthData.push(week);
    }
    return monthData;
  };
  const handlePreviousMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
    );
  };
  const handleNextMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
    );
  };
  const monthData = getMonths(
    selectedDate.getFullYear(),
    selectedDate.getMonth()
  );
  return (
    <div className="mt-4 border-b-2 pb-6  ">
      <span className="text-xl text-gray-400">Calendar</span>
      <div className="flex justify-between mt-5">
        <button
          onClick={handlePreviousMonth}
          className="w-8 h-8 flex justify-center items-center rounded-full border-2  border-border_color text-purple-400 text-lg font-semibold hover:scale-75 transition-all duration-150"
        >
          {"<"}
        </button>
        <span className="text-lg font-semibold text-gray-500">{`${selectedDate.getDate()} ${selectedDate.toLocaleString(
          "default",
          {
            month: "long",
          }
        )}, ${selectedDate.getFullYear()}`}</span>

        <button
          onClick={handleNextMonth}
          className="w-8 h-8 flex justify-center items-center rounded-full border-2  border-border_color text-purple-400 text-lg font-semibold hover:scale-75 transition-all duration-150"
        >
          {">"}
        </button>
      </div>
      <div className="mt-3 ml-5">
        <table>
          <thead>
            <tr>
              {daysOfWeek.map((days) => (
                <th className="px-1 py-2">{days}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {monthData.map((data, i) => (
              <tr key={i} className="text-black">
                {data.map((days, i) => (
                  <td
                    key={i}
                    className={`${
                      days === selectedDate.getDate()
                        ? "flex justify-center items-center w-8 h-8 border-2  border-border_color text-purple-400 rounded-full"
                        : ""
                    }`}
                  >
                    {days !== null ? days : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
