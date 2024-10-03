import React, { useEffect, useState } from 'react';

const MoonPhase = () => {
    const [moonPhase, setMoonPhase] = useState(null);
    const [error, setError] = useState(null);

    // fetch from the backend endpoint moon-phase

    useEffect(() => {
        const fetchMoonPhase = () => {
            fetch('http://127.0.0.1:5555/moon-phase') 
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setMoonPhase(data);
                })
                .catch(err => {
                    setError(err.message);
                });
        };

        fetchMoonPhase();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {moonPhase ? (
                <div>
                    <h2>Moon Phase: {moonPhase.phase}</h2>
                    <p>Date: {moonPhase.date}</p>
                    <img src={moonPhase.image} alt="Moon Phase" />
                </div>
            ) : (
                <div>Loading moon phase...</div>
            )}
        </div>
    );
};

export default MoonPhase;
