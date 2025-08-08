import { PrismaClient } from '@prisma/client'
import Image from 'next/image'

const prisma = new PrismaClient()

export default async function Home() {
  const produtos = await prisma.produto.findMany({
    include: { categoria: true },
    orderBy: { criadoEm: 'desc' },
  })

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Titulo</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produtos.map((produto, index) => (
          <div
            key={produto.id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <div className="relative w-full h-48 mb-4">
              <Image
                src={`/imagens/placa${index + 1}.png`}
                alt={produto.nome}
                width={400}
                height={300}
                className="rounded object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold">{produto.nome}</h2>
            <p className="text-sm text-gray-500">{produto.descricao}</p>
            <p className="mt-2 font-bold text-green-700">
              R$ {produto.preco.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
