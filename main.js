// Theme changing functionality
(function () {
  if (localStorage.getItem("theme") == "light-theme") {
    setTheme("light-theme");
  } else {
    setTheme("dark-theme");
  }
});
let themeText = document.querySelector(".theme");
let themeChange = document.querySelector(".theme-div");
themeChange.addEventListener("click", () => {
  console.log("the button is clicked");
  toggleTheme();
});
// To set the theme
function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;
}
function toggleTheme() {
  if (localStorage.getItem("theme") == "dark-theme") {
    setTheme("light-theme");
    themeText.innerText = "Dark Mode";
  } else {
    setTheme("dark-theme");
    themeText.innerText = "Light Mode";
  }
}

//**************************Theme section is ended */

//**************** Main elements used in the page */
let countryDiv = document.querySelector(".section2");
let flagDiv = document.querySelector(".country-info-col");
let countryName2 = document.querySelector(".country-name2");
let nativeName = document.querySelector(".native-name");
let populationValue = document.querySelector(".population-value");
let regionName = document.querySelector(".region-name");
let subRegionName = document.querySelector(".sub-region-name");
let capitalName = document.querySelector(".capital-name");
let domainName = document.querySelector(".domain-name");
let currencyName = document.querySelector(".currency-name");
let languageName = document.querySelector(".language-name");
let borderDiv = document.querySelector(".countries");
let bordersDiv = document.querySelector(".border-div");
let mainSec = document.querySelector(".section2");

// ************By clicking on back btn in country detail section
let backBtn = document.querySelector(".back-btn");
let countryDetail = document.querySelector(".country-detail");
backBtn.addEventListener("click", () => {
  countryDetail.style.display = "none";
  mainSec.style.display = "grid";
});

// ************* By clicking on filter area
let region = document.querySelector("#area-region");
let selectedText = "region";
region.addEventListener("click", () => {
  regionCountries();
});

// ******** By clicking on search btn
let search = document.querySelector(".search");
let searchInput = document.querySelector(".search-country");
search.addEventListener("click", () => {
  searchCountry();
});
// ******** by pressing entery key word on input field
searchInput.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    searchCountry();
  }
});
window.onload = function () {
  allCountries();
};

// get the all countries detail
function allCountries() {
  fetch(`https://restcountries.com/v2/all`)
    .then((res) => {
      return res.json();
    })
    .then((countryData) => {
      // console.log("the api data is: ", countryData);
      countriesLength = countryData.length;
      for (let i = 0; i < countriesLength; i++) {
        // Creating country card
        let countryCard = document.createElement("div");
        countryCard.classList.add("country-card");
        // ****************By clicking on flag card show the detail*************
        countryCard.addEventListener("click", () => {
          while (flagDiv.firstChild) {
            flagDiv.removeChild(flagDiv.firstChild);
          }
          console.log("The country data is: ", countryData[i]);
          let countryFlag = document.createElement("img");
          countryFlag.classList.add("big-flag");
          countryFlag.alt = `country flag`;
          countryFlag.src = `${countryData[i].flag}`;
          flagDiv.appendChild(countryFlag);
          countryName2.innerText = countryData[i].name;
          nativeName.innerText = countryData[i].nativeName;
          populationValue.innerText = countryData[i].population;
          regionName.innerText = countryData[i].region;
          subRegionName.innerText = countryData[i].subregion;
          capitalName.innerText = countryData[i].capital;
          if (countryData[i].topLevelDomain != undefined) {
            console.log("domain executed");
            domainName.innerText = countryData[i].topLevelDomain;
          }
          currencyName.innerText = countryData[i].currencies[0].name;
          languageName.innerText = countryData[i].languages[0].name;
          if (countryData[i].borders) {
            let borderLength = countryData[i].borders.length;
            for (let j = 0; j < borderLength; j++) {
              let borderBtn = document.createElement("button");
              borderBtn.classList.add("btn");
              borderBtn.classList.add("border-btn");
              //   let borderbtnNode = document.createTextNode(`hi there`);
              borderBtn.innerText = `${countryData[i].borders[j]}`;
              //   borderBtn.appendChild(borderbtnNode);
              borderDiv.appendChild(borderBtn);
            }
          } else {
            bordersDiv.style.display = "none";
          }

          countryDetail.style.display = "block";
          mainSec.style.display = "none";
        });
        // Creating country Flag
        let countryFlag = document.createElement("img");
        countryFlag.classList.add("country-flag");
        countryFlag.alt = `country flag`;
        countryFlag.src = `${countryData[i].flag}`;
        // Creating country  Name
        let countryName = document.createElement("h3");
        countryName.classList.add("country-name");
        let countryNameNode = document.createTextNode(`${countryData[i].name}`);
        countryName.appendChild(countryNameNode);
        // Creating country Info
        let countryInfo = document.createElement("div");
        countryInfo.classList.add("country-info");
        // Creating country info list
        let infoList = document.createElement("ul");
        infoList.classList.add("info-list");
        // info about population
        let infoItem1 = document.createElement("li");
        infoItem1.classList.add("info-item");
        let infoItem1Node = document.createTextNode("Population: ");
        infoItem1.appendChild(infoItem1Node);
        let popValue = document.createElement("span");
        popValue.classList.add("pop-value");
        let popValueNode = document.createTextNode(
          `${countryData[i].population}`
        );
        popValue.appendChild(popValueNode);
        infoItem1.appendChild(popValue);
        infoList.appendChild(infoItem1);
        // info about Region
        let infoItem2 = document.createElement("li");
        infoItem2.classList.add("info-item");
        let infoItem2Node = document.createTextNode("Region: ");
        infoItem2.appendChild(infoItem2Node);
        let regionValue = document.createElement("span");
        regionValue.classList.add("region-value");
        let regionValueNode = document.createTextNode(
          `${countryData[i].region}`
        );
        regionValue.appendChild(regionValueNode);
        infoItem2.appendChild(regionValue);
        infoList.appendChild(infoItem2);
        // info about Capital
        let infoItem3 = document.createElement("li");
        infoItem3.classList.add("info-item");
        let infoItem3Node = document.createTextNode("Capital: ");
        infoItem3.appendChild(infoItem3Node);
        let capitalValue = document.createElement("span");
        capitalValue.classList.add("capital-value");
        let capitalValueNode = document.createTextNode(
          `${countryData[i].capital}`
        );
        capitalValue.appendChild(capitalValueNode);
        infoItem3.appendChild(capitalValue);
        infoList.appendChild(infoItem3);
        // put the data in the info block
        countryInfo.appendChild(infoList);
        // Now Append the elements
        countryCard.appendChild(countryFlag);
        countryCard.appendChild(countryName);
        countryCard.appendChild(countryInfo);
        countryDiv.appendChild(countryCard);
      }
    });
}
//the the country detail by its name
function searchCountry() {
  countryDetail.style.display = "none";
  mainSec.style.display = "grid";
  console.log("it just worked");
  fetch(`https://restcountries.com/v3.1/name/${searchInput.value}`)
    .then((res) => {
      return res.json();
    })
    .then((countryData) => {
      while (countryDiv.firstChild) {
        countryDiv.removeChild(countryDiv.firstChild);
      }
      console.log("the api data is: ", countryData);
      countriesLength = countryData.length;
      for (let i = 0; i < countriesLength; i++) {
        // Creating country card
        let countryCard = document.createElement("div");
        countryCard.classList.add("country-card");
        // ****************By clicking on flag card show the detail*************
        countryCard.addEventListener("click", () => {
          while (flagDiv.firstChild) {
            flagDiv.removeChild(flagDiv.firstChild);
          }
          console.log("The country data is: ", countryData[i]);
          let countryFlag = document.createElement("img");
          countryFlag.classList.add("big-flag");
          countryFlag.alt = `country flag`;
          countryFlag.src = `${countryData[i].flags.svg}`;
          flagDiv.appendChild(countryFlag);
          countryName2.innerText = countryData[i].name.common;
          // gettting the property name for using in next lines to access that property value
          let nativeNameProperty = Object.keys(countryData[i].name.nativeName);
          // console.log("native name: ", nativeNameProperty);
          nativeName.innerText =
            countryData[i].name.nativeName[nativeNameProperty[0]].common;
          populationValue.innerText = countryData[i].population;
          regionName.innerText = countryData[i].region;
          subRegionName.innerText = countryData[i].subregion;
          capitalName.innerText = countryData[i].capital;
          // if domain name is available
          if (countryData[i].tld != undefined) {
            // console.log("domain executed");
            domainName.innerText = countryData[i].tld;
          }
          // gettting the property name for using in next lines to access that property value
          let currencyProerty = Object.keys(countryData[i].currencies);
          currencyName.innerText = `${countryData[i].currencies[currencyProerty].name}`;
          countryData[i].currencies[currencyProerty].name;
          // gettting the property name for using in next lines to access that property value
          let languageProperty = Object.keys(countryData[i].languages);
          console.log("object names is : ", languageProperty);
          // Getting the languages data
          languageName.innerText = "";
          for (let l = 0; l < languageProperty.length; l++) {
            if (l == languageProperty.length - 1) {
              languageName.innerText += `${
                countryData[i].languages[languageProperty[l]]
              }  `;
            } else {
              languageName.innerText += `${
                countryData[i].languages[languageProperty[l]]
              } , `;
            }
          }
          // getting the  country border data
          if (countryData[i].borders) {
            let borderLength = countryData[i].borders.length;
            for (let j = 0; j < borderLength; j++) {
              let borderBtn = document.createElement("button");
              borderBtn.classList.add("btn");
              borderBtn.classList.add("border-btn");
              //   let borderbtnNode = document.createTextNode(`hi there`);
              borderBtn.innerText = `${countryData[i].borders[j]}`;
              //   borderBtn.appendChild(borderbtnNode);
              borderDiv.appendChild(borderBtn);
            }
          } else {
            bordersDiv.style.display = "none";
          }

          countryDetail.style.display = "block";
          mainSec.style.display = "none";
        });
        // Creating country Flag
        let countryFlag = document.createElement("img");
        countryFlag.classList.add("country-flag");
        countryFlag.alt = `country flag`;
        countryFlag.src = `${countryData[i].flags.svg}`;
        // Creating country  Name
        let countryName = document.createElement("h3");
        countryName.classList.add("country-name");
        let countryNameNode = document.createTextNode(
          `${countryData[i].name.common}`
        );
        countryName.appendChild(countryNameNode);
        // Creating country Info
        let countryInfo = document.createElement("div");
        countryInfo.classList.add("country-info");
        // Creating country info list
        let infoList = document.createElement("ul");
        infoList.classList.add("info-list");
        // info about population
        let infoItem1 = document.createElement("li");
        infoItem1.classList.add("info-item");
        let infoItem1Node = document.createTextNode("Population: ");
        infoItem1.appendChild(infoItem1Node);
        let popValue = document.createElement("span");
        popValue.classList.add("pop-value");
        let popValueNode = document.createTextNode(
          `${countryData[i].population}`
        );
        popValue.appendChild(popValueNode);
        infoItem1.appendChild(popValue);
        infoList.appendChild(infoItem1);
        // info about Region
        let infoItem2 = document.createElement("li");
        infoItem2.classList.add("info-item");
        let infoItem2Node = document.createTextNode("Region: ");
        infoItem2.appendChild(infoItem2Node);
        let regionValue = document.createElement("span");
        regionValue.classList.add("region-value");
        let regionValueNode = document.createTextNode(
          `${countryData[i].region}`
        );
        regionValue.appendChild(regionValueNode);
        infoItem2.appendChild(regionValue);
        infoList.appendChild(infoItem2);
        // info about Capital
        let infoItem3 = document.createElement("li");
        infoItem3.classList.add("info-item");
        let infoItem3Node = document.createTextNode("Capital: ");
        infoItem3.appendChild(infoItem3Node);
        let capitalValue = document.createElement("span");
        capitalValue.classList.add("capital-value");
        let capitalValueNode = document.createTextNode(
          `${countryData[i].capital}`
        );
        capitalValue.appendChild(capitalValueNode);
        infoItem3.appendChild(capitalValue);
        infoList.appendChild(infoItem3);
        // put the data in the info block
        countryInfo.appendChild(infoList);
        // Now Append the elements
        countryCard.appendChild(countryFlag);
        countryCard.appendChild(countryName);
        countryCard.appendChild(countryInfo);
        countryDiv.appendChild(countryCard);
      }
    });
}
// get the countries detail by its region
function regionCountries() {
  for (let i = 0; i < region.options.length; i++) {
    if (region.options[i].selected) {
      if (region.options[i].value != selectedText) {
        // if the detail page is open, hide it
        countryDetail.style.display = "none";
        mainSec.style.display = "grid";
        console.log("the text value is: ", selectedText);
        selectedText = region.options[i].value;
        fetch(`https://restcountries.com/v3.1/region/${selectedText}`)
          .then((res) => {
            return res.json();
          })
          .then((countryData) => {
            while (countryDiv.firstChild) {
              countryDiv.removeChild(countryDiv.firstChild);
            }
            console.log("the api data is: ", countryData);
            countriesLength = countryData.length;
            for (let i = 0; i < countriesLength; i++) {
              // Creating country card
              let countryCard = document.createElement("div");
              countryCard.classList.add("country-card");
              // ****************By clicking on flag card show the detail*************
              countryCard.addEventListener("click", () => {
                while (flagDiv.firstChild) {
                  flagDiv.removeChild(flagDiv.firstChild);
                }
                console.log("The country data is: ", countryData[i]);
                let countryFlag = document.createElement("img");
                countryFlag.classList.add("big-flag");
                countryFlag.alt = `country flag`;
                countryFlag.src = `${countryData[i].flags.svg}`;
                flagDiv.appendChild(countryFlag);
                countryName2.innerText = countryData[i].name.common;
                // gettting the property name for using in next lines to access that property value
                let nativeNameProperty = Object.keys(
                  countryData[i].name.nativeName
                );
                // console.log("native name: ", nativeNameProperty);
                nativeName.innerText =
                  countryData[i].name.nativeName[nativeNameProperty[0]].common;
                populationValue.innerText = countryData[i].population;
                regionName.innerText = countryData[i].region;
                subRegionName.innerText = countryData[i].subregion;
                capitalName.innerText = countryData[i].capital;
                // if domain name is available
                if (countryData[i].tld != undefined) {
                  // console.log("domain executed");
                  domainName.innerText = countryData[i].tld;
                }
                // gettting the property name for using in next lines to access that property value
                let currencyProerty = Object.keys(countryData[i].currencies);
                currencyName.innerText = `${countryData[i].currencies[currencyProerty].name}`;
                countryData[i].currencies[currencyProerty].name;
                // gettting the property name for using in next lines to access that property value
                let languageProperty = Object.keys(countryData[i].languages);
                console.log("object names is : ", languageProperty);
                // Getting the languages data
                languageName.innerText = "";
                for (let l = 0; l < languageProperty.length; l++) {
                  if (l == languageProperty.length - 1) {
                    languageName.innerText += `${
                      countryData[i].languages[languageProperty[l]]
                    }  `;
                  } else {
                    languageName.innerText += `${
                      countryData[i].languages[languageProperty[l]]
                    } , `;
                  }
                }
                // getting the  country border data
                if (countryData[i].borders) {
                  let borderLength = countryData[i].borders.length;
                  for (let j = 0; j < borderLength; j++) {
                    let borderBtn = document.createElement("button");
                    borderBtn.classList.add("btn");
                    borderBtn.classList.add("border-btn");
                    //   let borderbtnNode = document.createTextNode(`hi there`);
                    borderBtn.innerText = `${countryData[i].borders[j]}`;
                    //   borderBtn.appendChild(borderbtnNode);
                    borderDiv.appendChild(borderBtn);
                  }
                } else {
                  bordersDiv.style.display = "none";
                }

                countryDetail.style.display = "block";
                mainSec.style.display = "none";
              });
              // Creating country Flag
              let countryFlag = document.createElement("img");
              countryFlag.classList.add("country-flag");
              countryFlag.alt = `country flag`;
              countryFlag.src = `${countryData[i].flags.svg}`;
              // Creating country  Name
              let countryName = document.createElement("h3");
              countryName.classList.add("country-name");
              let countryNameNode = document.createTextNode(
                `${countryData[i].name.common}`
              );
              countryName.appendChild(countryNameNode);
              // Creating country Info
              let countryInfo = document.createElement("div");
              countryInfo.classList.add("country-info");
              // Creating country info list
              let infoList = document.createElement("ul");
              infoList.classList.add("info-list");
              // info about population
              let infoItem1 = document.createElement("li");
              infoItem1.classList.add("info-item");
              let infoItem1Node = document.createTextNode("Population: ");
              infoItem1.appendChild(infoItem1Node);
              let popValue = document.createElement("span");
              popValue.classList.add("pop-value");
              let popValueNode = document.createTextNode(
                `${countryData[i].population}`
              );
              popValue.appendChild(popValueNode);
              infoItem1.appendChild(popValue);
              infoList.appendChild(infoItem1);
              // info about Region
              let infoItem2 = document.createElement("li");
              infoItem2.classList.add("info-item");
              let infoItem2Node = document.createTextNode("Region: ");
              infoItem2.appendChild(infoItem2Node);
              let regionValue = document.createElement("span");
              regionValue.classList.add("region-value");
              let regionValueNode = document.createTextNode(
                `${countryData[i].region}`
              );
              regionValue.appendChild(regionValueNode);
              infoItem2.appendChild(regionValue);
              infoList.appendChild(infoItem2);
              // info about Capital
              let infoItem3 = document.createElement("li");
              infoItem3.classList.add("info-item");
              let infoItem3Node = document.createTextNode("Capital: ");
              infoItem3.appendChild(infoItem3Node);
              let capitalValue = document.createElement("span");
              capitalValue.classList.add("capital-value");
              let capitalValueNode = document.createTextNode(
                `${countryData[i].capital}`
              );
              capitalValue.appendChild(capitalValueNode);
              infoItem3.appendChild(capitalValue);
              infoList.appendChild(infoItem3);
              // put the data in the info block
              countryInfo.appendChild(infoList);
              // Now Append the elements
              countryCard.appendChild(countryFlag);
              countryCard.appendChild(countryName);
              countryCard.appendChild(countryInfo);
              countryDiv.appendChild(countryCard);
            }
          });
        i = 8;

        // console.log("It is not repeating: ", region.options[i].value);
      } else {
      }
    }
  }
  if (selectedText == "region") {
    allCountries();
  }
}
