import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { eq, desc } from "drizzle-orm";
import {
  users,
  siteSettings,
  contactSubmissions,
  demos,
  type User,
  type InsertUser,
  type SiteSettings,
  type InsertSiteSettings,
  type ContactSubmission,
  type InsertContactSubmission,
  type Demo,
  type InsertDemo,
} from "@shared/schema";

/* ---------------------------------------------------
   Interface
---------------------------------------------------- */
export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Site settings
  getSiteSettings(): Promise<SiteSettings | undefined>;
  updateSiteSettings(settings: InsertSiteSettings): Promise<SiteSettings>;

  // Contact submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;

  // Demos
  getAllDemos(): Promise<Demo[]>;
  getDemoBySlug(slug: string): Promise<Demo | undefined>;
  getDemoById(id: string): Promise<Demo | undefined>;
  createDemo(demo: InsertDemo): Promise<Demo>;
  updateDemo(id: string, demo: InsertDemo): Promise<Demo>;
  deleteDemo(id: string): Promise<boolean>;
}

/* ---------------------------------------------------
   In-memory storage (fallback)
---------------------------------------------------- */
export class MemStorage implements IStorage {
  private users = new Map<string, User>();
  private siteSettings: SiteSettings | null = null;
  private contactSubmissions = new Map<string, ContactSubmission>();
  private demos = new Map<string, Demo>();

  constructor() {
    // Default admin
    this.createUser({
      email: "info@digiten.nl",
      password: "digiten339584!",
    });

    // Default site settings
    this.updateSiteSettings({
      businessName: "BEDRIJFSNAAM",
      logoText: "BEDRIJFSNAAM",
      logoUrl: null,
      phoneNumber: "+31 6 12345678",
      email: "info@dakdekker.nl",
      whatsappNumber: "31612345678",
      address: "Amsterdam, Nederland",
      googleMapsReviewUrl: null,
      primaryColor: "#0ea5e9",
    });
  }

  async getUser(id: string) {
    return this.users.get(id);
  }

  async getUserByEmail(email: string) {
    return [...this.users.values()].find(u => u.email === email);
  }

  async createUser(insertUser: InsertUser) {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getSiteSettings() {
    return this.siteSettings || undefined;
  }

  async updateSiteSettings(settings: InsertSiteSettings) {
    const id = this.siteSettings?.id || randomUUID();
    const updated: SiteSettings = {
      id,
      businessName: settings.businessName ?? "BEDRIJFSNAAM",
      logoText: settings.logoText ?? "BEDRIJFSNAAM",
      logoUrl: settings.logoUrl ?? null,
      phoneNumber: settings.phoneNumber ?? "+31 6 12345678",
      email: settings.email ?? "info@dakdekker.nl",
      whatsappNumber: settings.whatsappNumber ?? "31612345678",
      address: settings.address ?? "Amsterdam, Nederland",
      googleMapsReviewUrl: settings.googleMapsReviewUrl ?? null,
      primaryColor: settings.primaryColor ?? "#0ea5e9",
      updatedAt: new Date(),
    };
    this.siteSettings = updated;
    return updated;
  }

  async createContactSubmission(submission: InsertContactSubmission) {
    const id = randomUUID();
    const data: ContactSubmission = {
      id,
      name: submission.name,
      email: submission.email,
      phone: submission.phone,
      serviceType: submission.serviceType ?? null,
      message: submission.message ?? null,
      projectDetails: submission.projectDetails ?? null,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, data);
    return data;
  }

  async getAllContactSubmissions() {
    return [...this.contactSubmissions.values()];
  }

  async getAllDemos() {
    return [...this.demos.values()].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getDemoBySlug(slug: string) {
    return [...this.demos.values()].find(d => d.slug === slug);
  }

  async getDemoById(id: string) {
    return this.demos.get(id);
  }

  async createDemo(insertDemo: InsertDemo) {
    const id = randomUUID();
    const demo: Demo = {
      id,
      slug: insertDemo.slug,
      businessName: insertDemo.businessName ?? "BEDRIJFSNAAM",
      logoText: insertDemo.logoText ?? "BEDRIJFSNAAM",
      logoUrl: insertDemo.logoUrl ?? null,
      phoneNumber: insertDemo.phoneNumber ?? "+31 6 12345678",
      email: insertDemo.email ?? "info@dakdekker.nl",
      whatsappNumber: insertDemo.whatsappNumber ?? "31612345678",
      address: insertDemo.address ?? "Amsterdam, Nederland",
      googleMapsReviewUrl: insertDemo.googleMapsReviewUrl ?? null,
      primaryColor: insertDemo.primaryColor ?? "#0ea5e9",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.demos.set(id, demo);
    return demo;
  }

  async updateDemo(id: string, insertDemo: InsertDemo) {
    const existing = this.demos.get(id);
    if (!existing) throw new Error("Demo not found");

    const updated: Demo = {
      ...existing,
      ...insertDemo,
      updatedAt: new Date(),
    };
    this.demos.set(id, updated);
    return updated;
  }

  async deleteDemo(id: string) {
    return this.demos.delete(id);
  }
}

/* ---------------------------------------------------
   Persistent PostgreSQL storage
---------------------------------------------------- */
export class PostgresStorage implements IStorage {
  private db;

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
    this.db = drizzle(pool);
  }

  async getUser(id: string) {
    const [u] = await this.db.select().from(users).where(eq(users.id, id));
    return u;
  }

  async getUserByEmail(email: string) {
    const [u] = await this.db.select().from(users).where(eq(users.email, email));
    return u;
  }

  async createUser(data: InsertUser) {
    const [u] = await this.db.insert(users).values(data).returning();
    return u;
  }

  async getSiteSettings() {
    const [s] = await this.db.select().from(siteSettings);
    return s;
  }

  async updateSiteSettings(data: InsertSiteSettings) {
    const existing = await this.getSiteSettings();
    if (existing) {
      const [updated] = await this.db
        .update(siteSettings)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(siteSettings.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await this.db
        .insert(siteSettings)
        .values({ ...data, updatedAt: new Date() })
        .returning();
      return created;
    }
  }

  async createContactSubmission(data: InsertContactSubmission) {
    const [c] = await this.db.insert(contactSubmissions).values(data).returning();
    return c;
  }

  async getAllContactSubmissions() {
    return this.db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async getAllDemos() {
    return this.db.select().from(demos).orderBy(desc(demos.createdAt));
  }

  async getDemoBySlug(slug: string) {
    const [d] = await this.db.select().from(demos).where(eq(demos.slug, slug));
    return d;
  }

  async getDemoById(id: string) {
    const [d] = await this.db.select().from(demos).where(eq(demos.id, id));
    return d;
  }

  async createDemo(data: InsertDemo) {
    const [d] = await this.db.insert(demos).values(data).returning();
    return d;
  }

  async updateDemo(id: string, data: InsertDemo) {
    const [d] = await this.db
      .update(demos)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(demos.id, id))
      .returning();
    return d;
  }

  async deleteDemo(id: string) {
    const result = await this.db.delete(demos).where(eq(demos.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

/* ---------------------------------------------------
   Auto-select storage based on environment
---------------------------------------------------- */
let storageInstance: IStorage;

if (process.env.DATABASE_URL) {
  console.log("✅ Using persistent PostgreSQL storage");
  storageInstance = new PostgresStorage();
} else {
  console.log("⚠️ Using in-memory storage (data resets on restart)");
  storageInstance = new MemStorage();
}

export const storage = storageInstance;
