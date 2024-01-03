import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-background p-8 rounded shadow">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
        <p className="text-lg">This is a simple home page built with Tailwind CSS.</p>
        <Link href="/about" className="text-primary hover:underline">
          Learn more
        </Link>
      </div>
    </div>
  )
}
