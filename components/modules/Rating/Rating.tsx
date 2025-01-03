import { StarIcon } from 'lucide-react'

const StarRating = ({ score }: { score: number }) => {
  return (
    <div className="w-36 relative my-2">
      <div className="flex space-x-1.5 w-full">
        {Array.from({ length: 5 }, (_, index) => (
          <EmptyStar key={index} />
        ))}
      </div>

      <div
        className="flex space-x-1.5 overflow-x-hidden absolute top-0 left-0"
        style={{ width: `${20 * score}%` }}
      >
        {Array.from({ length: 5 }, (_, index) => (
          <FullStar key={index} />
        ))}
      </div>
    </div>
  )
}

const FullStar = () => (
  <StarIcon className="w-6 h-6 text-yellow-500 flex-shrink-0 fill-yellow-500" />
)

const EmptyStar = () => (
  <StarIcon className="w-6 h-6 text-slate-300 flex-shrink-0 fill-slate-300" />
)

export default StarRating
