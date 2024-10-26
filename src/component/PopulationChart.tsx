// BarChart.tsx
import React from 'react';

type BarChartProps = {
  data: { countryName: string; totalPopulation: number }[];
};

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const maxPopulation = Math.max(...data.map(entry => entry.totalPopulation));

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
      {data.map((entry, index) => (
        <div key={index} style={{ textAlign: 'center', margin: '0 10px' }}>
          <div
            style={{
              height: `${(entry.totalPopulation / maxPopulation) * 100}%`,
              width: '40px',
              backgroundColor: 'blue',
              transition: 'height 0.3s ease-in-out'
            }}
          />
          <div>{entry.countryName}</div>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
