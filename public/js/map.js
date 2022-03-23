const allCountryElements = document.querySelectorAll("path");
const travelModeElem = document.querySelector(".selectTravel");
const adventureModeElem = document.querySelector(".selectAdventure");

travelModeElem.addEventListener("click", () => {
  if (travelModeElem.classList.contains("passive")) {
    travelModeElem.className = "btn orange selectTravel active";
    travelModeElem.innerText = "travel mode!";
    adventureModeElem.className = "btn petrol selectAdventure passive";
    adventureModeElem.innerText = "add adventure!";
  } 
  if (travelModeElem.classList.contains("active")) {
    travelModeElem.className = "btn orange selectTravel passive";
    travelModeElem.innerText = "add travel!";
    adventureModeElem.className = "btn petrol selectAdventure active";
    adventureModeElem.innerText = "adventure mode!";
  }
});

console.log(travelModeElem.classList.contains("passive"))

adventureModeElem.addEventListener("click", () => {
  if (adventureModeElem.classList.contains("passive")) {
    travelModeElem.className = "btn orange selectTravel passive";
    travelModeElem.innerText = "add travel!";
    adventureModeElem.className = "btn petrol selectAdventure active";
    adventureModeElem.innerText = "adventure mode!";
  } else {
    adventureModeElem.className = "btn petrol selectAdventure passive";
    adventureModeElem.innerText = "add adventure!";
    travelModeElem.className = "btn orange selectTravel active";
    travelModeElem.innerText = "travel mode!";
  }
});

console.log(travelModeElem, adventureModeElem, allCountryElements);
const countryList = [...allCountryElements].map((elem) =>
  elem.getAttribute("title")
);

const addCountry = (countryName) => {
  const countryElement = document.querySelector(`[title="${countryName}"]`);

  countryElement.addEventListener("mouseover", () => {
    countryElement.style.fill = "#FF8B42";
  });

  countryElement.addEventListener("click", async (event) => {
    const newURL = new URL(window.location.href);

    if (travelModeElem.classList.contains("active")) {
      const response = await fetch(`${newURL.pathname}/travels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country: countryName }),
      });
    };
    if (adventureModeElem.classList.contains("active")) {
      const response = await fetch(`${newURL.pathname}/adventures`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country: countryName }),
      });
    }

  });

  countryElement.addEventListener("mouseleave", () => {
    countryElement.style.fill = "black";
    console.log(countryElement);
  });
};

countryList.forEach(addCountry);
