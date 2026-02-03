export const PROJECTS = [
  {
    title: "Nexus CRM & Mensageria",
    // CORREÇÃO: Remova o ../../assets/ e use o caminho da pasta public
    image: "/images/crm.png", 
    year: "2025",
    role: "Fullstack Architect",
    tags: ["Node.js", "Socket.io", "React"],
    deploy: 'http://212.85.23.244:5173',
    github: null,
    description: [
      "Um ecossistema robusto de gestão de relacionamento com o cliente (CRM) focado em centralização de canais. O sistema unifica atendimentos via WhatsApp, E-mail e SMS em um único dashboard em tempo real.",
      "Desenvolvi a arquitetura de microsserviços para lidar com alto volume de mensagens simultâneas, garantindo entrega e persistência de dados crítica para operações de vendas."
    ]
  },
  {
    title: "EmagreçaJá Mobile",
    // CORREÇÃO: Caminho direto da public
    image: "/images/emagrecaja.png", 
    year: "2026",
    role: "Mobile Lead",
    tags: ["React Native", "Firebase", "Data Visualization", "React", "Node.Js"],
    deploy: 'http://212.85.23.244:5175',
    github: null,
    description: [
      "Aplicação mobile focada na conexão entre personal trainers/nutricionistas e alunos. O app oferece ferramentas avançadas para análise de evolução corporal, gráficos de perda de peso ou ganho de massa e chat integrado.",
      "O maior desafio foi criar uma interface intuitiva para input diário de métricas, mantendo a performance fluida em dispositivos Android e iOS de entrada."
    ]
  },
  {
    title: "VibeVault Commerce",
    image: null, 
    year: "2025",
    role: "TCC / Fullstack",
    tags: ["React", "Express.js", "PostgreSQL", "Stripe", "UI/UX", "Adianti Framework"],
    deploy: null,
    github: "https://github.com/guigasprog/vibevault-development.git",
    description: [
      "Meu projeto de TCC. Uma plataforma de e-commerce completa projetada especificamente para empoderar pequenos empreendedores digitais.",
      "Foca em uma experiência de usuário (UX) simplificada para o lojista, permitindo a criação de uma loja virtual profissional em poucos cliques."
    ]
  },
  {
    title: "QuestTerm RPG",
    // CORREÇÃO: Caminho direto da public
    image: "/images/questterm.png", 
    year: "2025",
    role: "Game Dev",
    tags: ["React", "Game Design", "Algorithms"],
    deploy: "https://guigasprog.github.io/QuestTerm/",
    github: "https://github.com/guigasprog/QuestTerm.git",
    description: [
      "Uma fusão entre desenvolvimento de software e gamificação. O QuestTerm é um jogo RPG jogável diretamente no terminal.",
      "O projeto explora estruturas de dados complexas e gestão de memória manual, servindo como um 'playground' técnico."
    ]
  },
  {
    title: "Youtube MP3 Downloader",
    image: null, 
    year: "2025",
    role: "Frontend Engineer",
    tags: ["React", "API Integration", "FFmpeg", "Media Processing"],
    deploy: null,
    github: "https://github.com/guigasprog/mp3-downloader-yt-client.git",
    description: [
      "Ferramenta web para extração de áudio de vídeos e playlists completas do YouTube.",
      "Implementei um sistema de filas no backend para processar múltiplas requisições simultâneas sem travar a interface do usuário."
    ]
  }
]