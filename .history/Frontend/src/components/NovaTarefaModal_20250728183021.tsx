import React, { useState } from "react";
import api from '../services/api';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onTarefaCriada?: () => void;
}

const NovaTarefaModal: React.FC<Props> = ({ isOpen, onClose, onTarefaCriada }) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("Pendente");
  const [prioridade, setPrioridade] = useState("Baixa");
  const [dataVencimento, setDataVencimento] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  if (!isOpen) return null;

  const handleCriar = async () => {
    setErro("");
    setLoading(true);
    try {
      // Recupera o userId do localStorage (ajuste conforme seu app)
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setErro("Usuário não identificado.");
        setLoading(false);
        return;
      }
      await api.post("/auth/nova-tarefa", {
        title: titulo,
        description: descricao,
        status,
        priority: prioridade,
        date: dataVencimento || undefined,
        userId: Number(userId)
      });
      setTitulo("");
      setDescricao("");
      setStatus("Pendente");
      setPrioridade("Baixa");
      setDataVencimento("");
      if (onTarefaCriada) onTarefaCriada();
    } catch {
      setErro("Erro ao criar tarefa.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Nova Tarefa</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-lg">×</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Título</label>
            <input
              type="text"
              placeholder="Digite o título da tarefa"
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Descrição</label>
            <textarea
              placeholder="Digite a descrição da tarefa"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            ></textarea>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm mb-1">Status</label>
              <select
                className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none"
                value={status}
                onChange={e => setStatus(e.target.value)}
                disabled={loading}
              >
                <option>Pendente</option>
                <option>Concluída</option>
              </select>
            </div>

            <div className="w-1/2">
              <label className="block text-sm mb-1">Prioridade</label>
              <select
                className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none"
                value={prioridade}
                onChange={e => setPrioridade(e.target.value)}
                disabled={loading}
              >
                <option>Baixa</option>
                <option>Média</option>
                <option>Alta</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Data de Vencimento</label>
            <input
              type="date"
              value={dataVencimento}
              onChange={e => setDataVencimento(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          {erro && <div className="text-red-400 text-sm mb-2">{erro}</div>}
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={onClose} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded" disabled={loading}>Cancelar</button>
            <button
              onClick={handleCriar}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
              disabled={loading || !titulo || !descricao}
            >
              {loading ? 'Criando...' : 'Criar Tarefa'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovaTarefaModal;
