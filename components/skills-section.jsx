"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const skills = [
  {
    num: "01",
    title: "React",
    subtitle: "Developer",
    desc: "Building interactive, accessible UIs with React hooks, context, and component-driven architecture. Expert in performance and reusable design systems.",
  },
  {
    num: "02",
    title: "Backend",
    subtitle: "Systems",
    desc: "Full-stack with Node.js, PostgreSQL, and REST APIs. Experience with real-time features, authentication, and scalable architecture.",
  },
  {
    num: "03",
    title: "Next.js",
    subtitle: "Developer",
    desc: "SSR, API routes, and optimised performance patterns. Building production apps with TypeScript and modern tooling.",
  },
]

export function SkillsSection() {
  const sectionRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el) => {
        if (!el) return
        // Large faded number in background
        const bigNum = el.querySelector(".skill-bg-num")
        if (bigNum) {
          gsap.from(bigNum, {
            scale: 0.8, opacity: 0, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
          })
        }
        // Content
        gsap.from(el.querySelector(".skill-content"), {
          y: 50, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play none none reverse" },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{ padding: "clamp(5rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem)", borderTop: "1px solid var(--border)" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 0,
        }}
      >
        {skills.map((s, i) => (
          <div
            key={i}
            ref={(el) => { if (el) itemsRef.current[i] = el }}
            style={{
              position: "relative",
              padding: "3rem 2.5rem",
              borderRight: i < skills.length - 1 ? "1px solid var(--border)" : "none",
              overflow: "hidden",
              minHeight: 340,
            }}
          >
            {/* Large faded background number */}
            <div
              className="skill-bg-num"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "clamp(8rem, 15vw, 14rem)",
                fontWeight: 800,
                color: "var(--foreground)",
                opacity: 0.04,
                lineHeight: 1,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {s.num}
            </div>

            {/* Content */}
            <div className="skill-content" style={{ position: "relative", zIndex: 1 }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--muted)", letterSpacing: "0.1em", display: "block", marginBottom: "2rem" }}>
                {s.num}
              </span>

              <h3 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95, color: "var(--foreground)" }}>
                {s.title}
                <br />
                {s.subtitle}
              </h3>

              <p style={{ marginTop: "2rem", fontSize: "0.88rem", fontWeight: 500, color: "var(--muted)", lineHeight: 1.65, maxWidth: 280 }}>
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
