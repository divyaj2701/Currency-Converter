const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const fromDropdown = document.querySelector("#from-select");
const toDropdown = document.querySelector("#to-select");

const get_btn = document.querySelector("#get-btn");

var fromCurr = "USD";
var toCurr = "INR"; 


// appending all the options in select from codes.js
for(code in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;
    if(fromDropdown.name == "from" && code == "USD"){
        newOption.selected = "selected";
    }
    fromDropdown.append(newOption);
}
fromDropdown.addEventListener("change", (evt)=>{
    fromCurr = evt.target.value;
    updateFlag(evt.target);        //evt.target => element jispe click kiya
})
for(code in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;
    if(toDropdown.name == "to" && code == "INR"){
        newOption.selected = "selected";
    }
    toDropdown.append(newOption);
}
toDropdown.addEventListener("change", (evt)=>{
    toCurr = evt.target.value;
    updateFlag(evt.target);        //evt.target => element jispe click kiya
})

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    console.log(countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/32.png`
    let img = element.parentElement.querySelector("img");       //element=>dropdown ke parent mai ja krr uska child select krna
    img.src = newSrc;
};

get_btn.addEventListener("click" ,async (evt)=>{
    evt.preventDefault();                   //will not refresh when button clicked
    let amt = document.querySelector("#amt");
    let amtVal = amt.value;
    if(amtVal < 1 || amtVal === ""){
        amtVal = 1;
        amt.value = "1";

    }
    // console.log(fromCurr, toCurr);
    const url = `${base_url}/${fromCurr.toLowerCase()}.json`;   
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);
    let rate = data[fromCurr.toLowerCase()][toCurr.toLowerCase()];
    document.querySelector(".unit-rate").innerText = `1 ${fromCurr} = ${rate} ${toCurr}`;
    document.querySelector(".amt-box").innerText = amtVal * rate + ` ${toCurr}`;
});




