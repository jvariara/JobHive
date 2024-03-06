export interface Job {
    company: string
    title: string
    location: string
    role: "fulltime" | "internship"
    url: string
    date_posted?: string
}