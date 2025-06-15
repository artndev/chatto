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
import { io } from 'socket.io-client';
import { RouterLink, RouterView } from 'vue-router';
import './styles/app.css';

io()
</script>
