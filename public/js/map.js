const allCountryElements = document.querySelectorAll("path");
const travelModeElem = document.querySelector(".selectTravel");
const adventureModeElem = document.querySelector(".selectAdventure");

// switch buttons on profile page:

travelModeElem.addEventListener("click", () => {
  if (travelModeElem.classList.contains("passive")) {
    travelModeElem.className = "btn orange selectTravel active";
    travelModeElem.innerText = "travel mode active!";
    adventureModeElem.className = "btn petrol selectAdventure passive";
    adventureModeElem.innerText = "add adventure!";
  } 
  else {
    travelModeElem.className = "btn orange selectTravel passive";
    travelModeElem.innerText = "add travel!";
    adventureModeElem.className = "btn petrol selectAdventure active";
    adventureModeElem.innerText = "adventure mode active!";
  }
});

adventureModeElem.addEventListener("click", () => {
  if (adventureModeElem.classList.contains("passive")) {
    travelModeElem.className = "btn orange selectTravel passive";
    travelModeElem.innerText = "add travel!";
    adventureModeElem.className = "btn petrol selectAdventure active";
    adventureModeElem.innerText = "adventure mode active!";
  } else {
    adventureModeElem.className = "btn petrol selectAdventure passive";
    adventureModeElem.innerText = "add adventure!";
    travelModeElem.className = "btn orange selectTravel active";
    travelModeElem.innerText = "travel mode active!";
  }
});

const countryList = [...allCountryElements].map((elem) =>
  elem.getAttribute("title")
);

// hover over world map - a mouseclick adds country to list (depending on which mode is active)

const addCountry = (countryName) => {
  const countryElement = document.querySelector(`[title="${countryName}"]`);

  countryElement.addEventListener("mouseover", () => {
    if (travelModeElem.classList.contains("active")) {
        countryElement.style.fill = "#FF8B42";
    }
    if (adventureModeElem.classList.contains("active")) {
        countryElement.style.fill = "#0098A3";
    }
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
  });
};

countryList.forEach(addCountry);
