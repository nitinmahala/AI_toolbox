export interface Tool {
  id: string
  name: string
  description: string
  category: string
  image?: string
  url?: string
  pricing?: string
  features?: string[]
  new?: boolean
  trending?: boolean
  featured?: boolean
}

