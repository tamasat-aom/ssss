"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Home() {
  const [postData, setPostData] = useState([]);

  console.log(postData, "saldkfopdsi");

  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/quaters", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();
      setPostData(data.quater);
    } catch (error) {
      console.log("Error loading posts: ", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full justify-center gap-x-10 py-3 bg-white">
        <Button variant="ghost">
          <div>introduction</div>
        </Button>
        <Button variant="ghost">
          <div>tools</div>
        </Button>
        <Button variant="ghost">
          <div>quater plan</div>
        </Button>
      </div>
    </div>
  );
}
