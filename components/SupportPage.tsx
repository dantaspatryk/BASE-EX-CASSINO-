import React, { useState } from 'react';
import WhatsAppIcon from './icons/WhatsAppIcon';

// === LOCAL ICONS ===
const MessageCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);
const HelpCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);
const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m6 9 6 6 6-6"/></svg>
);
const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"></polyline></svg>
);

// === LOCAL FAQ Accordion ===
const FaqAccordion: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg transition-all duration-300 hover:border-purple-500/80">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-4 text-left" aria-expanded={isOpen}>
                <h3 className="font-bold text-white">{title}</h3>
                <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div style={{ maxHeight: isOpen ? '500px' : '0px', transition: 'max-height 0.7s ease-in-out' }} className="overflow-hidden">
                 <div className="px-4 pb-4 text-left text-gray-300 space-y-2 text-sm">
                    {children}
                </div>
            </div>
        </div>
    );
};


const SupportPage: React.FC = () => {
    const supportPhoneNumber = '5521993372175';
    const supportMessage = encodeURIComponent('Olá Especialista do Base Ex Cassino preciso de Ajuda ??');
    const whatsappUrl = `https://wa.me/${supportPhoneNumber}?text=${supportMessage}`;

    const handleContactSupport = () => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    const supportTopics = [
        'Dúvidas sobre como interpretar os sinais da IA.',
        'Relatar um bug ou dificuldade técnica.',
        'Sugestões para adicionar novos jogos.',
        'Ideias de novas funcionalidades.',
        'Feedback sobre a assertividade dos sinais.',
        'Consultas sobre parcerias comerciais.',
    ];

    return (
        <div className="w-full max-w-2xl mx-auto animate-fade-in text-center px-2 pb-8">
            <div className="mb-10">
                <h1 className="text-4xl font-black text-white tracking-wide">Central de Suporte</h1>
                <p className="text-purple-300/80 text-lg mt-2">Estamos aqui para te ajudar a ter a melhor experiência.</p>
            </div>

            <div className="space-y-8">
                {/* Main Contact Card */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-2xl shadow-2xl border border-green-500/50 text-center">
                    <div className="mx-auto mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500/50">
                        <MessageCircleIcon className="w-8 h-8 text-green-300" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Contato Imediato</h2>
                    <p className="text-gray-300 mb-6 max-w-sm mx-auto">Precisa de uma resposta rápida? Fale diretamente com um de nossos especialistas humanos.</p>
                    <button
                        onClick={handleContactSupport}
                        className="w-full max-w-xs mx-auto flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 text-lg shadow-lg shadow-green-500/40 hover:shadow-xl hover:shadow-green-500/50 transform hover:scale-105"
                    >
                        <WhatsAppIcon className="w-7 h-7" />
                        Falar com um Especialista
                    </button>
                    <p className="text-xs text-gray-500 mt-4">Normalmente respondemos em poucos minutos.</p>
                </div>

                {/* Topics Card */}
                <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-700 text-left">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Áreas que Cobrimos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        {supportTopics.map((topic, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="w-5 h-5 flex-shrink-0 mt-1 flex items-center justify-center rounded-full bg-green-500/20 text-green-400">
                                  <CheckIcon className="w-3 h-3"/>
                                </div>
                                <p className="text-gray-200">{topic}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="text-center">
                     <div className="inline-flex items-center gap-3 mb-6">
                        <HelpCircleIcon className="w-7 h-7 text-purple-300" />
                        <h2 className="text-2xl font-bold text-white">Perguntas Frequentes</h2>
                    </div>
                    <div className="space-y-3 text-left">
                        <FaqAccordion title="O que significa 'cooldown' em um jogo?">
                           <p>O 'cooldown' é um bloqueio temporário ativado quando você relata um sinal como "Prejuízo". Durante esse período, nossa equipe realiza uma análise humana profunda no algoritmo do jogo para entender o que aconteceu. Isso garante que a IA aprenda com a situação e evita que outros usuários enfrentem o mesmo problema, aumentando a segurança e a precisão da plataforma para todos.</p>
                        </FaqAccordion>
                        <FaqAccordion title="Posso usar um sinal mais de uma vez?">
                           <p>Não. Cada sinal é uma análise única para uma janela de tempo específica e volátil. Tentar reutilizar um sinal, mesmo que tenha sido lucrativo, é extremamente arriscado. Os padrões do jogo mudam constantemente, e uma estratégia que funcionou antes pode não ter efeito ou até ser prejudicial minutos depois. Sempre gere um novo sinal para cada nova sessão de jogo para garantir que você está operando com a análise mais atualizada e precisa.</p>
                        </FaqAccordion>
                         <FaqAccordion title="Por que a IA às vezes gera sinais para Payout baixo?">
                           <p>Mesmo em fases de baixa (Payout vermelho), o algoritmo de um jogo pode apresentar micro-padrões ou "brechas" de curta duração que uma análise profunda pode identificar. A IA, ao gerar um sinal para um Payout baixo, está indicando que detectou uma dessas raras anomalias. No entanto, esses sinais são inerentemente de altíssimo risco e devem ser executados com extrema cautela e gestão de banca rigorosa, pois a tendência geral do jogo ainda é de retenção.</p>
                        </FaqAccordion>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(SupportPage);
