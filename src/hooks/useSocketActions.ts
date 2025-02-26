import { useSocketStore } from "../stores/useSocketStore";

export const useSocketActions = () => {
  const { isConnected, sendMessage } = useSocketStore()

  return { isConnected, sendMessage }
}
