import Image from 'next/image'

const LogoBlack = ({ ...props }) => (
  <Image
    src="/logo-black.png"
    width={80}
    height={32}
    alt="Logo"
    className="h-8 text-black"
    {...props}
  />
)

export default LogoBlack
