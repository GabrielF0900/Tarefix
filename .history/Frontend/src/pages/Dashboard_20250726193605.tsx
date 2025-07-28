import { useState } from 'react';
import { CheckCircle, Clock, Circle, LogOut, Trash, Edit } from 'lucide-react';

const tasks = [
  {
    id: 1,
    title: 'Implementar sistema de login',
    description: 'Criar tela de autenticação com validação de usuário',
    priority: 'Alta',
    status: 'Concluída',
    date: '19/01/2024',
  },
  {
    id: 2,
    title: 'Desenvolver dashboard principal',
    description: 'Criar interface principal com listagem de tarefas',
    priority: 'Alta',
    status: 'Em Progresso',
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

export default function Dashboard() {
  const [search, setSearch] = useState('');

  // Contagens dinâmicas
  const total = tasks.length;
  const pendentes = tasks.filter(t => t.status === 'Pendente').length;
  const emProgresso = tasks.filter(t => t.status === 'Em Progresso').length;
  const concluidas = tasks.filter(t => t.status === 'Concluída').length;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard de Tarefas</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">Gabrielcfonline0900@gmail.com</span>
          <button className="p-2 bg-gray-700 rounded hover:bg-red-600 transition">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Cards resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <CardResumo titulo="Total de Tarefas" valor={total} />
        <CardResumo titulo="Pendentes" valor={pendentes} Icon={Clock} />
        <CardResumo titulo="Em Progresso" valor={emProgresso} Icon={Circle} />
        <CardResumo titulo="Concluídas" valor={concluidas} Icon={CheckCircle} />
      </div>

      {/* Barra de busca e filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar tarefas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-gray-800 p-2 rounded text-white placeholder-gray-400"
        />
        <select className="bg-gray-800 p-2 rounded">
          <option>Todos os Status</option>
        </select>
        <select className="bg-gray-800 p-2 rounded">
          <option>Todas Prioridades</option>
        </select>
        <button className="bg-blue-600 p-2 rounded hover:bg-blue-700 transition">+ Nova Tarefa</button>
      </div>

      {/* Lista de Tarefas */}
      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-gray-800 p-4 rounded flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h2 className={`text-lg font-semibold ${task.status === 'Concluída' ? 'line-through text-gray-400' : ''}`}>
                {task.title}
              </h2>
              <p className="text-gray-400 text-sm">{task.description}</p>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <span className="bg-red-600 text-white px-2 py-1 rounded">{task.priority}</span>
                <span
                  className={`px-2 py-1 rounded ${
                    task.status === 'Concluída'
                      ? 'bg-green-600'
                      : task.status === 'Em Progresso'
                      ? 'bg-blue-600'
                      : 'bg-yellow-500 text-black'
                  }`}
                >
                  {task.status}
                </span>
                {task.date && <span className="text-gray-400">📅 {task.date}</span>}
              </div>
            </div>

            <div className="flex gap-2 mt-2 md:mt-0">
              <button className="bg-white text-black p-2 rounded hover:bg-gray-200">
                <Edit size={16} />
              </button>
              <button className="bg-red-600 text-white p-2 rounded hover:bg-red-700">
                <Trash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type CardResumoProps = {
  titulo: string;
  valor: number;
  Icon?: React.ComponentType<{ size?: number }>;
};

function CardResumo({ titulo, valor, Icon }: CardResumoProps) {
  return (
    <div className="bg-gray-800 p-4 rounded flex flex-col items-start gap-2">
      <span className="text-sm text-gray-400">{titulo}</span>
      <div className="flex items-center gap-2 text-xl font-bold">
        {Icon && <Icon size={20} />}
        {valor}
      </div>
    </div>
  );
}
