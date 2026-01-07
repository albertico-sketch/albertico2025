// Base de datos local usando IndexedDB
class LocalDatabase {
  constructor() {
    this.dbName = 'VetSyncDB'
    this.version = 1
    this.db = null
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve(this.db)
      }

      request.onupgradeneeded = (event) => {
        const db = event.target.result

        // Store para usuarios
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true })
          userStore.createIndex('email', 'email', { unique: true })
          userStore.createIndex('telefono', 'telefono', { unique: false })
        }

        // Store para servicios
        if (!db.objectStoreNames.contains('services')) {
          const serviceStore = db.createObjectStore('services', { keyPath: 'id', autoIncrement: true })
          serviceStore.createIndex('categoria_id', 'categoria_id', { unique: false })
          serviceStore.createIndex('nombre', 'nombre', { unique: false })
        }

        // Store para categorías de servicios
        if (!db.objectStoreNames.contains('categories')) {
          const categoryStore = db.createObjectStore('categories', { keyPath: 'id', autoIncrement: true })
          categoryStore.createIndex('nombre', 'nombre', { unique: true })
        }

        // Store para mascotas
        if (!db.objectStoreNames.contains('pets')) {
          const petStore = db.createObjectStore('pets', { keyPath: 'id', autoIncrement: true })
          petStore.createIndex('cliente_id', 'cliente_id', { unique: false })
          petStore.createIndex('especie_id', 'especie_id', { unique: false })
          petStore.createIndex('raza_id', 'raza_id', { unique: false })
        }

        // Store para especies
        if (!db.objectStoreNames.contains('species')) {
          const speciesStore = db.createObjectStore('species', { keyPath: 'id', autoIncrement: true })
          speciesStore.createIndex('nombre', 'nombre', { unique: true })
        }

        // Store para razas
        if (!db.objectStoreNames.contains('breeds')) {
          const breedStore = db.createObjectStore('breeds', { keyPath: 'id', autoIncrement: true })
          breedStore.createIndex('especie_id', 'especie_id', { unique: false })
          breedStore.createIndex('nombre', 'nombre', { unique: false })
        }

        // Store para citas
        if (!db.objectStoreNames.contains('appointments')) {
          const appointmentStore = db.createObjectStore('appointments', { keyPath: 'id', autoIncrement: true })
          appointmentStore.createIndex('cliente_id', 'cliente_id', { unique: false })
          appointmentStore.createIndex('mascota_id', 'mascota_id', { unique: false })
          appointmentStore.createIndex('servicio_id', 'servicio_id', { unique: false })
          appointmentStore.createIndex('fecha', 'fecha', { unique: false })
          appointmentStore.createIndex('status', 'status', { unique: false })
        }

        // Store para archivos/imágenes
        if (!db.objectStoreNames.contains('files')) {
          const fileStore = db.createObjectStore('files', { keyPath: 'id', autoIncrement: true })
          fileStore.createIndex('entity_type', 'entity_type', { unique: false })
          fileStore.createIndex('entity_id', 'entity_id', { unique: false })
          fileStore.createIndex('filename', 'filename', { unique: false })
        }

        // Store para sesiones/tokens
        if (!db.objectStoreNames.contains('sessions')) {
          const sessionStore = db.createObjectStore('sessions', { keyPath: 'id', autoIncrement: true })
          sessionStore.createIndex('user_id', 'user_id', { unique: false })
          sessionStore.createIndex('token', 'token', { unique: true })
        }
      }
    })
  }

  async getStore(storeName, mode = 'readonly') {
    if (!this.db) await this.init()
    const transaction = this.db.transaction([storeName], mode)
    return transaction.objectStore(storeName)
  }

  // Métodos genéricos CRUD
  async create(storeName, data) {
    const store = await this.getStore(storeName, 'readwrite')
    const request = store.add(data)
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve({ id: request.result, ...data })
      request.onerror = () => reject(request.error)
    })
  }

  async getById(storeName, id) {
    const store = await this.getStore(storeName)
    const request = store.get(id)
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async getAll(storeName) {
    const store = await this.getStore(storeName)
    const request = store.getAll()
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async update(storeName, data) {
    const store = await this.getStore(storeName, 'readwrite')
    const request = store.put(data)
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(data)
      request.onerror = () => reject(request.error)
    })
  }

  async delete(storeName, id) {
    const store = await this.getStore(storeName, 'readwrite')
    const request = store.delete(id)
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(true)
      request.onerror = () => reject(request.error)
    })
  }

  async getByIndex(storeName, indexName, value) {
    const store = await this.getStore(storeName)
    const index = store.index(indexName)
    const request = index.getAll(value)
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  // Método para buscar por múltiples criterios
  async query(storeName, filterFn) {
    const allData = await this.getAll(storeName)
    return allData.filter(filterFn)
  }
}

// Instancia singleton
export const localDB = new LocalDatabase()