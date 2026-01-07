// Sistema de almacenamiento de archivos local
class FileStorage {
  constructor() {
    this.dbName = 'VetSyncFiles'
    this.version = 1
  }

  // Convertir archivo a base64 para almacenamiento
  async fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  // Convertir base64 a blob para mostrar
  base64ToBlob(base64, mimeType) {
    const byteCharacters = atob(base64.split(',')[1])
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], { type: mimeType })
  }

  // Guardar archivo
  async saveFile(file, entityType, entityId, filename = null) {
    try {
      const base64Data = await this.fileToBase64(file)
      const fileData = {
        entity_type: entityType, // 'pet', 'service', 'user'
        entity_id: entityId,
        filename: filename || file.name,
        mime_type: file.type,
        size: file.size,
        data: base64Data,
        created_at: new Date().toISOString()
      }

      const { localDB } = await import('./database.js')
      const result = await localDB.create('files', fileData)
      return result
    } catch (error) {
      console.error('Error saving file:', error)
      throw error
    }
  }

  // Obtener archivo por ID
  async getFile(fileId) {
    try {
      const { localDB } = await import('./database.js')
      return await localDB.getById('files', fileId)
    } catch (error) {
      console.error('Error getting file:', error)
      throw error
    }
  }

  // Obtener archivos por entidad
  async getFilesByEntity(entityType, entityId) {
    try {
      const { localDB } = await import('./database.js')
      const files = await localDB.getByIndex('files', 'entity_type', entityType)
      return files.filter(file => file.entity_id === entityId)
    } catch (error) {
      console.error('Error getting files by entity:', error)
      throw error
    }
  }

  // Obtener URL del archivo para mostrar
  async getFileUrl(fileId) {
    try {
      const file = await this.getFile(fileId)
      if (!file) return null

      const blob = this.base64ToBlob(file.data, file.mime_type)
      return URL.createObjectURL(blob)
    } catch (error) {
      console.error('Error getting file URL:', error)
      return null
    }
  }

  // Eliminar archivo
  async deleteFile(fileId) {
    try {
      const { localDB } = await import('./database.js')
      return await localDB.delete('files', fileId)
    } catch (error) {
      console.error('Error deleting file:', error)
      throw error
    }
  }

  // Eliminar archivos por entidad
  async deleteFilesByEntity(entityType, entityId) {
    try {
      const files = await this.getFilesByEntity(entityType, entityId)
      const { localDB } = await import('./database.js')
      
      for (const file of files) {
        await localDB.delete('files', file.id)
      }
      return true
    } catch (error) {
      console.error('Error deleting files by entity:', error)
      throw error
    }
  }

  // Actualizar archivo
  async updateFile(fileId, newFile) {
    try {
      const existingFile = await this.getFile(fileId)
      if (!existingFile) throw new Error('File not found')

      const base64Data = await this.fileToBase64(newFile)
      const updatedFile = {
        ...existingFile,
        filename: newFile.name,
        mime_type: newFile.type,
        size: newFile.size,
        data: base64Data,
        updated_at: new Date().toISOString()
      }

      const { localDB } = await import('./database.js')
      return await localDB.update('files', updatedFile)
    } catch (error) {
      console.error('Error updating file:', error)
      throw error
    }
  }
}

export const fileStorage = new FileStorage()