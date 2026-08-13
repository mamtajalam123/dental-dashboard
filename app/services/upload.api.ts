import { apiRequest } from "@/app/lib/api";

export async function uploadImage(
  file: File
): Promise<string> {

  const formData = new FormData();

  formData.append("image", file);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/upload`,
    {
      method: "POST",
      headers: {
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
      },
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Upload failed."
    );
  }

  return data.image;
}