import {
  type User,
  type InsertUser,
  type SiteSettings,
  type InsertSiteSettings,
  type ContactSubmission,
  type InsertContactSubmission,
  type Demo,
  type InsertDemo,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getSiteSettings(): Promise<SiteSettings | undefined>;
  updateSiteSettings(settings: InsertSiteSettings): Promise<SiteSettings>;

  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;

  getAllDemos(): Promise<Demo[]>;
  getDemoBySlug(slug: string): Promise<Demo | undefined>;
  getDemoById(id: string): Promise<Demo | undefined>;
  createDemo(demo: InsertDemo): Promise<Demo>;
  updateDemo(id: string, demo: InsertDemo): Promise<Demo>;
  deleteDemo(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users = new Map<string, User>();
  private siteSettings: SiteSettings | null = null;
  private contactSubmissions = new Map<string, ContactSubmission>();
  private demos = new Map<string, Demo>();

  constructor() {
    this.createUser({
      email: "info@digiten.nl",
      password: "digiten339584!",
    });

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
    return Array.from(this.users.values()).find((user) => user.email === email);
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
    const updatedSettings: SiteSettings = {
      id,
      businessName: settings.businessName ?? "BEDRIJFSNAAM",
      logoText: settings.logoText ?? "BEDRIJFSNAAM",
      logoUrl: settings.logoUrl ?? null,
      phoneNumber: settings.phoneNumber ?? null,
      email: settings.email ?? null,
      whatsappNumber: settings.whatsappNumber ?? null,
      address: settings.address ?? null,
      googleMapsReviewUrl: settings.googleMapsReviewUrl ?? null,
      primaryColor: settings.primaryColor ?? "#0ea5e9",
      updatedAt: new Date(),
    };
    this.siteSettings = updatedSettings;
    return updatedSettings;
  }

  async createContactSubmission(submission: InsertContactSubmission) {
    const id = randomUUID();
    const contactSubmission: ContactSubmission = {
      id,
      name: submission.name,
      email: submission.email,
      phone: submission.phone,
      serviceType: submission.serviceType ?? null,
      message: submission.message ?? null,
      projectDetails: submission.projectDetails ?? null,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }

  async getAllContactSubmissions() {
    return Array.from(this.contactSubmissions.values());
  }

  async getAllDemos() {
    return Array.from(this.demos.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getDemoBySlug(slug: string) {
    return Array.from(this.demos.values()).find((demo) => demo.slug === slug);
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
    const existingDemo = this.demos.get(id);
    if (!existingDemo) throw new Error("Demo not found");

    const updatedDemo: Demo = {
      ...existingDemo,
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
      updatedAt: new Date(),
    };
    this.demos.set(id, updatedDemo);
    return updatedDemo;
  }

  async deleteDemo(id: string) {
    return this.demos.delete(id);
  }
}

export const storage = new MemStorage();
