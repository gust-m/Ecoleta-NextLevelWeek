function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {
        for(let state of states)
        ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`
    })
}
populateUFs();

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    let stateInput = document.querySelector("input[name=state]")

    let indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    let url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`

    citySelect.innerHTML = ""
    citySelect.disabled = true

    fetch(url)
        .then( res => res.json())
        .then( cities => {
            for(let city of cities)
                citySelect.innerHTML += `<option value = "${city.nome}">${city.nome}</option>`

    citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

const itemsToCollect = document.querySelectorAll(".items-grid li")

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

for(const item of itemsToCollect)
    item.addEventListener("click", handleSelectedItem)

function handleSelectedItem(event){

    const itemLi = event.target

    const itemID = itemLi.dataset.id

    itemLi.classList.toggle("selected")


    const alreadySelected = selectedItems.findIndex(item => item == itemID)
    console.log(alreadySelected)

    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => item!=itemID)
        selectedItems = filteredItems
    }
    else{
        selectedItems.push(itemID)
    }

    collectedItems.value = selectedItems

console.log(selectedItems)
}

