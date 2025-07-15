// @ts-nocheck
'use client'
import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { HexColorPicker } from 'react-colorful'
import { getCroppedBlob } from '../utils/cropImage'

export default function PhotoEditor({ onComplete }: { onComplete: (file: File) => void }) {
  const [imageSrc, setImageSrc] = useState<string | undefined>()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [bg, setBg] = useState('#ffffff')
  const [croppedArea, setCroppedArea] = useState<any>()
  const [filter, setFilter] = useState('none')

  const onCropComplete = useCallback((_, areaPixels) => {
    setCroppedArea(areaPixels)
  }, [])

  const handleDone = async () => {
    if (!imageSrc || !croppedArea) return
    const blob = await getCroppedBlob(imageSrc, croppedArea, rotation, bg, filter)
    const file = new File([blob], 'design.png', { type: 'image/png' })
    onComplete(file)
  }

  return (
    <div className="space-y-4">
      {!imageSrc && (
        <input type="file" accept="image/*" onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) setImageSrc(URL.createObjectURL(f))
        }} />
      )}

      {imageSrc && (
        <>
          <div className="relative w-full h-[60vw] md:h-[500px] bg-gray-200">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              objectFit="contain"
            />
            <div className="absolute inset-0" style={{ background: bg, mixBlendMode: 'screen' }} />
            <style>{`.reactEasyCrop_Image{filter:${filter};}`}</style>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <label>Zoom
              <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(+e.target.value)} />
            </label>
            <label>Döndür
              <input type="range" min={0} max={360} value={rotation} onChange={(e) => setRotation(+e.target.value)} />
            </label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border px-2 py-1 rounded">
              <option value="none">Filtre yok</option>
              <option value="grayscale(1)">Gri</option>
              <option value="sepia(1)">Sepya</option>
              <option value="contrast(1.5)">Kontrast</option>
            </select>
            <div className="flex items-center gap-2">
              <span className="text-xs">Arka Plan</span>
              <HexColorPicker color={bg} onChange={setBg} />
            </div>
            <button onClick={handleDone} className="bg-blue-600 text-white px-4 py-2 rounded ml-auto">Devam Et</button>
          </div>
        </>
      )}
    </div>
  )
} 