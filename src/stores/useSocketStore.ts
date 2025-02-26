import { create } from 'zustand'
import { QueryClient } from '@tanstack/react-query';

import { createSocketConnection } from '../api/socket'

type sendMessageType = "ADD_TODO" | "DELETE_TODO" | "DELETE_COMPLETED_TODOS" | "UPDATE_TODO"

interface Socket {
	socket: WebSocket | null;
	isConnected: boolean
	connect: (queryClient: QueryClient) => void
	disconnect: () => void
	sendMessage: (type: sendMessageType, payload: any) => void
}

export const useSocketStore = create<Socket>((set, get) => ({
	socket: null,
	isConnected: false,
	connect: (queryClient) => {
		if (get().socket) {
			get().socket?.close()
		}

		const webSocket = createSocketConnection()

		webSocket.onopen = () => {
			console.log("WebSocket connected.")
			set({ isConnected: true })
		}

		webSocket.onmessage = (event) => {
			const parsedEventData: { type: sendMessageType } = JSON.parse(event.data)

			switch (parsedEventData.type) {
				case 'ADD_TODO':
				case 'UPDATE_TODO':
				case 'DELETE_COMPLETED_TODOS':
				case 'DELETE_TODO':
					queryClient.invalidateQueries({ queryKey: ['todos'] })
					break
				default:
					console.log("Unkown event type:", parsedEventData.type)
			}
		}

		webSocket.onerror = (error) => {
			console.error("WebSocket error:", error)
		}

		webSocket.onclose = () => {
			console.log("WebSocket disconnected.")
			set({ isConnected: false })
		}

		set({ socket: webSocket })
	},
	disconnect: () => {
		get().socket?.close()
		set({ socket: null, isConnected: false })
	},
	sendMessage: (type: sendMessageType, payload: any) => {
		const { socket, isConnected } = get()

		if (socket && isConnected) {
			socket.send(JSON.stringify({ type, payload }))
		} else {
			console.error("No socket connected.")
		}
	}
}))
