import { careerReel } from "@/content/profile";

/**
 * The career reel: education, the five roles before the current one, results,
 * competencies and the platforms shipped in the current role. No autoplay and
 * no sound until asked; `preload="none"` keeps the MP4 off the critical path
 * and the poster is the settled closing frame. The video is text and music
 * only; the transcript below it is the text equivalent.
 */
export function CareerReel() {
  return (
    <figure className="flex flex-col gap-3">
      <video
        className="aspect-video w-full rounded-lg border border-line bg-surface-sunken"
        controls
        playsInline
        preload="none"
        poster={careerReel.poster}
        aria-describedby="career-reel-caption"
      >
        <source src={careerReel.src} type="video/mp4" />
      </video>
      <figcaption id="career-reel-caption" className="text-sm leading-relaxed text-text-muted">
        {careerReel.caption}
      </figcaption>
      {/* The reel carries its information as on-screen text over music, so
          this is its full text equivalent, not a summary. */}
      <details className="rounded-lg border border-line bg-surface px-4 py-3 text-sm text-text-muted">
        <summary className="cursor-pointer font-semibold text-text">Read the full transcript</summary>
        <ol className="mt-3 flex list-decimal flex-col gap-2 pl-5 leading-relaxed">
          {careerReel.transcript.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
      </details>
    </figure>
  );
}
