"use client"

import { useState } from "react"
import { tools } from "@/data/tools"
import ToolsGrid from "@/components/tools-grid"
import { motion } from "framer-motion"

const categories = [...new Set(tools.map((tool) => tool.category))]

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredTools = selectedCategory ? tools.filter((tool) => tool.category === selectedCategory) : tools

  return (
    <main className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          Browse AI Tools by Category
        </h1>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              selectedCategory === null
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "bg-background border border-border hover:border-primary/50"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-background border border-border hover:border-primary/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <ToolsGrid tools={filteredTools} />
        </motion.div>
      </div>
    </main>
  )
}

