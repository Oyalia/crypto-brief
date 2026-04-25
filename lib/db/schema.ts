import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { randomUUID } from "node:crypto";

export const briefs = pgTable("Brief", {
  id: text("id").primaryKey().$defaultFn(() => randomUUID()),
  companyName: text("companyName").notNull(),
  contactPerson: text("contactPerson").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  socialLinks: text("socialLinks"),
  location: text("location"),
  teamSize: text("teamSize"),
  fundingStage: text("fundingStage"),

  projectType: text("projectType").notNull(),
  projectNiche: text("projectNiche").notNull(),
  currentWebsite: text("currentWebsite"),
  goals: text("goals").notNull(),
  targetAudience: text("targetAudience").notNull(),
  competitors: text("competitors"),
  designPrefs: text("designPrefs"),
  brandGuidelines: text("brandGuidelines"),

  features: text("features").notNull(),
  integrations: text("integrations"),
  userRoles: text("userRoles"),
  contentReady: text("contentReady"),

  techStack: text("techStack"),
  complianceLevel: text("complianceLevel"),
  expectedVolume: text("expectedVolume"),

  budget: text("budget").notNull(),
  deadline: text("deadline").notNull(),
  maintenance: text("maintenance"),
  comments: text("comments"),

  status: text("status").notNull().default("New"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
