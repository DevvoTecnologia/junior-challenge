import { Link } from "react-router-dom"
import { Edit, Trash2 } from "lucide-react"

import { Ring } from "../../../types"
import { getForgerNameById } from "../../../utils"
import { useState } from "react"

type RingCardProps = {
  ring: Ring
  handleDelete: (ringId: string) => void
}

export function RingCard({ ring, handleDelete }: RingCardProps) {
  const [forgerName, setForgerName] = useState<string>("")

  async function getForgerName() {
    const name = await getForgerNameById({ forgerId: ring.forgerId }) || ""

    setForgerName(name)
  }

  getForgerName()

  return (
    <div className="bg-white rounded shadow-md p-6 max-w-sm mx-auto">
      <img src="/ring.jpg" alt={ring.name} className="w-full h-32 object-cover mb-4 rounded" />

      <h2 className="text-xl font-bold mb-4">{ring.name}</h2>

      <div>
        <p>
          <strong className="semibold">Poder:</strong> {ring.power}
        </p>
        <p>
          <strong className="semibold">Portador:</strong> {ring.proprietor}
        </p>
        <p>
          <strong className="semibold">Forjado por:</strong> {forgerName}
        </p>
      </div>

      <div className="flex space-x-2 mt-4">
        <Link   
          to={`/update/${ring.ringId}`} 
          className="flex items-center justify-between px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          <Edit className="inline-block mr-2 h-4 w-4" /> Editar
        </Link>

        <button
          onClick={() => handleDelete(ring.ringId)}
          className="flex items-center justify-between px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          <Trash2 className="inline-block mr-2 h-4 w-4" /> Deletar
        </button>
      </div>
    </div>
  )
}