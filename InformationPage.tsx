import React, { useState } from 'react';

// === ICONS (Defined locally for this component) ===
const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 3L9.27 9.27L3 12l6.27 2.73L12 21l2.73-6.27L21 12l-6.27-2.73L12 3z" /></svg>);
const CpuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>);
const SlidersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></svg>);
const ClipboardListIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></svg>);
const UsersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
const ShieldIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
const MoneyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v12m-3-8h6a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-4a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h6"/></svg>);
const TrendingUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>);
const TrendingDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></svg>);
const AlertTriangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>);
const FlameIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>);
const CheckSquareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>);
const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m6 9 6 6 6-6"/></svg>);
const ZapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>);
const GemIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>);
const CrownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>);
const GridIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>);
const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>);
const ClubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="16" cy="9.5" r="3.5" />
    <circle cx="8" cy="9.5" r="3.5" />
    <circle cx="12" cy="6" r="3.5" />
    <path d="M12 9.5 V 20 M10 20 h 4" />
  </svg>
);


// === LOCAL COMPONENTS ===
const InfoAccordion: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean; icon: React.ReactNode }> = ({ title, children, defaultOpen = false, icon }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="bg-gradient-to-br from-slate-900/70 to-slate-950/80 backdrop-blur-xl border border-slate-700 rounded-2xl transition-all duration-300 hover:border-purple-500/80 shadow-lg">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-4 text-left rounded-t-2xl hover:bg-purple-500/5 transition-colors" aria-expanded={isOpen}>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center flex-shrink-0 border border-purple-500/20">{icon}</div>
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                </div>
                <ChevronDownIcon className={`w-6 h-6 text-gray-400 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div style={{ maxHeight: isOpen ? '2500px' : '0px', transition: 'max-height 0.9s ease-in-out' }} className="overflow-hidden">
                 <div className="px-4 pb-5 pt-2 text-left text-gray-300 space-y-4 text-opacity-90">
                    {children}
                </div>
            </div>
        </div>
    );
};

type InfoHighlightColor = 'green' | 'red' | 'yellow' | 'amber' | 'default' | 'purple' | 'blue' | 'teal' | 'sky' | 'slate' | 'pink';

const InfoHighlight: React.FC<{title: string; children: React.ReactNode; icon: React.ReactNode; color?: InfoHighlightColor}> = ({ title, children, icon, color = 'default' }) => {
    const colorClasses: Record<InfoHighlightColor, { border: string; icon: string; bg: string }> = {
        green:  { border: 'border-green-500/50', icon: 'text-green-400', bg: 'bg-gradient-to-br from-green-500/10 to-green-500/5' },
        red:    { border: 'border-red-500/50', icon: 'text-red-400', bg: 'bg-gradient-to-br from-red-500/10 to-red-500/5' },
        yellow: { border: 'border-yellow-500/50', icon: 'text-yellow-400', bg: 'bg-gradient-to-br from-yellow-500/10 to-yellow-500/5' },
        amber:  { border: 'border-amber-500/50', icon: 'text-amber-400', bg: 'bg-gradient-to-br from-amber-500/10 to-amber-500/5' },
        purple: { border: 'border-purple-500/50', icon: 'text-purple-400', bg: 'bg-gradient-to-br from-purple-500/10 to-purple-500/5' },
        blue:   { border: 'border-blue-500/50', icon: 'text-blue-400', bg: 'bg-gradient-to-br from-blue-500/10 to-blue-500/5' },
        teal:   { border: 'border-teal-500/50', icon: 'text-teal-400', bg: 'bg-gradient-to-br from-teal-500/10 to-teal-500/5' },
        sky:    { border: 'border-sky-500/50', icon: 'text-sky-400', bg: 'bg-gradient-to-br from-sky-500/10 to-sky-500/5' },
        pink:   { border: 'border-pink-500/50', icon: 'text-pink-400', bg: 'bg-gradient-to-br from-pink-500/10 to-pink-500/5' },
        slate:  { border: 'border-slate-600', icon: 'text-slate-300', bg: 'bg-gradient-to-br from-slate-800/20 to-slate-800/10' },
        default:{ border: 'border-gray-700', icon: 'text-gray-300', bg: 'bg-gradient-to-br from-black/20 to-black/10' }
    };
    const selectedColor = colorClasses[color] || colorClasses.default;

    return (
        <div className={`p-4 rounded-xl border flex items-start gap-4 ${selectedColor.border} ${selectedColor.bg} shadow-inner shadow-black/20`}>
            <div className={`flex-shrink-0 mt-1 ${selectedColor.icon}`}>{icon}</div>
            <div>
                <p className="font-bold text-white">{title}</p>
                <p className="text-sm text-gray-300/90 leading-relaxed">{children}</p>
            </div>
        </div>
    );
};

const Step: React.FC<{ number: number; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-teal-500/30 to-teal-500/10 text-teal-300 font-bold text-lg border border-teal-500/50 shadow-md">{number}</div>
        <div>
            <h4 className="font-bold text-white">{title}</h4>
            <p className="text-sm text-gray-300/90 leading-relaxed">{children}</p>
        </div>
    </div>
);

// === INFORMATION PAGE ===
const InformationPage: React.FC = () => {
    return (
        <div className="w-full max-w-2xl mx-auto animate-fade-in text-center px-2 pb-8">
            <div className="mb-10">
                <h1 className="text-4xl font-black text-white tracking-wide">Base de Conhecimento</h1>
                <p className="text-purple-300/80 text-lg mt-2">Tudo que você precisa saber para dominar nossa IA.</p>
            </div>

            <div className="space-y-4">
                <InfoAccordion title="O Que é a BASE EX CASSINO?" icon={<SparklesIcon className="w-6 h-6 text-purple-300"/>} defaultOpen>
                    <p>A <b>BASE EX CASSINO</b> é uma plataforma de inteligência artificial de ponta, considerada uma das melhores do mundo em decodificar jogos de cassino. Nosso sistema é focado em <b>análises profundas 24H</b>, processando um volume massivo de dados em tempo real.</p>
                    <p className="font-bold text-white">NÃO somos uma sala de sinais baseada em intuição. Somos um centro de análise de dados de alta performance.</p>
                    <p>Nossa IA se conecta diretamente à <b>base de dados dos jogos</b>, monitorando seus algoritmos internos e o fluxo de dados. O objetivo é um só: encontrar com precisão matemática as janelas de tempo mais lucrativas para você operar.</p>
                </InfoAccordion>
                
                 <InfoAccordion title="Decodificando a Análise e as Cores" icon={<CpuIcon className="w-6 h-6 text-purple-300"/>}>
                    <p>O <b>'Índice de Oportunidade'</b> é a métrica que resume a análise da IA sobre o comportamento do algoritmo de um jogo em tempo real. Nossa IA traduz essa complexidade em um sistema de cores simples e direto, informando o ciclo atual do algoritmo:</p>
                    <div className="space-y-3 mt-2">
                        <InfoHighlight title="VERDE: Fluxo de Distribuição" icon={<TrendingUpIcon className="w-6 h-6"/>} color="green">
                            A análise indica que o jogo está em um ciclo de distribuição de prêmios. A probabilidade de ganhos é estatisticamente alta. <b>Este é o ciclo ideal para operar.</b>
                        </InfoHighlight>
                        <InfoHighlight title="VERMELHO: Fluxo de Retenção" icon={<TrendingDownIcon className="w-6 h-6"/>} color="red">
                             A análise indica que o jogo está em um ciclo de retenção para compensar os pagamentos anteriores. O risco é muito elevado. A diretriz técnica é <b>não operar</b> neste ciclo.
                        </InfoHighlight>
                         <InfoHighlight title="BORDA PULSANTE: Alerta de Transição" icon={<AlertTriangleIcon className="w-6 h-6"/>} color="yellow">
                           Quando a borda de um jogo pisca, a IA indica uma mudança de ciclo iminente. É um alerta para se preparar para uma nova oportunidade (se estiver subindo para verde) ou para encerrar as operações (se estiver caindo para vermelho).
                        </InfoHighlight>
                         <InfoHighlight title="HOT (Acima de 88%): Assertividade Máxima" icon={<FlameIcon className="w-6 h-6"/>} color="amber">
                           Os momentos de <b>máxima assertividade</b> acontecem quando o Índice de Oportunidade está <b>acima de 88% no ciclo de distribuição</b>. Estes são os sinais 'HOT', representando as oportunidades de maior potencial lucrativo.
                        </InfoHighlight>
                    </div>
                </InfoAccordion>

                <InfoAccordion title="Conheça os Especialistas de IA" icon={<div className="flex -space-x-2"><CpuIcon className="w-6 h-6 text-purple-300"/><ShieldIcon className="w-6 h-6 text-blue-400"/></div>}>
                    <p>Cada sinal é gerado por um especialista de IA com uma abordagem tática única. Conheça seu arsenal:</p>
                    <div className="space-y-3 mt-2">
                        <InfoHighlight title="Black AI: O Analista Mestre" icon={<CpuIcon className="w-6 h-6"/>} color="slate">
                            O Analista Mestre para **bancas de R$100 a R$500**. Realiza uma análise profunda e balanceada do fluxo de dados, encontrando os sinais com a maior probabilidade estatística de sucesso. É a sua escolha para uma estratégia sólida e puramente baseada em dados.
                        </InfoHighlight>
                        <InfoHighlight title="Blue AI: O Estrategista Defensivo" icon={<ShieldIcon className="w-6 h-6"/>} color="blue">
                           O Estrategista Defensivo para **bancas baixas (R$50 a R$100)**. Focada em consistência e proteção de capital, a Blue AI cria sequências de risco ultra-baixo, ideais para crescimento estável e seguro.
                        </InfoHighlight>
                        <InfoHighlight title="Boom AI: O Especialista em Momentum" icon={<ZapIcon className="w-6 h-6"/>} color="yellow">
                           Especialista para **bancas altas (R$650 a R$950)**. Adapta dinamicamente a agressividade e a duração da estratégia com base no tempo restante do ciclo e na porcentagem do Índice de Oportunidade. Ideal para ataques de alto impacto com risco calculado.
                        </InfoHighlight>
                        <InfoHighlight title="Diamond AI: O Tático Personalizado" icon={<SlidersIcon className="w-6 h-6"/>} color="teal">
                           Aqui, o estrategista é você. A Diamond AI ignora a análise de fluxo atual e constrói uma estratégia sob medida, baseada exclusivamente no seu perfil de risco e na profundidade de análise que você definir. A ferramenta definitiva para o jogador experiente.
                        </InfoHighlight>
                        <InfoHighlight title="Gold AI: O Especialista 'Fortune'" icon={<GemIcon className="w-6 h-6" />} color="amber">
                            Especialista em jogos 'Fortune'. Suas estratégias são desenhadas para explorar as mecânicas únicas desses jogos, como re-spins e acúmulo de símbolos, com o objetivo de forçar a ativação das rodadas de bônus.
                        </InfoHighlight>
                         <InfoHighlight title="Matrix AI: O Analista de Risco" icon={<GridIcon className="w-6 h-6" />} color="green">
                           Analista de Risco para jogos 'Matrix' (Mines, Plinko). Define o nível de risco ideal (ex: número de minas) e a estratégia de cash out para buscar lucros consistentes em jogos de probabilidade.
                        </InfoHighlight>
                        <InfoHighlight title="Seven Gold AI: O Especialista em Crash" icon={<GemIcon className="w-6 h-6"/>} color="purple">
                           Dedicada aos jogos de Crash, analisa o histórico em tempo real para prever "velas altas". Suas estratégias são focadas em capturar multiplicadores elevados com risco calculado e metas de saída claras.
                        </InfoHighlight>
                        <InfoHighlight title="Nine AI: O Mestre do 'Ao Vivo'" icon={<CrownIcon className="w-6 h-6"/>} color="sky">
                            Tático de elite para jogos como Roleta e Blackjack. Utiliza o Google Search para consultar e adaptar táticas profissionais reconhecidas, criando planos de aposta detalhados com objetivos de sessão claros.
                        </InfoHighlight>
                        <InfoHighlight title="Showtime AI: O Mestre dos Game Shows" icon={<StarIcon className="w-6 h-6" />} color="pink">
                           Mestre dos Game Shows (Crazy Time, Monopoly). Cria estratégias divertidas e táticas focadas em cobrir as rodadas de bônus e capturar os grandes multiplicadores que definem esses jogos.
                        </InfoHighlight>
                        <InfoHighlight title="Ace AI: O Estrategista de Cartas" icon={<ClubIcon className="w-6 h-6"/>} color="teal">
                            Estrategista de elite para jogos de cartas (Blackjack, Bacará, etc.). Utiliza sua 'Lista Mestra' de táticas profissionais, adaptando estratégias como contagem básica e progressões de aposta para criar planos de jogo robustos e táticos.
                        </InfoHighlight>
                    </div>
                </InfoAccordion>

                <InfoAccordion title="Executando uma Diretriz Tática" icon={<ClipboardListIcon className="w-6 h-6 text-purple-300"/>}>
                    <p>Cada sinal é um plano de ação preciso. Ignorar qualquer parte dele é jogar contra a probabilidade. Siga cada detalhe para maximizar suas chances:</p>
                     <div className="space-y-4 mt-2">
                        <Step number={1} title="Horário de Oportunidade: A Janela Crítica">
                           Esta é a informação <b>mais importante</b>. A análise da IA é válida <b>APENAS</b> dentro desta janela de tempo. Operar fora dela invalida a estratégia e aumenta drasticamente seu risco.
                        </Step>
                         <Step number={2} title="Sequência de Entrada: A Chave do Algoritmo">
                            A ordem e o número de rodadas (Turbo, Normal, etc.) são uma sequência calculada para interagir com o algoritmo do jogo, aumentando a probabilidade estatística de liberar os prêmios. <b>Siga a ordem à risca.</b>
                        </Step>
                         <Step number={3} title="Estratégia de Execução: O Briefing do Especialista">
                            Aqui, nossa IA fornece táticas profissionais sobre como gerenciar suas apostas e quando ser mais agressivo ou conservador. <b>Leia com atenção para otimizar sua jogada.</b>
                        </Step>
                        <Step number={4} title="Aposta Sugerida e Flexibilidade">
                            A IA sugere um valor de aposta calibrado para a gestão de banca do perfil (ex: Banca Baixa). No entanto, você tem total controle. Sinta-se à vontade para ajustar este valor para cima ou para baixo, de acordo com sua própria gestão e confiança.
                        </Step>
                    </div>
                </InfoAccordion>

                <InfoAccordion title="Entendendo os Tipos de Sinais" icon={<ZapIcon className="w-6 h-6 text-purple-300"/>}>
                    <p>Nossa IA gera diferentes tipos de sinais, cada um com uma estrutura tática específica para a categoria do jogo. Entender a anatomia de cada sinal é crucial para uma execução perfeita.</p>
                    <div className="space-y-3 mt-2">
                        <InfoHighlight title="Sinais de Slot / Fortune" icon={<GemIcon className="w-6 h-6"/>} color="purple">
                            Focados em decodificar o algoritmo através de sequências táticas de rodadas, influenciando o ciclo de pagamento a seu favor.
                            <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                                <li><b>Sequência de Entrada:</b> Uma lista de 'attempts' (entradas) com tipos (Normal, Turbo, Auto) e número de 'rounds' (rodadas). A ordem e o tipo são calculados para preparar o algoritmo para liberar prêmios.</li>
                                <li><b>Objetivo:</b> Executar a sequência com precisão para aumentar a probabilidade de ativar bônus ou grandes ganhos.</li>
                            </ul>
                        </InfoHighlight>
                        <InfoHighlight title="Sinais de Crash" icon={<TrendingUpIcon className="w-6 h-6"/>} color="amber">
                            Focados em prever o comportamento do multiplicador com base em padrões de resultados recentes.
                            <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                                <li><b>Padrão de Entrada:</b> Uma condição específica que deve ocorrer antes de você fazer sua aposta (ex: "Aguardar 2 velas abaixo de 1.50x").</li>
                                <li><b>Metas de Saída:</b> Múltiplos alvos de cashout (safe, medium, high) para diferentes perfis de risco. A diretriz é sempre priorizar as metas seguras.</li>
                            </ul>
                        </InfoHighlight>
                        <InfoHighlight title="Sinais de Live / Game Show" icon={<CrownIcon className="w-6 h-6"/>} color="sky">
                            São planos de jogo completos para uma sessão, baseados em estratégias profissionais de cassino.
                            <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                                <li><b>Plano de Aposta:</b> Um conjunto de regras passo a passo que ditam onde e como apostar com base nos resultados das rodadas (vitória ou derrota).</li>
                                <li><b>Objetivo da Sessão:</b> Uma meta clara de lucro (stop-win) e um limite de perda (stop-loss) que definem o fim da operação.</li>
                            </ul>
                        </InfoHighlight>
                        <InfoHighlight title="Sinais de Matrix" icon={<GridIcon className="w-6 h-6"/>} color="green">
                            Focados em otimizar a relação risco/retorno em jogos de probabilidade como Mines e Plinko.
                            <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                                <li><b>Nível de Risco:</b> A configuração principal do jogo (ex: número de minas, pinos ou alvos) que a IA calculou como ideal para o cenário atual.</li>
                                <li><b>Padrão de Aposta:</b> Define como gerenciar o valor da aposta entre as rodadas (ex: apostas planas, Martingale).</li>
                                <li><b>Metas de Saída:</b> Múltiplos alvos de cashout para diferentes níveis de coragem.</li>
                            </ul>
                        </InfoHighlight>
                    </div>
                </InfoAccordion>
                
                 <InfoAccordion title="Protocolo de Inteligência Coletiva" icon={<UsersIcon className="w-6 h-6 text-purple-300"/>}>
                     <p>A seção <b>'Validação do Sinal'</b> é o coração da nossa inteligência coletiva. Seu feedback não é apenas uma opinião; ele alimenta o ciclo de aprendizado de máquina (machine learning) da IA, refinando a precisão de todo o sistema.</p>
                     <div className="space-y-3 mt-2">
                        <InfoHighlight title="🚀 Lucrativo" icon={<CheckSquareIcon className="w-6 h-6"/>} color="green">
                           Ao confirmar um lucro, você informa à IA que a estratégia e os padrões identificados foram corretos. Isso reforça os modelos preditivos e nos ajuda a encontrar mais sinais de sucesso como o seu.
                        </InfoHighlight>
                         <InfoHighlight title="❌ Prejuízo" icon={<AlertTriangleIcon className="w-6 h-6" />} color="red">
                            Ao reportar um resultado adverso, você aciona um protocolo de reanálise. A IA investiga as variáveis que podem ter levado ao resultado, ajusta seus parâmetros e evita cometer o mesmo erro no futuro.
                        </InfoHighlight>
                     </div>
                     <p className='mt-4 font-bold text-white'>Seu feedback honesto melhora as análises futuras para toda a comunidade. Juntos, criamos a IA mais assertiva do mercado.</p>
                </InfoAccordion>

                <InfoAccordion title="Protocolo de Monetização" icon={<MoneyIcon className="w-6 h-6 text-purple-300"/>}>
                    <p>Transforme nossa plataforma em sua própria fonte de renda. Com a precisão da nossa IA, você pode se tornar um provedor de sinais de elite e lucrar com isso.</p>
                    <div className="space-y-4 mt-2">
                       <Step number={1} title="Crie seu Grupo VIP">
                           Use o Telegram ou WhatsApp para criar um espaço exclusivo onde você compartilhará os sinais.
                       </Step>
                       <Step number={2} title="Defina um Valor de Acesso">
                           Cobre uma assinatura (semanal, quinzenal, mensal) para que as pessoas acessem suas análises de alta qualidade.
                       </Step>
                       <Step number={3} title="Gere e Compartilhe com 1 Clique">
                           Use a IA para gerar os sinais mais assertivos. Na tela do sinal, use os botões de compartilhamento para enviar a estratégia completa para seu grupo instantaneamente.
                       </Step>
                       <Step number={4} title="Construa sua Comunidade e Lucre">
                           Divulgue seu grupo e crie uma nova fonte de renda recorrente. A IA faz a análise pesada; você só precisa gerenciar sua comunidade de membros.
                       </Step>
                    </div>
                </InfoAccordion>

                <InfoAccordion title="Protocolo de Gestão de Risco" icon={<ShieldIcon className="w-6 h-6 text-purple-300"/>}>
                    <p>Nosso objetivo é fornecer ferramentas para decisões mais inteligentes, não garantir ganhos. Lembre-se sempre dos pilares do Jogo Responsável:</p>
                     <ul className="space-y-3 mt-2 text-sm">
                        <li className="flex items-start gap-3"><CheckSquareIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span><b>Gerencie sua Banca:</b> Defina limites claros de ganhos (stop-win) e perdas (stop-loss) para cada sessão.</span></li>
                        <li className="flex items-start gap-3"><CheckSquareIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span><b>Não persiga perdas:</b> Se um sinal não der o resultado esperado, não tente 'recuperar' impulsivamente. Siga a gestão.</span></li>
                        <li className="flex items-start gap-3"><CheckSquareIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span><b>Jogue por diversão:</b> Encare os jogos como entretenimento. Os lucros são uma consequência da estratégia e disciplina.</span></li>
                        <li className="flex items-start gap-3"><CheckSquareIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span><b>Saiba a hora de parar:</b> Proteger o lucro é tão importante quanto obtê-lo. Após atingir sua meta de ganho, finalize o sinal e a sessão.</span></li>
                    </ul>
                </InfoAccordion>
            </div>
        </div>
    );
};

export default React.memo(InformationPage);