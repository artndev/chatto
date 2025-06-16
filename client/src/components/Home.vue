<template>
    <a-form class="flex gap-[10px] max-w-[min(100%,_500px)]" :model="formState" @finish="onFinish">
        <a-form-item class="flex-1" name="message" :rules="formRules.message">
            <a-input v-model:value="formState.message" placeholder="Enter your message..." />
        </a-form-item>

        <a-button class="btn" html-type="submit">
            <template #icon>
                <Send />
            </template>
        </a-button>
    </a-form>
</template>

<script setup lang="ts">
import { Send } from 'lucide-vue-next';
import { reactive } from 'vue';

import { useSocketStore } from '../store.js';
const store = useSocketStore()

const formRules = {
    message: [{
        required: true,
        message: 'Message cannot be empty',
        trigger: 'blur'
    }]
}
let formState = reactive({
    message: ""
})

const onFinish = () => {
    store.sendMessage(formState.message)
}
</script>