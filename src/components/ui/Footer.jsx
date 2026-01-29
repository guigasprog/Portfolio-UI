import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, Mail, Copy, Check } from 'lucide-react'

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('guilherme.d.martins@outlook.com') // Coloque seu email real aqui
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative min-h-[80vh] bg-neutral-950 text-white flex flex-col justify-between px-6 py-20 pb-8 overflow-hidden snap-end">
      
      {/* Grid Principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl mx-auto z-10 relative">
        
        {/* Lado Esquerdo: CTA */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-[0.8] mb-8">
              Vamos <br/> Criar <br/> <span className="text-neutral-600">O Futuro.</span>
            </h2>
            <p className="text-white/40 font-mono text-sm max-w-sm">
              Disponível para projetos freelance e consultoria de arquitetura de software. <br />
              Até contratação.
            </p>
          </div>
          
          <div className="mt-12 md:mt-0">
             <button 
                onClick={scrollToTop}
                className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors"
             >
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                   <ArrowUpRight className="rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300" />
                </div>
                <span className="uppercase tracking-widest text-xs">Voltar ao topo</span>
             </button>
          </div>
        </div>

        {/* Lado Direito: Links e Contato */}
        <div className="flex flex-col gap-8 md:gap-10 md:items-end justify-between w-full">
          
          {/* --- 1. Botão de Email --- */}
          <div className="w-full md:w-auto">
              <span className="text-[10px] md:text-xs font-mono text-white/30 uppercase tracking-widest mb-3 block text-left md:text-right">
                Entre em contato
              </span>
              
              <button 
                onClick={handleCopy}
                className="group relative w-full md:w-auto flex items-center justify-between gap-4 p-4 md:p-6 border border-white/10 bg-white/5 hover:bg-white/10 active:scale-[0.98] transition-all duration-200"
              >
                <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-white/50 flex-shrink-0" />
                  
                  {/* Ajuste de Texto: break-all impede que emails longos estourem a tela */}
                  <span className="text-sm sm:text-lg md:text-2xl font-bold tracking-tight truncate">
                    contato@guilherme.dev
                  </span>
                </div>

                <div className="relative flex-shrink-0">
                  <motion.div
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: copied ? 0 : 1, opacity: copied ? 0 : 1 }}
                  >
                      <Copy className="w-4 h-4 md:w-5 md:h-5 text-white/30 group-hover:text-white transition-colors" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: copied ? 1 : 0, opacity: copied ? 1 : 0 }}
                    className="absolute inset-0 text-green-400"
                  >
                      <Check className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.div>
                </div>
              </button>

              {/* Feedback de cópia alinhado */}
              <div className="h-4 mt-2"> {/* Altura fixa evita pulo de layout */}
                {copied && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-500 text-[10px] uppercase tracking-widest text-left md:text-right"
                  >
                    Email copiado!
                  </motion.p>
                )}
              </div>
          </div>

          {/* --- 2. Redes Sociais --- */}
          <div className="flex flex-col gap-3 w-full md:w-auto">
              <span className="text-[10px] md:text-xs font-mono text-white/30 uppercase tracking-widest mb-1 block text-left md:text-right">
                Social
              </span>
              
              {/* Grid System: No mobile vira 2 colunas, no desktop flex row */}
              <div className="grid grid-cols-2 md:flex gap-3 md:gap-4 w-full">
                <SocialLink href="https://github.com/guigasprog" label="GitHub" icon={<Github className="w-4 h-4" />} />
                <SocialLink href="https://linkedin.com/in/guilherme-delgado" label="LinkedIn" icon={<Linkedin className="w-4 h-4" />} />
              </div>
          </div>

        </div>
      </div>

      {/* Rodapé do Rodapé */}
      <div className="w-full max-w-7xl mx-auto border-t border-white/10 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-white/20 text-[10px] font-mono uppercase tracking-widest">
        <span>Assis, SP • Brasil</span>
        <span>© 2026 Guilherme Delgado Martins</span>
        <span>Tech Lead & Designer</span>
      </div>

      {/* Background Grid Sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0 opacity-20"></div>
    </footer>
  )
}

// Componente auxiliar para os botões sociais
function SocialLink({ href, label, icon }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group relative flex items-center gap-3 px-6 py-4 border border-white/10 hover:border-white/40 transition-colors bg-black"
    >
      <span className="text-white/40 group-hover:text-white transition-colors">{icon}</span>
      <span className="font-bold uppercase tracking-wider text-sm">{label}</span>
      <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
    </a>
  )
}