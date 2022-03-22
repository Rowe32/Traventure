const allCountryElements = document.querySelectorAll("path");

const countryList = [...allCountryElements].map((elem) =>
  elem.getAttribute("title")
);

console.log(countryList);

const addCountry = (countryName) => {
  const countryElement = document.querySelector(`[title="${countryName}"]`);

  countryElement.addEventListener("mouseover", () => {
    countryElement.style.fill = "#FF8B42";
    console.log(countryElement);
  });

  countryElement.addEventListener("click", async (event) => {
    const newURL = new URL(window.location.href);
    console.log(newURL.pathname);
    const response = await fetch(`${newURL.pathname}/travels`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({ country: countryName }),
    });
    console.log(event.target);
  });

  countryElement.addEventListener("mouseleave", () => {
    countryElement.style.fill = "black";
    console.log(countryElement);
  });
};

countryList.forEach(addCountry);
