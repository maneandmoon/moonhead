import React, { useEffect, useState } from "react";

const MoonPhasePage = () => {
  const [moonPhases, setMoonPhases] = useState([]); // Store all moon phases for the month
  const [error, setError] = useState(null);

  const month = 10; // ----update to October for presentation
  const year = 2024;

  const getHairstyles = (phase) => {
    const hairstyles = {
      "New Moon": [
        { type: "women", styles: ["Short Bob Cut", "Sleek Ponytail", "Pixie Cut"] },
        { type: "men", styles: ["Buzz Cut", "Crew Cut", "Textured Crop"] },
        { type: "colors", styles: ["Bold Red", "Jet Black", "Platinum Blonde"] },
      ],
      "Waxing Crescent": [
        { type: "women", styles: ["Loose Waves", "Half-Up Half-Down", "Braided Crown"] },
        { type: "men", styles: ["Medium Length Waves", "Side Part", "Pompadour"] },
        { type: "colors", styles: ["Chocolate Brown", "Golden Blonde", "Rose Gold"] },
      ],
      "First Quarter": [
        { type: "women", styles: ["Beachy Waves", "Messy Bun", "Fishtail Braid"] },
        { type: "men", styles: ["Longer Textured Hair", "Undercut", "Fringe"] },
        { type: "colors", styles: ["Chestnut Brown", "Honey Blonde", "Ash Gray"] },
      ],
      "Waxing Gibbous": [
        { type: "women", styles: ["Side Swept Bangs", "Top Knot", "Elegant Updo"] },
        { type: "men", styles: ["Ivy League Cut", "Quiff", "Slicked Back"] },
        { type: "colors", styles: ["Burgundy", "Copper", "Dirty Blonde"] },
      ],
      "Full Moon": [
        { type: "women", styles: ["Long Loose Curls", "Voluminous Blowout", "Glamorous Hollywood Waves"] },
        { type: "men", styles: ["Long Flowing Locks", "Messy Top Knot", "Classic Comb Over"] },
        { type: "colors", styles: ["Deep Black", "Bright Platinum", "Warm Auburn"] },
      ],
      "Waning Gibbous": [
        { type: "women", styles: ["Textured Lob", "Pushed Back Hair", "Low Chignon"] },
        { type: "men", styles: ["Disconnected Undercut", "Long Textured Hair", "Caesar Cut"] },
        { type: "colors", styles: ["Dark Brown", "Soft Caramel", "Dusty Rose"] },
      ],
      "Last Quarter": [
        { type: "women", styles: ["Straight and Sleek", "Vintage Waves", "Twisted Updo"] },
        { type: "men", styles: ["Classic Taper", "Short and Curly", "Formal Side Part"] },
        { type: "colors", styles: ["Golden Brown", "Pastel Pink", "Deep Blue"] },
      ],
      "Waning Crescent": [
        { type: "women", styles: ["Shaggy Layers", "Braided Ponytail", "Bohemian Updo"] },
        { type: "men", styles: ["Long Layered Cut", "Messy Fringe", "Casual Shag"] },
        { type: "colors", styles: ["Silver", "Black Cherry", "Cool Blonde"] },
      ],
    };

    return hairstyles[phase]?.flatMap((category) => category.styles) || [];
  };

  useEffect(() => {
    const fetchMoonPhases = () => {
      fetch("/moon-phases")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setMoonPhases(data);
        })
        .catch((err) => {
          setError(err.message);
        });
    };

    fetchMoonPhases();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const renderCalendar = () => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const calendarRows = [];

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarRows.push(<div key={`empty-${i}`} className="border border-transparent" />);
    }

    // Create calendar days
    for (let i = 1; i <= daysInMonth; i++) {
      const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${i < 10 ? `0${i}` : i}`;
      const moonPhase = moonPhases.find((phase) => phase.date.startsWith(formattedDate));
      const hairstyles = moonPhase ? getHairstyles(moonPhase.phase) : [];

      calendarRows.push(
        <div key={i} className="border border-gray-300 p-4 text-center bg-white rounded-lg shadow">
          <h3 className="font-bold text-lg">{i}</h3>
          {moonPhase ? (
            <>
              <p className="text-sm">Moon Phase: {moonPhase.phase}</p>
              <img
                src={moonPhase.image}
                alt="Moon Phase"
                className="w-16 h-16 object-cover mx-auto" // Center the image and set size
              />
              <h4 className="font-semibold">Recommended Hairstyles:</h4>
              <ul className="list-disc list-inside">
                {hairstyles.map((style, idx) => (
                  <li key={idx} className="text-sm">{style}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-sm">No Moon Phase Data</p>
          )}
        </div>
      );
    }

    return calendarRows;
  };

  const renderDaysOfWeek = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysOfWeek.map((day, idx) => (
          <div key={idx} className="font-bold text-center">{day}</div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">
        Moon Phases Calendar -{" "}
        {new Date(year, month - 1).toLocaleString("default", { month: "long" })} {year}
      </h2>
      <div className="grid grid-cols-7 gap-2">
        {renderDaysOfWeek()}
        {renderCalendar()}
      </div>
    </div>
  );
};

export default MoonPhasePage;

