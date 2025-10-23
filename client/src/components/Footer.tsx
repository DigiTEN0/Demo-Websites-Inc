import { Mail, Phone, MapPin } from "lucide-react";
import { SiFacebook, SiInstagram, SiLinkedin } from "react-icons/si";

interface FooterProps {
  businessName: string;
  logoText: string;
  logoUrl?: string | null;
  email: string;
  phoneNumber: string;
}

export function Footer({ businessName, logoText, logoUrl, email, phoneNumber }: FooterProps) {
  return (
    <footer className="bg-card border-t border-card-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div>
            {logoUrl ? (
              <div className="mb-4">
                <img 
                  src={logoUrl} 
                  alt={businessName}
                  className="h-12 object-contain"
                  loading="lazy"
                />
              </div>
            ) : (
              <h3 className="text-2xl font-bold font-poppins mb-4 text-card-foreground">
                {logoText}
              </h3>
            )}
            <p className="text-base text-muted-foreground leading-relaxed mb-4">
              Uw betrouwbare dakdekker specialist voor professionele dakwerkzaamheden in heel Nederland.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-facebook"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-linkedin"
              >
                <SiLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold font-poppins mb-4 text-card-foreground">
              Snelle Links
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-home"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("diensten")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-diensten"
                >
                  Diensten
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-reviews"
                >
                  Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-faq"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold font-poppins mb-4 text-card-foreground">
              Diensten
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Dakbedekking</li>
              <li>Platte Daken</li>
              <li>Dakreparatie</li>
              <li>Dakisolatie</li>
              <li>Dakgoten</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold font-poppins mb-4 text-card-foreground">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <a href={`tel:${phoneNumber}`} className="hover:text-primary transition-colors">
                  {phoneNumber}
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-primary transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Nederland</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-card-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {businessName}. Alle rechten voorbehouden.
            </p>
            <a 
              href="/login"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              data-testid="link-admin-login"
            >
              Admin Login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
