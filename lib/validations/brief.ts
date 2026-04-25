import { z } from "zod";

export const briefSchema = z.object({
  companyName: z.string().min(2, "Project name must be at least 2 characters"),
  contactPerson: z.string().min(2, "Contact person name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().nullable(),
  socialLinks: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  teamSize: z.string().optional().nullable(),
  fundingStage: z.string().optional().nullable(),

  projectType: z.string().min(1, "Please select a product type"),
  projectNiche: z.string().min(2, "Blockchain networks are required"),
  currentWebsite: z.string().optional().nullable(),
  goals: z.string().min(10, "Please provide more details about your strategy"),
  targetAudience: z.string().min(5, "Target audience is required"),
  competitors: z.string().optional().nullable(),
  designPrefs: z.string().optional().nullable(),
  brandGuidelines: z.string().optional().nullable(),

  features: z.array(z.string()).min(1, "Select at least one feature"),
  integrations: z.string().optional().nullable(),
  userRoles: z.string().optional().nullable(),
  contentReady: z.string().optional().nullable(),

  techStack: z.string().min(1, "Please select a tech stack"),
  complianceLevel: z.string().min(1, "Please select a compliance level"),
  expectedVolume: z.string().optional().nullable(),

  budget: z.string().min(1, "Please select your budget range"),
  deadline: z.string().min(1, "Please select a target launch date"),
  maintenance: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
});

export type BriefSchema = z.infer<typeof briefSchema>;
