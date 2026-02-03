import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import CodeOrb from './components/3d/CodeOrb'
import ProjectCard from './components/ui/ProjectCard'
import { PROJECTS } from './constants/projects'
import CustomCursor from './components/ui/CustomCursor'
import Footer from './components/ui/Footer' // <--- Importe aqui
import { AnimatePresence } from 'framer-motion'
import ProjectDetails from './components/ui/ProjectDetails'

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
      
      <div className="relative z-10">
        <section ref={heroRef} className="h-screen ..."> {/* Adicione ref aqui */}
          {/* Conteúdo Hero */}
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