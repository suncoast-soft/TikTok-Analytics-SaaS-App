import { FC } from 'react'

interface BreakdownTableProps {
  data: { amount: number; type: string }[]
  title: string
}

const BreakdownTable: FC<BreakdownTableProps> = ({ data, title }) => (
  <div className="bg-white shadow-md rounded-lg p-4 mt-6">
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="border-b py-2">Type</th>
          <th className="border-b py-2">Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="border-b py-2">{item.type}</td>
            <td className="border-b py-2">{item.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default BreakdownTable
