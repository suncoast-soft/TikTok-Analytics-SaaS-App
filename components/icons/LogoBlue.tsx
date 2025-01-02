import Image from 'next/image'

const LogoBlue = ({ ...props }) => (
  <Image
    src="/logo-blue.png"
    width={120}
    height={32}
    alt="Logo"
    className="text-blue-700 object-contain"
    {...props}
  />
)

export default LogoBlue
