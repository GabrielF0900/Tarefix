import { Calendar, Trash2, X, Save } from 'lucide-react';

export default function EditarTarefa() {
  return (
    <div className="min-h-screen bg-[#0e1628] text-white p-4 md:p-10">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <a href="#" className="text-sm text-gray-300 hover:underline">Voltar ao Dashboard</a>
        <span className="text-sm">Gabriel.fonline0800@gmail.com</span>
      </div>

      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Editar Tarefa</h1>

      {/* Form Container */}
      <div className="bg-[#1b2436] p-6 rounded-2xl shadow-md max-w-3xl mx-auto space-y-6">
        <h2 className="text-xl font-semibold">Detalhes da Tarefa</h2>

        <div>
          <label className="block text-sm mb-1">Título da Tarefa</label>
          <input type="text" value="Testando" className="w-full bg-[#2c3a54] p-2 rounded-lg outline-none" />
        </div>

        <div>
          <label className="block text-sm mb-1">Descrição</label>
          <textarea className="w-full bg-[#2c3a54] p-2 rounded-lg min-h-[100px] outline-none">Testando funcionalidade do sistema</textarea>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <label className="block text-sm mb-1">Prioridade</label>
            <select className="w-full bg-[#2c3a54] p-2 rounded-lg">
              <option value="baixa">Baixa</option>
              <option value="média">Média</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div className="w-full">
            <label className="block text-sm mb-1">Status</label>
            <select className="w-full bg-[#2c3a54] p-2 rounded-lg">
              <option value="pendente">Pendente</option>
              <option value="em andamento">Em Andamento</option>
              <option value="concluída">Concluída</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Data de Vencimento</label>
          <div className="relative">
            <input type="date" className="w-full bg-[#2c3a54] p-2 rounded-lg pr-10" value="2025-07-28" />
            <Calendar className="absolute top-2.5 right-3 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full sm:w-auto">
            <Save size={18} /> Salvar Alterações
          </button>
          <button className="flex items-center justify-center gap-2 border border-gray-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto">
            <X size={18} /> Cancelar
          </button>
          <button className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg w-full sm:w-auto">
            <Trash2 size={18} /> Excluir
          </button>
        </div>
      </div>

      {/* Info Extra */}
      <div className="bg-[#1b2436] p-4 mt-6 rounded-2xl max-w-3xl mx-auto text-sm text-gray-300 flex flex-col md:flex-row justify-between gap-4">
        <span>ID da Tarefa: <strong className="text-white">1</strong></span>
        <span>Criado em: <strong className="text-white">25/07/2025</strong></span>
        <span>Última modificação: <strong className="text-white">27/07/2025</strong></span>
      </div>
    </div>
  );
}
