<template>
    <div class="flex flex-column gap-[10px] max-w-[min(100%,_500px)]">
        <a-input @update:value="onChange" placeholder="Enter your message..." />
        <a-button class="btn" :icon="h(Send)" v-on:click="sendMessage" />
    </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue';
import { Send } from 'lucide-vue-next';

import { useSocketStore } from '../store.js';
const store = useSocketStore()

let message = ref("")
const sendMessage = () => store.addMessage(message.value)

const onChange = (val: string) => message.value = val
</script>