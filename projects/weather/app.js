window.addEventListener("load", () => {
    let long;
    let lat;

    let temperatureSection = document.querySelector(".temperature__degree-section");
    let temperatureDescription = document.querySelector(".temperature__description");
    let temperatureDegree = document.querySelector(".temperature__degree");
    let temperatureSpan = document.querySelector(".temperature__degree-section span") // Farenhit / Celcius
    
    let locationTimeZone = document.querySelector(".location__timezone");

    // if geolocation enabled
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}%2C${long}?unitGroup=metric&key=W563UBH4456NEVVKP69QRHZD6&contentType=json`;
            
            // get information from this api 
            fetch(api)
                // after its done -> do this
                .then(response => {
                    return response.json()
                })

                .then(data => {
                    console.log(data);
                    const {temp, conditions, icon} = data.currentConditions;

                    // if you dont add the arrow function, the function inside will be called just once.
                    temperatureSection.addEventListener("click", () => setTemperatureScale(temp)) 

                    setDOM(data, temp, conditions)
                    setIcon(icon, document.querySelector(".location__icon"))

                })
        })
    }


    function setIcon(icon, iconID) {
        // init skycons
        const skycons = new Skycons({color: "white"});
        
        // format icon names from the visualcrossing api to skycons icon names
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();

        skycons.play()

        return skycons.set(iconID, currentIcon);
    }


    function setDOM(data, temp, conditions) {
        locationTimeZone.textContent = data.timezone
        temperatureDegree.textContent = Math.floor(temp);
        temperatureDescription.textContent = conditions;
    }


    function setTemperatureScale(temp) {
        let farenhit = Math.floor((temp * (5/9)) + 32);

        if (temperatureSpan.textContent === "F") {
            temperatureSpan.textContent = "C";
            temperatureDegree.textContent = Math.floor(temp);
        } else {
            temperatureSpan.textContent = "F"
            temperatureDegree.textContent = farenhit;
        }
    }
})