<template>
  <nav>
    <RouterLink to="/">
      Home
    </RouterLink>
    <RouterLink to="/random">
      Random
    </RouterLink>
  </nav>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>
