import { cn } from '@/utils/cn'
import { CheckIcon, HexagonIcon, LockIcon } from 'lucide-react'
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
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1.5 bg-gray-300 rounded-full">
          {milestones.map((milestone, index) => {
            const leftPosition = `${(index / (milestones.length + 1)) * 100}%`

            const milestoneProgress =
              currentMilestone >= milestone.gmv
                ? 1
                : Math.max(
                    0,
                    (currentMilestone - (milestones[index - 1]?.gmv || 0)) /
                      (milestone.gmv - (milestones[index - 1]?.gmv || 0))
                  )

            const widthPercentage =
              milestoneProgress * (100 / milestones.length)

            return (
              <div
                key={index}
                className="absolute h-1.5 rounded-full bg-yellow-500"
                style={{
                  left: leftPosition,
                  width: `${widthPercentage}%`
                }}
              />
            )
          })}
        </div>

        <div className="relative w-full">
          {milestones.map((milestone, index) => {
            const leftPosition = `calc(${((index + 1) / (milestones.length + 1)) * 100}% - 48px)`
            const isCompleted = currentMilestone >= milestone.gmv
            const isNextMilestone =
              !isCompleted &&
              (index === 0 || currentMilestone >= milestones[index - 1].gmv)

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

                <div className="absolute w-6 h-6 -top-3 flex items-center justify-center">
                  <HexagonIcon
                    className={cn(
                      'w-6 h-6 stroke-1',
                      isCompleted ? 'fill-yellow-500' : 'fill-white',
                      isCompleted
                        ? 'stroke-yellow-600'
                        : isNextMilestone
                          ? 'stroke-yellow-500'
                          : 'stroke-gray-400'
                    )}
                  />

                  {isCompleted ? (
                    <CheckIcon className="absolute w-3 h-3 text-white" />
                  ) : (
                    <LockIcon
                      className={`absolute w-3 h-3 stroke-2 ${isNextMilestone ? 'text-yellow-500' : 'text-gray-400'}`}
                    />
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
