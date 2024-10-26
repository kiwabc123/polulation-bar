import React, { useEffect, useState } from 'react';
import './Bar.css';

type BarChartProps = {
    world: { totalPopulation: string }; // World population data
    data: { countryName: string; totalPopulation: string }[];
};

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const formatNumber = (num: string) => {
    return Number(num).toLocaleString('en-US', {
        maximumFractionDigits: 2,
        notation: 'compact',
        compactDisplay: 'short'
    });
};

const formatTotal = (num: string) => {
    return Number(num).toLocaleString('en-US');
};

const BarChart: React.FC<BarChartProps> = ({ data, world }) => {
    const [sortedData, setSortedData] = useState(data);
    const [colorMap, setColorMap] = useState<Map<string, string>>(new Map());

    useEffect(() => {
        const newColorMap = new Map<string, string>(colorMap); // Copy existing color map
        data.forEach(entry => {
            if (!newColorMap.has(entry.countryName)) {
                newColorMap.set(entry.countryName, getRandomColor());
            }
        });
        setColorMap(newColorMap);

        const sorted = [...data].sort((a, b) => Number(b.totalPopulation) - Number(a.totalPopulation));
        setSortedData(sorted);
    }, [data]); // Only depend on data for sorting and color mapping

    const maxPopulation = Math.max(...sortedData.map(entry => Number(entry.totalPopulation)), 1);
    const lineSpacing = 500000000;
    const lineCount = Math.ceil(maxPopulation / lineSpacing);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', margin: '20px 0', position: 'relative', height: '400px', borderLeft: 'solid black 1px' }}>
            {/* Horizontal lines */}
            {Array.from({ length: lineCount }, (_, i) => {
                const value = (i + 1) * lineSpacing;
                const position = (value / maxPopulation) * 100;

                return (
                    <div
                        key={value}
                        style={{
                            position: 'absolute',
                            left: `${position}%`,
                            bottom: 0,
                            borderLeft: '1px dashed gray',
                            height: '100%',
                            color: 'gray',
                            fontSize: '12px',
                        }}
                    >
                        <span
                            style={{
                                position: 'absolute',
                                top: '100%',
                                transform: 'translateX(-50%)',
                                marginTop: '5px',
                            }}
                        >
                            {value.toLocaleString()}
                        </span>
                    </div>
                );
            })}

            {/* Bars with Flags */}
            {sortedData.map((entry, index) => (
                <div
                    key={entry.countryName}
                    style={{
                        display: index === 10 ? 'none' : 'flex',
                        alignItems: 'center',
                        margin: '5px 0',
                        transition: 'transform 0.5s ease-in-out',
                        transform: index === 0 ? `translateY(-3px)` : `translateY(${index * 40}px)`,
                        position: 'absolute',
                        top: 0,
                        width: '100%',
                    }}
                >
                    <img
                        src={`/assets/flags/${entry.countryName.toLowerCase()}.png`} // Adjust path based on your project structure
                        alt={`${entry.countryName} flag`}
                        style={{ width: '30px', height: '20px', marginRight: '5px' }}
                    />

                    <div
                        style={{
                            height: '30px',
                            width: `${(Number(entry.totalPopulation) / maxPopulation) * 100}%`,
                            backgroundColor: colorMap.get(entry.countryName),
                            position: 'relative',
                        }}
                        className="bar"
                        data-label={`${entry.countryName} ${formatNumber(entry.totalPopulation)}`}
                    >
                    </div>
                </div>
            ))}
            {/* World Population Display */}
            {world.totalPopulation && (
                <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '0px',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    fontSize: '24px', // Adjusted font size for better visibility
                }}>
                    Total: {formatTotal(world.totalPopulation)}
                </div>
            )}
        </div>
    );
};

export default BarChart;
