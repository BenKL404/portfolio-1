// AnimatedBackground est désactivé car il écrase le fond neumorphique.
// Il suffit que body ait background: var(--bg) via index.css.
export default function AnimatedBackground({ theme: _ }: { theme: 'light' | 'dark' }) {
  return null;
}
