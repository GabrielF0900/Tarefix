import React, { useState } from 'react';
import { Calendar, Trash2, X, Save } from 'lucide-react';
import api from '../services/api';


interface Atividade {
  id: string | number;
  title: string;
  description: string;
  priority: 'Baixa' | 'Média' | 'Alta';
  status: 'Pendente' | 'Em Progresso' | 'Concluída';
  dueDate: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  atividade: Atividade;
  onAtividadeAtualizada?: (dadosAtualizados?: Atividade) => void;
}


const EditarAtividadeModal: React.FC<Props> = ({ isOpen, onClose, atividade, onAtividadeAtualizada }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState('Baixa');
  const [status, setStatus] = useState('Pendente');
  const [dataVencimento, setDataVencimento] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  React.useEffect(() => {
    if (isOpen && atividade) {
      setTitulo(atividade.title || '');
      setDescricao(atividade.description || '');
      setPrioridade(atividade.priority || 'Baixa');
      setStatus(atividade.status || 'Pendente');
      // Converter ISO para yyyy-MM-dd para o input type="date"
      let data = '';
      if (atividade.dueDate) {
        const d = new Date(atividade.dueDate);
        data = d.toISOString().slice(0, 10);
      }
      setDataVencimento(data);
    }
    if (!isOpen) {
      setErro('');
      setLoading(false);
    }
  }, [isOpen, atividade]);

  if (!isOpen) return null;

  const handleSalvar = async () => {
    setErro('');
    setLoading(true);
    try {
      // Normaliza status e prioridade para o backend aceitar
      let statusBackend = status;
      if (status === 'Em Progresso') statusBackend = 'Em_Andamento';
      if (status === 'Concluída') statusBackend = 'Concluida';
      let prioridadeBackend = prioridade;
      if (prioridade === 'Média') prioridadeBackend = 'Media';
      // Prepara payload com data de vencimento
      const payload: {
        title: string;
        description: string;
        priority: string;
        status: string;
        date?: string;
        dataVencimento?: string;
        dueDate?: string;
      } = {
        title: titulo,
        description: descricao,
        priority: prioridadeBackend,
        status: statusBackend
      };
      if (dataVencimento) {
        // Corrige fuso: cria data local sem deslocamento de timezone
        const [year, month, day] = dataVencimento.split('-').map(Number);
        const localDate = new Date(year, month - 1, day, 12, 0, 0); // 12h para evitar problemas de horário de verão
        const isoDate = localDate.toISOString();
        payload.date = isoDate;
        payload.dataVencimento = isoDate;
        payload.dueDate = isoDate;
      }
      await api.put(`/tarefas/${atividade.id}`, payload);
      if (onAtividadeAtualizada) onAtividadeAtualizada();
      onClose();
    } catch {
      setErro('Erro ao atualizar atividade.');
    }
    setLoading(false);
  };

  const handleExcluir = async () => {
    setErro('');
    setLoading(true);
    try {
      await api.delete(`/tarefas/${atividade.id}`);
      if (onAtividadeAtualizada) onAtividadeAtualizada();
      onClose();
    } catch {
      setErro('Erro ao excluir atividade.');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#1b2436] p-6 rounded-2xl shadow-md w-full max-w-2xl mx-auto space-y-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Editar Tarefa</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-lg"><X /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Título da Tarefa</label>
            <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} className="w-full bg-[#2c3a54] p-2 rounded-lg outline-none" />
          </div>
          <div>
            <label className="block text-sm mb-1">Descrição</label>
            <textarea value={descricao} onChange={e => setDescricao(e.target.value)} className="w-full bg-[#2c3a54] p-2 rounded-lg min-h-[100px] outline-none" />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block text-sm mb-1">Prioridade</label>
              <select value={prioridade} onChange={e => setPrioridade(e.target.value)} className="w-full bg-[#2c3a54] p-2 rounded-lg">
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
            <div className="w-full">
              <label className="block text-sm mb-1">Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)} className="w-full bg-[#2c3a54] p-2 rounded-lg">
                <option value="Pendente">Pendente</option>
                <option value="Em Progresso">Em Progresso</option>
                <option value="Concluída">Concluída</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Data de Vencimento</label>
            <div className="relative">
              <input type="date" className="w-full bg-[#2c3a54] p-2 rounded-lg pr-10" value={dataVencimento} onChange={e => setDataVencimento(e.target.value)} />
              <Calendar className="absolute top-2.5 right-3 w-5 h-5 text-gray-400" />
            </div>
          </div>
          {erro && <div className="text-red-400 text-sm mb-2">{erro}</div>}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button onClick={handleSalvar} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full sm:w-auto" disabled={loading}>
              <Save size={18} /> Salvar Alterações
            </button>
            <button onClick={onClose} className="flex items-center justify-center gap-2 border border-gray-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto" disabled={loading}>
              <X size={18} /> Cancelar
            </button>
            <button onClick={handleExcluir} className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg w-full sm:w-auto" disabled={loading}>
              <Trash2 size={18} /> Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarAtividadeModal;
