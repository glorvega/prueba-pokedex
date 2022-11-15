const API_URL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151";
const pokeUrl = "https://pokeapi.co/api/v2/";
let pokeContainer = document.querySelector(".poke-container");

const allMyPokemons = [];

let btnNext = document.querySelector("#next");
let btnPrev = document.querySelector("#prev");

let limit = 8;
let offset = 1;

btnPrev.addEventListener("click", ()=>{
    if (offset != 1) {
        offset -= 9;
        removeChildNodes(pokeContainer);
        fetchPokemons(offset, limit);
      }
})

btnNext.addEventListener("click", () => {
    offset += 9;
    removeChildNodes(pokeContainer);
    fetchPokemons(offset, limit);
  });

async function fetchPokemons(offset, limit) {
    for (let i = offset; i <= offset + limit; i++) {
      fetchPokemon(i);
    }
  }


async function initApp() {
  const pokedex = await getAllPokemons();
  const pokeInfo = await runList(pokedex);
  const completeList = pokeMapeo(pokeInfo);
  //myEventListener();
  drawPokemons(completeList);
  console.log(completeList);
}

function getAllPokemons() {
  return fetch(API_URL)
    .then((res) => res.json())
    .then((data) => data.results)
    .catch((error) => console.log(error));
}

function getPokeInfo(pokemonUrl) {
  return fetch(pokemonUrl)
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

async function runList(list) {
  const pokeList = [];
  for (const pokemon of list) {
    let infoPokemon = await getPokeInfo(pokemon.url);
    pokeList.push(infoPokemon);
  }
  return pokeList;
}

function pokeMapeo(list) {
  const pokeMap = list.map((pokemon) => ({
    nombre: pokemon.species.name,
    id: pokemon.id,
    imagen:
      pokemon.sprites.versions["generation-v"]["black-white"].animated
        .front_default,
    tipo: pokemon.types.map((type) => type.type.name),
  }));
  pokeMap.forEach((pokemon) =>allMyPokemons.push(pokemon));
  return pokeMap;
}

function drawPokemons(pokeList) {
  let pokeContainer = document.querySelector(".poke-container");
  pokeContainer.innerHTML = '';


  for (const pokemon of pokeList) {
    let pokeDiv = document.createElement("div");
    pokeDiv.className = "poke-card";


    let pokeName = document.createElement("h2");
    pokeName.textContent = `${pokemon.nombre}`;

    let pokeImg = document.createElement("img");
    pokeImg.setAttribute("src", `${pokemon.imagen}`);
    pokeImg.setAttribute("alt", `${pokemon.nombre}`);

    let imgDiv = document.createElement("div");
    imgDiv.className = "card-image";
    imgDiv.appendChild(pokeImg);

    
    let pokeTipo = document.createElement("p");
    pokeTipo.innerText = `${pokemon.tipo}`;
    pokeTipo.setAttribute('id', 'popup')

    pokeDiv.appendChild(pokeName);
    pokeDiv.appendChild(imgDiv);

    let tipoDiv = document.createElement('div');
    tipoDiv.className = "poke-type";

    for (const tipo of pokemon.tipo) {
      let pokeTipo = document.createElement("p");
      pokeTipo.innerText = tipo;
      tipoDiv.appendChild(pokeTipo);
    }
    pokeDiv.appendChild(tipoDiv);
    pokeContainer.appendChild(pokeDiv);
  }
}

function createPopUp(
    height = "200px",
    width = "200px",
  ) {
    const popup = document.createElement("div");
    popup.style.height = height;
    popup.style.width = width;
    popup.innerText = `${pokemon.tipo}`
    return popup;
  }

async function myEventListener(){
    document.querySelector("poke-card").addEventListener('click', function (event) {
        createPopUp();
        console.log(event.target);
    });
};



initApp();