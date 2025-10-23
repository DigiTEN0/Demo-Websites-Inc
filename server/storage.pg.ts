import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
const { Pool } = pkg;
import { demos } from '@shared/schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { InsertDemo, Demo } from '@shared/schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

export class PgStorage {
  async getAllDemos(): Promise<Demo[]> {
    return await db.select().from(demos).orderBy(demos.createdAt);
  }

  async getDemoById(id: string): Promise<Demo | undefined> {
    const result = await db.select().from(demos).where(eq(demos.id, id));
    return result[0];
  }

  async getDemoBySlug(slug: string): Promise<Demo | undefined> {
    const result = await db.select().from(demos).where(eq(demos.slug, slug));
    return result[0];
  }

  async createDemo(data: InsertDemo): Promise<Demo> {
    const demo: Demo = {
      id: randomUUID(),
      slug: data.slug,
      businessName: data.businessName ?? "BEDRIJFSNAAM",
      logoText: data.logoText ?? "BEDRIJFSNAAM",
      logoUrl: data.logoUrl ?? null,
      phoneNumber: data.phoneNumber ?? "+31 6 12345678",
      email: data.email ?? "info@dakdekker.nl",
      whatsappNumber: data.whatsappNumber ?? "31612345678",
      address: data.address ?? "Amsterdam, Nederland",
      googleMapsReviewUrl: data.googleMapsReviewUrl ?? null,
      primaryColor: data.primaryColor ?? "#0ea5e9",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await db.insert(demos).values(demo);
    return demo;
  }

  async updateDemo(id: string, data: InsertDemo): Promise<Demo> {
    const updated: Partial<Demo> = {
      slug: data.slug,
      businessName: data.businessName,
      logoText: data.logoText,
      logoUrl: data.logoUrl,
      phoneNumber: data.phoneNumber,
      email: data.email,
      whatsappNumber: data.whatsappNumber,
      address: data.address,
      googleMapsReviewUrl: data.googleMapsReviewUrl,
      primaryColor: data.primaryColor,
      updatedAt: new Date(),
    };
    await db.update(demos).set(updated).where(eq(demos.id, id));
    const result = await this.getDemoById(id);
    if (!result) throw new Error("Demo not found after update");
    return result;
  }

  async deleteDemo(id: string): Promise<boolean> {
    const result = await db.delete(demos).where(eq(demos.id, id));
    return result.rowCount > 0;
  }
}
