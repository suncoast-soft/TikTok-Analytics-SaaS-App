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
    },
    {
      id: 'faq3',
      question: 'Is the service free for businesses?',
      answer: 'Yes, businesses can use our platform free of charge.'
    },
    {
      id: 'faq4',
      question: 'What features do creators get with the subscription?',
      answer:
        'Creators receive detailed analytics, performance tracking, and additional promotional tools.'
    },
    {
      id: 'faq5',
      question: 'How can I cancel my subscription?',
      answer:
        'You can cancel your subscription anytime through your account settings.'
    },
    {
      id: 'faq6',
      question: 'Are there any limits on the number of links I can create?',
      answer:
        'No, there are no limits on the number of affiliate links you can create.'
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
