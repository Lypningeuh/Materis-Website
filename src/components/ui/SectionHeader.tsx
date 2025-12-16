interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-14 md:mb-16 ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <p
          className={`text-sm font-medium tracking-widest uppercase mb-4 ${
            light ? "text-dore-light" : "text-dore"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-serif leading-tight ${
          light ? "text-blanc" : "text-noir"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-lg max-w-2xl leading-relaxed ${
            centered ? "mx-auto" : ""
          } ${light ? "text-blanc/70" : "text-noir-light"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

