// Importe suas imagens aqui se estiver usando assets locais, 
// ou use caminhos na pasta public (ex: '/images/crm.jpg')

export const PROJECTS = [
  {
    title: "Nexus CRM & Mensageria",
    image: "../assets/crm.png", // Substitua pela imagem real na pasta public/images
    year: "2025",
    role: "Fullstack Architect",
    tags: ["Node.js", "Socket.io", "React"],
    deploy: 'http://212.85.23.244:5173', // Se tiver link de produção, coloque aqui
    github: null, // Privado
    description: [
      "Um ecossistema robusto de gestão de relacionamento com o cliente (CRM) focado em centralização de canais. O sistema unifica atendimentos via WhatsApp, E-mail e SMS em um único dashboard em tempo real.",
      "Desenvolvi a arquitetura de microsserviços para lidar com alto volume de mensagens simultâneas, garantindo entrega e persistência de dados crítica para operações de vendas."
    ]
  },
  {
    title: "EmagreçaJá Mobile",
    image: "../assets/emagrecaja.png", // Substitua
    year: "2026",
    role: "Mobile Lead",
    tags: ["React Native", "Firebase", "Data Visualization", "React", "Node.Js"],
    deploy: 'http://212.85.23.244:5175',
    github: null, // Privado
    description: [
      "Aplicação mobile focada na conexão entre personal trainers/nutricionistas e alunos. O app oferece ferramentas avançadas para análise de evolução corporal, gráficos de perda de peso ou ganho de massa e chat integrado.",
      "O maior desafio foi criar uma interface intuitiva para input diário de métricas, mantendo a performance fluida em dispositivos Android e iOS de entrada."
    ]
  },
  {
    title: "VibeVault Commerce",
    image: null, // Substitua
    year: "2025",
    role: "TCC / Fullstack",
    tags: ["React", "Express.js", "PostgreSQL", "Stripe", "UI/UX", "Adianti Framework"],
    deploy: null,
    github: "https://github.com/guigasprog/vibevault-development.git",
    description: [
      "Meu projeto de TCC. Uma plataforma de e-commerce completa projetada especificamente para empoderar pequenos empreendedores digitais. O sistema abstrai a complexidade de gestão de estoque e pagamentos.",
      "Foca em uma experiência de usuário (UX) simplificada para o lojista, permitindo a criação de uma loja virtual profissional em poucos cliques, com integração de pagamentos e relatórios financeiros automáticos."
    ]
  },
  {
    title: "QuestTerm RPG",
    image: "../assets/questterm.png", // Substitua
    year: "2025",
    role: "Game Dev",
    tags: ["React", "Game Design", "Algorithms"],
    deploy: "https://guigasprog.github.io/QuestTerm/",
    github: "https://github.com/guigasprog/QuestTerm.git",
    description: [
      "Uma fusão entre desenvolvimento de software e gamificação. O QuestTerm é um jogo RPG jogável diretamente no terminal, onde itens e missões são baseados em conceitos de programação.",
      "O projeto explora estruturas de dados complexas e gestão de memória manual, servindo como um 'playground' técnico para demonstrar domínio sobre a base da ciência da computação."
    ]
  },
  {
    title: "Youtube MP3 Downloader",
    image: null, // Substitua
    year: "2025",
    role: "Frontend Engineer",
    tags: ["React", "API Integration", "FFmpeg", "Media Processing"],
    deploy: null,
    github: "https://github.com/guigasprog/mp3-downloader-yt-client.git",
    description: [
      "Ferramenta web para extração de áudio de vídeos e playlists completas do YouTube. Focado em velocidade e qualidade de conversão.",
      "Implementei um sistema de filas no backend para processar múltiplas requisições simultâneas sem travar a interface do usuário, além de suporte a metadados (capa do álbum, artista) nos arquivos baixados."
    ]
  }
]