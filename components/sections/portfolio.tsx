"use client";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { ProjectGrid } from "@/components/projects/project-grid";

export function Portfolio() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
    isDragging: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);
  const [scrollState, setScrollState] = useState({ canScrollBack: false, canScrollForward: true });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function updateScrollState() {
      const currentTrack = trackRef.current;
      if (!currentTrack) return;
      setScrollState({
        canScrollBack: currentTrack.scrollLeft > 4,
        canScrollForward: currentTrack.scrollLeft + currentTrack.clientWidth < currentTrack.scrollWidth - 4,
      });
    }

    const observer = new ResizeObserver(updateScrollState);
    observer.observe(track);
    track.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  function scrollProjects(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({
      left: direction * track.clientWidth * 0.8,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (event.pointerType !== "mouse" || event.button !== 0 || !track) return;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
      isDragging: false,
    };
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    const drag = dragRef.current;
    if (!track || !drag || drag.pointerId !== event.pointerId) return;

    const distance = event.clientX - drag.startX;
    if (!drag.isDragging && Math.abs(distance) < 6) return;
    if (!drag.isDragging) {
      drag.isDragging = true;
      track.classList.add("is-dragging");
      track.setPointerCapture(event.pointerId);
    }

    event.preventDefault();
    track.scrollLeft = drag.startScrollLeft - distance;
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    const drag = dragRef.current;
    if (!track || !drag || drag.pointerId !== event.pointerId) return;

    dragRef.current = null;
    if (!drag.isDragging) return;

    track.classList.remove("is-dragging");
    suppressClickRef.current = true;
    const trackLeft = track.getBoundingClientRect().left;
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".poc-portfolio-grid .project-tile"));
    const nearestCard = cards.reduce<HTMLElement | null>((nearest, card) => {
      if (!nearest) return card;
      const cardPosition = card.getBoundingClientRect().left - trackLeft + track.scrollLeft;
      const nearestPosition = nearest.getBoundingClientRect().left - trackLeft + track.scrollLeft;
      return Math.abs(cardPosition - track.scrollLeft) < Math.abs(nearestPosition - track.scrollLeft)
        ? card
        : nearest;
    }, null);

    if (nearestCard) {
      const snapLeft = nearestCard.getBoundingClientRect().left - trackLeft + track.scrollLeft;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.scrollTo({ left: snapLeft, behavior: reducedMotion ? "auto" : "smooth" });
    }

    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
  }

  return (
    <section id="portfolio" className="poc-section poc-container poc-portfolio">
      <span id="Portfolio" className="poc-anchor" aria-hidden="true" />
      <div className="poc-portfolio-layout">
        <div className="poc-portfolio-intro">
          <h2>Bekijk ons werk</h2>
          <p>Bekijk foto's van ons werk en ontdek onze projecten.</p>
          <div className="poc-portfolio-actions">
            <div className="poc-portfolio-controls" role="group" aria-label="Projecten doorbladeren">
              <button type="button" aria-label="Vorige projecten" disabled={!scrollState.canScrollBack} onClick={() => scrollProjects(-1)}>
                <ArrowLeft aria-hidden="true" size={19} />
              </button>
              <button type="button" aria-label="Volgende projecten" disabled={!scrollState.canScrollForward} onClick={() => scrollProjects(1)}>
                <ArrowRight aria-hidden="true" size={19} />
              </button>
            </div>
            <Link className="poc-portfolio-all" href="/projecten">
              Bekijk al het werk <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
        <div
          className="poc-portfolio-track"
          ref={trackRef}
          role="region"
          aria-label="Projectfoto's"
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onDragStart={(event) => event.preventDefault()}
          onClickCapture={(event) => {
            if (!suppressClickRef.current) return;
            event.preventDefault();
            event.stopPropagation();
            suppressClickRef.current = false;
          }}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              scrollProjects(-1);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              scrollProjects(1);
            }
          }}
        >
          <ProjectGrid projects={projects} className="project-grid poc-portfolio-grid" />
        </div>
      </div>
    </section>
  );
}
