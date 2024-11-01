import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

export default function FAQs() {
  const faqs = [
    {
      id: 'faq1',
      question: 'How does Flicker integrate with TikTok Shop?',
      answer: 'Through direct API connections, ensuring seamless data flow.'
    },
    {
      id: 'faq2',
      question: 'Can I monitor multiple campaigns at once?',
      answer:
        'Yes, our platform is designed to handle multiple campaigns efficiently.'
    }
  ]

  return (
    <section className="mb-16 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">FAQs</h2>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger className="w-full text-left bg-primary/5 p-4 rounded-lg transition duration-200 hover:bg-primary/10 my-3">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="p-4 border-l-4 border-b-0 border-secondary bg-slate-50 mt-2 rounded-lg">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
