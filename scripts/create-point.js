//Adicionando cidades e estados as options
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

  //Resolvendo o erro das cidades aumentarem cada vez que tracava o estado
  citySelect.innerHTML = "<option value>Selecione a cidade</option>"
  citySelect.disabled = true

  fetch(url)
  //Convertendo em JSON()
  .then( res =>  res.json())
  .then( cities => {
    for(city of cities){      
      //Adicionando novas options
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }        
    citySelect.disabled = false
  })
}

document.querySelector("select[name=uf]")
        .addEventListener("change", getCities) 


// Itens de coleta selecionados
const itensToCollect = document.querySelectorAll(".itens-grid li")

//Percorrendo os items da class itens-grid
for(item of itensToCollect){

  item.addEventListener("click", handleSelectedItem)

}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){

  const itemLi = event.target
  
  //Adicionar ou remover uma classe com JS
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id

  const alreadySelected = selectedItems.findIndex( item => item == itemId)

  if(alreadySelected >= 0){
    //Remover seleção
    const filteredItems = selectedItems.filter(item => item != itemId)

    selectedItems = filteredItems
  }  
  else{
    //Adicionar elemento
    selectedItems.push(itemId)
  }

  //Atualizar campo escondido com os itens selecionados
  collectedItems.value = selectedItems
}
