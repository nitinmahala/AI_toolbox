"use client"

import { create } from "zustand"
import type { Tool } from "@/types/tool"

interface ToolModalStore {
  isOpen: boolean
  selectedTool: Tool | null
  openModal: (tool: Tool) => void
  closeModal: () => void
}

export const useToolModal = create<ToolModalStore>((set) => ({
  isOpen: false,
  selectedTool: null,
  openModal: (tool) => set({ isOpen: true, selectedTool: tool }),
  closeModal: () => set({ isOpen: false }),
}))

