import React, { useEffect, useState } from 'react';

interface TimecontrolProps {
    minYear: number;
    maxYear: number;
    currentYear: number;
    onYearChange: (year: number) => void;
    isPlaying: boolean;
    onPlayPauseToggle: () => void;
}

const Timecontrol: React.FC<TimecontrolProps> = ({
    minYear,
    maxYear,
    currentYear,
    onYearChange,
    isPlaying,
    onPlayPauseToggle,
}) => {
    // Internal state to handle the year progression
    const [year, setYear] = useState(currentYear);

    useEffect(() => {
        setYear(currentYear);
    }, [currentYear]);

    // Autoplay effect
    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (isPlaying) {
            interval = setInterval(() => {
                setYear((prevYear) => {
                    const newYear = prevYear + 1;
                    if (newYear > maxYear) {
                        onPlayPauseToggle(); // Stop playing if max year is reached
                        clearInterval(interval);
                        return maxYear;
                    } else {
                        onYearChange(newYear); // Trigger the onYearChange prop function
                        return newYear;
                    }
                });
            }, 500); // Change year every second
        } else if (interval) {
            clearInterval(interval); // Clear interval when paused
        }

        return () => {
            if (interval) clearInterval(interval); // Cleanup on unmount
        };
    }, [isPlaying, maxYear, onPlayPauseToggle, onYearChange]);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={onPlayPauseToggle}>
                {isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>
            <input
                type="range"
                min={minYear}
                max={maxYear}
                value={year}
                onChange={(e) => setYear(parseInt((e.target as HTMLInputElement).value, 10))}
                onMouseUp={(e) => {
                  const selectedYear = parseInt((e.target as HTMLInputElement).value, 10);
                  setYear(selectedYear);
                  onYearChange(selectedYear); // Trigger change only on mouse up
                }}
            />
            <span>{year}</span>
        </div>
    );
};

export default Timecontrol;
