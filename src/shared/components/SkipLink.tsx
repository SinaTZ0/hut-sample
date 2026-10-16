/** First focusable element on every page. Styling lives in each version via the `.skip-link` hook in index.css. */
export function SkipLink({ target = 'main' }: { target?: string }) {
  return (
    <a className="skip-link" href={`#${target}`}>
      پرش به محتوای اصلی
    </a>
  )
}
