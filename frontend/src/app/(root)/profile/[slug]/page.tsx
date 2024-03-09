"use client";
import JobItem from "@/components/JobItem";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Post from "@/components/Post";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs, sampleJobs, samplePosts } from "@/constants";
import { useUser } from "@/context/UserContext";
import {
  EditProfileValidator,
  TEditProfileValidator,
} from "@/lib/validations/user-validator";
import { Job } from "@/types/job";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Copy, Router } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = ({ params }: { params: { slug: string } }) => {
  const router = useRouter()
  const otheruser = {
    id: 2,
    username: "patrick",
    email: "patrick@gmail.com",
    display_name: "Patrick",
    bio: "Random text here for a bio section",
  };

  // @ts-ignore
  const { user } = useUser();

  const editProfileForm = useForm<TEditProfileValidator>({
    resolver: zodResolver(EditProfileValidator),
    defaultValues: {
      username: user?.username || "",
      display_name: user?.display_name || "",
    },
  });

  const { mutate: editUserProfile } = useMutation({
    mutationFn: async ({ username, display_name }: TEditProfileValidator) => {
      const payload: TEditProfileValidator = {
        username,
        display_name,
      };

      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user?.id}`,
        payload,
        { withCredentials: true }
      );

      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast.error("Username already taken.");
        }
      }

      toast.error("There was an error. Please try again");
    },
    onSuccess: (data) => {
      console.log(data)
      toast.success("Profile successfully updated!");
      router.push(`/profile/${data.username}`)
    },
  });

  const onEditProfileSubmit = (values: TEditProfileValidator) => {
    editUserProfile(values);
  };

  return (
    <MaxWidthWrapper>
      <div className="mt-8 px-10 md:px-20 py-6 md:py-8 bg-secondary rounded-lg flex justify-between">
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
                  {user?.display_name}
                </h1>
                <h3 className="text-lg font-medium text-primary">
                  @{user?.username}
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
            {user?.username === params.slug ? (
              <div className="flex gap-x-8">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Edit Profile</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <Form {...editProfileForm}>
                      <form
                        onSubmit={editProfileForm.handleSubmit(
                          onEditProfileSubmit
                        )}
                      >
                        <DialogHeader>
                          <DialogTitle>Edit Profile</DialogTitle>
                          <DialogDescription>
                            Make changes to your profile here. Click save when
                            you&apos;re done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          {/* Display Name form field */}
                          <FormField
                            control={editProfileForm.control}
                            name="display_name"
                            render={({ field }) => (
                              <FormItem className="grid grid-cols-4 items-center gap-4">
                                <FormLabel className="text-right">
                                  Display Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="text"
                                    className="col-span-3"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="col-span-4" />
                              </FormItem>
                            )}
                          />

                          {/* Username form field */}
                          <FormField
                            control={editProfileForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem className="grid grid-cols-4 items-center gap-4">
                                <FormLabel className="text-right">
                                  Username
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="text"
                                    className="col-span-3"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="col-span-4" />
                              </FormItem>
                            )}
                          />
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="submit">Save changes</Button>
                          </DialogClose>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Share Profile</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Share link</DialogTitle>
                      <DialogDescription>
                        Anyone who has this link will be able to view this.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                          Link
                        </Label>
                        <Input
                          id="link"
                          defaultValue={`${process.env.NEXT_PUBLIC_LIVE_URL}/profile/${user?.username}`}
                          readOnly
                        />
                      </div>
                      {/* TODO: Make this copy to users clipboard */}
                      <Button type="submit" size="sm" className="px-3">
                        <span className="sr-only">Copy</span>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
            {profileTabs.map((tab) => {
              if (tab.value === "saved_jobs" && user?.username !== params.slug)
                return;

              return (
                <TabsTrigger
                  key={tab.label}
                  value={tab.value}
                  className="flex min-h-[48px] items-center gap-3 bg-background text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground w-full"
                >
                  <p className="">{tab.label}</p>
                </TabsTrigger>
              );
            })}
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
          {user?.username === params.slug ? (
            <TabsContent value="saved_jobs">
              <div className="flex flex-col gap-6 my-6">
                {sampleJobs.map((job) => (
                  <JobItem job={job as Job} location="saved" key={job.id} />
                ))}
              </div>
            </TabsContent>
          ) : null}
        </Tabs>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
