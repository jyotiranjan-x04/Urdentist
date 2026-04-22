import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-pearl flex items-center justify-center">
      <div className="text-center container-content">
        <p className="overline mb-4">Page Not Found</p>
        <h1 className="font-display text-5xl md:text-7xl text-espresso mb-6">
          404
        </h1>
        <p className="font-body text-muted text-lg mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get
          you back to finding the right dental care.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="bg-gold text-pearl px-8 py-3 rounded-xl font-body font-semibold text-sm hover:bg-gold/90 transition-colors shadow-float"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="border border-espresso/20 text-espresso px-8 py-3 rounded-xl font-body font-semibold text-sm hover:bg-sand transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
