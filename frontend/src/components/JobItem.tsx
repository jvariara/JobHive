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
import { Clock, MapPin } from "lucide-react";
import { Badge } from "./ui/badge";

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
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col">
            <h2
              className={`${
                location === "feed" ? "text-md" : "text-lg"
              } md:text-xl font-medium text-primary`}
            >
              {job.title}
            </h2>
            <h5 className="text-md text-muted-foreground">{job.company}</h5>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-x-1">
              <MapPin className="text-primary w-4 h-4" />
              <span className="text-sm text-muted-foreground">
                {job.location}
              </span>
            </div>
          </div>

          {/* buttons */}
          <div>
            {location !== "applied" ? (
              <div className="flex gap-x-4 flex-row gap-y-0">
                <Link
                  href={job.url}
                  className={buttonVariants()}
                  target="_blank"
                >
                  View
                </Link>
                <Button
                  variant={"secondary"}
                  className="border border-primary text-sm"
                >
                  {location === "jobs" ? "Save" : "Unsave"}
                </Button>
              </div>
            ) : (
              <Select
                onValueChange={(e) => console.log(e)}
                defaultValue="APPLIED"
              >
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
        </div>
        <div className="flex flex-col justify-between">
          <Badge
            variant="default"
            className={`${location === "feed" ? "text-xs" : ""} w-fit self-end`}
          >
            {job.role === "fulltime" ? "Full-time" : "Internship"}
          </Badge>
          {location !== "applied" ? (
            <div className="flex items-center gap-x-1">
              <Clock className="text-primary w-4 h-4" />
              <span className="text-sm text-muted-foreground">
                Posted {job.date_posted}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default JobItem;
