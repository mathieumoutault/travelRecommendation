const searchRecommendationBtn = document.getElementById("searchRecommendations");
const clearResultBtn = document.getElementById("clearResult");

function searchRecommendations(){
    const input=document.getElementById("searchRecommendation").value.toLowerCase();
    const resultDiv = document.getElementById("recommendationsResult");
    resultDiv.innerHTML ='';
    console.log(input);

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let country = data.countries.find(item => item.name.toLowerCase().includes(input));
            let city;
            if(!country) {
                const cities = data.countries.flatMap(item => item.cities);
                city = cities.find(item => item.name.toLowerCase().includes(input));
            } 

            let temple = data.temples.find(item => item.name.toLowerCase().includes(input));
            let beach = data.beaches.find(item => item.name.toLowerCase().includes(input));

            // Find the first result that exists
            const result = country || city || temple || beach;

            if(result) {
                displayResult(result);
            }
        })
        .catch(error => {
			console.error('Error:', error);
			resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

function clearResult(){
    document.getElementById("recommendationsResult").innerHTML="";  
}

function displayResult(result){
    const resultDiv = document.getElementById("recommendationsResult");
    console.log(result.map);
    resultDiv.innerHTML += `<p>${result.name}: ${result.description}</p>`;
    resultDiv.innerHTML += `<img src="${result.imageUrl}" alt="${result.name}">`;
}

searchRecommendationBtn.addEventListener('click', searchRecommendations);
clearResultBtn.addEventListener('click',clearResult);