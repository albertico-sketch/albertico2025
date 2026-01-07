import { useState, useRef } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Image } from '@unpic/react'
import { Upload, X } from 'lucide-react'

export function PetImageField({ error, onImageChange, onImageError, initialImage = null }) {
  const [imagePreview, setImagePreview] = useState(initialImage)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleImageFile(files[0])
    }
  }

  const handleImageFile = (file) => {
    if (!file.type.startsWith('image/')) {
      onImageError('Por favor selecciona un archivo de imagen válido')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      onImageError('La imagen no debe superar los 5MB')
      return
    }

    onImageChange(file)

    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  const handleImageSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      handleImageFile(file)
    }
  }

  const handleRemoveImage = () => {
    onImageChange(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="grid gap-2 w-full">
      <Label htmlFor="pet-image">Imagen (opcional)</Label>

      {!imagePreview ? (
        <div
          className="flex items-center justify-center w-full"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <label
            htmlFor="pet-image"
            className={`flex items-center gap-3 w-full p-2 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-accent/10 transition-all duration-300 ${
              isDragOver ? 'border-primary bg-accent scale-[1.02]' : 'border-border hover:border-primary'
            }`}
          >
            <div
              className={`flex items-center justify-center w-15 h-15 bg-muted rounded-lg flex-shrink-0 transition-all duration-300 ${
                isDragOver ? 'bg-primary' : 'group-hover:bg-primary'
              }`}
            >
              <Upload
                className={`w-5 h-5 transition-colors duration-300 ${
                  isDragOver ? 'text-primary-foreground' : 'text-muted-foreground'
                }`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground font-medium truncate">
                {isDragOver ? 'Suelta la imagen aquí' : 'Selecciona una imagen'}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">PNG, JPG, WEBP hasta 5MB</p>
            </div>
            <input
              ref={fileInputRef}
              id="pet-image"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageSelect}
            />
          </label>
        </div>
      ) : (
        <div className=" relative flex items-start gap-3 w-full py-2 px-2 lg:pr-4 border-2 border-dashed border-border rounded-lg bg-card overflow-hidden justify-between">
          <div className="w-15 h-15 lg:w-22 lg:h-22 rounded-sm overflow-hidden flex-shrink-0">
            <Image
              loading='lazy'
              src={imagePreview}
              alt="Preview"
              width={200}
              aspectRatio={1}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm sm:text-lg text-foreground font-medium">Imagen seleccionada</p>
            <p className="text-sm sm:text-base text-muted-foreground mt-0.5">Lista para subir</p>
          </div>
          <Button
            type="button"
            onClick={handleRemoveImage}
            className="flex items-center justify-center w-8 h-8 transition-colors bg-red-500/80 hover:bg-red-500/90 text-white ml-auto self-start rounded-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 lg:mr-[-.5rem]"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  )
}
