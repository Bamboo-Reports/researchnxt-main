import Image from "next/image";
import { trustedLogos } from "@/content/home";

function LogoList({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      className="trusted-logos-list"
      aria-hidden={duplicate ? "true" : undefined}
    >
      {trustedLogos.map((logo) => (
        <li key={`${duplicate ? "duplicate-" : ""}${logo.name}`}>
          <Image
            src={logo.src}
            alt={duplicate ? "" : logo.name}
            width={600}
            height={334}
            sizes="(min-width: 768px) 176px, 144px"
            className="h-14 w-auto max-w-36 object-contain md:h-16 md:max-w-44"
          />
        </li>
      ))}
    </ul>
  );
}

export function TrustedLogos() {
  return (
    <div className="trusted-logos-viewport">
      <div className="trusted-logos-track">
        <LogoList />
        <LogoList duplicate />
      </div>
    </div>
  );
}
