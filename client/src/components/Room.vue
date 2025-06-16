<template>
    <div v-if="!error" class="flex flex-col gap-[20px] max-w-[min(100%,_500px)]">
        <!-- <div class="flex flex-col gap-[10px]">
            <div v-for="item in store.messages">
                {{ item.content }}
            </div>
        </div> -->
        <a-form class="flex gap-[10px]" :model="formState" @finish="onFinish">
            <a-form-item class="flex-1" name="message" :rules="formRules.message">
                <a-input v-model:value="formState.message" placeholder="Enter your message..." />
            </a-form-item>

            <a-button class="btn" html-type="submit">
                <template #icon>
                    <Send />
                </template>
            </a-button>
        </a-form>
    </div>
    <div v-else>
        The room cannot be found
    </div>
</template>

<script setup lang="ts">
import { Send } from 'lucide-vue-next';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useSocketStore } from '../store.js';

const store = useSocketStore()
const route = useRoute()
const roomId = route.params.id as string
let error = ref(false)

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

const onFinish = () => store.message(roomId, formState.message)
</script>