const searchRecommendationBtn = document.getElementById("searchRecommendations");
const clearResultBtn = document.getElementById("clearResult");

function searchRecommendations(){
    const input=document.getElementById("searchRecommendation").value.toLowerCase();
    const resultDiv = document.getElementById("recommendationsResult");
    resultDiv.innerHTML ='';
    //console.log(input);

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log(data[input]);
            if(data[input]){
                displayResult("all",data[input]);
            } else {
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
                    const option = result.cities ? "country" : "other";
                    displayResult(option,result);
                }
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

function displayResult(option, data){
    const resultDiv = document.getElementById("recommendationsResult");

    if(!data) {
        resultDiv.innerHTML = `<p> No data Found </p>`;
        return;
    }

    switch(option) {
        case "all":
            resultDiv.innerHTML = `
            ${data.map(item => `
                <div>
                    <h2>${item.name}</h2>
                    <img src="${item.imageUrl}" alt="${item.name}">
                    <p>${item.description}</p>
                </div>
            `).join("")}`;
            break;
        case "country":
            resultDiv.innerHTML = `
                ${data.cities.map(city => `
                    <div>
                        <p>${data.name}: ${data.description}</p>
                        <img src="${data.imageUrl}" alt="${data.name}">
                        <p>${data.description}</p>
                    </div>
                `).join("")}`;
            break;
        case "other":
            resultDiv.innerHTML = `
                <div>
                    <p>${data.name}: ${data.description}</p>
                    <img src="${data.imageUrl}" alt="${data.name}">
                </div>
                `;
            break;

    }
    //console.log(result.map);

}

searchRecommendationBtn.addEventListener('click', searchRecommendations);
clearResultBtn.addEventListener('click',clearResult);