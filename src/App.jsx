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
        <Canvas camera={{ position: [0, 0, 5] }}>
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