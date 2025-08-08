'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post('/api/auth/register', { nome, email, senha })
      router.push('/login')
    } catch (err) {
      alert('Erro ao registrar')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Criar Conta</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} className="p-2 border" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border" required />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} className="p-2 border" required />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">Registrar</button>
      </form>
    </div>
  )
}
    