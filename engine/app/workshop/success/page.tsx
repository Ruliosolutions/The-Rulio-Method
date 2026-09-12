/**
 * /workshop/success?session_id=...
 *
 * The user lands here after a successful Stripe Checkout. The webhook
 * has already inserted the row and sent the email by the time this
 * page renders, so we just say "you're in."
 */

import Link from "next/link";

export default function WorkshopSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  return (
    <main className="min-h-screen bg-[#0c0c0e] text-[#f4f1ea] px-6 py-20">
      <div className="max-w-xl mx-auto text-center">
        <div className="text-6xl mb-6">✓</div>
        <h1 className="font-serif text-4xl font-light tracking-tight mb-4">
          You're in.
        </h1>
        <p className="text-[#a1a1aa] mb-8">
          Your seat for the Energy Reset Workshop is confirmed.
          The Zoom link and the prep notes are in your inbox.
        </p>
        {searchParams.session_id && (
          <p className="font-mono text-xs text-[#a1a1aa] mb-8">
            Reference: {searchParams.session_id}
          </p>
        )}
        <div className="border border-white/10 rounded-lg p-6 text-left bg-white/2">
          <p className="font-mono text-xs uppercase tracking-widest text-[#5BB8FF] mb-3">
            Three things to bring
          </p>
          <ol className="space-y-2 text-sm text-[#f4f1ea] list-decimal pl-5">
            <li><strong>Headphones.</strong> The L signal goes in one ear, the R signal in the other. Speakers will collapse the effect.</li>
            <li><strong>A pen.</strong> We'll design your protocol live. 3 sentences: worst state, hardest hour, sleep window.</li>
            <li><strong>An open hour after the workshop.</strong> No calls, no email. The protocol is 5 min × 5. It works if you run it.</li>
          </ol>
        </div>
        <div className="mt-8 flex gap-3 justify-center">
          <Link href="/qi" className="text-sm text-[#8FD1FF] hover:underline">
            Browse the 14 free Qi sessions
          </Link>
          <span className="text-[#a1a1aa]">·</span>
          <Link href="/" className="text-sm text-[#8FD1FF] hover:underline">
            Rulio Engine home
          </Link>
        </div>
      </div>
    </main>
  );
}
