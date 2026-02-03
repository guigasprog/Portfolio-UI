import React, { Suspense, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import CodeOrb from './components/3d/CodeOrb'
import ProjectCard from './components/ui/ProjectCard'
import { PROJECTS } from './constants/projects'
import CustomCursor from './components/ui/CustomCursor'
import Footer from './components/ui/Footer' // <--- Importe aqui
import { AnimatePresence } from 'framer-motion'
import ProjectDetails from './components/ui/ProjectDetails'
import ScrollNavigation from './components/ui/ScrollNavigation'

function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  
  // Criamos refs para as seções principais
  const heroRef = useRef(null)
  const footerRef = useRef(null)
  // Criamos um array de refs para os projetos
  const projectRefs = useRef(PROJECTS.map(() => React.createRef()))

  return (
    <main className="bg-black w-full min-h-screen relative">
      <CustomCursor />
      
      {/* Passamos as referências para o componente de navegação */}
      <ScrollNavigation 
        heroRef={heroRef} 
        projectRefs={projectRefs} 
        footerRef={footerRef} 
      />

      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
          <Suspense fallback={null}>
            <CodeOrb />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="relative z-10">
        <section 
          ref={heroRef} 
          className="h-screen flex flex-col items-center justify-center px-4"
        >
          {/* Container do texto com mix-blend para contraste com a esfera */}
          <div className="text-center pointer-events-none select-none mix-blend-difference space-y-6">
            
            <h1 className="text-5xl md:text-[7rem] font-black leading-[0.8] tracking-tighter uppercase mb-6 italic mix-blend-overlay text-white">
              Guilherme <br /> Delgado Martins
            </h1>
            <p className="text-white/55 font-mono tracking-[0.5em] uppercase text-xs md:text-sm">
              Tech Lead • Fullstack • UI/UX
            </p>

          </div>
          
          {/* Indicador de Scroll Animado */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/30 animate-bounce text-xs tracking-widest uppercase">
            Scroll para explorar
          </div>
        </section>

        <div className="relative w-full">
          {PROJECTS.map((project, index) => (
            <div key={project.title} ref={projectRefs.current[index]}> {/* Wrapper com Ref */}
              <ProjectCard 
                project={project} 
                index={index} 
                onSelect={() => setSelectedProject({ data: project, index })}
              />
            </div>
          ))}
          <div className="h-[50vh] md:h-[80vh] w-full pointer-events-none" />
        </div>

        <div ref={footerRef}> {/* Ref no Footer */}
          <Footer />
        </div>
        
      </div>
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetails 
            project={selectedProject.data} 
            id={selectedProject.index}
            // Passamos a função para fechar (limpar o estado)
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </main>
  )
}

export default App