import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { nome, email, senha } = await req.json()

  const usuarioExistente = await prisma.user.findUnique({ where: { email } })
  if (usuarioExistente) {
    return NextResponse.json({ error: 'Email já cadastrado' }, { status: 400 })
  }

  const senhaHash = await bcrypt.hash(senha, 10)

  const novoUsuario = await prisma.user.create({
    data: { nome, email, senhaHash },
  })

  return NextResponse.json({ success: true, user: novoUsuario })
}
