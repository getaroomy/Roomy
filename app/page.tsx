"use client";
import { useEffect, useState } from "react"
import { UserAuth } from "./context/AuthContext"
import { useRouter } from "next/navigation";
import CreateFeedPost from "@/app/components/createFeedPost";
import FeedPost from "@/app/components/feedPost";
import { FeedPostDetails } from "@/app/lib/exports";
import Spinner from "@/public/spinner.svg";
import { createNewFeedPost, getFeedPosts } from "./actions";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const {user, loading} = UserAuth();
  const [feedPosts, setFeedPosts] = useState<Array<FeedPostDetails>>();
  const [loadingFeedPosts, setLoadingFeedPosts] = useState<boolean>(true);
  const createNewPost = (text: string, files: any) => {
    if (user) createNewFeedPost(user, text, files);
  }

  useEffect(()=>{
    setLoadingFeedPosts(true);
    if (!user && !loading) router.push("/auth");
    if (user && !loading) {
      const getFeedPostsFromServer = async () => {
        const res = await getFeedPosts(user);
        setFeedPosts(res);
      }
      getFeedPostsFromServer();
    }
    setLoadingFeedPosts(false);
  },[loading, router, user]);
  
  return (
    <main className="flex flex-col items-center justify-between p-12 space-y-4">
      <CreateFeedPost createNewPost={createNewPost} />
      {(feedPosts && feedPosts?.length) ? feedPosts.map((post, index)=>{
        return (
          <FeedPost key={index}
            uid={post.uid}
            photoURL={post.photoURL}
            displayName={post.displayName}
            city={post.city}
            post_text={post.post_text}
            media={post.media}
            date={post.date} />
        );
      }) : loadingFeedPosts ? 
        <Image src={Spinner} alt={"loading spinner"} />
      :
        <div className="text-center text-2xl font-bold pt-8">
            <h1>No one&apos;s said anything here.</h1>
            <label htmlFor="createPostInput" className="text-purple-600 cursor-pointer">Be the first!</label>
            {/* id createPostInput is in CreateFeedPost component */}
        </div>
    }
    </main>
  )
}
