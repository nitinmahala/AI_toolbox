"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Bookmark, Share2 } from "lucide-react"
import Image from "next/image"
import { useToolModal } from "@/hooks/use-tool-modal"

export default function ToolModal() {
  const { isOpen, closeModal, selectedTool } = useToolModal()

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal()
    }

    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleEsc)
    }

    return () => {
      document.body.style.overflow = "auto"
      window.removeEventListener("keydown", handleEsc)
    }
  }, [isOpen, closeModal])

  if (!selectedTool) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={closeModal}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-auto rounded-2xl glassmorphism shadow-xl"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-background/50 hover:bg-background transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-video">
              <Image
                src={selectedTool.image || "/placeholder.svg?height=300&width=600"}
                alt={selectedTool.name}
                fill
                className="object-cover rounded-t-2xl"
              />
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{selectedTool.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{selectedTool.category}</span>
                    {selectedTool.pricing && (
                      <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
                        {selectedTool.pricing}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Bookmark">
                    <Bookmark className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Share">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">{selectedTool.description}</p>

              <div className="grid gap-4 mb-6">
                <h3 className="font-semibold">Key Features</h3>
                <ul className="grid gap-2 pl-5 list-disc text-muted-foreground">
                  {selectedTool.features?.map((feature, index) => <li key={index}>{feature}</li>) || (
                    <>
                      <li>Advanced AI algorithms for optimal results</li>
                      <li>User-friendly interface with intuitive controls</li>
                      <li>Seamless integration with popular platforms</li>
                      <li>Regular updates with new features and improvements</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={selectedTool.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  Visit Tool
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button className="flex-1 py-3 px-4 border border-border rounded-lg hover:bg-muted transition-colors">
                  Save for Later
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

