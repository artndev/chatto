<template>
    <h1>
        Welcome to the meow's gallery! 😸
    </h1>
</template>

<script setup lang="ts">
import { useSocketStore } from '../store.js';
const store = useSocketStore()

store.addMessage("blablabla")

</script>