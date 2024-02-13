"use client";
import JobItem from "@/components/JobItem";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Post from "@/components/Post";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs, sampleJobs, samplePosts } from "@/constants";
import { useUser } from "@/context/UserContext";
import { Job } from "@/types/job";
import Image from "next/image";

const Page = ({ params }: { params: { slug: string } }) => {
  const otheruser = {
    id: 1,
    username: "patrick",
    email: "jvariara@gmail.com",
    display_name: "Justin",
    bio: "Random text here for a bio section",
  };

  // @ts-ignore
  const { user } = useUser();

  return (
    <MaxWidthWrapper>
      <div className="mt-10 px-10 md:px-20 py-6 md:py-8 bg-secondary rounded-lg flex justify-between">
        <div className="flex flex-col items-center lg:items-start gap-y-4 w-full">
          <div className="flex items-center flex-col gap-y-4 lg:gap-y-0 lg:flex-row lg:justify-between w-full">
            <div className="flex items-center gap-x-5">
              {/* TODO: replace with profile picture */}
              <Image
                src="/default_pfp.jpg"
                alt="profile picture"
                className="object-contain aspect-square object-center rounded-full"
                width={80}
                height={80}
              />
              <div className="flex flex-col gap-y-1 items-start">
                <h1 className="text-3xl md:text-4xl font-semibold">
                  {otheruser.display_name}
                </h1>
                <h3 className="text-lg font-medium text-primary">
                  @{otheruser.username}
                </h3>
              </div>
            </div>
            {/* Followers/Following section */}
            <div className="flex flex-row gap-x-8">
              <div className="flex flex-col items-center border border-primary rounded-lg h-fit py-2 px-4 lg:py-3 lg:px-6">
                <h1 className="sm:text-lg md:text-xl lg:text-2xl">1,000</h1>
                <h4 className="sm:text-md md:text-lg lg:text-xl">Followers</h4>
              </div>
              <div className="flex flex-col items-center border border-primary rounded-lg h-fit py-2 px-4 lg:py-3 lg:px-6">
                <h1 className="sm:text-lg md:text-xl lg:text-2xl">1,000</h1>
                <h4 className="sm:text-md md:text-lg lg:text-xl">Following</h4>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-4 items-center">
            <p className="text-muted-foreground w-full">{otheruser.bio}</p>
            {/* Buttons */}
            {/* TODO: Set these dynamically based of if the otheruser profile we are viewing is the one logged in or not */}
            {user?.username === otheruser?.username ? (
              <div className="flex gap-x-8">
                <Button>Edit Profile</Button>
                <Button>Share Profile</Button>
              </div>
            ) : (
              <div className="flex gap-x-8">
                <Button>Follow</Button>
                <Button>Settings</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* seperator */}
      <div aria-hidden="true" className="h-px bg-primary my-6" />

      {/* Tabs */}
      <div>
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="flex min-h-[50px] flex-1 items-center gap-3 bg-background text-foreground border border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            {profileTabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.value}
                className="flex min-h-[48px] items-center gap-3 bg-background text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground w-full"
              >
                <p className="">{tab.label}</p>
              </TabsTrigger>
            ))}
          </TabsList>
          {/* Posts Tab */}
          <TabsContent value="posts">
            <div className="flex flex-col gap-6 my-6">
              {samplePosts.map((post) => (
                <Post post={post} key={post.id} />
              ))}
            </div>
          </TabsContent>

          {/* Applied Jobs Tab */}
          <TabsContent value="applied_jobs">
            <div className="flex flex-col gap-6 my-6">
              {sampleJobs.map((job) => (
                <JobItem job={job as Job} location="applied" key={job.id} />
              ))}
            </div>
          </TabsContent>

          {/* Saved Jobs Tab */}
          <TabsContent value="saved_jobs">
            <div className="flex flex-col gap-6 my-6">
              {sampleJobs.map((job) => (
                <JobItem job={job as Job} location="saved" key={job.id} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
