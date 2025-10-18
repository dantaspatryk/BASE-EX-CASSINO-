import React from 'react';

const CpuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>);

interface LossConfirmationModalProps {
    gameName: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const LossConfirmationModal: React.FC<LossConfirmationModalProps> = ({ gameName, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="w-full max-w-md mx-auto bg-slate-900/60 p-6 rounded-2xl shadow-2xl border border-yellow-500/80 text-center">
                <div className="mx-auto mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/10 border-2 border-yellow-500/50">
                    <CpuIcon className="w-8 h-8 text-yellow-300" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Confirmar Análise Humana?</h2>
                <p className="text-gray-300 mb-6">
                    Ao confirmar que o sinal para o <strong className="text-white">{gameName}</strong> não foi lucrativo, nossa equipe iniciará uma <strong className="text-yellow-300">análise profunda</strong> do seu algoritmo.
                </p>
                <div className="bg-black/30 p-4 rounded-lg text-left text-sm space-y-2 mb-6">
                    <p>• O jogo entrará em um <strong>cooldown temporário</strong>.</p>
                    <p>• Sua informação ajuda a <strong>aprimorar a precisão</strong> da IA.</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-colors"
                    >
                        Voltar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 bg-red-800 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-red-500/20"
                    >
                        Confirmar Análise
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LossConfirmationModal;
