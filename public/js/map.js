const allCountryElements = document.querySelectorAll("path");
const travelModeElem = document.querySelector(".selectTravel");
const adventureModeElem = document.querySelector(".selectAdventure");

travelModeElem.addEventListener("click", () => {
  const isActive = travelModeElem === 'travel mode active!';
  travelModeElem.innerText = isActive ? "add travel!" : "travel mode active!";
  travelModeElem.className = isActive ? "btn orange selectTravel passive" : "btn orange selectTravel active"
  adventureModeElem.innerText = isActive ? "adventure mode active!" : "add adventure!"
  adventureModeElem.className = isActive ? "btn petrol selectAdventure active" : "btn petrol selectAdventure passive"
});

adventureModeElem.addEventListener("click", () => {
  const isActive = adventureModeElem === 'adventure mode active!'
  adventureModeElem.innerText = isActive ? "add adventure!" : "adventure mode active!"
  adventureModeElem.className = isActive ? "btn petrol selectAdventure passive" : "btn petrol selectAdventure active"
  travelModeElem.innerText = isActive ? "travel mode active!" : "add travel!"
  travelModeElem.className = isActive ? "btn orange selectTravel active" : "btn orange selectTravel passive"
});

const countryList = [...allCountryElements].map((elem) =>
  elem.getAttribute("title")
);

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
    console.log(countryElement);
  });
};

countryList.forEach(addCountry);
