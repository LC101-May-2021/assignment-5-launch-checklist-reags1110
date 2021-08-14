window.addEventListener("load", function() {
    let form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        let pilotName = document.querySelector("input[name=pilotName]");
        let copilotName = document.querySelector("input[name=copilotName]");
        let fuelLevel = document.querySelector("input[name=fuelLevel]");
        let cargoWeight = document.querySelector("input[name=cargoWeight]");
        let pilotsReady = false;

        event.preventDefault();

        if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoWeight.value === "") {
            alert("All fields are required!");
            document.getElementById("faultyItems").style.visibility = "hidden";
            return;
        } else if (!isNaN(pilotName.value) || !isNaN(copilotName.value)) {
            alert("Pilot & Co-Pilot names must be strings!");
            pilotsReady = false;
        }

        if (!isNaN(pilotName.value) || pilotName.value === "") {
            document.getElementById("pilotStatus").style.color = "red";
            document.getElementById("pilotStatus").innerHTML = "Pilot not ready";
            pilotsReady = false;
        } else {
            document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotName.value} ready`;
            document.getElementById("pilotStatus").style.removeProperty("color");
            pilotsReady = true;
        }

        if (!isNaN(copilotName.value) || copilotName.value === "") {
            document.getElementById("copilotStatus").style.color = "red";
            document.getElementById("copilotStatus").innerHTML = "Co-Pilot not ready";
            pilotsReady = false;
        } else {
            document.getElementById("copilotStatus").innerHTML = `Co-Pilot ${copilotName.value} ready`;
            document.getElementById("copilotStatus").style.removeProperty("color");
        }

        if (fuelLevel.value < 10000) {
            document.getElementById("fuelStatus").innerHTML = "Not enough fuel for launch";
            document.getElementById("fuelStatus").style.color = "red";
        } else {
            document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
            document.getElementById("fuelStatus").style.removeProperty("color");
        }

        if (cargoWeight.value > 10000) {
            document.getElementById("cargoStatus").innerHTML = "Cargo weight too heavy for launch";
            document.getElementById("cargoStatus").style.color = "red";
        } else {
            document.getElementById("cargoStatus").innerHTML = "Cargo weight low enough for launch";
            document.getElementById("cargoStatus").style.removeProperty("color");
        }

        if (!pilotsReady) { return; }

        if (fuelLevel.value < 10000 || cargoWeight.value > 10000) {
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
            document.getElementById("launchStatus").style.color = "red";
            document.getElementById("faultyItems").style.visibility = "visible";
        }
    });

    fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        response.json().then(function(json) {
            let planet = json[Math.floor(Math.random() * json.length)];
            document.getElementById("missionTarget").innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
                <li>Name: ${planet.name}>/li>
                <li>Diameter: ${planet.diameter}>/li>
                <li>Star: ${planet.star}>/li>
                <li>Distance from Earth: ${planet.distance}>/li>
                <li>Number of Moons: ${planet.moons}>/li>
            </ol>
            <img src = "${planet.image}"></img>
            `;
        });
    });
});