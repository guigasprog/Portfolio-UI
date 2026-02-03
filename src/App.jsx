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
  
  // Refs para as seções
  const heroRef = useRef(null)
  const footerRef = useRef(null)
  
  // Refs dinâmicas para os projetos
  const projectRefs = useRef(PROJECTS.map(() => React.createRef()))

  return (
    <main className="bg-black w-full min-h-screen relative">
      <CustomCursor />
      
      {/* BACKGROUND GLOBAL FIXO 
          O CodeOrb agora fica 'fixed' na tela inteira.
          O z-index é 0 para ficar atrás de tudo.
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
          Tudo aqui dentro tem z-10 para ficar ACIMA do background 3D.
      */}
      <div className="relative z-10">
        
        {/* --- HERO SECTION (Informações Pessoais) --- */}
        <section 
          ref={heroRef} 
          className="h-screen flex flex-col items-center justify-center px-4"
        >
          {/* Container do texto com mix-blend para contraste legal com a esfera */}
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
          
          {/* Indicador de Scroll */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/30 animate-bounce text-xs tracking-widest uppercase">
            Scroll para explorar
          </div>
        </section>

        {/* --- LISTA DE PROJETOS (Zig-Zag) --- */}
        <div className="relative w-full flex flex-col gap-32 py-32">
          {PROJECTS.map((project, index) => {
             const isLeft = index % 2 === 0;
             return (
              <div 
                key={project.title} 
                className={`w-full flex ${isLeft ? 'justify-start' : 'justify-end'} px-4 md:px-20 pointer-events-none`}
              > 
                {/* NOTA: Adicionei 'pointer-events-none' no container pai e 
                   'pointer-events-auto' no Wrapper abaixo para garantir 
                   que o clique passe pelo vazio e chegue no Canvas se necessário,
                   mas ainda permita clicar no Card.
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

      {/* --- MODAL DE DETALHES --- */}
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