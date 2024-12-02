import { FC } from 'react'

interface SummaryCardProps {
  title: string
  value: string | number
}

const SummaryCard: FC<SummaryCardProps> = ({ title, value }) => (
  <div className="bg-white shadow-md rounded-lg p-4">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-2xl">{value}</p>
  </div>
)

export default SummaryCard
