"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import type { ProjectPhoto } from "@/lib/projects";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function ProjectImage({ images, coverImageId }: { images: ProjectPhoto[]; coverImageId: string }) {
  const [selected, setSelected] = useState(coverImageId);
  const photo = images.find(image => image.id === selected) ?? images[0];
  const { src, alt, width, height } = photo;
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  return <>
    <button ref={opener} type="button" className="project-detail-photo" onClick={() => setOpen(true)} aria-label={`Vergroot foto: ${alt}`}>
      <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 767px) 100vw, 80vw" priority />
      <span>Foto vergroten</span>
    </button>
    {images.length > 1 && <div className="project-gallery-thumbnails" role="group" aria-label="Projectfoto kiezen">{images.map((image, index) => (
      <button key={image.id} type="button" aria-pressed={selected === image.id} aria-label={`Foto ${index + 1}: ${image.alt}`} onClick={() => setSelected(image.id)}>
        <Image src={image.thumbnail} alt="" width={128} height={96} />
      </button>
    ))}</div>}
    <p className="project-photo-counter" aria-live="polite">Foto {images.indexOf(photo) + 1} van {images.length}</p>
    <Dialog open={open} onOpenChange={setOpen}><DialogContent showCloseButton={false} className="sm:max-w-5xl" aria-describedby={undefined} onCloseAutoFocus={(event) => { event.preventDefault(); opener.current?.focus(); }}>
      <DialogTitle>{alt}</DialogTitle>
      <Image src={src} alt={alt} width={width} height={height} className="max-h-[75vh] w-full object-contain" />
      <button type="button" className="poc-button" onClick={() => setOpen(false)}>Foto sluiten</button>
    </DialogContent></Dialog>
  </>;
}
