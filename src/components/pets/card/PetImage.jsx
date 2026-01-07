import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Image } from '@unpic/react'
import { Dog } from 'lucide-react'

export function PetImage({ src, alt, className }) {
  const [hasError, setHasError] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const handleError = () => {
    setHasError(true)
  }

  const handleLoad = () => {
    setImgLoaded(true)
  }

  if (!src || hasError) {
    return (
      <div className={`${className} bg-gray-100 border-2 border-gray-200 flex items-center justify-center`}>
        <Dog className="w-2/3 h-2/3 text-gray-400" />
      </div>
    )
  }

  return (
    <div className={`relative ${className} rounded-full overflow-hidden`}>
      {!imgLoaded && (
        <Skeleton className="absolute inset-0 bg-gray-300 animate-pulse flex items-center justify-center">
          <Dog className="w-3/5 h-3/5 text-gray-400" />
        </Skeleton>
      )}

      <Image
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          imgLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        src={src}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        width={500}
        aspectRatio={1}
        loading="lazy"
      />
    </div>
  )
}
