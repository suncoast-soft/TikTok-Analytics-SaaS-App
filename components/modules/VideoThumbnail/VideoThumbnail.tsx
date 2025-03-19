'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

const VideoThumbnail = ({ videoId }: { videoId: string }) => {
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const response = await fetch(
          `https://www.tiktok.com/oembed?url=https://www.tiktok.com/@username/video/${videoId}`
        );
        const data = await response.json();
        setThumbnail(data.thumbnail_url);
      } catch (error) {
        console.log('Error fetching TikTok thumbnail:', error);
      }
    };

    fetchThumbnail();
  }, [videoId]);

  return (
    <div className="relative w-20 h-36">
      {thumbnail ? (
        <Dialog>
          <DialogTrigger asChild>
            <Image
              src={thumbnail}
              width={80}
              height={144}
              alt="TikTok Thumbnail"
              className="w-full h-full rounded-lg object-cover cursor-pointer"
            />
          </DialogTrigger>

          <DialogContent className="w-96 border-none">
            <DialogHeader>
              <DialogTitle className="hidden">
                Are you absolutely sure?
              </DialogTitle>
            </DialogHeader>

            <div className="flex justify-center items-center">
              <iframe
                src={`https://www.tiktok.com/embed/v2/${videoId}?controls=0&info=0`}
                width="325"
                height="840"
                allow="autoplay"
                className="max-h-[95%] rounded-lg"
              ></iframe>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default VideoThumbnail;
