import { tools } from "@/data/data"
import ToolsGrid from "@/components/tools-grid"

export default function TrendingPage() {
  // Filter trending tools
  const trendingTools = tools.filter((tool) => tool.trending)

  return (
    <main className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          Trending AI Tools
        </h1>

        <div className="max-w-3xl mx-auto mb-8 text-center text-muted-foreground">
          <p>Discover the most popular AI tools that are making waves in the industry right now.</p>
        </div>

        <ToolsGrid tools={trendingTools} />
      </div>
    </main>
  )
}

