import Image from 'next/image'

const LogoBlue = ({ ...props }) => (
  <Image
    src="/logo-blue.png"
    width={80}
    height={32}
    alt="Logo"
    className="h-8 text-blue-700"
    {...props}
  />
)

export default LogoBlue
