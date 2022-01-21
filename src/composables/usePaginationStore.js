import { reactive, computed } from 'vue';

export default function usePaginationStore(pokemonStore) {
    const paginationStore = reactive({
        page: 1,
        limit: 10,
        start: 0,
        end: computed(() => paginationStore.start + 10),
        paginatedList: computed(() =>
            pokemonStore.filteredList.slice(
                (paginationStore.page - 1) * paginationStore.limit,
                paginationStore.page * paginationStore.limit
            )
        ),
        totalPages: computed(() =>
            Math.ceil(pokemonStore.filteredList.length / paginationStore.limit)
        ),
        nextPage: function () {
            if (
                paginationStore.page !==
                Math.ceil(pokemonStore.filteredList.length / paginationStore.limit)
            ) {
                paginationStore.page += 1;
            }
        },
        prevPage: function () {
            if (paginationStore.page !== 1) {
                paginationStore.page -= 1;
            }
        }
    });
    return { paginationStore }
}
