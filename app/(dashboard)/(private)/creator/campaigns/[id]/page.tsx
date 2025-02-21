import { cn } from '@/utils/cn';
import { active_campaigns } from '@/utils/mock';
import {
  CircleDollarSignIcon,
  MedalIcon,
  ShoppingBagIcon,
  TrophyIcon,
  VideoIcon
} from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { TimeLeftBar } from '@/components/modules/TimeLeft';
import DarkShadow from '@/components/modules/DarkShadow';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Card from '@/components/modules/Card';

export default async function Campaign({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const campaign_id = (await params).id;
  const campaign = active_campaigns.filter((c) => c.id === campaign_id)[0];

  if (!campaign) {
    return notFound();
  }

  return (
    <div className="container max-w-7xl py-12">
      <Card vertical={true} className="p-4 lg:p-8">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <Image
            src={campaign.brand_logo}
            width={320}
            height={240}
            alt={campaign.brand}
            className="w-80 h-60 object-cover rounded-lg"
          />

          <div>
            <h2 className="text-amber-400 text-lg md:text-2xl font-bold mb-2">
              {campaign.brand}
            </h2>

            <h1 className="text-white text-2xl md:text-4xl font-bold mb-8">
              {campaign.name}
            </h1>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-navy-700 w-full md:w-64 p-3 rounded-lg">
                <TimeLeftBar
                  start_date={campaign.start_date}
                  end_date={campaign.end_date}
                />
              </div>

              <div className="bg-navy-700 w-full md:w-64 p-3 rounded-lg">
                <div className="flex flex-row items-center gap-2 mb-3">
                  <TrophyIcon
                    width={16}
                    height={16}
                    className="text-amber-400"
                  />
                  <p className="text-white text-xs font-semibold">
                    Total Creators
                  </p>
                </div>

                <p className="text-white text-2xl font-bold">322</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-white text-xl md:text-3xl font-bold mb-4">
            About the Campaign
          </h2>

          <p className="text-navy-200 text-sm md:text-base tracking-wide mb-8">
            {campaign.description}
          </p>

          <div className="flex flex-col lg:flex-row gap-5 mb-12">
            <div className="bg-navy-700 w-full md:w-64 p-3 rounded-lg">
              <div className="flex flex-row items-center gap-2 mb-4">
                <ShoppingBagIcon
                  width={16}
                  height={16}
                  className="text-amber-400"
                />
                <p className="text-white text-xs font-semibold">
                  <span className="text-2xl font-bold mr-2">
                    {campaign.progress.orders}
                  </span>
                  Orders
                </p>
              </div>

              <DarkShadow className="rounded-lg w-full">
                <Button size="sm" className="w-full" asChild>
                  <Link
                    href={`/creator/campaigns/${campaign.id}`}
                    className="no-underline"
                  >
                    View orders
                  </Link>
                </Button>
              </DarkShadow>
            </div>

            <div className="bg-navy-700 w-full md:w-64 p-3 rounded-lg">
              <div className="flex flex-row items-center gap-2 mb-4">
                <VideoIcon width={16} height={16} className="text-amber-400" />
                <p className="text-white text-xs font-semibold">
                  <span className="text-2xl font-bold mr-2">
                    {campaign.progress.videos}
                  </span>
                  Videos
                </p>
              </div>

              <DarkShadow className="rounded-lg w-full">
                <Button size="sm" className="w-full" asChild>
                  <Link
                    href={`/creator/campaigns/${campaign.id}`}
                    className="no-underline"
                  >
                    Video Analytics
                  </Link>
                </Button>
              </DarkShadow>
            </div>

            <div className="bg-navy-700 w-full md:w-64 p-3 rounded-lg">
              <div className="flex flex-row items-center gap-2 mb-4">
                <CircleDollarSignIcon
                  width={16}
                  height={16}
                  className="text-amber-400"
                />
                <p className="text-white text-xs font-semibold">
                  <span className="text-2xl font-bold mr-2">
                    ${campaign.progress.gmv.toLocaleString()}
                  </span>
                  GMV
                </p>
              </div>

              <DarkShadow className="rounded-lg w-full">
                <Button size="sm" className="w-full" asChild>
                  <Link
                    href={`/creator/campaigns/${campaign.id}`}
                    className="no-underline"
                  >
                    Daily GMV Report
                  </Link>
                </Button>
              </DarkShadow>
            </div>
          </div>

          <h2 className="text-white text-xl md:text-3xl font-bold mb-4">
            Product Details
          </h2>

          <Table className="border-none">
            <TableHeader className="bg-navy-700">
              <TableRow className="border-navy-950 shadow-lg">
                <TableHead className="min-w-60">Image</TableHead>
                <TableHead className="min-w-60">Name</TableHead>
                <TableHead className="min-w-24">Retail Price</TableHead>
                <TableHead className="min-w-36">Commission rate</TableHead>
                <TableHead className="min-w-24">Stock</TableHead>
                <TableHead className="min-w-40">Variants</TableHead>
                <TableHead className="min-w-40 text-right">
                  Sample Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="bg-navy-800">
              {campaign.products.map((product) => (
                <TableRow key={product.id} className="border-navy-300">
                  <TableCell className="font-medium">
                    <div className="flex gap-2">
                      {product.images.map((image) => (
                        <Image
                          key={image}
                          src={image}
                          width={60}
                          height={60}
                          alt={image}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.commission_rate}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    {product.variant.name}: {product.variant.options.join(', ')}
                  </TableCell>
                  <TableCell className="text-right">
                    {product.sample_status ? 'Auto Approve' : 'Manual'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mb-12">
          <h2 className="text-white text-xl md:text-3xl font-bold mb-4">
            Your Reward Status
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {campaign.milestones.map((milestone, index) => (
              <div
                key={index}
                className={cn(
                  'bg-navy-700 rounded-2xl border-2 relative',
                  campaign.progress.gmv > milestone.target_gmv
                    ? 'border-green-600'
                    : 'border-navy-700'
                )}
              >
                {campaign.progress.gmv > milestone.target_gmv && (
                  <div className="absolute -top-3.5 -right-3.5 rounded-full p-1 bg-green-600 border-2 border-navy-900">
                    <MedalIcon
                      width={16}
                      height={16}
                      className="text-navy-800"
                    />
                  </div>
                )}

                <div className="overflow-hidden rounded-2xl">
                  <div className="p-5">
                    <h4 className="text-white text-2xl font-bold text-center">
                      ${milestone.target_gmv.toLocaleString()} GMV
                    </h4>
                  </div>

                  <div
                    className={cn(
                      'p-2 text-navy-900',
                      index === 0
                        ? 'bg-navy-400/70'
                        : index === 1
                          ? 'bg-yellow-700/70'
                          : index === 2
                            ? 'bg-slate-200/70'
                            : 'bg-amber-400/70'
                    )}
                  >
                    <h5 className="font-semibold text-center">
                      ${milestone.reward.toLocaleString()} Cash Rewards
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full relative">
            <div className="w-full bg-navy-600 rounded-lg h-2 overflow-hidden mb-2">
              <div
                className="bg-amber-400 h-full"
                style={{
                  width: `${(campaign.progress.gmv / campaign.milestones[campaign.milestones.length - 1].target_gmv) * 100}%`
                }}
              />
            </div>

            <div className="relative h-6">
              <span
                className="absolute px-2 py-1 text-xs font-bold bg-white text-navy-900 rounded-xl"
                style={{
                  left: `${(campaign.progress.gmv / campaign.milestones[campaign.milestones.length - 1].target_gmv) * 100}%`
                }}
              >
                ${campaign.progress.gmv.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
