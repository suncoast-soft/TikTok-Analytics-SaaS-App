import TimeLeftBar from '@/components/modules/TimeLeftBar';
import { cn } from '@/utils/cn';
import { all_campaigns } from '@/utils/mock';
import { ClockIcon, TrophyIcon } from 'lucide-react';
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

export default async function Campaign({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const campaign_id = (await params).id;
  const campaign = all_campaigns.filter((c) => c.id === campaign_id)[0];

  if (!campaign) {
    return notFound();
  }

  return (
    <div className="container max-w-7xl py-12">
      <div className="bg-navy-800 p-8 rounded-2xl mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-full md:w-80 md:h-60 flex-shrink-0 rounded-xl overflow-hidden">
            <Image
              src={campaign.brand_logo}
              width={1000}
              height={1000}
              alt={campaign.brand}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full">
            <h2 className="text-amber-400 text-2xl font-bold mb-2">
              {campaign.brand}
            </h2>

            <h1 className="text-white text-4xl font-bold mb-8">
              {campaign.name}
            </h1>

            <div className="flex flex-row gap-4">
              <div className="bg-navy-700 w-64 p-3 rounded-lg">
                <div className="flex flex-row items-center gap-2 mb-3">
                  <ClockIcon
                    width={16}
                    height={16}
                    className="text-amber-400"
                  />
                  <p className="text-white text-xs font-semibold">
                    Campaign Ends In
                  </p>
                </div>

                <TimeLeftBar
                  start_date={campaign.start_date}
                  end_date={campaign.end_date}
                />
              </div>

              <div className="bg-navy-700 w-64 p-3 rounded-lg">
                <div className="flex flex-row items-center gap-2 mb-3">
                  <TrophyIcon
                    width={16}
                    height={16}
                    className="text-amber-400"
                  />
                  <p className="text-white text-xs font-semibold">
                    Campaign Winners
                  </p>
                </div>

                <p className="text-white text-2xl font-bold">32</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-white text-3xl font-bold mb-4">
            About the Campaign
          </h2>

          <p className="text-navy-200 tracking-wide">{campaign.description}</p>
        </div>

        <div className="mb-12">
          <h2 className="text-white text-3xl font-bold mb-4">How to Start</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-navy-700 rounded-2xl p-6">
              <div className="flex flex-row gap-4 items-center">
                <div>
                  <h4 className="text-white text-lg font-bold mb-3">
                    Join the Campaign
                  </h4>
                  <p className="text-sm">
                    Sign up to be part of our exclusive campaign and gain access
                    to special offers. Simply fill out the required details and
                    confirm your participation.
                  </p>
                </div>

                <div className="w-24 h-24 flex-shrink-0">
                  <Image
                    src="/icons/register.png"
                    width={512}
                    height={512}
                    className="w-full h-full object-contain"
                    alt="Register"
                  />
                </div>
              </div>
            </div>

            <div className="bg-navy-700 rounded-2xl p-6">
              <div className="flex flex-row gap-4 items-center">
                <div>
                  <h4 className="text-white text-lg font-bold mb-3">
                    Request Your Sample
                  </h4>
                  <p className="text-sm">
                    Once you’ve joined, submit your request to receive a free
                    sample. Follow the provided instructions to ensure quick and
                    easy delivery.
                  </p>
                </div>

                <div className="w-24 h-24 flex-shrink-0">
                  <Image
                    src="/icons/sample.png"
                    width={512}
                    height={512}
                    className="w-full h-full object-contain"
                    alt="Sample"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-white text-3xl font-bold mb-4">
            Campaign Rewards
          </h2>

          <div className="grid grid-cols-4 gap-4">
            {campaign.milestones.map((milestone, index) => (
              <div
                key={index}
                className="bg-navy-700 rounded-2xl overflow-hidden"
              >
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
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-white text-3xl font-bold mb-4">Other Terms</h2>

          <ol className="list-disc pl-6">
            {campaign.terms.map((term, index) => (
              <li key={index}>{term}</li>
            ))}
          </ol>
        </div>
      </div>

      <h2 className="text-white text-3xl font-bold mb-4">
        Campaign product details
      </h2>

      <Table className="border-none">
        <TableHeader className="bg-navy-700">
          <TableRow className="border-navy-950 shadow-lg">
            <TableHead className="w-60">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Retail Price</TableHead>
            <TableHead>Commission rate</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Variants</TableHead>
            <TableHead className="text-right">Sample Status</TableHead>
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
  );
}
