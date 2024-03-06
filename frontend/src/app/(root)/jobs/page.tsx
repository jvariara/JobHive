"use client";

import JobItem from "@/components/JobItem";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Searchbar from "@/components/Searchbar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { useUser } from "@/context/UserContext";
import { Job } from "@/types/job";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const JOBS_PER_PAGE = 5;

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  // const [user, setUser] = useState<User | null>(null);
  // @ts-ignore
  const { user } = useUser();
  const [jobs, setJobs] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(JOBS_PER_PAGE);

  const { data: jobResults } = useQuery({
    queryKey: ["job-query"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/jobs`
      );
      setJobs(data);
      return data;
    },
  });

  const filterJobs = (filter: string) => {
    // Use a copy of allJobs to apply filters
    let filteredJobs = [...jobResults];

    if (filter === "INTERNSHIP") {
      filteredJobs = filteredJobs.filter((job) => job.role === "internship");
    } else if (filter === "FULLTIME") {
      filteredJobs = filteredJobs.filter((job) => job.role === "fulltime");
    }

    // @ts-ignore
    setJobs(filteredJobs);
  };
  return (
    <MaxWidthWrapper>
      <div className="mt-8 px-10 md:px-20 py-6 md:py-8 bg-secondary rounded-lg flex flex-col">
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
          ? jobs.slice(startIndex, endIndex).map((job) => (
              // @ts-ignore
              <JobItem location="jobs" job={job as Job} key={job.id} />
            ))
          : null}

        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={
                  startIndex === 0
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
                onClick={() => {
                  if (startIndex > 0) {
                    setStartIndex(startIndex - JOBS_PER_PAGE);
                    setEndIndex(endIndex - JOBS_PER_PAGE);
                  }
                }}
                href="#"
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                className={
                  endIndex === 100
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
                onClick={() => {
                  if (endIndex < jobResults.length) {
                    setStartIndex(startIndex + JOBS_PER_PAGE);
                    setEndIndex(endIndex + JOBS_PER_PAGE);
                  }
                }}
                href="#"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
