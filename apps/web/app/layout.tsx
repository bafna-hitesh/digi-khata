// import Provider from '@digi/provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>
        {/* <Provider> */}
          {children}
        {/* </Provider> */}
      </body>
    </html>
  )
}
