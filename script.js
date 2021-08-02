// Write your JavaScript code here!

let scriptHelper = require("./scriptHelper.js");

window.addEventListener("load", function () {

    document.getElementById("faultyItems").style.visibility = "hidden";

    let form = document.querySelector("testForm");
    form.addEventListener("submit", function (event) {
        let pilot = document.querySelector("input[name=pilotName]").textContent;
        let copilot = document.querySelector("input[name=copilotName]").textContent;
        let fuelLevel = document.querySelector("input[name=fuelLevel]").textContent;
        let cargoMass = document.querySelector("input[name=cargoMass]").textContent;
        let list = document.querySelector("input[name=faultyItems]");

        if (pilot.value === "" || copilot.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
            alert("All fields are required!");
            event.preventDefault();
        }
        scriptHelper.formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);
    });

    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = scriptHelper.myFetch();
    listedPlanetsResponse.then(function (result) {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let planet = scriptHelper.pickPlanet(listedPlanetsResponse);
        scriptHelper.addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image);
    })

});