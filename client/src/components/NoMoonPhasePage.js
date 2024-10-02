import React, { useEffect, useState } from "react";
import formatTime from "./formatTime"; // Keep this import if you're using it elsewhere

const MoonPhasePage = () => {
  const [moonPhases, setMoonPhases] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Months are zero-indexed

  useEffect(() => {
    const fetchMoonPhases = async () => {
      try {
        const response = await fetch(`/moon-phases?year=${year}&month=${month}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMoonPhases(data);
      } catch (error) {
        console.error("Error fetching moon phases:", error);
      }
    };

    fetchMoonPhases();
  }, [year, month]);

  const renderDaysOfWeek = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return daysOfWeek.map((day) => (
      <div key={day} className="font-bold text-center">
        {day}
      </div>
    ));
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const calendarRows = [];

    let currentDay = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          week.push(<div key={`${i}-${j}`} className="border p-2" />);
        } else if (currentDay > daysInMonth) {
          week.push(<div key={`${i}-${j}`} className="border p-2" />);
        } else {
          const moonPhase = moonPhases.find((phase) => new Date(phase.date).getDate() === currentDay);
          week.push(
            <div
              key={`${i}-${j}`}
              className={`border p-2 text-center rounded ${moonPhase ? "bg-gray-100" : "bg-transparent"}`}
            >
              <h3 className="font-bold">{currentDay}</h3>
              {moonPhase ? (
                <>
                  <p className="text-sm">Moon Phase: {moonPhase.phase}</p>
                  <img
                    src={moonPhase.image}
                    alt="Moon Phase"
                    className="w-24 h-24 object-cover mx-auto" // Center the image
                  />
                  <h4 className="font-semibold">Recommended Hairstyles:</h4>
                  <ul>
                    {moonPhase.hairstyles.map((style, idx) => (
                      <li key={idx} className="text-sm">{style}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-sm">No Moon Phase Data</p>
              )}
            </div>
          );
          currentDay++;
        }
      }
      calendarRows.push(
        <div key={i} className="grid grid-cols-7">{week}</div>
      );
    }

    return calendarRows;
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">
        Moon Phases Calendar -{" "}
        {new Date(year, month - 1).toLocaleString("default", { month: "long" })} {year}
      </h2>
      <div className="grid grid-cols-7 gap-4">
        {renderDaysOfWeek()}
        {renderCalendar()}
      </div>
    </div>
  );
};

export default MoonPhasePage;
