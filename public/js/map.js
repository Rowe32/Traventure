const allCountryElements = document.querySelectorAll("path");

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
    const response = await fetch(`${newURL.pathname}/travels`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({ country: countryName }),
    });

  });

  countryElement.addEventListener("mouseleave", () => {
    countryElement.style.fill = "black";
    console.log(countryElement);
  });
};

countryList.forEach(addCountry);


