import firebase from "firebase/compat/app";

// Assuming you've already initialized Firestore
const db = firebase.firestore();

// Your JSON data
const populationData = {
    Countryname: "Afghanistan",
    Population: "7480464",
    Populationaged10to14years: "854363",
    Populationaged15to19years: "757113",
    Populationaged15to64years: "4198587",
    Populationaged1to4years: "946547",
    Populationaged20to29years: "1241348",
    Populationaged30to39years: "909953",
    Populationaged40to49years: "661807",
    Populationaged50to59years: "467170",
    Populationaged5to9years: "966210",
    Populationaged60to69years: "271905",
    Populationaged70to79years: "92691",
    Populationaged80to89years: "9499",
    Populationaged90to99years: "123",
    Populationatage1: "258652.02",
    Populationofchildrenundertheageof1: "301735",
    Populationofchildrenundertheageof15: "3068855",
    Populationofchildrenundertheageof5: "1248282",
    Populationolderthan100years: "0",
    Populationolderthan15years: "4411609",
    Populationolderthan18years: "3946595",
    Populationundertheageof25: "4494349",
    Year: "1950"
};

// Create a new document in the 'population' collection
db.collection('population').add({
    countryName: populationData.Countryname,
    year: parseInt(populationData.Year), // Convert to number
    totalPopulation: parseInt(populationData.Population), // Convert to number
    populationByAge: {
        age10to14: parseInt(populationData.Populationaged10to14years),
        age15to19: parseInt(populationData.Populationaged15to19years),
        age15to64: parseInt(populationData.Populationaged15to64years),
        age1to4: parseInt(populationData.Populationaged1to4years),
        age20to29: parseInt(populationData.Populationaged20to29years),
        age30to39: parseInt(populationData.Populationaged30to39years),
        age40to49: parseInt(populationData.Populationaged40to49years),
        age50to59: parseInt(populationData.Populationaged50to59years),
        age5to9: parseInt(populationData.Populationaged5to9years),
        age60to69: parseInt(populationData.Populationaged60to69years),
        age70to79: parseInt(populationData.Populationaged70to79years),
        age80to89: parseInt(populationData.Populationaged80to89years),
        age90to99: parseInt(populationData.Populationaged90to99years),
        ageUnder1: parseInt(populationData.Populationofchildrenundertheageof1),
        ageUnder5: parseInt(populationData.Populationofchildrenundertheageof5),
        ageUnder15: parseInt(populationData.Populationofchildrenundertheageof15),
        olderThan15: parseInt(populationData.Populationolderthan15years),
        olderThan18: parseInt(populationData.Populationolderthan18years),
        underAge25: parseInt(populationData.Populationundertheageof25),
        // Add any additional fields as needed
    }
})
.then(docRef => {
    console.log('Document written with ID: ', docRef.id);
})
.catch(error => {
    console.error('Error adding document: ', error);
});
