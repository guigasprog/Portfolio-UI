import React, { Suspense, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { AnimatePresence } from 'framer-motion'
import CodeOrb from './components/3d/CodeOrb'
import ProjectCard from './components/ui/ProjectCard'
import ProjectDetails from './components/ui/ProjectDetails'
import Footer from './components/ui/Footer'
import CustomCursor from './components/ui/CustomCursor'
import ScrollNavigation from './components/ui/ScrollNavigation' 
import { PROJECTS } from './constants/projects'

function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  
  // Refs para navegação
  const heroRef = useRef(null)
  const footerRef = useRef(null)
  const projectRefs = useRef(PROJECTS.map(() => React.createRef()))

  return (
    <main className="bg-black w-full min-h-screen relative overflow-x-hidden">
      <CustomCursor />
      
      {/* Navegação Centralizada */}
      <ScrollNavigation 
        heroRef={heroRef} 
        projectRefs={projectRefs} 
        footerRef={footerRef} 
      />
      
      {/* Background Fixo - Orb */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
          <Suspense fallback={null}>
            <CodeOrb />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10">
        {/* Hero Section - GARANTA O REF AQUI */}
        <section 
          ref={heroRef} 
          className="h-screen flex flex-col items-center justify-center p-6 text-center"
        >
          <h1 className="text-5xl md:text-[7rem] font-black leading-[0.8] tracking-tighter uppercase mb-6 italic mix-blend-overlay text-white">
            Guilherme <br /> Delgado Martins
          </h1>
          <p className="text-white/55 font-mono tracking-[0.5em] uppercase text-xs md:text-sm">
            Tech Lead • Fullstack • UI/UX
          </p>
        </section>

        {/* Lista de Projetos */}
        <div className="relative w-full">
          {PROJECTS.map((project, index) => (
            <div key={project.title} className="relative">
              {/* ÂNCORA INVISÍVEL: Fica no topo do container do projeto */}
              <div 
                ref={projectRefs.current[index]} 
                className="absolute top-1/2 left-0 w-full h-px pointer-events-none" 
                style={{ transform: 'translateY(50vh)' }} // Ajuste fino para o centro
              />
              
              <ProjectCard 
                project={project} 
                index={index} 
                onSelect={() => setSelectedProject({ data: project, index })}
              />
            </div>
          ))}
          <div className="h-[50vh] md:h-[80vh] w-full pointer-events-none" />
        </div>

        <div ref={footerRef}>
          <Footer />
        </div>
      </div>

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