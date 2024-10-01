import React, { useEffect, useState } from 'react';

const MoonPhasePageOnePhase = () => {
    const [moonPhase, setMoonPhase] = useState(null);
    const [error, setError] = useState(null);

    const getHairstyles = (phase) => {
        const hairstyles = {
            'New Moon': [
                { type: 'women', styles: ['Short Bob Cut', 'Sleek Ponytail', 'Pixie Cut'] },
                { type: 'men', styles: ['Buzz Cut', 'Crew Cut', 'Textured Crop'] },
                { type: 'colors', styles: ['Bold Red', 'Jet Black', 'Platinum Blonde'] }
            ],
            'Waxing Crescent': [
                { type: 'women', styles: ['Loose Waves', 'Half-Up Half-Down', 'Braided Crown'] },
                { type: 'men', styles: ['Medium Length Waves', 'Side Part', 'Pompadour'] },
                { type: 'colors', styles: ['Chocolate Brown', 'Golden Blonde', 'Rose Gold'] }
            ],
            'First Quarter': [
                { type: 'women', styles: ['Beachy Waves', 'Messy Bun', 'Fishtail Braid'] },
                { type: 'men', styles: ['Longer Textured Hair', 'Undercut', 'Fringe'] },
                { type: 'colors', styles: ['Chestnut Brown', 'Honey Blonde', 'Ash Gray'] }
            ],
            'Waxing Gibbous': [
                { type: 'women', styles: ['Side Swept Bangs', 'Top Knot', 'Elegant Updo'] },
                { type: 'men', styles: ['Ivy League Cut', 'Quiff', 'Slicked Back'] },
                { type: 'colors', styles: ['Burgundy', 'Copper', 'Dirty Blonde'] }
            ],
            'Full Moon': [
                { type: 'women', styles: ['Long Loose Curls', 'Voluminous Blowout', 'Glamorous Hollywood Waves'] },
                { type: 'men', styles: ['Long Flowing Locks', 'Messy Top Knot', 'Classic Comb Over'] },
                { type: 'colors', styles: ['Deep Black', 'Bright Platinum', 'Warm Auburn'] }
            ],
            'Waning Gibbous': [
                { type: 'women', styles: ['Textured Lob', 'Pushed Back Hair', 'Low Chignon'] },
                { type: 'men', styles: ['Disconnected Undercut', 'Long Textured Hair', 'Caesar Cut'] },
                { type: 'colors', styles: ['Dark Brown', 'Soft Caramel', 'Dusty Rose'] }
            ],
            'Last Quarter': [
                { type: 'women', styles: ['Straight and Sleek', 'Vintage Waves', 'Twisted Updo'] },
                { type: 'men', styles: ['Classic Taper', 'Short and Curly', 'Formal Side Part'] },
                { type: 'colors', styles: ['Golden Brown', 'Pastel Pink', 'Deep Blue'] }
            ],
            'Waning Crescent': [
                { type: 'women', styles: ['Shaggy Layers', 'Braided Ponytail', 'Bohemian Updo'] },
                { type: 'men', styles: ['Long Layered Cut', 'Messy Fringe', 'Casual Shag'] },
                { type: 'colors', styles: ['Silver', 'Black Cherry', 'Cool Blonde'] }
            ],
        };
    
        // Return an array of all styles based on the phase
        return hairstyles[phase]?.flatMap(category => category.styles) || [];
    };
    

    useEffect(() => {
        const fetchMoonPhase = () => {
            fetch('/moon-phase')
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
                    <h3>Recommended Hairstyles:</h3>
                    <ul>
                        {getHairstyles(moonPhase.phase).map((style, idx) => (
                            <li key={idx}>{style}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default MoonPhasePageOnePhase;
