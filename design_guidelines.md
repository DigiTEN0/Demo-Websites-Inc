# Design Guidelines: Dutch Roofing Company Website

## Design Approach

**Reference-Based Approach** inspired by successful service-oriented platforms (Airbnb for trust-building, local service businesses) adapted for the Dutch roofing market. The design should convey professionalism, reliability, and craftsmanship while maintaining modern web aesthetics using the dakdekTheme card styling as the foundation.

## Core Design Principles

1. **Vertrouwen (Trust)**: Build immediate credibility through professional presentation, social proof, and clear service offerings
2. **Duidelijkheid (Clarity)**: Make services and contact pathways obvious and frictionless
3. **Vakmanschap (Craftsmanship)**: Showcase quality work through visual hierarchy and polished components
4. **Toegankelijkheid (Accessibility)**: Easy navigation and multiple conversion paths

## Typography

**Font Families** (via Google Fonts):
- Primary: 'Inter' - Clean, professional, highly readable (400, 500, 600, 700)
- Accent: 'Poppins' - Headers and CTAs (600, 700)

**Type Scale**:
- H1 (Hero): text-5xl md:text-6xl lg:text-7xl, font-bold (Poppins)
- H2 (Sections): text-3xl md:text-4xl lg:text-5xl, font-bold (Poppins)
- H3 (Cards): text-xl md:text-2xl, font-semibold (Poppins)
- Body: text-base md:text-lg, font-normal (Inter)
- Small: text-sm, font-medium (Inter)

## Layout System

**Spacing Primitives**: Consistent use of Tailwind units: 2, 4, 6, 8, 12, 16, 20, 24, 32
- Card padding: p-6 md:p-8
- Section spacing: py-16 md:py-24 lg:py-32
- Element gaps: gap-4, gap-6, gap-8
- Container max-width: max-w-7xl mx-auto px-4 md:px-6 lg:px-8

**Grid System**:
- Services: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Testimonials/Reviews: grid-cols-1 md:grid-cols-2
- FAQ: Single column max-w-3xl centered

## Component Library

### Header/Navigation
- Fixed/sticky header with semi-transparent backdrop blur
- Logo (filler text "BEDRIJFSNAAM" in bold Poppins) left-aligned
- Navigation items right-aligned: Diensten, Over Ons, Reviews, Contact
- Primary CTA button: "Offerte Aanvragen" with dakdekTheme styling
- Mobile: Hamburger menu expanding to full-screen overlay

### Hero Section
- Full-width image background (roofing work in progress, professional crew)
- Height: min-h-[600px] md:min-h-[700px]
- Overlay: gradient from dark at bottom to semi-transparent at top
- Content centered-left aligned in max-w-7xl container
- Headline + subheadline + dual CTA (primary + secondary with tel: link)
- Integrated quick form: Name, Phone, Email, Message, Submit button

### Service Cards (dakdekTheme styling reference)
- Rounded corners (rounded-xl)
- Subtle shadow (shadow-lg hover:shadow-xl transition)
- Icon/image at top (rounded-lg overflow-hidden)
- Title, description, "Meer Info" link
- Hover: Slight lift transform (hover:-translate-y-1)

### Google Reviews Section
- Section title centered: "Wat Onze Klanten Zeggen"
- Star rating display (5-star visual with count)
- Review cards in 2-column grid
- Each card: Customer name, star rating, review text, date
- Include Google logo badge

### FAQ Section
- Accordion-style expandable questions
- Each item: Question in bold, chevron icon, expanding answer
- Spacing between items: space-y-4
- Max-width: max-w-3xl centered

### Multi-Step Form (Sidebar)
- Slides in from right: transform translate-x-full to translate-x-0
- Full height with close button (X) top-right
- Progress indicator: Step 1/3, 2/3, 3/3
- Steps: 1) Service Type, 2) Contact Info, 3) Project Details
- Large, touch-friendly inputs with labels
- Submit button prominent at bottom

### WhatsApp Floating Button
- Position: fixed bottom-8 right-8
- Round button with WhatsApp icon (shadow-2xl)
- Subtle pulse animation
- z-index high enough to float above content

### "Offerte Aanvragen" Floating Button
- Position: fixed left-8 top-1/2 -translate-y-1/2
- Vertical text or rotated button
- Shadow and hover states from dakdekTheme
- Opens sidebar form on click

### Footer
- Multi-column layout: Company info, Quick Links, Diensten, Contact
- Logo (filler text "BEDRIJFSNAAM") in company info column
- Social media icons
- Copyright and privacy links centered at bottom
- Background: subtle contrast from main content

## Images

**Required Images**:
1. **Hero Image**: Professional roofing crew working on a residential roof, clear blue sky, action shot showing craftsmanship (full-width, high-quality)
2. **Service Images**: Close-up shots of different roofing types (flat roof, pitched roof, repairs) - used in service cards
3. **About/Team Section**: Professional team photo showing the crew (optional section)
4. **Project Gallery**: Before/after shots of completed roofing projects (masonry grid layout)

**Image Treatment**: All images should have subtle rounded corners (rounded-lg) when in cards, full-bleed for hero

## Animations & Interactions

**Minimal, Purposeful Animations**:
- Scroll-triggered fade-in for sections (subtle, fast)
- Sidebar form slide-in/out transition
- Button hover states (slight scale or shadow increase)
- Smooth scrolling for anchor links
- No parallax, no complex scroll effects

## Dutch Language Specific

**Key Terminology**:
- CTA: "Offerte Aanvragen" (Request Quote)
- Services: "Diensten"
- Reviews: "Reviews" or "Beoordelingen"
- About: "Over Ons"
- Contact: "Contact"
- FAQ: "Veelgestelde Vragen"

## Page Structure

**Homepage Sections (in order)**:
1. Hero with integrated form
2. Services overview (3-column grid)
3. Why Choose Us / USPs (2-column features)
4. Google Reviews showcase
5. Project Gallery (masonry or grid)
6. FAQ section
7. Final CTA section
8. Footer

**Mobile-First Responsive Approach**:
- All multi-column layouts stack to single column on mobile
- Touch-friendly button sizes (min-h-12)
- Readable font sizes without zoom
- Simplified navigation for mobile

This design creates a professional, trustworthy presence for roofing companies while maintaining the flexibility to customize logos and business names across the template system.