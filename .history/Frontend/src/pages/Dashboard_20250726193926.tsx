import { LogOut, Trash, Edit, CheckCircle, Clock, Circle } from 'lucide-react';
import './index.css';

type CardResumoProps = {
  titulo: string;
  valor: number;
  Icon?: React.ComponentType<{ size?: number }>;
};

function Dashboard() {
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
        <CardResumo titulo="Total de Tarefas" valor={4} />
        <CardResumo titulo="Pendentes" valor={2} Icon={Clock} />
        <CardResumo titulo="Em Progresso" valor={1} Icon={Circle} />
        <CardResumo titulo="Concluídas" valor={1} Icon={CheckCircle} />
      </div>

      {/* Barra de busca e filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar tarefas..."
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
        {[1, 2, 3].map((_, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-4 rounded flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">Título da Tarefa</h2>
              <p className="text-gray-400 text-sm">Descrição da tarefa.</p>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <span className="bg-red-600 text-white px-2 py-1 rounded">Alta</span>
                <span className="bg-blue-600 px-2 py-1 rounded">Em Progresso</span>
                <span className="text-gray-400">📅 24/01/2024</span>
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

export default Dashboard;

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
