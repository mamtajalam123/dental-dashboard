import { apiRequest } from "@/app/lib/api";
import { Team } from "@/types/team";

// ==============================
// GET ALL TEAMS
// ==============================
export async function getTeams(): Promise<Team[]> {
  const response = await apiRequest("/api/teams");

  return response.data.map((item: any) => ({
    id: item.id,
    name: item.name,
    designation: item.designation,
    qualification: item.qualification,
    experience: item.experience,
    description: item.description,
    image: item.image,
    status: item.status,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }));
}

// ==============================
// GET TEAM BY ID
// ==============================
export async function getTeamById(
  id: number
): Promise<Team> {
  const response = await apiRequest(
    `/api/teams/${id}`
  );

  const item = response.data;

  return {
    id: item.id,
    name: item.name,
    designation: item.designation,
    qualification: item.qualification,
    experience: item.experience,
    description: item.description,
    image: item.image,
    status: item.status,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  };
}

// ==============================
// CREATE TEAM
// ==============================
export async function createTeam(
  data: Partial<Team>
) {
  return await apiRequest("/api/teams", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ==============================
// UPDATE TEAM
// ==============================
export async function updateTeam(
  id: number,
  data: Partial<Team>
) {
  return await apiRequest(
    `/api/teams/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
}

// ==============================
// DELETE TEAM
// ==============================
export async function deleteTeam(
  id: number
) {
  return await apiRequest(
    `/api/teams/${id}`,
    {
      method: "DELETE",
    }
  );
}