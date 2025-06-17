<template>
    <div class="flex flex-col gap-[20px] max-w-[min(100%,_500px)]">
        <div v-if="!currentRoom" class="flex flex-col gap-[15px]">
            <h3>
                Enter chatto!
            </h3>
            <a-form class="flex flex-col gap-[10px]" :model="usernameFormState" @finish="usernameForm.onFinish">
                <a-form-item name="username" :rules="usernameForm.rules.username">
                    <a-input v-model:value="usernameFormState.username" placeholder="Enter your username..." />
                </a-form-item>

                <a-button class="btn" html-type="submit">
                    <template #icon>
                        <DoorOpen />
                    </template>
                </a-button>
            </a-form>
        </div>
        <div v-else class="flex flex-col gap-[20px]">
            <div class="flex flex-col gap-[10px]">
                <div v-for="room in rooms">
                    <span v-if="room === currentRoom" class="text-[#4096ff]">
                        {{ room }}
                    </span>
                    <button v-else v-on:click='() => socket.emit("room:switch", room)'>
                        {{ room }}
                    </button>
                </div>
            </div>
            <div class="flex gap-[10px]">
                <div v-for="username in usernames">
                    {{ username }}
                </div>
            </div>
            <a-form class="flex gap-[10px]" :model="messageFormState" @finish="messageForm.onFinish">
                <a-form-item class="flex-1" name="message" :rules="messageForm.rules.message">
                    <a-input v-model:value="messageFormState.message" placeholder="Enter your message..." />
                </a-form-item>

                <a-button class="btn" html-type="submit">
                    <template #icon>
                        <Send />
                    </template>
                </a-button>
            </a-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { DoorOpen, Send } from 'lucide-vue-next';
import { reactive, ref } from 'vue';
import { useSocketStore } from '../store.js';

let usernameFormState = reactive({
    username: ""
})
const usernameForm = {
    rules: {
        username: [{
            required: true,
            message: 'Message cannot be empty',
            trigger: 'blur'
        }]
    },
    onFinish: () => {
        socket.emit("user:join", usernameFormState.username)
    }
}

let messageFormState = reactive({
    message: ""
})
const messageForm = {
    rules: {
        message: [{
            required: true,
            message: 'Message cannot be empty',
            trigger: 'blur'
        }]
    },
    onFinish: () => {

    }
}

const { socket } = useSocketStore()

let rooms = ref([] as string[])
let currentRoom = ref(null as string | null)
socket.on("room:update_rooms", (_rooms, _currentRoom) => {
    rooms.value = _rooms
    currentRoom.value = _currentRoom
})

let usernames = ref([] as string[])
socket.on("room:update_usernames", (_usernames) => {
    usernames.value = Object.keys(_usernames)
})

</script>