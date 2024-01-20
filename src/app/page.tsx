import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-fit flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4 text-primary">Welcome to Nomad Networks</h1>
      <p className="text-lg mb-4">We specialize in the development of innovative applications and services for digital nomads and remote workers.</p>
      <p className="text-lg mb-4">Our solutions are designed to enhance productivity, streamline workflows, and foster collaboration, no matter where your journey takes you.</p>
      
      <div className="my-5 flex flex-row min-w-fit">
      
        <Link href="/about" className="px-4 py-2 mx-3 rounded bg-primary text-background hover:bg-primary-dark transition-colors">
          Learn more
        </Link>
        
        <Link href="/api/auth/signin" className="px-4 py-2 mx-3 rounded bg-primary text-background hover:bg-primary-dark transition-colors">
          Sign in
        </Link>
      </div>
    </div>
  )
}