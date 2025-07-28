import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const NovaTarefaModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
            <input type="text" placeholder="Digite o título da tarefa"
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm mb-1">Descrição</label>
            <textarea placeholder="Digite a descrição da tarefa"
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm mb-1">Status</label>
              <select className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none">
                <option>Pendente</option>
                <option>Concluída</option>
              </select>
            </div>

            <div className="w-1/2">
              <label className="block text-sm mb-1">Prioridade</label>
              <select className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none">
                <option>Baixa</option>
                <option>Média</option>
                <option>Alta</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Data de Vencimento</label>
            <input type="date"
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button onClick={onClose} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded">Cancelar</button>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">Criar Tarefa</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovaTarefaModal;
