import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-8">
          <div className="flex items-center gap-3 shrink-0">
            <Image
              src="/images/logo.png"
              alt="Hire Hunt logo"
              width={40}
              height={40}
              className="rounded-xl"
            />
            <span className="text-lg font-extrabold text-foreground">
              Hire<span className="text-gradient"> Hunt</span>
            </span>
          </div>

          <nav className="flex flex-wrap items-center gap-6">
            {[
              { href: "/resume", label: "Resume ATS" },
              { href: "/interview-prep", label: "Interview Prep" },
              { href: "/mock-interview", label: "Mock Interview" },
              { href: "/predictor", label: "Predictor" },
              { href: "/career-path", label: "Career Path" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <p className="text-sm text-muted-foreground">
            Built with AI for your success.
          </p>
        </div>
      </div>
    </footer>
  )
}
