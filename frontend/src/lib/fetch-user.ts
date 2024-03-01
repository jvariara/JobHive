"use client";

import { User } from "@/types/user";

// Define the TypeScript interface for the response
interface FetchUserSessionResponse {
  user: User | null; // Replace 'any' with your actual user type
}

export const fetchUserSession = async (): Promise<FetchUserSessionResponse> => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { user: null };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/get-session`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user session");
    }

    const data = await response.json();
    return { user: data.user };
  } catch (error) {
    console.error("Error fetching user session:", error);
    return { user: null };
  }
};
