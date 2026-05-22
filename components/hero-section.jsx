"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const containerRef = useRef(null)
  const stickyRef = useRef(null)
  const curtainRef = useRef(null)

  // Unified content refs (using a single set of elements with mix-blend-mode: difference)
  const helloRef = useRef(null)
  const nameRef = useRef(null)
  const bottomLeftRef = useRef(null)
  const bottomRightRef = useRef(null)

  useEffect(() => {
    const curtain = curtainRef.current
    if (!curtain) return

    const handleMouseMove = (e) => {
      const pct = Math.max(0, Math.min(100, (e.clientX / window.innerWidth) * 100))
      gsap.to(curtain, {
        width: `${pct}%`,
        duration: 0.6,
        ease: "power3.out",
      })
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D Perspective entrance for hello and name
      const titleEls = [helloRef.current, nameRef.current]
      const bottomEls = [bottomLeftRef.current, bottomRightRef.current]

      titleEls.forEach((el, i) => {
        if (!el) return
        gsap.set(el, {
          rotateX: -100, y: "60%", z: "-3vw", opacity: 0,
          transformStyle: "preserve-3d",
        })
        gsap.to(el, {
          rotateX: 0, y: 0, z: 0, opacity: 1,
          duration: 1.2, delay: 0.2 + i * 0.2, ease: "power3.out",
        })
      })

      bottomEls.forEach((el, i) => {
        if (!el) return
        gsap.set(el, { y: 20, opacity: 0 })
        gsap.to(el, {
          y: 0, opacity: 1,
          duration: 0.8, delay: 0.7 + i * 0.15, ease: "power3.out",
        })
      })

      // Scroll animations - parting hello (left) and name (right) with scaling
      if (helloRef.current) {
        gsap.to(helloRef.current, {
          x: "-110vw", ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top top", end: "55% top", scrub: 1.2 },
        })
        gsap.to(helloRef.current, {
          scale: 5, ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "20% top", end: "70% top", scrub: 1.5 },
        })
      }

      if (nameRef.current) {
        gsap.to(nameRef.current, {
          x: "110vw", ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top top", end: "55% top", scrub: 1.2 },
        })
        gsap.to(nameRef.current, {
          scale: 4.5, ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "20% top", end: "70% top", scrub: 1.5 },
        })
      }

      // Bottom bar elements fade & slide out on scroll
      bottomEls.forEach((el) => {
        if (!el) return
        gsap.to(el, {
          opacity: 0, y: -20, ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "5% top", end: "25% top", scrub: 1 },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  const helloStyle = {
    fontSize: "clamp(80px, 15vw, 220px)",
    fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em",
    textAlign: "right", margin: 0, userSelect: "none", willChange: "transform",
  }

  const nameStyle = {
    fontSize: "clamp(80px, 15vw, 220px)",
    fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em",
    textAlign: "right", marginTop: "1rem", userSelect: "none", willChange: "transform",
  }

  const perspectiveWrap = {
    perspective: "400px", perspectiveOrigin: "50% 100%", transformOrigin: "50% 100%",
  }

  return (
    <div ref={containerRef} id="hero" style={{ height: "300vh", position: "relative" }}>
      <div
        ref={stickyRef}
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
      >
        {/* ═══════════ LAYER 1: LIGHT BACKGROUND ═══════════ */}
        <div
          style={{
            position: "absolute", inset: 0, background: "#ffffff",
          }}
        />

        {/* ═══════════ LAYER 2: DARK CURTAIN ═══════════ */}
        <div
          ref={curtainRef}
          style={{
            position: "absolute", top: 0, left: 0, bottom: 0,
            width: "1vw", background: "#100f10", overflow: "hidden", zIndex: 2,
          }}
        />

        {/* ═══════════ CONTENT LAYER (WITH BLEND PROPERTY) ═══════════ */}
        <div
          style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column", justifyContent: "center",
            padding: "0 clamp(1.5rem, 5vw, 5rem)",
            zIndex: 3,
            mixBlendMode: "difference",
            color: "#ffffff",
            pointerEvents: "none",
          }}
        >
          <div style={perspectiveWrap}>
            <div ref={helloRef} style={{ ...helloStyle, color: "#ffffff" }}>hello</div>
          </div>
          <div style={perspectiveWrap}>
            <h1 ref={nameRef} style={{ ...nameStyle, color: "#ffffff" }}>I&apos;m Aditya</h1>
          </div>

          <div style={{
            position: "absolute", bottom: "2.5rem",
            left: "clamp(1.5rem, 5vw, 5rem)", right: "clamp(1.5rem, 5vw, 5rem)",
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          }}>
            <div ref={bottomLeftRef}>
              <h3 style={{
                fontSize: "clamp(1.2rem, 2vw, 1.8rem)", fontWeight: 800,
                color: "#ffffff", margin: 0, letterSpacing: "-0.02em",
              }}>Galgotias&apos;27</h3>
            </div>
            <div ref={bottomRightRef}>
              <a href="mailto:adityabhardwaj3369@gmail.com?subject=Portfolio%20Inquiry"
                data-hoverable style={{
                  fontSize: "0.9rem", fontWeight: 600, color: "#ffffff",
                  position: "relative", display: "inline-block",
                  pointerEvents: "auto",
                }}>
                Contact
                <span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: "1.5px", background: "#ffffff" }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
