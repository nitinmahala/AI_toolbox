import Hero from "@/components/hero"
import ToolsGrid from "@/components/tools-grid"
import { tools } from "@/data/tools"

export default function Home() {
  return (
    <main className="min-h-screen pt-20">
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <ToolsGrid tools={tools} featured={true} />
      </div>
    </main>
  )
}

