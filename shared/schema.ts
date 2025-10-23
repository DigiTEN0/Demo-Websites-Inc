import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Site Settings - for customization from dashboard
export const siteSettings = pgTable("site_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  businessName: text("business_name").notNull().default("BEDRIJFSNAAM"),
  logoText: text("logo_text").notNull().default("BEDRIJFSNAAM"),
  logoUrl: text("logo_url"),
  phoneNumber: text("phone_number").default("+31 6 12345678"),
  email: text("email").default("info@dakdekker.nl"),
  whatsappNumber: text("whatsapp_number").default("31612345678"),
  address: text("address").default("Amsterdam, Nederland"),
  googleMapsReviewUrl: text("google_maps_review_url"),
  primaryColor: text("primary_color").default("#0ea5e9"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSiteSettingsSchema = createInsertSchema(siteSettings).omit({
  id: true,
  updatedAt: true,
});

export type InsertSiteSettings = z.infer<typeof insertSiteSettingsSchema>;
export type SiteSettings = typeof siteSettings.$inferSelect;

// Contact Form Submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  serviceType: text("service_type"),
  message: text("message"),
  projectDetails: text("project_details"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Admin User for dashboard
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Demos - for multi-tenant demo websites
export const demos = pgTable("demos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  businessName: text("business_name").notNull().default("BEDRIJFSNAAM"),
  logoText: text("logo_text").notNull().default("BEDRIJFSNAAM"),
  logoUrl: text("logo_url"),
  phoneNumber: text("phone_number").default("+31 6 12345678"),
  email: text("email").default("info@dakdekker.nl"),
  whatsappNumber: text("whatsapp_number").default("31612345678"),
  address: text("address").default("Amsterdam, Nederland"),
  googleMapsReviewUrl: text("google_maps_review_url"),
  primaryColor: text("primary_color").default("#0ea5e9"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertDemoSchema = createInsertSchema(demos).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertDemo = z.infer<typeof insertDemoSchema>;
export type Demo = typeof demos.$inferSelect;
