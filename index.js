const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const container = document.querySelector('.pokemon');
const erroMessage = document.querySelector('.error');

let pokeName;
let pokemon;
let card;

async function requestPokeInfo(url, name) {
  try {
    const response = await fetch(url + name);
    if (!response.ok) {
        throw new Error('Pokémon não encontrado na API');
    }
    const data = await response.json();
    pokemon = data;
  } catch (err) {
    console.log("Erro na requisição:", err);
    pokemon = { detail: "Not found" }; 
  }
}

function createCard() {
  card = `
    <div class="pokemon-picture">
      <img src="${pokemon.sprites.front_default}" alt="Sprite de ${pokemon.name}">
    </div>
    <div class="pokemon-info">
        <h1 class="name">Nome: ${pokemon.name}</h1>
        <h2 class="number">Nº ${pokemon.id}</h2>
        <h3 class="type">Tipo: ${pokemon.types.map(item => ' ' + item.type.name).toString()}</h3>
        <h3 class="skill">Habilidades: ${pokemon.moves.slice(0, 4).map(item => ' ' + item.move.name).toString()}</h3>
        <h3 class="weight">Peso: ${pokemon.weight / 10}kg</h3>
        <h3 class="height">Altura: ${pokemon.height / 10}m</h3>
    </div>`;
  return card;
}

async function startApp(pokeName) {
  await requestPokeInfo(baseUrl, pokeName);

  if (pokemon.detail || !pokemon) {
    erroMessage.style.display = 'block';
    container.style.display = 'none';

  } else {
    erroMessage.style.display = 'none';
    container.style.display = 'flex';
    container.innerHTML = createCard();
  }
}

searchButton.addEventListener('click', async (event) => {
  event.preventDefault();
  
  if(!searchInput.value) return;

  pokeName = searchInput.value.toLowerCase().trim();

  await startApp(pokeName);
});