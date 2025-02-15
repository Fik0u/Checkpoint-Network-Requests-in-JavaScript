// alert("Hello Weather!!!")

async function weatherSearch() {
    const APIkey = "2dd3a820d48a21a3cac38b0e18b7fc7e"
    const city = document.getElementById("townInput").value
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`
    try {
        const response = await fetch(URL);
        if(!response.ok){
            if (response.status === 404) throw new Error("Couldn't find this town")
                else if(response.status === 401) throw new Error("Unauthorized to make this request")
                    else throw new Error("Request has failed")
        }
        const data = await response.json()
        dataDisplay(data)
    } catch (error) {
        console.log(error);
        document.querySelector(".error").innerHTML = error;
    }
}

function dataDisplay(data) {
    document.getElementById("resDisplay").classList.remove("d-none");

    const Town = data.name;
    document.getElementById("town").innerHTML = Town;

    const Temperature = Math.floor(data.main.temp)
    document.getElementById("temp").innerHTML = Temperature + " ℃";

    const Description = data.weather[0].main
    document.getElementById("description").innerHTML = Description;

    const icon = data.weather[0].icon 
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`
}