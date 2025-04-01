import Image from 'next/image';

export default function PulseEffect() {
  return (
    <div className="absolute w-full h-full top-0 left-0">
      <div className="relative w-full h-full container max-w-6xl">
        <Image
          src="/icons/ellipse-blue.svg"
          width={400}
          height={400}
          alt="Pulse Effect"
          className="absolute top-80 -left-20 z-0"
        />

        <Image
          src="/icons/ellipse-blue.svg"
          width={700}
          height={700}
          alt="Pulse Effect"
          className="absolute top-[640px] -right-64 z-0"
        />

        <Image
          src="/icons/ellipse-purple.svg"
          width={400}
          height={400}
          alt="Pulse Effect"
          className="absolute -top-32 -right-32 z-0"
        />
      </div>
    </div>
  );
}
