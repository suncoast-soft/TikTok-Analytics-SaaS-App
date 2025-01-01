import React, { ReactNode } from 'react'

interface PageHeroProps {
  title: string
  subtitle: string
  form: ReactNode
}

const FormHero: React.FC<PageHeroProps> = ({ title, subtitle, form }) => {
  return (
    <section className="relative text-left bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg mb-16 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polygon fill="#FFF" points="0,100 100,0 100,100" />
      </svg>

      <div className="grid grid-cols-2 gap-12 p-8">
        <div className="relative z-10 py-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-lg mx-auto">
            {title}
          </h1>
          <p className="mb-6 text-lg md:text-xl max-w-lg mx-auto">{subtitle}</p>
        </div>

        {form}
      </div>
    </section>
  )
}

export default FormHero
