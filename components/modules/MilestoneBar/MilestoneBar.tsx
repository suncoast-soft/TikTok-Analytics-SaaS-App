import { cn } from '@/utils/cn'
import { CheckIcon, LockIcon } from 'lucide-react'
import Image from 'next/image'

export default function MilestoneBar({
  milestones,
  currentMilestone
}: {
  milestones: {
    gmv: number
    reward: string
    image: string
  }[]
  currentMilestone: number
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-4xl mt-32 mb-16">
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-gray-300 rounded-full">
          {milestones.map((milestone, index) => {
            const leftPosition = `${(index / 5) * 100}%`
            const isCompleted = currentMilestone >= milestone.gmv

            return (
              <div
                key={index}
                className={cn('absolute h-2 rounded-full', {
                  'bg-yellow-500': isCompleted
                })}
                style={{
                  left: leftPosition,
                  width: isCompleted ? `${100 / 5}%` : 0
                }}
              />
            )
          })}
        </div>

        <div className="relative w-full">
          {milestones.map((milestone, index) => {
            const leftPosition = `calc(${((index + 1) / 5) * 100}% - 48px)`
            const isCompleted = currentMilestone >= milestone.gmv

            return (
              <div
                key={index}
                className="absolute w-24 top-0 flex flex-col items-center"
                style={{ left: leftPosition }}
              >
                <div className="absolute -top-20 left-4">
                  <Image
                    src={milestone.image}
                    width={64}
                    height={64}
                    alt={milestone.reward}
                    className="w-16 h-16 object-contain"
                  />
                </div>

                <div
                  className={cn(
                    'w-6 h-6 absolute -top-3 rounded-full flex items-center justify-center border',
                    {
                      'bg-yellow-500 border-yellow-500': isCompleted,
                      'bg-white border-gray-300': !isCompleted
                    }
                  )}
                >
                  {isCompleted ? (
                    <CheckIcon className="w-4 h-4 text-white" />
                  ) : (
                    <LockIcon className="w-4 h-4 text-gray-300" />
                  )}
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm font-bold">
                    ${milestone.gmv.toLocaleString()} GMV
                  </p>
                  <p className="text-xs text-gray-600">{milestone.reward}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
