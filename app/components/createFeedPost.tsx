import React, { useState, useEffect } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from 'next/image';

export default function CreateFeedPost({createNewPost}: {createNewPost: (text: string, files?: Array<File>) => void}) {
    const [postText, setPostText] = useState<string>("");
    const [media, setMedia] = useState([]);
    const [images, setImages] = useState([] as any);

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls: any = [];
        images.forEach((image:any) => newImageUrls.push(URL.createObjectURL(image)));
        setMedia(newImageUrls);
      }, [images]);

    function onImageChange(e: any) {
        setImages([...e.target.files]);
    }

    const createNewFeedPost = () => {
        createNewPost(postText, images);
    }

    return (
        <div className='w-full md:w-1/2 lg:w-1/2 bg-white shadow-md p-4'>
            <h1 className='text-lg font-bold'>Create a Post</h1>
            <textarea
                id='createPostInput'
                className='pt-1 w-full outline-none'
                placeholder='Start yappin..'
                value={postText}
                onChange={(e)=>setPostText(e.currentTarget.value)}
            />
            {media?.length !== 0 &&
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
            <div className=''>
                <input type="file" multiple accept="image/*" className='w-fit' onChange={onImageChange} />
                <button onClick={createNewFeedPost} className='bg-purple-200 hover:bg-purple-500 rounded-xl py-2 px-4 float-right'>Post</button>
            </div>
        </div>
    )
}