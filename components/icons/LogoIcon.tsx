import Image from 'next/image'

const LogoIcon = ({ ...props }) => (
  <Image
    src="/logo-icon.png"
    width={32}
    height={32}
    alt="Logo"
    className="h-8 text-white"
    {...props}
  />
)

export default LogoIcon
