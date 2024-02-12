"use client";

import JobItem from "@/components/JobItem";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Searchbar from "@/components/Searchbar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchUserSession } from "@/lib/fetch-user";
import { Job } from "@/types/job";
import { User } from "@/types/user";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [jobs, setJobs] = useState([
    {
      id: 1,
      company: "Google",
      title: "Frontend Engineer",
      location: "Remote",
      role: "fulltime",
      url: "https://www.justinvariara.com/",
    },
    {
      id: 2,
      company: "Netflix",
      title: "Graduate Software Engineer",
      location: "San Jose, CA",
      role: "fulltime",
      url: "https://www.justinvariara.com/",
    },
    {
      id: 3,
      company: "JobHive",
      title: "Backend Intern",
      location: "New York, NY",
      role: "internship",
      url: "https://www.justinvariara.com/",
    },
    {
      id: 4,
      company: "JobHive",
      title: "Backend Intern",
      location: "New York, NY",
      role: "internship",
      url: "https://www.justinvariara.com/",
    },
  ]);
  const allJobs = [
    {
      id: 1,
      company: "Google",
      title: "Frontend Engineer",
      location: "Remote",
      role: "fulltime",
      url: "https://www.justinvariara.com/",
    },
    {
      id: 2,
      company: "Netflix",
      title: "Graduate Software Engineer",
      location: "San Jose, CA",
      role: "fulltime",
      url: "https://www.justinvariara.com/",
    },
    {
      id: 3,
      company: "JobHive",
      title: "Backend Intern",
      location: "New York, NY",
      role: "internship",
      url: "https://www.justinvariara.com/",
    },
    {
      id: 4,
      company: "JobHive",
      title: "Backend Intern",
      location: "New York, NY",
      role: "internship",
      url: "https://www.justinvariara.com/",
    },
  ];

  useEffect(() => {
    (async () => {
      const response = await fetchUserSession();
      if (!response.user) redirect("/sign-in");
      setUser(response.user);
    })();
  }, []);

  const filterJobs = (filter: string) => {
    // Use a copy of allJobs to apply filters
    let filteredJobs = [...allJobs];

    if (filter === "INTERNSHIP") {
      filteredJobs = filteredJobs.filter((job) => job.role === "internship");
    } else if (filter === "FULLTIME") {
      filteredJobs = filteredJobs.filter((job) => job.role === "fulltime");
    }

    setJobs(filteredJobs);
  };
  return (
    <MaxWidthWrapper>
      <div className="mt-10 px-10 md:px-20 py-6 md:py-8 bg-secondary rounded-lg flex flex-col">
        <div className="flex items-center justify-between w-full mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-secondary-foreground">
            Jobs
          </h1>
          {/* Select dropdown */}
          <Select onValueChange={(e) => filterJobs(e)}>
            <SelectTrigger className="w-[180px] bg-secondary border-primary">
              <SelectValue placeholder="Select a type of job" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectGroup>
                <SelectLabel>Job Types</SelectLabel>
                <SelectSeparator className="bg-primary" />
                <SelectItem className="cursor-pointer" value="ALL">
                  All
                </SelectItem>
                <SelectItem className="cursor-pointer" value="INTERNSHIP">
                  Internship
                </SelectItem>
                <SelectItem className="cursor-pointer" value="FULLTIME">
                  Full Time
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Searchbar type="jobs" />
      </div>

      {/* seperator */}
      <div aria-hidden="true" className="h-px bg-primary my-6" />

      {/* Job items */}
      <div className="flex flex-col gap-y-6 mb-6">
        {jobs
          ? jobs.map((job) => <JobItem job={job as Job} key={job.id} />)
          : null}
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
