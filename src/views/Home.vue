<script setup lang="ts">
import { defineAsyncComponent, onBeforeMount, ref } from "vue";
import { useFetchCountries } from "@/composables/FetchCountries";

const { loading, error, fetchCountries, countries } = useFetchCountries();

onBeforeMount(() => {
  fetchCountries("https://restcountries.com/v3.1/all");
});

// Só builda o CountryCard quando os dados do fetchCountries estiverem prontos
const CountryCard = defineAsyncComponent(
  () => import("../components/CountryCard.vue")
);

const filterByRegion = ref<string>("");
const cardsInView = ref<number>(20);
const filterByName = ref<string>("");

function countriesFiltered() {
  if (filterByRegion.value !== "" || filterByName.value !== "") {
    return countries.value.filter((elem: any) => {
      /* O código abaixo pode parecer errado, mas por mais que esteja checando se inclui as letras,
      não há como formar o nome de um continente com as letras de outro, o que fez reduzir
      o tamanho do código */
      return (
        elem.region
          .toLowerCase()
          .includes(filterByRegion.value.toLowerCase()) &&
        elem.name.common
          .toLowerCase()
          .includes(filterByName.value.toLowerCase())
      );
    });
    //Se apenas o por nome tiver selecionado
  } else {
    return countries.value.filter(
      (_: unknown, id: number) => id <= cardsInView.value
    );
  }
}

function showMore(): void {
  cardsInView.value += 20;
}
</script>

<template>
  <main class="mt-20">
    <div class="flex flex-wrap justify-between">
      <input
        type="text"
        placeholder="Search for a country"
        class="border rounded-md p-4"
        v-model="filterByName"
      />

      <select
        name="region"
        required
        class="p-2 cursor-pointer"
        v-model="filterByRegion"
      >
        <option value="">Filter by regionz</option>
        <option value="africa">Africa</option>
        <option value="asia">Asia</option>
        <option value="oceania">Oceania</option>
        <option value="america">America</option>
        <option value="europe">Europe</option>
      </select>
    </div>
    <section class="space-y-10">
      <div
        v-if="!loading && !error"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 mt-10"
      >
        <CountryCard
          v-for="(country, index) in countriesFiltered()"
          :key="index"
          :country="country"
        />
      </div>
      <p v-else-if="error" class="text-3xl font-bold">
        Error fetching data from API
      </p>
      <p v-else class="text-3xl font-bold">Loading...</p>
      <button
        v-if="!filterByName || !filterByRegion"
        v-once
        @click="showMore"
        class="py-4 px-10 bg-sky-600 text-white font-bold rounded-md"
      >
        See more
      </button>
    </section>
  </main>
</template>
