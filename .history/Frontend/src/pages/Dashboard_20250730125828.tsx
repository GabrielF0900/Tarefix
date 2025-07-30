import { Trash, Edit, CheckCircle, Clock, Circle } from 'lucide-react';
import { useEffect, useState } from 'react';
import NovaTarefaModal from '../components/NovaTarefaModal';
import EditarAtividadeModal from '../components/EditarAtividadeModal';
import api from '../services/api';
import '../index.css';

type CardResumoProps = {
  titulo: string;
  valor: number;
  Icon?: React.ComponentType<{ size?: number }>;
};

function CardResumo({ titulo, valor, Icon }: CardResumoProps) {
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
  type Tarefa = {
    id: string;
    title: string;
    description: string;
    status: 'Pendente' | 'Em Progresso' | 'Concluída';
    priority: 'Baixa' | 'Média' | 'Alta';
    createdAt: string;
    dueDate: string;
    // outros campos se necessário
  };
  // Tipo intermediário para dados crus do backend
  type TarefaBackend = Omit<Tarefa, 'status' | 'priority'> & {
    status: string;
    priority: string;
  };
  const [tasks, setTasks] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [atividadeSelecionada, setAtividadeSelecionada] = useState<Tarefa | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail") || "Usuário não identificado";
    setUserEmail(email);
    fetchTarefas();
  }, []);

  const fetchTarefas = async () => {
    setLoading(true);
    try {
      const res = await api.get('/tarefas');
      // Normaliza status para exibição correta
      const normalizadas = (res.data as TarefaBackend[]).map((t): Tarefa => {
        let status: Tarefa['status'];
        if (t.status === 'Concluida') status = 'Concluída';
        else if (t.status === 'Em_Andamento') status = 'Em Progresso';
        else if (t.status === 'Pendente') status = 'Pendente';
        else status = 'Pendente';

        let priority: Tarefa['priority'];
        if (t.priority === 'Media') priority = 'Média';
        else if (t.priority === 'Baixa') priority = 'Baixa';
        else if (t.priority === 'Alta') priority = 'Alta';
        else priority = 'Baixa';

        return {
          ...t,
          status,
          priority
        };
      });
      setTasks(normalizadas);
    } catch {
      setTasks([]);
    }
    setLoading(false);
  };

  const handleTarefaCriada = () => {
    setMostrarModal(false);
    setTimeout(() => {
      fetchTarefas();
    }, 300);
  };

  // Filtro de busca
  const tarefasFiltradas = tasks.filter(t =>
    t.title.toLowerCase().includes(busca.toLowerCase()) ||
    t.description.toLowerCase().includes(busca.toLowerCase())
  );

  // Contagens dinâmicas
  const total = tarefasFiltradas.length;
  const pendentes = tarefasFiltradas.filter(t => t.status === 'Pendente').length;
  const emProgresso = tarefasFiltradas.filter(t => t.status === 'Em Progresso').length;
  const concluidas = tarefasFiltradas.filter(t => t.status === 'Concluída').length;

  return (
    <div className="min-h-screen bg-[#192132] text-white p-4 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard de Tarefas</h1>
        <div className="flex items-center gap-2 md:gap-4">
          <span className="text-base flex items-center gap-1">
            <span className="hidden md:inline">&#128100;</span> {userEmail}
          </span>
        </div>
      </header>

      {/* Cards resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <CardResumo titulo="Total de Tarefas" valor={total} Icon={CheckCircle} />
        <CardResumo titulo="Pendentes" valor={pendentes} Icon={Clock} />
        <CardResumo titulo="Em Progresso" valor={emProgresso} Icon={Circle} />
        <CardResumo titulo="Concluídas" valor={concluidas} Icon={CheckCircle} />
      </div>

      {/* Barra de busca e filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar tarefas..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="flex-1 bg-[#232c43] p-3 rounded text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="bg-[#232c43] p-3 rounded border border-gray-700 text-white">
          <option>Todos os Status</option>
        </select>
        <select className="bg-[#232c43] p-3 rounded border border-gray-700 text-white">
          <option>Todas Prioridades</option>
        </select>
        <button
          className="bg-blue-600 p-3 rounded text-white font-semibold hover:bg-blue-700 transition flex items-center gap-2"
          onClick={() => setMostrarModal(true)}
        >
          <span className="text-xl">+</span> Nova Tarefa
        </button>
      {/* Modal de Nova Tarefa */}
      <NovaTarefaModal isOpen={mostrarModal} onClose={() => setMostrarModal(false)} onTarefaCriada={handleTarefaCriada} />
      </div>

      {/* Lista de Tarefas */}
      <div className="flex flex-col gap-6">
        {loading ? (
          <div className="text-center text-gray-400">Carregando tarefas...</div>
        ) : tarefasFiltradas.length === 0 ? (
          <div className="text-center text-gray-400">Nenhuma tarefa encontrada.</div>
        ) : (
          tarefasFiltradas.map((task) => (
            <div
              key={task.id}
              className="bg-[#232c43] p-6 rounded flex flex-col md:flex-row md:items-center md:justify-between shadow border border-gray-700"
            >
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-1">
                  {task.status === 'Concluída' ? (
                    <CheckCircle size={22} className="text-green-400" />
                  ) : task.status === 'Em Progresso' ? (
                    <Circle size={22} className="text-blue-400" />
                  ) : (
                    <Circle size={22} className="text-gray-400" />
                  )}
                  <h2
                    className={`text-lg font-semibold ${
                      task.status === 'Concluída'
                        ? 'line-through text-green-300'
                        : task.status === 'Em Progresso'
                        ? 'text-blue-200'
                        : 'text-white'
                    }`}
                  >
                    {task.title}
                  </h2>
                </div>
                <p className="text-gray-400 text-base mb-1">{task.description}</p>
                <div className="flex items-center gap-2 mt-1 text-sm">
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">{task.priority}</span>
                  {task.status === 'Concluída' && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">Concluída</span>
                  )}
                  {task.status === 'Em Progresso' && (
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Em Progresso</span>
                  )}
                  {task.status === 'Pendente' && (
                    <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs">Pendente</span>
                  )}
                  {getDataVencimento(task) && (
                    <span className="text-gray-400 flex items-center gap-1">
                      &#128197; {new Date(getDataVencimento(task)!).toLocaleDateString('pt-BR')}
                    </span>
                  )}
// Função utilitária para pegar a data de vencimento, seja 'dueDate' ou 'date'
function getDataVencimento(task: { dueDate?: string; date?: string }) {
  return task.dueDate || task.date || '';
}
                </div>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <button
                  className="bg-white text-gray-800 p-2 rounded hover:bg-gray-200 border border-gray-300 transition"
                  title="Editar"
                  onClick={() => {
                    setAtividadeSelecionada(task);
                    setModalEditarAberto(true);
                  }}
                >
                  <Edit size={18} />
                </button>
                <button
                  className="bg-red-600 text-white p-2 rounded hover:bg-red-700 border border-red-700 transition"
                  title="Excluir"
                  onClick={async () => {
                    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
                      await api.delete(`/tarefas/${task.id}`);
                      fetchTarefas();
                    }
                  }}
                >
                  <Trash size={18} />
                </button>
      {/* Modal de Edição de Atividade */}
      {atividadeSelecionada && (
        <EditarAtividadeModal
          isOpen={modalEditarAberto}
          onClose={() => setModalEditarAberto(false)}
          atividade={atividadeSelecionada}
          onAtividadeAtualizada={fetchTarefas}
        />
      )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
