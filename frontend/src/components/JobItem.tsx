import { Job } from "@/types/job";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

interface JobItemProps {
  job: Job;
}

const JobItem = ({ job }: JobItemProps) => {
  return (
    <div className="px-8 py-4 bg-secondary rounded-lg flex items-center justify-between">
      <div className="flex flex-col gap-y-1">
        <h1 className="text-2xl font-semibold">{job.company}</h1>
        <h4 className="text-primary">{job.title}</h4>
        <p>{job?.location}</p>
        <p className="italic text-muted-foreground">
          {job.role === "internship" ? "Internship" : "Full Time"}
        </p>
      </div>

      <div className="flex gap-x-4">
        <Link href={job.url} className={buttonVariants()} target="_blank">
          View
        </Link>
        <Button variant={"secondary"} className="border border-primary">
          Save
        </Button>
      </div>
    </div>
  );
};

export default JobItem;
