// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Trash, Edit, CheckCircle, Clock, Circle } from 'lucide-react';
import NovaTarefaModal from '../components/NovaTarefaModal';

// Card de resumo reutilizável
function CardResumo({ titulo, valor, Icon }: { titulo: string, valor: number, Icon?: React.ComponentType<{ size?: number }> }) {
  return (
    <div className="bg-gray-800 p-6 rounded flex flex-col gap-2 min-h-[110px] justify-between shadow-md border border-gray-700">
      <div className="flex items-center justify-between w-full">
        <span className="text-base text-gray-300 font-medium">{titulo}</span>
        {Icon && <Icon size={28} />}
      </div>
      <span className="text-3xl font-bold text-blue-200 mt-2">{valor}</span>
    </div>
  );
}

export function Dashboard() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("userEmail") || "Usuário não identificado";
    setUserEmail(email);
  }, []);

  const tasks = [
    {
      id: 1,
      title: 'Implementar sistema de login',
      description: 'Criar tela de autenticação com validação de usuário',
      priority: 'Alta',
      status: 'Concluida',
      date: '19/01/2024',
    },
    {
      id: 2,
      title: 'Desenvolver dashboard principal',
      description: 'Criar interface principal com listagem de tarefas',
      priority: 'Alta',
      status: 'Em_Andamento',
      date: '24/01/2024',
    },
    {
      id: 3,
      title: 'Adicionar filtros de busca',
      description: 'Implementar filtros por status, prioridade e data',
      priority: 'Alta',
      status: 'Pendente',
      date: '',
    },
  ];

  const total = tasks.length;
  const pendentes = tasks.filter(t => t.status === 'Pendente').length;
  const emProgresso = tasks.filter(t => t.status === 'Em_Andamento').length;
  const concluidas = tasks.filter(t => t.status === 'Concluida').length;

  return (
    <div className="min-h-screen bg-[#192132] text-white p-4 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard de Tarefas</h1>
        <div className="flex items-center gap-2 md:gap-4">
          <span className="text-base flex items-center gap-1">
            <span className="hidden md:inline">👤</span> {userEmail}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <CardResumo titulo="Total de Tarefas" valor={total} Icon={CheckCircle} />
        <CardResumo titulo="Pendentes" valor={pendentes} Icon={Clock} />
        <CardResumo titulo="Em Progresso" valor={emProgresso} Icon={Circle} />
        <CardResumo titulo="Concluídas" valor={concluidas} Icon={CheckCircle} />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar tarefas..."
          className="flex-1 bg-[#232c43] p-3 rounded text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="bg-[#232c43] p-3 rounded border border-gray-700 text-white">
          <option>Todos os Status</option>
        </select>
        <select className="bg-[#232c43] p-3 rounded border border-gray-700 text-white">
          <option>Todas Prioridades</option>
        </select>
        <button
          onClick={() => setMostrarModal(true)}
          className="bg-blue-600 p-3 rounded text-white font-semibold hover:bg-blue-700 transition flex items-center gap-2"
        >
          <span className="text-xl">+</span> Nova Tarefa
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-[#232c43] p-6 rounded flex flex-col md:flex-row md:items-center md:justify-between shadow border border-gray-700"
          >
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex items-center gap-2 mb-1">
                {task.status === 'Concluida' ? (
                  <CheckCircle size={22} className="text-green-400" />
                ) : task.status === 'Em_Andamento' ? (
                  <Circle size={22} className="text-blue-400" />
                ) : (
                  <Circle size={22} className="text-gray-400" />
                )}
                <h2 className={`text-lg font-semibold ${
                  task.status === 'Concluida'
                    ? 'line-through text-green-300'
                    : task.status === 'Em_Andamento'
                    ? 'text-blue-200'
                    : 'text-white'
                }`}>
                  {task.title}
                </h2>
              </div>
              <p className="text-gray-400 text-base mb-1">{task.description}</p>
              <div className="flex items-center gap-2 mt-1 text-sm">
                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">{task.priority}</span>
                {task.status === 'Concluida' && (
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">Concluída</span>
                )}
                {task.status === 'Em_Andamento' && (
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Em Progresso</span>
                )}
                {task.status === 'Pendente' && (
                  <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs">Pendente</span>
                )}
                {/* Exibe status amigável caso venha do backend */}
                {/* Se quiser garantir, pode criar uma função para traduzir: */}
                {/*
                <span>
                  {(() => {
                    switch (task.status) {
                      case 'Concluida': return 'Concluída';
                      case 'Em_Andamento': return 'Em Progresso';
                      case 'Pendente': return 'Pendente';
                      default: return task.status;
                    }
                  })()}
                </span>
                */}
                {task.date && (
                  <span className="text-gray-400 flex items-center gap-1">
                    📅 {task.date}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button
                className="bg-white text-gray-800 p-2 rounded hover:bg-gray-200 border border-gray-300 transition"
                title="Editar"
              >
                <Edit size={18} />
              </button>
              <button
                className="bg-red-600 text-white p-2 rounded hover:bg-red-700 border border-red-700 transition"
                title="Excluir"
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de criação de tarefa */}
      <NovaTarefaModal isOpen={mostrarModal} onClose={() => setMostrarModal(false)} />
    </div>
  );
}