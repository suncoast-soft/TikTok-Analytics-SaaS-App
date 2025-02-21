import Image from 'next/image';

interface ModuleProps {
  title: string;
  description: string;
  image: string;
}

export default function ImageBox({ title, description, image }: ModuleProps) {
  return (
    <div className="bg-navy-700 rounded-2xl p-6">
      <div className="flex flex-col-reverse md:flex-row gap-4 md:items-center">
        <div>
          <h4 className="text-white text-lg font-bold mb-3">{title}</h4>
          <p className="text-sm">{description}</p>
        </div>

        <div className="w-12 md:w-24 h-12 md:h-24 flex-shrink-0">
          <Image
            src={image}
            width={512}
            height={512}
            className="w-full h-full object-contain"
            alt={title}
          />
        </div>
      </div>
    </div>
  );
}
