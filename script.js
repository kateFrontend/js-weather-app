const api = { 
    endpoint: "https://api.openweathermap.org/data/2.5/", 
    key: "..." 
}


const input = document.querySelector("#input");
input.addEventListener("keypress", enter);

function enter(e) {   
    if (e.keyCode === 13) {
        getInfo(input.value);
    }

}

async function getInfo(data) {
    const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`);
    const result = await res.json();

    displayResult(result);
}


function displayResult(result) {

    if(input.value === "") {  
        Swal.fire({
            icon: 'error',
            title: 'You must enter a city',
            text: 'Please, try again!',
          })  
    }

    const detailsBtn = document.querySelector(".details-btn");
    detailsBtn.addEventListener("click", showDetails);

    function showDetails() {
    document.querySelector(".details").style.display = "block";
}

    let city = document.querySelector("#city");
    city.textContent = `${result.name}, ${result.sys.country}`;

    let temperature = document.querySelector(".temp");
    temperature.innerHTML = `${Math.round(result.main.temp)}<span>°</span>`;

    let icon = document.querySelector("#icon");
    let iconId = `${result.weather[0].icon}`;
    icon.src = "http://openweathermap.org/img/wn/" + iconId + ".png";

    let feelsLike = document.querySelector("#feelsLike");
    feelsLike.innerHTML = `${Math.round(result.main.feels_like)}<span>°</span>`;
    
    let variation = document.querySelector("#variation");
    variation.innerHTML = `Min: ${Math.round(result.main.temp_max)}<span>°</span> Max: ${Math.round(result.main.feels_like)}<span>°</span>`

    let cloudy = document.querySelector(".cloud");
    cloudy.innerHTML = `${Math.round(result.clouds.all)}<span>%</span>`;

    let humidity = document.querySelector(".humidity");
    humidity.innerHTML = `${Math.round(result.main.humidity)}<span>%</span>`;

    let wind = document.querySelector(".wind");
    wind.innerHTML = `${Math.round(result.wind.speed)} <span>km/h</span>`;

    let conditions = document.querySelector(".conditions");
    conditions.textContent = `${result.weather[0].main}`;

    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + result.name + "')"

}

document.querySelector(".btn").addEventListener("click", function() {
    getInfo(input.value);

})







