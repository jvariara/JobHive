import { Job } from "@/types/job";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface JobItemProps {
  job: Job;
  location: "saved" | "applied" | "jobs" | "feed";
}

const JobItem = ({ job, location }: JobItemProps) => {
  return (
    <div
      className={`py-4 bg-secondary rounded-lg flex items-center justify-between ${
        location !== "feed" && "px-8"
      }`}
    >
      <div className="flex flex-col gap-y-1 w-1/2">
        <h1 className="text-2xl font-semibold">{job.company}</h1>
        <h4 className="text-primary">{job.title}</h4>
        <p>{job?.location}</p>
        <p className="italic text-muted-foreground">
          {job.role === "internship" ? "Internship" : "Full Time"}
        </p>
      </div>

      {location !== "applied" ? (
        <div className="flex gap-x-4 flex-col sm:flex-row gap-y-4 sm:gap-y-0">
          <Link href={job.url} className={buttonVariants()} target="_blank">
            View
          </Link>
          <Button variant={"secondary"} className="border border-primary">
            {location === "jobs" ? "Save" : "Unsave"}
          </Button>
        </div>
      ) : (
        <Select onValueChange={(e) => console.log(e)} defaultValue="APPLIED">
          <SelectTrigger className="w-[180px] bg-secondary border-primary">
            <SelectValue placeholder="Job Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Job Status</SelectLabel>
              <SelectSeparator className="bg-primary" />
              <SelectItem className="cursor-pointer" value="APPLIED">
                Applied
              </SelectItem>
              <SelectItem className="cursor-pointer" value="DENIED">
                Denied
              </SelectItem>
              <SelectItem className="cursor-pointer" value="OA">
                Online Assessment
              </SelectItem>
              <SelectItem className="cursor-pointer" value="INTERVIEW">
                Interview
              </SelectItem>
              <SelectItem className="cursor-pointer" value="FINAL">
                Final Round
              </SelectItem>
              <SelectItem className="cursor-pointer" value="OFFER">
                Offer
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default JobItem;
