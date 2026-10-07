---
name: Van de Voort Tuinen — POC verfijnd
description: Approved familiar green identity with authentic photography and clear service cards.
colors:
  primary: "#326f39"
  primary-hover: "#285a2e"
  background: "#fafbf8"
  foreground: "#202d24"
  card: "#ffffff"
  muted: "#526257"
  border: "#dce5d8"
  input: "#c9d5c8"
  section: "#edf2e9"
typography:
  display:
    fontFamily: "Geist, sans-serif"
    fontSize: "60px"
    fontWeight: 550
    lineHeight: 1.09
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist, sans-serif"
    fontSize: "34px"
    fontWeight: 550
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Geist, sans-serif"
    fontSize: "20px"
    fontWeight: 550
  body:
    fontFamily: "Geist, sans-serif"
    fontSize: "14px"
    lineHeight: 1.8
rounded:
  button: "6px"
  photo: "10px"
  card: "12px"
spacing:
  grid: "24px"
  section: "68px"
  section-mobile: "46px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.card}"
    rounded: "{rounded.button}"
    padding: "15px 22px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  service-card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.card}"
    padding: "28px"
---

# Design System: Van de Voort Tuinen

## Overview

**Creative North Star: "POC verfijnd"**

The user selected direction 1. Keep the familiar leaf logo, green identity, photographic opening and recognizable service cards. Calm spacing and readable Dutch text support a practical local business. This record describes the implemented homepage, not deployment status.

**Key Characteristics:**

- Authentic photography and original service illustrations.
- Green actions, pale garden-toned sections and white cards.
- Clear service grouping and direct quotation and calling actions.

Source: `app/approved-poc.css`, the homepage sections and layout components. The scoped homepage palette overrides the underlying light/dark tokens; the comparison previews retain their own styles.

## Colors

Primary green identifies actions, selected filters and focus. Dark green text and muted text sit on the light background, white cards and pale section surfaces. The hero uses white copy over a dark photographic overlay. The frontmatter owns the reusable color values.

## Typography

Geist is the existing display and body family. Headlines use medium weight and modestly tight spacing. Hero display text reduces to 42px below 768px; section headings reduce to 28px. Service descriptions and features use the body role; hero supporting copy is 18px, reducing to 16px on mobile. Paragraph measures reach about 65ch in section introductions.

## Layout

Containers occupy 90% of the viewport with a 1260px maximum. Section spacing uses the desktop and mobile tokens. The four service cards use one row from 1280px, two columns below 1280px and one below 768px. Projects use three, two below 1024px and one below 480px. About and contact collapse to one column below 768px.

The sticky header is 94px tall, reducing to 80px on mobile; navigation changes to a menu below 1024px. The chosen homepage composition is recorded in [the homepage brief](docs/ai/homepage-brief.md), rather than imposed on every future surface.

## Elevation & Depth

Main sections and service cards use surface colors and subtle borders rather than decorative shadows. The shared input and dialog primitives retain their own subtle elevation. The photographic hero has a dark overlay for legibility. Gallery imagery enlarges slightly on hover; reduced-motion CSS disables animation and transition effects.

## Shapes

Service and form cards have gently rounded corners; gallery images have a slightly tighter curve. Primary actions use compact rounded rectangles. Project filters use pill shapes with a filled selected state. Borders separate cards, fields and footer content.

## Components

- **Buttons:** green primary action, white text, darker hover; the hero uses a pale inverse action. Minimum action height is 48px. Focus uses a 3px green outline with 4px offset.
- **Service cards:** original illustration, title, retained description and features, expandable original-site explanation, then contact link. Cards align their final action at the bottom.
- **Project browsing:** the homepage uses a horizontal scroll-snap rail with keyboard-focusable previous/next controls. `/projecten` owns the wrapping service filters with `aria-pressed`; all 23 source photographs remain available. Tiles open the shared dialog for a larger view.
- **Inputs:** visible Dutch labels, existing shadcn input/textarea primitives, native required-field validation and clear consent. Form fields have a 44px input height; the form prepares an email draft.
- **Navigation:** visible logo, section links and contact actions; mobile menu and skip link remain accessible.

## Do's and Don'ts

- Do preserve the selected POC composition and familiar green leaf identity.
- Do retain every original-site image and its provenance.
- Do preserve readable text, visible focus and reduced-motion behavior.
- Don't invent reviews, business figures or delivery promises.
- Don't replace the approved direction with an unselected comparison or archived design.
