import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { collection, query, where, getDocs } from 'firebase/firestore'; // Ensure you have these imports
import db from './firebaseConfig'; // Adjust the import based on your Firebase setup
import './App.css'
import BarChart from './component/Barchart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling

export type PopulationData = {
  countryName: string;
  year: string; // Keep as string since the data has year as a string
  totalPopulation: string; // Change to string to match your data
  // Include other fields if needed for further analysis or display
};

const PopulationGrowthChart: React.FC = () => {
  const [year, setYear] = useState<number>(1950); // Start year
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);

  const fetchPopulationDataByYear = async (filterYear: number) => {
    try {
      const populationCollection = collection(db, 'population');
      const q = query(
        populationCollection,
        where('year', '==', filterYear.toString()),
        where('countryName', 'not-in',
          ['Land-locked developing countries (LLDC)','Less developed regions', 'Least developed countries', 'Least developed countries', 'Lower-middle-income countries', 'More developed regions', 'Lower-middle-income countries', 'High-income countries', 'Upper-middle-income countries', 'Low-income countries'
          ]),
      );

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => doc.data() as PopulationData);
      const filteredData = data.filter(entry => !/\(.*\)/.test(entry.countryName));
      setPopulationData(filteredData);
    } catch (error) {
      console.error('Error fetching data: ', error);
      toast.error('📌 Error fetching data', {
        position: "top-right",
        autoClose: 100000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };

  useEffect(() => {
    fetchPopulationDataByYear(year);
  }, [year]);

  // Change the year every few seconds
  useEffect(() => {
    // const interval = setInterval(() => {
    //   setYear(prevYear => (prevYear >= 1960 ? 1950 : prevYear + 1));
    // }, 1000);

    // return () => clearInterval(interval);
  }, []);
  const world  =populationData.filter((data)=>data.countryName ==='World')
  
  const sortedPopulationData = populationData.filter((data)=>data.countryName !=='World')
    .sort((a, b) => Number(b.totalPopulation) - Number(a.totalPopulation)) // Sort in descending order
    .slice(0, 10); // Get the top 10
  console.log(sortedPopulationData);

  return (
    <>   
    <div style={{height:'100%' }}><ToastContainer />
      <div className="full-width" style={{ position: 'relative' }}>
        <h2>Population Growth per Country ({year})</h2>
        <BarChart data={sortedPopulationData.slice(0, 11).map(entry => ({
          countryName: entry.countryName,
          totalPopulation: entry.totalPopulation,
        }))} world={{
          totalPopulation: world[0]?.totalPopulation ?? 0
        }} />
      </div>
    </div></>
  );


};

export default PopulationGrowthChart;
