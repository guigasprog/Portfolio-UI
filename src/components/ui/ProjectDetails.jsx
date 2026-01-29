import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Github, ExternalLink, Calendar, Code2, User, ImageOff } from 'lucide-react' // Importe ImageOff

export default function ProjectDetails({ project, id, onClose }) {
  
  // Bloqueia o scroll da página
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => document.body.style.overflow = 'auto'
  }, [])

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
      
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
      />

      {/* Modal */}
      <motion.div 
        layoutId={`card-container-${id}`}
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl z-10"
      >
        
        {/* Botão Fechar */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur-md rounded-full text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col md:flex-row h-full overflow-y-auto">
          
          {/* Esquerda: Imagem ou Placeholder */}
          <div className="w-full md:w-1/2 h-[40vh] md:h-auto relative bg-neutral-900 flex items-center justify-center">
            {project.image ? (
              <motion.img 
                layoutId={`card-image-${id}`}
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              /* PLACEHOLDER SE NÃO TIVER IMAGEM */
              <motion.div 
                 layoutId={`card-image-${id}`}
                 className="flex flex-col items-center justify-center text-white/20 gap-4 w-full h-full"
              >
                 <ImageOff className="w-16 h-16" />
                 <span className="font-mono text-xs uppercase tracking-widest">Sem Imagem</span>
              </motion.div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent md:bg-gradient-to-r" />
          </div>

          {/* Direita: Conteúdo */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col gap-6 bg-[#0a0a0a]">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-2">
                {project.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-4 text-white/40 font-mono text-xs uppercase tracking-widest">
                <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>{project.year || "2025"}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                    <User className="w-3 h-3" />
                    <span>{project.role || "Dev Fullstack"}</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="prose prose-invert prose-sm text-white/70 leading-relaxed"
            >
              {project.description ? (
                Array.isArray(project.description) ? (
                    project.description.map((paragraph, i) => (
                        <p key={i} className="mb-4">{paragraph}</p>
                    ))
                ) : (
                    <p>{project.description}</p>
                )
              ) : (
                <p className="text-white/30 italic">Nenhuma descrição fornecida.</p>
              )}
            </motion.div>

            {/* Tech Stack */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/30 mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4" /> Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {(project.tags || []).map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Links de Ação (Condicionais) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-auto pt-8 flex gap-4"
            >
              {project.deploy && (
                <a 
                    href={project.deploy} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 py-4 bg-white text-black font-bold uppercase tracking-wider text-center hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
              
              {project.github && (
                <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 py-4 border border-white/20 text-white font-bold uppercase tracking-wider text-center hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                    <Github className="w-4 h-4" /> Code
                </a>
              )}
              
              {!project.deploy && !project.github && (
                <div className="w-full py-4 text-center border border-white/5 text-white/30 font-mono text-xs uppercase tracking-widest">
                   Projeto Privado / Interno
                </div>
              )}
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  )
}