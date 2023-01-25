<template>
  <RouterLink :to="country.ccn3">
    <figure
      class="grid grid-flow-row grid-rows-2 w-full h-[30rem] rounded-md overflow-hidden cursor-pointer"
    >
      <img
        :src="country.flags.png"
        :alt="country.name"
        class="object-cover w-full h-full"
      />

      <figcaption class="flex flex-col space-y-4 p-6 border-x-2 border-b-2">
        <p class="text-xl font-bold">{{ country.name.common }}</p>
        <div class="font-semibold space-y-1">
          <p>
            Population:
            <span class="font-normal">{{
              country.population.toLocaleString("pt-BR")
            }}</span>
          </p>
          <p>
            Region:
            <span class="font-normal">{{ country.region }}</span>
          </p>
          <p>
            Capital:
            <span v-if="country.capital" class="font-normal">{{
              country.capital[0]
            }}</span>
            <span v-else class="font-normal">No capital registred</span>
          </p>
        </div>
      </figcaption>
    </figure>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
defineProps(["country"]);
</script>

<style scoped></style>
