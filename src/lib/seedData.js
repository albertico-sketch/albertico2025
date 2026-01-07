// Datos iniciales para poblar la base de datos
export const seedData = {
  categories: [
    { id: 1, nombre: 'Veterinaria', descripcion: 'Servicios médicos veterinarios' },
    { id: 2, nombre: 'Estética', descripcion: 'Servicios de estética y cuidado' }
  ],

  services: [
    {
      id: 1,
      nombre: 'Consulta Médica General',
      descripcion: 'Examen médico completo para evaluar el estado de salud general de tu mascota',
      precio: 350,
      duracion_estimada: 30,
      categoria_id: 1,
      img_url: 'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=800',
      disponible: true
    },
    {
      id: 2,
      nombre: 'Vacunación Completa',
      descripcion: 'Aplicación de vacunas esenciales según el calendario de vacunación',
      precio: 280,
      duracion_estimada: 20,
      categoria_id: 1,
      img_url: 'https://images.pexels.com/photos/6235657/pexels-photo-6235657.jpeg?auto=compress&cs=tinysrgb&w=800',
      disponible: true
    },
    {
      id: 3,
      nombre: 'Desparasitación',
      descripcion: 'Tratamiento para eliminar parásitos internos y externos',
      precio: 200,
      duracion_estimada: 15,
      categoria_id: 1,
      img_url: 'https://images.pexels.com/photos/6235020/pexels-photo-6235020.jpeg?auto=compress&cs=tinysrgb&w=800',
      disponible: true
    },
    {
      id: 4,
      nombre: 'Esterilización',
      descripcion: 'Cirugía de esterilización para control reproductivo',
      precio: 1200,
      duracion_estimada: 120,
      categoria_id: 1,
      img_url: 'https://images.pexels.com/photos/6235128/pexels-photo-6235128.jpeg?auto=compress&cs=tinysrgb&w=800',
      disponible: true
    },
    {
      id: 5,
      nombre: 'Análisis de Sangre',
      descripcion: 'Exámenes de laboratorio para diagnóstico médico',
      precio: 450,
      duracion_estimada: 45,
      categoria_id: 1,
      img_url: 'https://images.pexels.com/photos/6235224/pexels-photo-6235224.jpeg?auto=compress&cs=tinysrgb&w=800',
      disponible: true
    },
    {
      id: 6,
      nombre: 'Baño Básico',
      descripcion: 'Baño completo con champú especializado y secado',
      precio: 180,
      duracion_estimada: 45,
      categoria_id: 2,
      img_url: 'https://images.pexels.com/photos/6816861/pexels-photo-6816861.jpeg?auto=compress&cs=tinysrgb&w=800',
      disponible: true
    },
    {
      id: 7,
      nombre: 'Corte de Pelo',
      descripcion: 'Corte y arreglo del pelaje según la raza y preferencias',
      precio: 250,
      duracion_estimada: 60,
      categoria_id: 2,
      img_url: 'https://images.pexels.com/photos/6816848/pexels-photo-6816848.jpeg?auto=compress&cs=tinysrgb&w=800',
      disponible: true
    },
    {
      id: 8,
      nombre: 'Limpieza de Oídos',
      descripcion: 'Limpieza profunda y cuidado de los oídos',
      precio: 120,
      duracion_estimada: 20,
      categoria_id: 2,
      img_url: 'https://images.pexels.com/photos/6816854/pexels-photo-6816854.jpeg?auto=compress&cs=tinysrgb&w=800',
      disponible: true
    },
    {
      id: 9,
      nombre: 'Cepillado de Dientes',
      descripcion: 'Limpieza dental y cuidado de la higiene bucal',
      precio: 150,
      duracion_estimada: 25,
      categoria_id: 2,
      img_url: 'https://images.pexels.com/photos/6816859/pexels-photo-6816859.jpeg?auto=compress&cs=tinysrgb&w=800',
      disponible: true
    },
    {
      id: 10,
      nombre: 'Tratamiento Antipulgas',
      descripcion: 'Aplicación de tratamiento para eliminar pulgas y garrapatas',
      precio: 200,
      duracion_estimada: 30,
      categoria_id: 2,
      img_url: 'https://images.pexels.com/photos/6816856/pexels-photo-6816856.jpeg?auto=compress&cs=tinysrgb&w=800',
      disponible: true
    }
  ],

  species: [
    { id: 1, nombre: 'Perro' },
    { id: 2, nombre: 'Gato' },
    { id: 3, nombre: 'Ave' },
    { id: 4, nombre: 'Roedor' },
    { id: 5, nombre: 'Reptil' }
  ],

  breeds: [
    // Perros
    { id: 1, nombre: 'Labrador Retriever', especie_id: 1 },
    { id: 2, nombre: 'Golden Retriever', especie_id: 1 },
    { id: 3, nombre: 'Pastor Alemán', especie_id: 1 },
    { id: 4, nombre: 'Bulldog Francés', especie_id: 1 },
    { id: 5, nombre: 'Chihuahua', especie_id: 1 },
    { id: 6, nombre: 'Poodle', especie_id: 1 },
    { id: 7, nombre: 'Rottweiler', especie_id: 1 },
    { id: 8, nombre: 'Yorkshire Terrier', especie_id: 1 },
    { id: 9, nombre: 'Beagle', especie_id: 1 },
    { id: 10, nombre: 'Mestizo', especie_id: 1 },

    // Gatos
    { id: 11, nombre: 'Persa', especie_id: 2 },
    { id: 12, nombre: 'Siamés', especie_id: 2 },
    { id: 13, nombre: 'Maine Coon', especie_id: 2 },
    { id: 14, nombre: 'Británico de Pelo Corto', especie_id: 2 },
    { id: 15, nombre: 'Ragdoll', especie_id: 2 },
    { id: 16, nombre: 'Bengalí', especie_id: 2 },
    { id: 17, nombre: 'Mestizo', especie_id: 2 },

    // Aves
    { id: 18, nombre: 'Canario', especie_id: 3 },
    { id: 19, nombre: 'Periquito', especie_id: 3 },
    { id: 20, nombre: 'Loro', especie_id: 3 },
    { id: 21, nombre: 'Cacatúa', especie_id: 3 },

    // Roedores
    { id: 22, nombre: 'Hámster', especie_id: 4 },
    { id: 23, nombre: 'Conejo', especie_id: 4 },
    { id: 24, nombre: 'Cobaya', especie_id: 4 },
    { id: 25, nombre: 'Chinchilla', especie_id: 4 },

    // Reptiles
    { id: 26, nombre: 'Iguana', especie_id: 5 },
    { id: 27, nombre: 'Gecko', especie_id: 5 },
    { id: 28, nombre: 'Tortuga', especie_id: 5 }
  ]
}

// Función para inicializar la base de datos con datos semilla
export async function initializeDatabase() {
  const { localDB } = await import('./database.js')
  
  try {
    await localDB.init()

    // Verificar si ya hay datos
    const existingCategories = await localDB.getAll('categories')
    if (existingCategories.length > 0) {
      console.log('Database already initialized')
      return
    }

    console.log('Initializing database with seed data...')

    // Insertar categorías
    for (const category of seedData.categories) {
      await localDB.create('categories', category)
    }

    // Insertar servicios
    for (const service of seedData.services) {
      await localDB.create('services', service)
    }

    // Insertar especies
    for (const species of seedData.species) {
      await localDB.create('species', species)
    }

    // Insertar razas
    for (const breed of seedData.breeds) {
      await localDB.create('breeds', breed)
    }

    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Error initializing database:', error)
    throw error
  }
}