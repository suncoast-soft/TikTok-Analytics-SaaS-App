import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

interface RowProps {
  title: string
  text: string
}

interface SectionProps {
  header?: string
  rows: RowProps[]
}

export default function AccordionRowsSection({ header, rows }: SectionProps) {
  return (
    <>
      {header && (
        <h2 className="text-4xl font-extrabold text-center text-slate-900 mb-12">
          {header}
        </h2>
      )}

      <Accordion type="single" collapsible className="container max-w-3xl">
        {rows.map((row, index) => (
          <AccordionItem key={index} value={`accordion-${index}`}>
            <AccordionTrigger className="w-full text-left bg-primary/5 p-4 rounded-lg transition duration-200 hover:bg-primary/10 my-3">
              {row.title}
            </AccordionTrigger>
            <AccordionContent className="p-4 border-l-4 border-b-0 border-secondary bg-slate-50 mt-2 rounded-lg">
              {row.text}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}
