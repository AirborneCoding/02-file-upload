import '@/styles/globals.css'
import '@/styles/mynormalize.css'

export const metadata = {
  title: 'File upload',
  description: 'FILE Upload PROJECT',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  )
}
