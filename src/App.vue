<template>
  <div v-if="pokemonStore.loading"><h1>Loading...</h1></div>
  <h1>Pokedex</h1>
  <p>Filter pokemon {{pokemonStore.filteredText}}</p>
  <input type="text" v-model="pokemonStore.filteredText">
  <ul>
    <PokedexCard 
      v-for="pokemon in paginationStore.paginatedList" 
      :key="pokemon.id"
      :number="pokemon.id"
      :name="pokemon.name"
      />
  </ul>
  <div class="pagination">
    <button  @click="paginationStore.prevPage">Previous Page</button>
  <h4> {{paginationStore.page}}/{{paginationStore.totalPages}} </h4>
  <button  @click="paginationStore.nextPage">Next Page</button>
  </div>
    

</template>

<script setup>
import { onMounted, reactive, computed } from 'vue';
import { useFetch } from '@vueuse/core';
import usePokemonStore from './composables/usePokemonStore';
import usePaginationStore from './composables/usePaginationStore';

import PokedexCard from './components/PokedexCard.vue';

const pokeAPI = 'https://pokeapi.co/api/v2/pokedex/2/';

const { pokemonStore } = usePokemonStore();
const { paginationStore } = usePaginationStore(pokemonStore);
onMounted(async () => {
	try {
		console.log('trying');
		pokemonStore.loading = true;
		const { isFetching, error, data } = await useFetch(pokeAPI)
			.get()
			.json();
		const fetchedData = await data.value.pokemon_entries;
		console.log('data', fetchedData);
		pokemonStore.loading = isFetching;
		const pokeData = (await fetchedData)
			? fetchedData.map(pokemon => {
					const pokemonName =
						pokemon.pokemon_species.name[0].toUpperCase() +
						pokemon.pokemon_species.name.substring(1);
					return {
						id: pokemon.entry_number,
						name: pokemonName
					};
			  })
			: [];
		pokemonStore.list = pokeData;
		return;
	} catch (err) {
		console.log(err);
		pokemonStore.loading = isFetching;
		pokemonStore.error = error;
		pokemonStore.errorMsg = error.message;
	}
});
</script>



<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
.pagination {
	display: flex;
	align-items: center;
	justify-content: center;
	column-gap: 1rem;
}
</style>
