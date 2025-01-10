interface ColumnProps {
  title: string
  text: string
  icon: React.ReactElement
}

interface SectionProps {
  columns: ColumnProps[]
}

export default function TextColumnsSection({ columns }: SectionProps) {
  return (
    <div className="container grid md:grid-cols-2 gap-8">
      {columns.map((column: ColumnProps, index: number) => (
        <div
          key={index}
          className="bg-orange-50 p-8 rounded-lg shadow-lg transform hover:translate-y-1 transition relative"
        >
          <h2 className="text-2xl font-bold mb-4">{column.title}</h2>

          <p>{column.text}</p>

          <div className="w-8 h-8 absolute top-4 right-4">{column.icon}</div>
        </div>
      ))}
    </div>
  )
}
