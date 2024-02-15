import JobItem from "@/components/JobItem";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Post from "@/components/Post";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sampleJobs, samplePosts } from "@/constants";
import { Job } from "@/types/job";
import Image from "next/image";
import Link from "next/link";

// Display either normal home (feed) page or login/landing if user isnt logged in
export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="flex mt-8 mb-10 gap-x-4">
        <div className="hidden lg:flex flex-col gap-y-4">
          {/* Profile Section */}
          <div className="px-12 py-8 bg-secondary rounded-lg flex flex-col items-center gap-y-4">
            {/* TODO: replace with profile picture */}
            <Image
              src="/default_pfp.jpg"
              alt="profile picture"
              className="object-contain aspect-square object-center rounded-full"
              width={80}
              height={80}
            />
            <div className="flex flex-col gap-y-2 items-center w-full">
              <h1 className="text-2xl font-semibold">Display Name</h1>
              <h3 className="text-lg font-medium text-primary">@username</h3>
              <p className="text-base text-muted-foreground text-center">
                Random text for a bio here
              </p>
            </div>
            <div className="flex flex-row gap-x-6">
              <div className="flex flex-col items-center border border-primary rounded-lg h-fit py-2 px-4">
                <h1 className="text-lg">1,000</h1>
                <h4 className="text-md">Followers</h4>
              </div>
              <div className="flex flex-col items-center border border-primary rounded-lg h-fit py-2 px-4">
                <h1 className="text-lg">1,000</h1>
                <h4 className="text-md">Following</h4>
              </div>
            </div>

            <div aria-hidden="true" className="h-px w-full bg-primary my-2" />

            <Link href={`/profile/Justin`} className={buttonVariants()}>
              My Profile
            </Link>
          </div>

          {/* Recent Jobs */}
          <div className="px-8 py-8 bg-secondary rounded-lg flex flex-col gap-y-4">
            <h1 className="text-2xl font-semibold">Recent Jobs</h1>
            <div className="flex flex-col gap-6 my-6">
              {sampleJobs.map((job) => (
                <>
                  <JobItem job={job as Job} location="feed" key={job.id} />
                  <div aria-hidden="true" className="h-px bg-primary" />
                </>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full">
          {/* Create Post Section */}
          <div className="p-6 bg-secondary rounded-lg flex w-full">
            <div className="flex flex-row items-center w-full">
              <Image
                src="/default_pfp.jpg"
                alt="profile picture"
                className="object-contain aspect-square object-center rounded-full"
                width={70}
                height={70}
              />
              <div className="w-full p-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full rounded-full border border-primary bg-secondary text-secondary-foreground py-6 justify-start">
                      How&apos;s the job search?
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Create a Post</DialogTitle>
                      <DialogDescription>
                        Share what you have been up to! Or maybe even some tips
                        or tricks for other users for success.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-start gap-y-2">
                      <Label htmlFor="post" className="text-right">
                        Post
                      </Label>
                      <Textarea rows={6} />
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create Post</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Feed section */}
          <div className="col-span-4 row-span-4 flex flex-col">
            <div className="flex items-center">
              <div aria-hidden="true" className="h-px w-full bg-primary my-6" />
              <Button variant="link">Global</Button>
              <Button variant="link" className="text-secondary-foreground">
                Following
              </Button>
              <div aria-hidden="true" className="h-px w-full bg-primary my-6" />
            </div>

            <div className="flex flex-col gap-6">
              {samplePosts.map((post) => (
                <Post post={post} key={post.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
