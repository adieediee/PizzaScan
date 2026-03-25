import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWebsocketStore = defineStore('websocketStore', () => {

    const socket = ref(null)
    const isConnected = ref(false)

    const callbacks = ref([])

    const connect = (url) => {
        socket.value = new WebSocket(url)

        socket.value.onopen = (ev) => {
            console.log('connection opened')
            isConnected.value = true
        }

        socket.value.onmessage = (ev) => {
            console.log(`Recieved message: ${ev}`)
            const parsed = JSON.parse(JSON.parse(ev.data.toString()))
            console.log(parsed)

            callbacks.value.forEach(element => {
                element(parsed)
            });
        }

        socket.value.onclose = () => {
            console.log('Disconnected')
            isConnected.value = false
        }
        socket.value.onerror = () => {
            console.error('Error with websocket')
            isConnected.value = false
        }
    }

    const send = (msg) => {
        socket.value.send(JSON.stringify(msg))
    }


    return {
        socket,
        isConnected,
        callbacks,
        connect,
        send
    }
})