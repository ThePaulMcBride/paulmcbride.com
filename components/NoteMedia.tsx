import type { Note } from "lib/dataApi";

function isVideo(url: string) {
  return /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(url);
}

export default function NoteMedia({
  note,
  className = "mt-4",
}: {
  note: Note;
  className?: string;
}) {
  if (!note.media?.length) return null;

  return (
    <div className={`${className} grid gap-4`}>
      {note.media.map((media) =>
        isVideo(media.url) ? (
          <video
            key={media.url}
            src={media.url}
            className="rounded-lg"
            controls
            playsInline
            preload="metadata"
            aria-label={media.alt || "Video attachment"}
          />
        ) : (
          <img
            key={media.url}
            src={media.url}
            alt={media.alt || ""}
            className="rounded-lg"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        )
      )}
    </div>
  );
}
