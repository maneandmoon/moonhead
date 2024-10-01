import React, { useEffect, useState } from "react";

const MoonPhasePage = () => {
  const [moonPhases, setMoonPhases] = useState([]); // Store all moon phases for the month
  const [error, setError] = useState(null);

  const month = 10; // ----update to October for presentation
  const year = 2024;

  const getHairstyles = (phase) => {
    const hairstyles = {
      "New Moon": [
        {
          type: "women",
          styles: ["Short Bob Cut", "Sleek Ponytail", "Pixie Cut"],
        },
        { type: "men", styles: ["Buzz Cut", "Crew Cut", "Textured Crop"] },
        {
          type: "colors",
          styles: ["Bold Red", "Jet Black", "Platinum Blonde"],
        },
      ],
      "Waxing Crescent": [
        {
          type: "women",
          styles: ["Loose Waves", "Half-Up Half-Down", "Braided Crown"],
        },
        {
          type: "men",
          styles: ["Medium Length Waves", "Side Part", "Pompadour"],
        },
        {
          type: "colors",
          styles: ["Chocolate Brown", "Golden Blonde", "Rose Gold"],
        },
      ],
      "First Quarter": [
        {
          type: "women",
          styles: ["Beachy Waves", "Messy Bun", "Fishtail Braid"],
        },
        { type: "men", styles: ["Longer Textured Hair", "Undercut", "Fringe"] },
        {
          type: "colors",
          styles: ["Chestnut Brown", "Honey Blonde", "Ash Gray"],
        },
      ],
      "Waxing Gibbous": [
        {
          type: "women",
          styles: ["Side Swept Bangs", "Top Knot", "Elegant Updo"],
        },
        { type: "men", styles: ["Ivy League Cut", "Quiff", "Slicked Back"] },
        { type: "colors", styles: ["Burgundy", "Copper", "Dirty Blonde"] },
      ],
      "Full Moon": [
        {
          type: "women",
          styles: [
            "Long Loose Curls",
            "Voluminous Blowout",
            "Glamorous Hollywood Waves",
          ],
        },
        {
          type: "men",
          styles: ["Long Flowing Locks", "Messy Top Knot", "Classic Comb Over"],
        },
        {
          type: "colors",
          styles: ["Deep Black", "Bright Platinum", "Warm Auburn"],
        },
      ],
      "Waning Gibbous": [
        {
          type: "women",
          styles: ["Textured Lob", "Pushed Back Hair", "Low Chignon"],
        },
        {
          type: "men",
          styles: ["Disconnected Undercut", "Long Textured Hair", "Caesar Cut"],
        },
        {
          type: "colors",
          styles: ["Dark Brown", "Soft Caramel", "Dusty Rose"],
        },
      ],
      "Last Quarter": [
        {
          type: "women",
          styles: ["Straight and Sleek", "Vintage Waves", "Twisted Updo"],
        },
        {
          type: "men",
          styles: ["Classic Taper", "Short and Curly", "Formal Side Part"],
        },
        {
          type: "colors",
          styles: ["Golden Brown", "Pastel Pink", "Deep Blue"],
        },
      ],
      "Waning Crescent": [
        {
          type: "women",
          styles: ["Shaggy Layers", "Braided Ponytail", "Bohemian Updo"],
        },
        {
          type: "men",
          styles: ["Long Layered Cut", "Messy Fringe", "Casual Shag"],
        },
        { type: "colors", styles: ["Silver", "Black Cherry", "Cool Blonde"] },
      ],
    };

    // Return an array of all styles based on the phase   //flat.map
    // While . map() creates a new array based on the output of the provided function, . flatMap() also flattens the resulting array by one level.
    // This is particularly useful when dealing with arrays of arrays or when the mapping function returns arrays.
    return hairstyles[phase]?.flatMap((category) => category.styles) || [];
  };

  // Fetch moon phase data from the backend
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
    return <div>Error: {error}</div>;
  }

  // Function to render the calendar
  const renderCalendar = () => {
    const daysInMonth = new Date(year, month, 0).getDate(); // Get the number of days in September 2024
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // Get the first day of the month (0-6 for Sun-Sat)
    const calendarRows = [];
    // const daysInMonth = new Date(2024, 9, 0).getDate(); // Get the number of days in September 2024
    // const calendarRows = [];

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarRows.push(
        <div key={`empty-${i}`} className="calendar-day empty"></div>
      );
    }

    // Create calendar days
    for (let i = 1; i <= daysInMonth; i++) {
      const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${
        i < 10 ? `0${i}` : i
      }`; // Format the date as YYYY-MM-DD

      // Find the moon phase for the current date by extracting just the date part
      const moonPhase = moonPhases.find((phase) =>
        phase.date.startsWith(formattedDate)
      ); // Check if the date from the API matches the formatted date

      const hairstyles = moonPhase ? getHairstyles(moonPhase.phase) : [];

      calendarRows.push(
        <div key={i} className="calendar-day">
          <h3>{i}</h3>
          {moonPhase ? (
            <>
              <p>Moon Phase: {moonPhase.phase}</p>
              <img
                src={moonPhase.image}
                alt="Moon Phase"
                style={{ width: "100px", height: "100px", objectFit: "cover" }} // Inline styling for resizing
              />
              <h4>Recommended Hairstyles:</h4>
              <ul>
                {hairstyles.map((style, idx) => (
                  <li key={idx}>{style}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>No Moon Phase Data</p>
          )}
        </div>
      );
    }

    return calendarRows;
  };

  // Render days of the week
  const renderDaysOfWeek = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="calendar-days-of-week">
        {daysOfWeek.map((day, idx) => (
          <div key={idx} className="day-header">
            {day}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>
        Moon Phases Calendar -{" "}
        {new Date(year, month - 1).toLocaleString("default", { month: "long" })}{" "}
        {year}
      </h2>
      <div className="calendar">
        {renderDaysOfWeek()}
        {renderCalendar()}
      </div>
      <style>{`
            .calendar {
                display: grid;
                grid-template-columns: repeat(7, 1fr); /* 7 columns for days of the week */
                gap: 10px;
            }

            .calendar-day {
                border: 1px solid #ccc;
                padding: 10px;
                text-align: center;
                border-radius: 5px;
                background-color: #f9f9f9;
            }

            .calendar-day.empty {
                background-color: transparent; /* Make empty days transparent */
            }

            .calendar-days-of-week {
                display: contents; /* Display as grid items without extra space */
            }

            .day-header {
                font-weight: bold;
                text-align: center;
                margin: 5px 0;
            }
        `}</style>
    </div>
  );
};

export default MoonPhasePage;
