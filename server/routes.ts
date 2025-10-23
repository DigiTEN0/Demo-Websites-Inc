import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSiteSettingsSchema, insertContactSubmissionSchema, insertDemoSchema } from "@shared/schema";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import multer from "multer";
import path from "path";
import { nanoid } from "nanoid";

const PgStore = connectPgSimple(session);

const logoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "attached_assets", "logos"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `logo_${nanoid()}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage: logoStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|svg|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed (jpeg, jpg, png, svg, webp)"));
    }
  },
});

declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session middleware
  const sessionStore = new PgStore({
  conString: process.env.DATABASE_URL,
  createTableIfMissing: true,
});

// Log session store errors
sessionStore.on('error', (error) => {
  console.error('Session store error:', error);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || "development-secret-change-in-production",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    },
  })
);

  // Auth endpoints
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await storage.getUserByEmail(email);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.userId = user.id;
      res.json({ success: true });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.json({ success: true });
    });
  });

  // Middleware to check authentication
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  // Site settings endpoints
  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getSiteSettings();
      
      if (!settings) {
        return res.status(404).json({ message: "Settings not found" });
      }

      res.json(settings);
    } catch (error) {
      console.error("Get settings error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/settings", requireAuth, async (req, res) => {
    try {
      const validatedData = insertSiteSettingsSchema.parse(req.body);
      const updatedSettings = await storage.updateSiteSettings(validatedData);
      res.json(updatedSettings);
    } catch (error) {
      console.error("Update settings error:", error);
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid data", error });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Logo upload endpoint
  app.post("/api/upload/logo", requireAuth, upload.single("logo"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const logoUrl = `/assets/logos/${req.file.filename}`;
      res.json({ logoUrl });
    } catch (error) {
      console.error("Logo upload error:", error);
      res.status(500).json({ message: "Failed to upload logo" });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.json(submission);
    } catch (error) {
      console.error("Contact submission error:", error);
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid data", error });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all contact submissions (admin only)
  app.get("/api/contact", requireAuth, async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Get submissions error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Demo endpoints (admin only)
  app.get("/api/demos", requireAuth, async (req, res) => {
    try {
      const demos = await storage.getAllDemos();
      res.json(demos);
    } catch (error) {
      console.error("Get demos error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/demos/:id", requireAuth, async (req, res) => {
    try {
      const demo = await storage.getDemoById(req.params.id);
      if (!demo) {
        return res.status(404).json({ message: "Demo not found" });
      }
      res.json(demo);
    } catch (error) {
      console.error("Get demo error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/demos", requireAuth, async (req, res) => {
    try {
      const validatedData = insertDemoSchema.parse(req.body);
      
      const existingDemo = await storage.getDemoBySlug(validatedData.slug);
      if (existingDemo) {
        return res.status(400).json({ message: "A demo with this slug already exists" });
      }

      const demo = await storage.createDemo(validatedData);
      res.json(demo);
    } catch (error) {
      console.error("Create demo error:", error);
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid data", error });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/demos/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = insertDemoSchema.parse(req.body);
      
      const existingDemo = await storage.getDemoBySlug(validatedData.slug);
      if (existingDemo && existingDemo.id !== req.params.id) {
        return res.status(400).json({ message: "A demo with this slug already exists" });
      }

      const demo = await storage.updateDemo(req.params.id, validatedData);
      res.json(demo);
    } catch (error) {
      console.error("Update demo error:", error);
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid data", error });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/demos/:id", requireAuth, async (req, res) => {
    try {
      const success = await storage.deleteDemo(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Demo not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Delete demo error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Public demo viewer endpoint (no auth required)
  app.get("/api/demo/:slug", async (req, res) => {
    try {
      const demo = await storage.getDemoBySlug(req.params.slug);
      if (!demo) {
        return res.status(404).json({ message: "Demo not found" });
      }
      res.json(demo);
    } catch (error) {
      console.error("Get demo by slug error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
