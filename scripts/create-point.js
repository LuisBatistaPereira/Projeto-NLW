function populateUFs(){
  //Adicionando o valor do selector uf a uma variavel
  const ufSelect = document.querySelector("select[name=uf]")
  //Buscando estados
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  //Convertendo em JSON()
  .then( res =>  res.json())
  .then( states => {
    for(state of states){
      //Adicionando novas options
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }        
  })
}

populateUFs()

function getCities(event){
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")
  const ufValue = event.target.value
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  fetch(url)
  //Convertendo em JSON()
  .then( res =>  res.json())
  .then( cities => {
    for(city of cities){
      //Adicionando novas options
      citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
    }        
    citySelect.disabled = false
  })
}

document.querySelector("select[name=uf]")
        .addEventListener("change", getCities) 