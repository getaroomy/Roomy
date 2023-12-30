"use client";
import { useEffect, useState } from "react"
import { UserAuth } from "./context/AuthContext"
import { useRouter } from "next/navigation";
import FeedPost from "@/app/components/feedPost";
import { FeedPostDetails } from "./lib/exports";

export default function Home() {
  const router = useRouter();
  const {user, loading} = UserAuth();
  const [feedPosts, setFeedPosts] = useState<Array<FeedPostDetails>>();

  useEffect(()=>{
    if (!user && !loading) router.push("/auth");
  },[loading, router, user]);
  return (
    <main className="flex flex-col items-center justify-between p-24 space-y-4">
      <h1>You&rsquo;re on: app/page</h1>
      {feedPosts?.length && feedPosts.map((post, index)=>{
        return (
          <FeedPost key={index}
            uid={post.uid}
            profilePic={post.profilePic}
            displayName={post.displayName}
            city={post.city}
            post_text={post.post_text}
            date={post.date} />
        );
      })}
    </main>
  )
}
