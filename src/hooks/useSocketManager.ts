import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocketStore } from "../stores/useSocketStore";

export const useSocketManager = () => {
  const queryClient = useQueryClient()
  const { connect, disconnect } = useSocketStore()

  useEffect(() => {
    connect(queryClient)

    return () => disconnect()
  }, [connect, disconnect, queryClient])
}
