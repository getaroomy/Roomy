"use client";
import { useEffect, useState } from "react"
import { UserAuth } from "./context/AuthContext"
import { useRouter } from "next/navigation";
import CreateFeedPost from "@/app/components/createFeedPost";
import FeedPost from "@/app/components/feedPost";
import { FeedPostDetails } from "@/app/lib/exports";
import { createNewFeedPost, getFeedPosts } from "./actions";

export default function Home() {
  const router = useRouter();
  const {user, loading} = UserAuth();
  const [feedPosts, setFeedPosts] = useState<Array<FeedPostDetails>>();

  const createNewPost = (text: string, files: any) => {
    if (user) createNewFeedPost(user, text, files);
  }

  useEffect(()=>{
    if (!user && !loading) router.push("/auth");
    if (user && !loading) {
      const getFeedPostsFromServer = async () => {
        const res = await getFeedPosts(user);
        setFeedPosts(res);
      }
      getFeedPostsFromServer();
    }
  },[loading, router, user]);
  
  return (
    <main className="flex flex-col items-center justify-between p-12 space-y-4">
      <CreateFeedPost createNewPost={createNewPost} />
      {feedPosts?.length && feedPosts.map((post, index)=>{
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
      })}
    </main>
  )
}
