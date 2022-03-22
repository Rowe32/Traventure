document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("traventure JS imported successfully!");
  },
  false
);

const countryForInfobox = document.querySelector("#litograpthis");
console.log("Hey line 10", countryForInfobox);

//template literal for countes
const endpoint = `https://en.wikipedia.org/w/api.php?action=parse&page=Spain&prop=text&formatversion=2&origin=*&format=json`;
    
async function getDataFromWikipedia() {
  const response = await fetch(endpoint);
  const data = await response.json();
  
  const wikiContainer = document.getElementById("wikiInfo");
 
  let myParser = new DOMParser()
  let virtualDOM = myParser.parseFromString(data.parse.text, "text/html");
  const infobox = virtualDOM.querySelector(".infobox");
  wikiContainer.innerHTML = "";
  wikiContainer.appendChild(infobox);
}

getDataFromWikipedia();
