const countryForInfobox = document.querySelector("#selectedCountry");
const endpoint = `https://en.wikipedia.org/w/api.php?action=parse&page=${countryForInfobox.value}&prop=text&formatversion=2&origin=*&format=json`;
let infobox;

//API Request from Wikipedia & targetting of infobox

async function getDataFromWikipedia() {
  const response = await fetch(endpoint);
  const data = await response.json();
  
  const wikiContainer = document.querySelector(".wiki");
   
  let myParser = new DOMParser()
  let virtualDOM = myParser.parseFromString(data.parse.text, "text/html");
  infobox = virtualDOM.querySelector(".infobox");

  setDisplayToNone()

  wikiContainer.innerHTML = "";
  wikiContainer.appendChild(infobox);
}

getDataFromWikipedia();

// customized infobox:

function setDisplayToNone() {
  // to target all a tag elements in info box:
  let aElems = infobox.querySelectorAll('a')
  Array.from(aElems).forEach((elem) => {
    
    // alle hrefs entfernen da weiterleitung nicht funktioniert
    elem.removeAttribute("href");

    // take out coat of arms or emblem of infbox
    if (elem.innerHTML.trim() === "Coat of arms" || elem.innerHTML.trim() === "Emblem") {
      elem.parentNode.parentNode.style.display = "none";
    } 

      //take out Demonym
    else if (elem.title === "Demonym") {
      elem.parentNode.parentNode.style.display = "none";
    } 

    // cut infobox below formation / AREA / Independence
    else if (elem.innerHTML.trim().toLowerCase() === "formation" 
    || elem.innerHTML.trim().toLowerCase() === "area"
    || elem.innerHTML.trim().toLowerCase() === "independence"
    ) {
      let current = elem.parentNode.parentNode;
      let nextSibling = current.nextElementSibling;
      current.style.display = "none";

      while(nextSibling) {
        nextSibling = nextSibling.nextElementSibling;
        if (nextSibling === null) break
        if (elem.innerHTML.trim().toLowerCase() === "population") continue // + darauffolgendes tr
        nextSibling.style.display ="none"
      }
    }

  })

    // take out coordinates of capital
  let spanElems = infobox.querySelectorAll('span')
  Array.from(spanElems).forEach((elem) => { 
    if (elem.className === "plainlinks nourlexpansion") {
      elem.style.display = 'none';
    }
  })

  // take out anthem & motto
  let anthem = infobox.querySelectorAll('b')
  Array.from(anthem).forEach((elem) => { 
    if (elem.innerHTML.toLowerCase() === "anthem:") {
      elem.parentNode.style.display = "none";
    }

    else if (elem.innerHTML.toLowerCase() === "motto:&nbsp;") {
      elem.parentNode.style.display = "none";
    }
  })

  // take out audio of anthem
  let audio = infobox.querySelectorAll('audio')
  Array.from(audio).forEach((elem) => { 
   elem.parentNode.parentNode.parentNode.style.display = "none";
  })

  //add classed to images to style them via CSS:
  let images = infobox.querySelectorAll('img')
  if (images) {
    (images)[0].className += " flag";
    for (let i = 1; i < images.length; i++) {
      images[i].className += " smaller";
    }
  }
}