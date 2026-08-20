/**
 * Brand marks for the social links, drawn monochrome in `currentColor` so
 * every surface styles them with the surrounding text colour and hover state
 * rather than each network's own palette.
 */

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 256 256"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
        fill="currentColor"
      />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg fill="none" viewBox="0 0 1200 1227" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
      />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 256 180"
      aria-hidden="true"
      className={className}
    >
      {/* The play triangle is a subpath of the lozenge; evenodd punches it out
          now the mark is one colour instead of red plus white. */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134ZM102.421 128.06V51.224l66.328 38.418-66.328 38.418Z"
      />
    </svg>
  );
}

export function SocialIcon({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  if (/linkedin/i.test(label)) return <LinkedInIcon className={className} />;
  if (/twitter|^x$/i.test(label)) return <XIcon className={className} />;
  if (/youtube/i.test(label)) return <YouTubeIcon className={className} />;
  return null;
}
