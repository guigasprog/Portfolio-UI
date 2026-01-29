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
  return (
    <main className="bg-black w-full min-h-screen relative">
      <CustomCursor />
      
      {/* Background Fixo */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
          <Suspense fallback={null}>
            <CodeOrb />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10">
        
        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center p-6 text-center snap-center">
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
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={index} 
              onSelect={() => setSelectedProject({ data: project, index })}
            />
          ))}
        </div>

        <Footer />
        
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