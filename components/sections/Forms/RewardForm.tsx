'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { AwardIcon, GoalIcon, MilestoneIcon } from 'lucide-react';
import FormInput from '@/components/modules/FormInput';
import Box from '@/components/modules/Box';
import { useState } from 'react';
import { handleRequest } from '@/utils/auth-helpers/client';
import { saveCampaignMutation } from '@/utils/supabase/server';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  target_1: z.number(),
  reward_1: z.number(),
  target_2: z.number(),
  reward_2: z.number(),
  target_3: z.number(),
  reward_3: z.number(),
  target_4: z.number(),
  reward_4: z.number()
});

interface RewardProps {
  target: number;
  reward: number;
}

export default function RewardForm({
  campaignId,
  rewards
}: {
  campaignId: string;
  rewards: RewardProps[];
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      target_1: rewards?.[0]?.target ?? '',
      reward_1: rewards?.[0]?.reward ?? '',
      target_2: rewards?.[1]?.target ?? '',
      reward_2: rewards?.[1]?.reward ?? '',
      target_3: rewards?.[2]?.target ?? '',
      reward_3: rewards?.[2]?.reward ?? '',
      target_4: rewards?.[3]?.target ?? '',
      reward_4: rewards?.[3]?.reward ?? ''
    }
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    await handleRequest(
      {
        campaign_id: campaignId,
        rewards: [
          { target: data.target_1, reward: data.reward_1 },
          { target: data.target_2, reward: data.reward_2 },
          { target: data.target_3, reward: data.reward_3 },
          { target: data.target_4, reward: data.reward_4 }
        ]
      },
      saveCampaignMutation,
      router
    );
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 lg:gap-6"
      >
        <div className="grid lg:grid-cols-4 gap-5 text-white">
          <Box
            icon={<MilestoneIcon size={16} />}
            label="Milestone 1"
            className="w-full"
          >
            <FormInput
              type="number"
              control={form.control}
              name="target_1"
              label="Target"
              placeholder="$5,000"
              icon={<GoalIcon className="w-5 text-primary" />}
              required={true}
              className="mb-3"
            />

            <FormInput
              type="number"
              control={form.control}
              name="reward_1"
              label="Reward"
              placeholder="$500"
              icon={<AwardIcon className="w-5 text-primary" />}
              required={true}
            />
          </Box>

          <Box
            icon={<MilestoneIcon size={16} />}
            label="Milestone 2"
            className="w-full"
          >
            <FormInput
              type="number"
              control={form.control}
              name="target_2"
              label="Target"
              placeholder="$10,000"
              icon={<GoalIcon className="w-5 text-primary" />}
              required={true}
              className="mb-3"
            />

            <FormInput
              type="number"
              control={form.control}
              name="reward_2"
              label="Reward"
              placeholder="$1,000"
              icon={<AwardIcon className="w-5 text-primary" />}
              required={true}
            />
          </Box>

          <Box
            icon={<MilestoneIcon size={16} />}
            label="Milestone 3"
            className="w-full"
          >
            <FormInput
              type="number"
              control={form.control}
              name="target_3"
              label="Target"
              placeholder="$15,000"
              icon={<GoalIcon className="w-5 text-primary" />}
              required={true}
              className="mb-3"
            />

            <FormInput
              type="number"
              control={form.control}
              name="reward_3"
              label="Reward"
              placeholder="$1,500"
              icon={<AwardIcon className="w-5 text-primary" />}
              required={true}
            />
          </Box>

          <Box
            icon={<MilestoneIcon size={16} />}
            label="Milestone 4"
            className="w-full"
          >
            <FormInput
              type="number"
              control={form.control}
              name="target_4"
              label="Target"
              placeholder="$20,000"
              icon={<GoalIcon className="w-5 text-primary" />}
              required={true}
              className="mb-3"
            />

            <FormInput
              type="number"
              control={form.control}
              name="reward_4"
              label="Reward"
              placeholder="$2,000"
              icon={<AwardIcon className="w-5 text-primary" />}
              required={true}
            />
          </Box>
        </div>

        <Button
          type="submit"
          variant="secondary"
          className="w-full lg:w-52"
          disabled={isSubmitting}
        >
          Update
        </Button>
      </form>
    </Form>
  );
}
