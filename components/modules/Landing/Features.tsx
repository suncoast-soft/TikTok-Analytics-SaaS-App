import LogoBlack from '@/components/icons/LogoBlack';
import LogoBlue from '@/components/icons/LogoBlue';

export default function Features() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 border-l-4 border-primary rounded-lg shadow transform hover:scale-105 transition relative">
          <LogoBlack />

          <h3 className="text-xl font-semibold my-4">For Brands</h3>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              Create, manage, and optimize affiliate campaigns effortlessly.
            </li>
            <li>
              Access detailed insights into campaign performance and video
              reach.
            </li>
          </ul>
        </div>
        <div className="bg-white p-8 border-l-4 border-secondary rounded-lg shadow transform hover:scale-105 transition relative">
          <LogoBlue />

          <h3 className="text-xl font-semibold my-4">For Creators</h3>

          <ul className="list-disc pl-5 space-y-2">
            <li>Connect and participate in exclusive brand campaigns.</li>
            <li>Monitor rewards and sales metrics live on your dashboard.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
