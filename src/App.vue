<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./layouts/Header.vue";
</script>

<template>
  <main class="mx-10 md:mx-24 my-10">
    <Header />
    <RouterView />
  </main>
</template>

<style scoped></style>
