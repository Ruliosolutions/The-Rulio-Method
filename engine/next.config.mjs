/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Output 'standalone' is the Docker-shippable Node.js build.
  // For Cloudflare Pages deploy, we use the default output (Pages handles it).
  output: "standalone",
  experimental: {
    // For Cloudflare Workers / Pages runtime — all API routes use
    // edge-compatible operations.
  },
  // The /api routes need a Node.js runtime (Stripe webhooks, Resend,
  // Supabase service-role). Static export is removed; the engine is
  // now a fully server-rendered Next.js app.
};

export default nextConfig;
