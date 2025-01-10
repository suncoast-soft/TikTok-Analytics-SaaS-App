import Image from 'next/image'

interface ColumnProps {
  image: string
  name: string
  position: string
  text: string
}

interface SectionProps {
  header?: string
  columns: ColumnProps[]
}

export default function CardColumnsSection({ header, columns }: SectionProps) {
  return (
    <>
      {header && (
        <h2 className="text-4xl font-extrabold text-center text-slate-900 mb-12">
          {header}
        </h2>
      )}

      <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {columns.map((column: ColumnProps, index: number) => (
          <div
            key={index}
            className="p-6 bg-sky-50 rounded-lg shadow transform hover:-translate-x-1 hover:translate-y-1 transition relative flex gap-4"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden shrink-0">
              <Image
                src={column.image}
                width={240}
                height={240}
                alt={column.name}
                className="w-20 h-20 object-cover"
              />
            </div>

            <div className="h-full flex flex-col justify-between gap-2">
              <blockquote className="italic">
                &quot;{column.text}&quot;
              </blockquote>

              <div className="text-right">
                <p>— {column.name}</p>
                <p className="text-xs text-right text-slate-400">
                  {column.position}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
