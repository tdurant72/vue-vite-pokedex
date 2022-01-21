import { reactive, computed } from 'vue';

export default function usePokemonStore() {
    const pokemonStore = reactive({
        list: [],
        error: null,
        errorMsg: '',
        loading: false,
        filteredText: '',
        filteredList: computed(() =>
            pokemonStore.list.filter(pokemon =>
                pokemon.name.toLowerCase().includes(pokemonStore.filteredText)
            )
        )
    });

    return {
        pokemonStore
    }
}