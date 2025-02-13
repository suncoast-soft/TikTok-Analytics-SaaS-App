import ContactForm from '@/components/sections/Forms/ContactForm';
import Image from 'next/image';

export default function Support() {
  return (
    <div className="container max-w-7xl py-8">
      <div className="bg-navy-800 p-8 rounded-xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full">
            <h1 className="text-2xl text-white font-bold mb-8">Contact</h1>

            <ContactForm />
          </div>

          <div className="w-full md:w-1/3 h-80 flex-shrink-0 rounded-xl overflow-hidden">
            <Image
              src="/landing/analytics-2.jpg"
              width={5472}
              height={3648}
              alt="Register"
              className="w-full h-full object-cover opacity-60"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
