import Image from 'next/image'

const LogoWhite = ({ ...props }) => (
  <Image
    src="/logo-white.png"
    width={80}
    height={32}
    alt="Logo"
    className="h-8 text-white"
    {...props}
  />
)

export default LogoWhite
