"use server";

import { db } from "@/lib/db";
import { briefs } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function submitBrief(formData: FormData) {
  try {
    const features = formData.getAll("features").join(", ");

    await db.insert(briefs).values({
      companyName: formData.get("companyName") as string,
      contactPerson: formData.get("contactPerson") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string | null,
      socialLinks: formData.get("socialLinks") as string | null,
      location: formData.get("location") as string | null,
      teamSize: formData.get("teamSize") as string | null,
      fundingStage: formData.get("fundingStage") as string | null,
      projectType: formData.get("projectType") as string,
      projectNiche: formData.get("projectNiche") as string,
      currentWebsite: formData.get("currentWebsite") as string | null,
      goals: formData.get("goals") as string,
      targetAudience: formData.get("targetAudience") as string,
      competitors: formData.get("competitors") as string | null,
      designPrefs: formData.get("designPrefs") as string | null,
      brandGuidelines: formData.get("brandGuidelines") as string | null,
      features: features,
      integrations: formData.get("integrations") as string | null,
      userRoles: formData.get("userRoles") as string | null,
      contentReady: formData.get("contentReady") as string | null,
      techStack: formData.get("techStack") as string | null,
      complianceLevel: formData.get("complianceLevel") as string | null,
      expectedVolume: formData.get("expectedVolume") as string | null,
      budget: formData.get("budget") as string,
      deadline: formData.get("deadline") as string,
      maintenance: formData.get("maintenance") as string | null,
      comments: formData.get("comments") as string | null,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to submit brief:", error);
    return { success: false, error: "Failed to submit brief" };
  }
}

export async function getBriefs() {
  try {
    const allBriefs = await db.select().from(briefs).orderBy(desc(briefs.createdAt));
    return allBriefs;
  } catch (error) {
    console.error("Failed to fetch briefs:", error);
    return [];
  }
}

export async function updateBriefStatus(id: string, status: string) {
  try {
    await db.update(briefs)
      .set({ status, updatedAt: new Date() })
      .where(eq(briefs.id, id));
    
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to update status:", error);
    return { success: false };
  }
}
