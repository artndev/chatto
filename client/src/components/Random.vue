<template>
    <p>
        {{ fact }}
    </p>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

let fact = ref("Loading...")

onMounted(async () => {
    let headers = new Headers()
    headers.append("Content-Type", "application/json")

    const res = await fetch("https://meowfacts.herokuapp.com", {
        headers: headers,
    })
    const data = await res.json()

    fact.value = data.data[0]
})
</script>

<!-- 
<style scoped>

</style> 
-->