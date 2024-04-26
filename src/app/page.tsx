"use client";

import Spline from "@splinetool/react-spline";
import Marquee from "react-fast-marquee";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-context-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bug, Settings, X } from "lucide-react";
import TestProps from "./components/footer";

export default function Home() {
  const [name, setName] = useState("");
  const [Good, setGood] = useState("");
  const [Bad, setBad] = useState("");
  const [reviewData, setReviewData] = useState([]);
  const [createStatus, setCreateSataus] = useState(false);

  const createReview = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          Good,
          Bad,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create post");
      } else {
        getReview();
        console.log("Post created successfully");
      }
    } catch (error) {
      console.log("Error creating post: ", error);
    }
  };

  const getReview = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/reviews", {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await res.json();
      setReviewData(data.review);
    } catch (error) {
      console.log("Error loading posts: ", error);
    }
  };

  const setInputSetingForm = (data: any) => {
    setName(data.name);
    setGood(data.Good);
    setBad(data.Bad);
    setCreateSataus(false);
  };

  const setInputCreateModal = () => {
    console.log("sss");

    setName("");
    setGood("");
    setBad("");
    setCreateSataus(true);
  };

  const changeReview = async (_id: any) => {
    try {
      const res = await fetch(`http://localhost:3000/api/reviews?id=${_id}`, {
        method: "PUT",
        body: JSON.stringify({
          name,
          Good,
          Bad,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to update");
      } else {
        console.log("Update successful");
        getReview();
      }
    } catch (error) {
      console.log("Error updating: ", error);
    }
  };

  const deleteReview = async (_id: any) => {
    try {
      const res = await fetch(`http://localhost:3000/api/reviews?id=${_id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to deleted");
      } else {
        console.log("Post deleted successfully");
        getReview();
      }
    } catch (error) {
      console.log("Error deleted: ", error);
    }
  };

  useEffect(() => {
    getReview();
  }, []);

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full justify-center gap-x-10 py-3 bg-white absolute z-10">
        <Link href="#spline">
          <Button variant="ghost">
            {/* onClick={posts} */}
            <div>spline</div>
          </Button>
        </Link>
        <Link href="#tools">
          <Button variant="ghost">
            <div>tools</div>
          </Button>
        </Link>
        <Link href="#reviews">
          <Button variant="ghost">
            <div>reviews</div>
          </Button>
        </Link>
      </div>
      <div id="spine" className="h-[100vh] ">
        <Spline scene="https://prod.spline.design/jR2cgpd4p4c9jLjF/scene.splinecode" />
      </div>
      <div className="w-full mx-auto max-w-screen-xl">
        <div id="tools" className="h-[300px] flex items-cecnter">
          <Marquee direction="left" gradient>
            <img src="/react.png" alt="" className="w-[200px] ml-[200px]" />
            <img src="/next14.png" alt="" className="w-[200px] ml-[200px]" />
            <img
              src="/mongodb-atlas.webp"
              alt=""
              className="w-[150px] ml-[200px]"
            />
            <img src="/shade.png" alt="" className="w-[200px] ml-[200px]" />
            <img src="/spline.png" alt="" className="w-[200px] ml-[200px]" />
            <img
              src="/typescript.png"
              alt=""
              className="w-[200px] ml-[200px]"
            />
          </Marquee>
        </div>
        <div className="my-[50px] text-[50px] font-semibold flex w-full justify-center">
          Review 📃
        </div>
        {reviewData.length > 0 ? (
          <div id="reviews" className="p-10 w-full">
            <div className="w-full flex justify-end ">
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={setInputCreateModal} variant="outline">
                    Create Review
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create Quarter</DialogTitle>
                    <DialogDescription>
                      Make changes to your Review here. Click save when you are
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Name</Label>
                      <Input
                        value={name}
                        id="username"
                        placeholder="name"
                        className="col-span-3"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Good</Label>
                      <Input
                        value={Good}
                        id="username"
                        className="col-span-3"
                        placeholder="type about good"
                        onChange={(e) => setGood(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Bad</Label>
                      <Input
                        value={Bad}
                        id="username"
                        className="col-span-3"
                        placeholder="type about bad"
                        onChange={(e) => setBad(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={createReview}>Create Review</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid grid-cols-4 gap-5 mt-[20px] ">
              {reviewData.map((data: any, index: any) => {
                return (
                  <Card
                    key={index}
                    className="shadow-none hover:shadow-lg transition-all"
                  >
                    <CardHeader>
                      <CardTitle>
                        <div className="flex w-full items-center">
                          <div>{data.name}</div>{" "}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Settings
                                onClick={() => setInputSetingForm(data)}
                                size={12}
                                className="ml-auto cursor-pointer"
                              />
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Setting Review</DialogTitle>
                                <DialogDescription>
                                  Make changes to your Review here. Click save
                                  when you are done.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right">Name</Label>
                                  <Input
                                    value={name}
                                    id="username"
                                    placeholder="name"
                                    className="col-span-3"
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right">Good</Label>
                                  <Input
                                    value={Good}
                                    id="username"
                                    className="col-span-3"
                                    placeholder="type about good"
                                    onChange={(e) => setGood(e.target.value)}
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right">Bad</Label>
                                  <Input
                                    value={Bad}
                                    id="username"
                                    className="col-span-3"
                                    placeholder="type about bad"
                                    onChange={(e) => setBad(e.target.value)}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button onClick={() => changeReview(data._id)}>
                                  Change Review
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <X
                            onClick={() => deleteReview(data._id)}
                            size={12}
                            className="ml-[10px] cursor-pointer"
                          />
                        </div>
                      </CardTitle>
                      <CardDescription>performance review</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex w-full flex-col">
                        <div className="flex w-full">
                          <div className="w-[60px]">Good : </div>
                          <div className="flex-1 ">{data.Good}</div>
                        </div>
                        <div className="flex w-full mt-[10px]">
                          <div className="w-[60px]">Bad : </div>
                          <div className="flex-1 ">{data.Bad}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          <div id="reviews" className="flex w-full justify-center p-10">
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={setInputCreateModal} variant="outline">
                  Create Review
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Review</DialogTitle>
                  <DialogDescription>
                    Make changes to your Review here. Click save when you are
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Name</Label>
                    <Input
                      value={name}
                      id="username"
                      placeholder="name"
                      className="col-span-3"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Good</Label>
                    <Input
                      value={Good}
                      id="username"
                      className="col-span-3"
                      placeholder="type about good"
                      onChange={(e) => setGood(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Bad</Label>
                    <Input
                      value={Bad}
                      id="username"
                      className="col-span-3"
                      placeholder="type about bad"
                      onChange={(e) => setBad(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={createReview}>Create Review</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
      {/* <TestProps desc={"thank"} /> */}
    </div>
  );
}
