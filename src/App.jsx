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
      
      {/* Navegação Lateral */}
      <ScrollNavigation 
        heroRef={heroRef} 
        projectRefs={projectRefs} 
        footerRef={footerRef} 
      />
      
      <div className="relative z-10">
        
        {/* --- HERO SECTION CORRIGIDA --- */}
        <section 
          ref={heroRef} 
          className="h-screen relative flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Camada 1: O Background 3D (CodeOrb) */}
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <Suspense fallback={null}>
                <CodeOrb />
              </Suspense>
            </Canvas>
          </div>

          {/* Camada 2: O Texto (Caption) */}
          <div className="relative z-10 text-center pointer-events-none select-none mix-blend-difference px-4">
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-2">
              PORTFOLIO
            </h1>
            <p className="text-sm md:text-xl text-gray-300 font-light tracking-[0.5em] uppercase">
              Fullstack Developer & UI Designer
            </p>
          </div>
          
          {/* Indicador de Scroll (Opcional) */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce text-sm">
            SCROLL
          </div>
        </section>

        {/* --- LISTA DE PROJETOS (Com Lógica Zig-Zag) --- */}
        <div className="relative w-full flex flex-col gap-32 py-32">
          {PROJECTS.map((project, index) => {
             // Lógica para alternar: Par na Esquerda, Ímpar na Direita
             const isLeft = index % 2 === 0;
             
             return (
              <div 
                key={project.title} 
                // Define o alinhamento horizontal baseado no índice
                className={`w-full flex ${isLeft ? 'justify-start' : 'justify-end'} px-4 md:px-20`}
              > 
                {/* Wrapper com Ref para o ScrollSpy */}
                <div ref={projectRefs.current[index]} className="relative">
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