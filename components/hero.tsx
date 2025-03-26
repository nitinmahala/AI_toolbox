"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { tools } from "@/data/tools"
import Link from "next/link"

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<typeof tools>([])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (searchTerm.length > 1) {
      const results = tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setSearchResults(results)
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }, [searchTerm])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
          >
            Explore AI Like Never Before
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            The Ultimate AI Toolbox – Discover, compare, and use the best AI tools for your next project.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search AI tools..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full py-4 px-6 pr-12 rounded-full glassmorphism border-2 border-border focus:border-primary transition-all outline-none"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute mt-2 w-full rounded-xl glassmorphism shadow-lg z-20 max-h-80 overflow-auto"
              >
                {searchResults.length > 0 ? (
                  <ul className="py-2">
                    {searchResults.map((tool) => (
                      <li key={tool.id} className="px-4 py-2 hover:bg-muted/50 transition-colors">
                        <Link
                          href="#"
                          className="flex items-start gap-3"
                          onClick={(e) => {
                            e.preventDefault()
                            // In a real app, this would open the tool modal
                            setShowResults(false)
                            setSearchTerm("")
                          }}
                        >
                          <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="text-primary font-semibold">{tool.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="font-medium">{tool.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">{tool.description}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-muted-foreground">No tools found matching "{searchTerm}"</div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

