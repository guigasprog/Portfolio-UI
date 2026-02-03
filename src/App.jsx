import React, { Suspense, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import CodeOrb from './components/3d/CodeOrb'
import ProjectCard from './components/ui/ProjectCard'
import { PROJECTS } from './constants/projects'
import CustomCursor from './components/ui/CustomCursor'
import Footer from './components/ui/Footer'
import { AnimatePresence } from 'framer-motion'
import ProjectDetails from './components/ui/ProjectDetails'
import ScrollNavigation from './components/ui/ScrollNavigation'

function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  
  // Refs para as seções principais
  const heroRef = useRef(null)
  const footerRef = useRef(null)
  
  // Refs dinâmicas para os projetos (para o ScrollNavigation funcionar)
  const projectRefs = useRef(PROJECTS.map(() => React.createRef()))

  return (
    <main className="bg-black w-full min-h-screen relative">
      <CustomCursor />
      
      {/* BACKGROUND GLOBAL FIXO 
        O CodeOrb fica 'fixed' ocupando a tela toda (inset-0).
        O z-index é 0 para garantir que fique atrás do conteúdo.
      */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <CodeOrb />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Navegação Lateral */}
      <ScrollNavigation 
        heroRef={heroRef} 
        projectRefs={projectRefs} 
        footerRef={footerRef} 
      />
      
      {/* CONTEÚDO ROLÁVEL 
        Usamos 'relative z-10' para garantir que texto e cards fiquem SOBRE o background 3D.
      */}
      <div className="relative z-10">
        
        {/* --- HERO SECTION (Informações Pessoais) --- */}
        <section 
          ref={heroRef} 
          className="h-screen flex flex-col items-center justify-center px-4"
        >
          {/* Container do texto com mix-blend para contraste com a esfera */}
          <div className="text-center pointer-events-none select-none mix-blend-difference space-y-6">
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white">
              GUILHERME<br className="md:hidden" /> DELGADO<br className="md:hidden" /> MARTINS
            </h1>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-sm md:text-lg text-gray-300 font-light tracking-[0.2em] uppercase">
              <span>Fullstack Developer</span>
              <span className="hidden md:inline text-gray-600">•</span>
              <span>Tech Lead</span>
              <span className="hidden md:inline text-gray-600">•</span>
              <span>UI/UX Designer</span>
            </div>

          </div>
          
          {/* Indicador de Scroll Animado */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/30 animate-bounce text-xs tracking-widest uppercase">
            Scroll para explorar
          </div>
        </section>

        {/* --- LISTA DE PROJETOS (Layout Zig-Zag) --- */}
        <div className="relative w-full flex flex-col gap-32 py-32">
          {PROJECTS.map((project, index) => {
             // Lógica: Se o index for PAR (0, 2, 4...) joga pra Esquerda (start).
             // Se for ÍMPAR (1, 3, 5...) joga pra Direita (end).
             const isLeft = index % 2 === 0;
             
             return (
              <div 
                key={project.title} 
                className={`w-full flex ${isLeft ? 'justify-start' : 'justify-end'} px-4 md:px-20 pointer-events-none`}
              > 
                {/* O 'pointer-events-none' no pai permite clicar através do vazio (no background).
                   O 'pointer-events-auto' no filho permite clicar no card.
                */}
                <div ref={projectRefs.current[index]} className="relative pointer-events-auto">
                  <ProjectCard 
                    project={project} 
                    index={index} 
                    onSelect={() => setSelectedProject({ data: project, index })}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* --- FOOTER --- */}
        <div ref={footerRef}>
          <Footer />
        </div>
        
      </div>

      {/* --- MODAL DE DETALHES DO PROJETO --- */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetails 
            project={selectedProject.data} 
            id={selectedProject.index}
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </main>
  )
}

export default App