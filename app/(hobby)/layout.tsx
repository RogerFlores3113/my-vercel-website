import './hobby.css'

export default function HobbyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Sriracha&family=Bricolage+Grotesque:opsz,wght@12..96,300..600&family=JetBrains+Mono:wght@400;500&family=Fraunces:opsz,wght,SOFT@9..144,400..600,0..100&display=swap"
      />
      {children}
    </>
  )
}
