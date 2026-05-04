import './globals.css'

export const metadata = {
  title: 'KAH Prime Cockpit',
  description: 'KAH Prime Codex cockpit prototype',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
