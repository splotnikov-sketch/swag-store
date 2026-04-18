// src/app/products/[slug]/_components/quantity-selector.tsx

'use client'

import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

export default function QuantitySelector({
  stock,
  quantity,
  onChange,
}: {
  stock: number
  quantity: number
  onChange: (q: number) => void
}){
    return (
        <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
                <Minus />
            </Button>
            <span>1</span>
            <Button variant="outline" size="sm">
                <Plus />
            </Button>
        </div>
    )

}