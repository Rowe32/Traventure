const allCountryElements = document.querySelectorAll("path");

console.log(allCountryElements);

const allTitles = [...allCountryElements].map((elem) => elem.getAttribute("title"));


console.log(allTitles);

const addCountry = (countryName) => {
    const countryElement = document.querySelector(`[title="${countryName}"]`);
    
    countryElement.addEventListener("mouseover", () => {
        countryElement.style.fill = "red";
        console.log(countryElement);
    });
    
    countryElement.addEventListener("mouseleave", () => {
        countryElement.style.fill = "black";
        console.log(countryElement);
    });
};

allTitles.forEach(addCountry);
