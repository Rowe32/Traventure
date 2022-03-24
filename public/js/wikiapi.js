const countryForInfobox = document.querySelector("#selectedCountry");

//template literal for countes
const endpoint = `https://en.wikipedia.org/w/api.php?action=parse&page=${countryForInfobox.value}&prop=text&formatversion=2&origin=*&format=json`;

let infobox;

async function getDataFromWikipedia() {
  const response = await fetch(endpoint);
  const data = await response.json();
  
  const wikiContainer = document.getElementById("wikiInfo");
   
  let myParser = new DOMParser()
  let virtualDOM = myParser.parseFromString(data.parse.text, "text/html");
  infobox = virtualDOM.querySelector(".infobox");

  setDisplayToNone()

  wikiContainer.innerHTML = "";
  wikiContainer.appendChild(infobox);
}

getDataFromWikipedia();


// css selector [attribute~="value"]

function setDisplayToNone() {
  let coatOfArms = infobox.querySelectorAll('a')
  Array.from(coatOfArms).forEach((elem) => { 
    if (elem.innerHTML.trim() === "Coat of arms" || elem.innerHTML.trim() === "Emblem") {
      elem.parentNode.parentNode.style.display = "none";
    }
  })

  let anthem = infobox.querySelectorAll('b')
  Array.from(anthem).forEach((elem) => { 
    if (elem.innerHTML.toLowerCase() === "anthem:") {
      elem.parentNode.style.display = "none";
    }
  })

  let motto = infobox.querySelectorAll('b')
  Array.from(motto).forEach((elem) => { 
    console.log(elem.innerHTML)
    if (elem.innerHTML.toLowerCase() === "motto:&nbsp;") {
      elem.parentNode.style.display = "none";
    }
  })

  let audio = infobox.querySelectorAll('audio')
  Array.from(audio).forEach((elem) => { 
   elem.parentNode.parentNode.parentNode.style.display = "none";
  })
  
}