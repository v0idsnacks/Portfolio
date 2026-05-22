"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function BioSection() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -60, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      })
      gsap.from(rightRef.current, {
        x: 60, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
      })
    })
    return () => ctx.revert()
  }, [])

  const socials = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/adityabhardwaj1910/" },
    { label: "GitHub", href: "https://github.com/TechTitan360" },
    { label: "Email", href: "mailto:adityabhardwaj3369@gmail.com" },
  ]

  return (
    <section
      ref={sectionRef}
      id="bio"
      style={{
        padding: "clamp(5rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem)",
        borderTop: "1px solid var(--border)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4rem",
        alignItems: "start",
      }}
    >
      <div ref={leftRef}>
        <p style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)", fontWeight: 600, lineHeight: 1.45, color: "var(--foreground)", maxWidth: 540 }}>
          Full Stack Developer &amp; UI Engineer. Building pixel-perfect interfaces &amp; scalable systems with React, Next.js, and modern web technologies.
        </p>
        <p style={{ marginTop: "1.8rem", fontSize: "0.9rem", fontWeight: 500, color: "var(--muted)", lineHeight: 1.7, maxWidth: 460 }}>
          Successfully delivered 10+ projects. 300+ algorithm problems solved. Led 100+ members as Web Dev Club Coordinator at Galgotias University.
        </p>
      </div>

      <div ref={rightRef} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {socials.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            data-hoverable
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "1.4rem 0",
              borderBottom: "1px solid var(--border)",
              fontSize: "1.1rem", fontWeight: 700, color: "var(--foreground)",
              transition: "color 0.25s, padding-left 0.3s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.paddingLeft = "12px" }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--foreground)"; e.currentTarget.style.paddingLeft = "0" }}
          >
            {label}
            <span style={{ fontSize: "1.3rem", transition: "transform 0.3s" }}>↗</span>
          </a>
        ))}
      </div>
    </section>
  )
}
