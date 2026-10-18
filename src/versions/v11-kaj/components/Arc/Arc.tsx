/** A shallow arc under a dark band: its colour hangs down, lowest at the centre. The caller sets the fill. */
export function Arc({ className = '' }: { className?: string }) {
  return (
    <svg className={`-mt-px block h-[clamp(14px,2.2vw,32px)] w-full ${className}`} viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
      {/* drawn in a 1000×100 box and stretched to the width */}
      <path d="M0,0 H1000 Q500,200 0,0Z" />
    </svg>
  )
}
