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
                displayResult(city);
            }
            console.log(country,city);
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
}