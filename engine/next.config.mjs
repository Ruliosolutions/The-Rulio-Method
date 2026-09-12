/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone", // For Docker / standalone Node server
  // The /api routes need a Node.js runtime (Stripe webhooks, Resend,
  // Supabase service-role). Static export is removed; the engine is
  // now a fully server-rendered Next.js app.
};

export default nextConfig;
