<template>
  <div v-if="countries">
    <RouterLink
      to="/"
      class="flex items-center gap-5 py-3 px-8 border-2 shadow-md rounded-md w-fit mb-14"
    >
      <ArrowLeftIcon class="w-7 h-7" />BACK
    </RouterLink>
    <figure
      class="grid grid-rows-2 lg:grid-rows-1 grid-cols-1 lg:grid-cols-2 md:h-96 gap-20"
    >
      <div class="flex h-full w-full overflow-hidden">
        <img
          :src="countries[0].flags.png"
          :alt="`${countries[0].name.common} flag`"
          class="h-full w-full object-contain"
        />
      </div>
      <figcaption class="flex flex-col justify-center">
        <p class="text-2xl font-bold mb-10">{{ countries[0].name.common }}</p>
        <div
          class="grid grid-flow-col grid-cols-2 font-semibold content-center"
        >
          <div class="space-y-4">
            <p>
              Oficial name:
              <span class="font-normal">{{ countries[0].name.official }}</span>
            </p>
            <p>
              Population:
              <span class="font-normal">{{
                countries[0].population.toLocaleString("pt-BR")
              }}</span>
            </p>
            <p>
              Region:
              <span class="font-normal">{{ countries[0].region }}</span>
            </p>
            <p>
              Subregion:
              <span v-if="countries[0].subregion" class="font-normal">{{
                countries[0].subregion
              }}</span>
              <span v-else class="font-normal">Don't have</span>
            </p>
            <p>
              Capital:
              <span v-if="countries[0].capital" class="font-normal">{{
                countries[0].capital[0]
              }}</span>
              <span v-else class="font-normal">Don't have</span>
            </p>
          </div>
          <div class="space-y-4">
            <p>
              Subregion:
              <span v-if="countries[0].subregion" class="font-normal">{{
                countries[0].subregion
              }}</span>
              <span v-else class="font-normal">Don't have</span>
            </p>
            <p>
              Languages:
              <span
                v-for="(lang, key, index) in countries[0].languages"
                :key="key"
                class="font-normal"
                >{{ lang
                }}<span
                  v-if="
                    index !== undefined &&
                    index + 1 < Object.keys(countries[0].languages).length
                  "
                  >,
                </span>
              </span>
            </p>
            <p>
              Currencies:
              <span
                v-for="(curr, key, index) in countries[0].currencies"
                :key="key"
                class="font-normal"
                >{{ curr.name
                }}<span
                  v-if="
                    index !== undefined &&
                    index + 1 < Object.keys(countries[0].currencies).length
                  "
                  >,
                </span>
              </span>
            </p>
          </div>
        </div>
      </figcaption>
    </figure>
  </div>
</template>

<script setup lang="ts">
import { useFetchCountries } from "@/composables/FetchCountries";
import { useRoute } from "vue-router";
import { onBeforeMount } from "vue";
import ArrowLeftIcon from "@heroicons/vue/24/solid/ArrowLeftIcon";

const route = useRoute();
const country = route.params.country.toString();

const { fetchCountries, countries } = useFetchCountries();
onBeforeMount(() => {
  fetchCountries(`https://restcountries.com/v3.1/alpha/${country}`);
});
</script>

<style scoped></style>
