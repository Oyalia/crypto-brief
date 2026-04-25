"use server";

import { briefSchema } from "@/lib/validations/brief";
import { db } from "@/lib/db";
import { briefs } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function submitBrief(formData: FormData) {
  try {
    const rawData = {
      companyName: formData.get("companyName"),
      contactPerson: formData.get("contactPerson"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      socialLinks: formData.get("socialLinks"),
      location: formData.get("location"),
      teamSize: formData.get("teamSize"),
      fundingStage: formData.get("fundingStage"),
      projectType: formData.get("projectType"),
      projectNiche: formData.get("projectNiche"),
      currentWebsite: formData.get("currentWebsite"),
      goals: formData.get("goals"),
      targetAudience: formData.get("targetAudience"),
      competitors: formData.get("competitors"),
      designPrefs: formData.get("designPrefs"),
      brandGuidelines: formData.get("brandGuidelines"),
      features: formData.getAll("features"),
      integrations: formData.get("integrations"),
      userRoles: formData.get("userRoles"),
      contentReady: formData.get("contentReady"),
      techStack: formData.get("techStack"),
      complianceLevel: formData.get("complianceLevel"),
      expectedVolume: formData.get("expectedVolume"),
      budget: formData.get("budget"),
      deadline: formData.get("deadline"),
      maintenance: formData.get("maintenance"),
      comments: formData.get("comments"),
    };

    const validatedData = briefSchema.parse(rawData);

    await db.insert(briefs).values({
      ...validatedData,
      features: validatedData.features.join(", "),
    });

    return { success: true };
  } catch (error) {
    console.error("Validation or submission failed:", error);
    return { success: false, error: "Validation failed or database error" };
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
