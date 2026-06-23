interface WordmarkProps {
  className?: string
  /** Accent utility for the `//` token — overridden on the dark panel. */
  slashClass?: string
}

/**
 * The recurring brand mark: "edig" in the display serif followed by a mono
 * "//" sized to ~0.5em so the double-slash reads like a code path / comment.
 * Decorative slashes are hidden from assistive tech; name the link at usage.
 */
export function Wordmark({ className = '', slashClass = 'text-accent' }: WordmarkProps) {
  return (
    <span className={className}>
      <span className="font-display" style={{ fontWeight: 560 }}>
        edig
      </span>
      <span
        aria-hidden="true"
        className={`font-mono ${slashClass}`}
        style={{ fontSize: '0.5em', letterSpacing: '-0.02em' }}
      >
        //
      </span>
    </span>
  )
}
