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
  
  // Refs
  const heroRef = useRef(null)
  const footerRef = useRef(null)
  const projectRefs = useRef(PROJECTS.map(() => React.createRef()))

  return (
    <main className="bg-black w-full min-h-screen relative">
      <CustomCursor />
      
      {/* CORREÇÃO 1: Navegação Centralizada */}
      <ScrollNavigation 
        heroRef={heroRef} 
        projectRefs={projectRefs} 
        footerRef={footerRef} 
      />
      
      {/* CORREÇÃO 2: O Background com o Orb estava faltando aqui */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
          <Suspense fallback={null}>
            <CodeOrb />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10">
        
        {/* CORREÇÃO 3: O texto do Hero estava vazio */}
        <section ref={heroRef} className="h-screen flex flex-col items-center justify-center p-6 text-center snap-center">
          <h1 className="text-5xl md:text-[7rem] font-black leading-[0.8] tracking-tighter uppercase mb-6 italic mix-blend-overlay text-white">
            Guilherme <br /> Delgado Martins
          </h1>
          <p className="text-white/55 font-mono tracking-[0.5em] uppercase text-xs md:text-sm">
            Tech Lead • Fullstack • UI/UX
          </p>
        </section>

        <div className="relative w-full">
          {PROJECTS.map((project, index) => (
            <div 
              key={project.title} 
              className="relative w-full flex justify-center items-center min-h-screen"
            >
              
              <div ref={projectRefs.current[index]} className="relative">
                <ProjectCard 
                  project={project} 
                  index={index} 
                  onSelect={() => setSelectedProject({ data: project, index })}
                />
              </div>

            </div>
          ))}

          {/* Mantendo o espaço final para scroll suave */}
          <div className="h-[50vh] w-full pointer-events-none" />
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