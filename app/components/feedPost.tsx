import React from 'react'
import Image from 'next/image';
import UserProfileLogo from "@/public/user-profile-logo.svg";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Link from 'next/link';
import { FeedPostDetails } from '../lib/exports';

export default function FeedPost(
    {uid, profilePic, displayName, city, post_text, media, date}:FeedPostDetails) {
  return (
    <div className='w-full md:w-1/2 lg:w-1/2  bg-white shadow-md'>
        <Link href={`/profile/${uid}`} id='header' className='flex p-2 border border-dotted break-words'>
            <Image
              src={profilePic || UserProfileLogo}
              className="rounded-full"
              width={64} height={64}
              alt={"Users Picture"} />
            <div className='ml-2'>
                <h1>{displayName}</h1>
                <h2 className='text-sm'>{city}</h2>
                <h3 className='text-xs text-gray-500'>{date}</h3>
            </div>
        </Link>
        <div id='post-text' className='p-2'>
            {post_text}
        </div>
        {media &&
        <Carousel className="w-full">
            <CarouselContent className="-ml-1 mr-1">
                {media.map((mediaUrl, index) => (
                    <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <Image
                                src={mediaUrl}
                                width={512} height={512}
                                alt={"Users Picture"} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className='bg-white' />
            <CarouselNext className='bg-white' />
        </Carousel>
        }
    </div>
  )
}