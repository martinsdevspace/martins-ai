'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { IconDownload, IconArrowUpRight, IconLoader2, IconFileCheck } from '@tabler/icons-react'

interface Highlight {
  value?: string | null
  label?: string | null
}

interface ResumeInteractiveProps {
  name: string
  version?: string | null
  highlights: Highlight[]
  downloadFilename: string
  children: React.ReactNode
}

/**
 * Wraps the server-rendered `ResumeDocument` with the interactive shell:
 * a sticky download bar, an animated hero, a CMS-driven highlights strip,
 * and the html2canvas → jsPDF export flow. Kept as a thin client wrapper
 * around server-rendered children (rather than making the whole page a
 * client component) so the actual resume content stays a server component.
 */
export default function ResumeInteractive({
  name,
  version,
  highlights,
  downloadFilename,
  children,
}: ResumeInteractiveProps) {
  const resumeRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    if (!resumeRef.current || downloading) return
    setDownloading(true)
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ])

      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false,
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = pdfWidth
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      let heightLeft = imgHeight
      let position = 0
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pdfHeight
      while (heightLeft > 0) {
        position -= pdfHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pdfHeight
      }
      pdf.save(downloadFilename)
    } catch (e) {
      console.error('PDF generation failed:', e)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <>
      {/* Sticky action bar */}
      <section className="sticky top-14 z-40 flex items-center justify-between gap-4 border-b border-border bg-background/95 px-5 py-3 backdrop-blur-sm lg:px-[6vw]">
        <div className="flex min-w-0 items-center gap-3">
          <IconFileCheck className="h-4 w-4 shrink-0 text-synthesis" />
          <span className="truncate font-mono-label text-muted-foreground">
            CV.{name.replace(/\s+/g, '_').toUpperCase()}
          </span>
          {version ? (
            <span className="hidden font-mono text-[10px] tracking-wider text-synthesis sm:inline">
              {version}
            </span>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="group inline-flex items-center gap-2 bg-foreground px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-background transition-colors hover:bg-synthesis disabled:opacity-50"
          >
            {downloading ? (
              <IconLoader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <IconDownload className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">{downloading ? 'Generating...' : 'Download_PDF'}</span>
            <span className="sm:hidden">{downloading ? '...' : 'PDF'}</span>
          </button>
          <Link
            href="/contact"
            className="hidden items-center gap-2 py-2.5 font-mono text-[11px] uppercase tracking-wider text-foreground transition-colors hover:text-synthesis md:inline-flex"
          >
            Hire_Me <IconArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="px-5 pb-16 pt-24 lg:px-[6vw] lg:pb-24 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="font-mono-label text-muted-foreground">0x001 // CURRICULUM_VITAE</span>
          <span className="flex items-center gap-1.5 font-mono-label text-synthesis">
            <span className="h-1 w-1 animate-pulse bg-synthesis" /> READY_TO_HIRE
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8 font-heading font-light leading-[0.95] text-foreground"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
        >
          Experience
          <br />
          <span className="text-synthesis">That Ships.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 max-w-2xl text-lg leading-relaxed text-foreground/75 lg:text-xl"
        >
          Production systems, not tutorials or prototypes. Real code serving real users. Download the
          full CV or book a call.
        </motion.p>

        {highlights.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-4"
          >
            {highlights.map((h, index) => (
              <div key={h.label || index} className="bg-background p-6 lg:p-8">
                <div
                  className="mb-2 font-heading font-light leading-none text-synthesis"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                >
                  {h.value}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {h.label}
                </div>
              </div>
            ))}
          </motion.div>
        ) : null}
      </section>

      {/* Document */}
      <section className="px-5 pb-20 lg:px-[6vw] lg:pb-32">
        <div className="mb-8 flex items-center justify-between">
          <span className="font-mono-label text-muted-foreground">0x002 // DOCUMENT</span>
          <span className="hidden font-mono-label text-muted-foreground sm:inline">
            A4 · PRINT_READY
          </span>
        </div>
        <div className="mx-auto max-w-[800px]">
          <div ref={resumeRef} className="shadow-2xl">
            {children}
          </div>
        </div>
        {/* Mobile download */}
        <div className="mt-8 flex justify-center md:hidden">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="group inline-flex items-center gap-2 bg-foreground px-6 py-3.5 font-mono text-[11px] uppercase tracking-wider text-background transition-colors hover:bg-synthesis disabled:opacity-50"
          >
            {downloading ? (
              <IconLoader2 className="h-4 w-4 animate-spin" />
            ) : (
              <IconDownload className="h-4 w-4" />
            )}
            {downloading ? 'Generating PDF...' : 'Download Full CV'}
          </button>
        </div>
      </section>
    </>
  )
}
