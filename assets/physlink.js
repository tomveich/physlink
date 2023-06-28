/*
    <print-card>
        <span class="barcode">0001</span>
        <span class="logo">physlink.oli.cx</span>
    </print-card>
*/

import * as DM from "./datamatrix.min.js"

const wrapper = document.querySelector("#content");
const controls = document.querySelector("#controls");
const prefix = document.querySelector("#prefix");
const code_type = document.querySelector("#code_type");
const group_by = document.querySelector("#group_by");
const start_input = document.querySelector("#start");
const amount_input = document.querySelector("#amount");
const generate_btn = document.querySelector("#generate");
const hidecontrols_btn = document.querySelector("#hidecontrols");

controls.addEventListener("submit", e => {
    e.preventDefault();
    const start = start_input.value - 0; // To Int
    const amount = amount_input.value - 0; // To Int

    wrapper.innerText = "";

    let octet = document.createElement("div");
    octet.classList.add("octet");

    function createCode (prefix, i){
        
        if(code_type.value == "barcode39") {
            return createBarcode39(prefix, i)
        } else if (code_type.value == "datamatrix") {
            return createDataMatrix(prefix, i)
        } else {
            alert("Error: Incorrect code type");
            return 0;
        }
        
    }


    for (let i = start; i < (start + amount); i++) {

        const card = createCode(prefix.value, i)
            

        octet.appendChild(card);

        console.log(i)


        if(octet.childElementCount > (group_by.value - 1) || (i == start+amount-1)){
            console.log("DONE");
            wrapper.appendChild(octet);
            octet = document.createElement("span");
            octet.classList.add("octet");
        }

    }

});

hidecontrols_btn.addEventListener("click", e => {
    controls.style.display = "none";
});

function createBarcode39(prefix, num) {
    const card = document.createElement("print-card");
    const barcode = document.createElement("span");
    barcode.classList.add("barcode");
    barcode.innerText = prefix + num.toString().padStart(4, "0");

    const logo = document.createElement("span");
    logo.classList.add("logo");
    logo.innerText = "physlink.oli.cx";

    card.appendChild(barcode);
    card.appendChild(logo);
    return card;
}

function createDataMatrix(prefix, num) {
    const card = document.createElement("print-card");
    const svgNode = DM.DATAMatrix({
        msg: prefix + num,
        pad: 0
    });
    card.classList.add("datamatrix")
    card.appendChild(svgNode);

    return card;

}