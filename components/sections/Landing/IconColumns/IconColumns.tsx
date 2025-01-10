import { cn } from '@/utils/cn'

interface ColumnProps {
  icon: React.ReactElement
  title: string
  text: string
  color: string
}

interface SectionProps {
  header?: string
  columns: ColumnProps[]
}

export default function IconColumnsSection({ header, columns }: SectionProps) {
  return (
    <>
      {header && (
        <h2 className="text-4xl font-extrabold text-center text-slate-900 mb-12">
          {header}
        </h2>
      )}

      <div className="container p-8 flex flex-col md:flex-row justify-between items-start md:items-center mx-auto shadow-lg">
        {columns.map((column: ColumnProps, index: number) => (
          <div
            key={index}
            className="flex flex-col items-center relative w-full md:w-1/3 mb-10 md:mb-0"
          >
            <div
              className={cn(
                'w-16 h-16 mb-6 rounded-full flex items-center justify-center',
                index % 3 === 0
                  ? 'bg-blue-100 text-blue-700'
                  : index % 3 === 1
                    ? 'bg-green-100 text-green-700'
                    : 'bg-purple-100 text-purple-700'
              )}
            >
              {column.icon}
            </div>

            <h4 className="text-xl font-semibold mb-2 text-slate-700">
              {column.title}
            </h4>

            <p className="text-center max-w-xs text-slate-600">{column.text}</p>

            {index < columns.length - 1 && (
              <svg
                key={`line-${index}`}
                className="hidden md:block absolute w-12 h-4 top-8 -right-6"
              >
                <line
                  x1="0"
                  y1="8"
                  x2="48"
                  y2="8"
                  className={`stroke-blue-500 stroke-2`}
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
