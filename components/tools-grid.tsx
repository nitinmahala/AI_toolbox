"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bookmark, ExternalLink, Star } from "lucide-react"
import Image from "next/image"
import type { Tool } from "@/types/tool"
import { useToolModal } from "@/hooks/use-tool-modal"

interface ToolsGridProps {
  tools: Tool[]
  featured?: boolean
}

export default function ToolsGrid({ tools, featured = false }: ToolsGridProps) {
  const { openModal } = useToolModal()
  const [bookmarkedTools, setBookmarkedTools] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bookmarkedTools")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const toggleBookmark = (e: React.MouseEvent, toolId: string) => {
    e.stopPropagation()

    const newBookmarkedTools = bookmarkedTools.includes(toolId)
      ? bookmarkedTools.filter((id) => id !== toolId)
      : [...bookmarkedTools, toolId]

    setBookmarkedTools(newBookmarkedTools)

    if (typeof window !== "undefined") {
      localStorage.setItem("bookmarkedTools", JSON.stringify(newBookmarkedTools))
    }
  }

  const displayTools = featured ? tools.filter((tool) => tool.featured).slice(0, 6) : tools

  return (
    <>
      {featured && (
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Featured AI Tools</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of the most innovative AI tools that are changing the game.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayTools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="tool-card cursor-pointer"
            onClick={() => openModal(tool)}
          >
            <div className="relative aspect-video">
              <Image
                src={tool.image || "/placeholder.svg?height=200&width=400"}
                alt={tool.name}
                fill
                className="object-cover rounded-t-xl"
              />
              {(tool.new || tool.trending) && (
                <div className="absolute top-3 left-3 flex gap-2">
                  {tool.new && (
                    <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">New</span>
                  )}
                  {tool.trending && (
                    <span className="px-2 py-1 bg-primary text-white text-xs font-medium rounded-full flex items-center gap-1">
                      <Star className="h-3 w-3 fill-white" /> Trending
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg">{tool.name}</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {tool.category}
                  </span>
                </div>
                <button
                  onClick={(e) => toggleBookmark(e, tool.id)}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  aria-label={bookmarkedTools.includes(tool.id) ? "Remove bookmark" : "Add bookmark"}
                >
                  <Bookmark
                    className={`h-4 w-4 ${bookmarkedTools.includes(tool.id) ? "fill-primary text-primary" : ""}`}
                  />
                </button>
              </div>

              <p className="mt-3 text-muted-foreground text-sm line-clamp-2">{tool.description}</p>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-background"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">+2.5k users</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(tool.url || "#", "_blank")
                  }}
                  className="p-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  aria-label="Visit website"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="tool-card-overlay">
              <button
                className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  openModal(tool)
                }}
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {featured && (
        <div className="mt-10 text-center">
          <a
            href="/categories"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            Explore All Tools
          </a>
        </div>
      )}
    </>
  )
}

