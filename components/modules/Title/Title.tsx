interface ModuleProps {
  tag?: 'h1' | 'h2' | 'h3';
  title: string;
  subtitle?: string;
  description?: string;
}

export default function Title({
  tag = 'h1',
  title,
  subtitle,
  description
}: ModuleProps) {
  switch (tag) {
    case 'h1':
      return (
        <>
          {subtitle && (
            <h2 className="text-amber-400 text-lg lg:text-2xl font-bold mb-2">
              {subtitle}
            </h2>
          )}

          <h1 className="text-white text-2xl lg:text-4xl font-bold mb-8">
            {title}
          </h1>

          {description && (
            <p className="text-navy-200 lg:text-lg tracking-wide mb-8">
              {description}
            </p>
          )}
        </>
      );

    case 'h2':
      return (
        <>
          {subtitle && (
            <h3 className="text-amber-400 lg:text-xl font-bold mb-1">
              {subtitle}
            </h3>
          )}

          <h2 className="text-white text-xl lg:text-3xl font-bold mb-4">
            {title}
          </h2>

          {description && (
            <p className="text-navy-200 text-sm lg:text-base tracking-wide mb-6">
              {description}
            </p>
          )}
        </>
      );

    case 'h3':
      return (
        <>
          {subtitle && (
            <h4 className="text-amber-400 text-sm lg:text-lg font-bold">
              {subtitle}
            </h4>
          )}

          <h3 className="text-white text-lg lg:text-2xl font-bold mb-2">
            {title}
          </h3>

          {description && (
            <p className="text-navy-200 text-xs lg:text-sm tracking-wide mb-4">
              {description}
            </p>
          )}
        </>
      );

    default:
      return <></>;
  }
}
