# Quotle - UI/UX Specification Document

## 🎨 Design System

### Color Palette

```
PRIMARY COLORS:
┌─────────────────────────────────────┐
│ Purple       #7C3AED  ◼️  Main      │ Used for: Buttons, highlights, active states
│ Light Purple #A855F7  ◼️  Hover     │ Used for: Hover states, borders
└─────────────────────────────────────┘

NEUTRAL COLORS:
┌─────────────────────────────────────┐
│ White        #FFFFFF  ◼️  Base      │ Used for: Backgrounds, text on dark
│ Light Gray   #F9FAFB  ◼️  Subtle    │ Used for: Cards, containers
│ Medium Gray  #F3F4F6  ◼️  Dividers  │ Used for: Input fields, dividers
│ Neutral Gray #E5E7EB  ◼️  Border    │ Used for: Borders, subtle separators
│ Dark Gray    #6B7280  ◼️  Secondary │ Used for: Secondary text, labels
│ Darker Gray  #1F2937  ◼️  Primary   │ Used for: Main text, headings
└─────────────────────────────────────┘

SEMANTIC COLORS:
┌─────────────────────────────────────┐
│ Success Green #10B981  ◼️            │ Used for: Success states, confirmations
│ Error Red    #EF4444  ◼️             │ Used for: Errors, destructive actions
│ Like Red     #DC2626  ◼️             │ Used for: Liked state, heart icon
│ Warning Red  #F59E0B  ◼️             │ Used for: Warnings, similar quotes
└─────────────────────────────────────┘
```

### Typography System

```
FONT FAMILY:
┌─────────────────────────────────────┐
│ Primary: DM Sans                    │
│ Fallback: System San Francisco      │
│ Monospace: Courier New (future)     │
└─────────────────────────────────────┘

FONT SIZES & WEIGHTS:

Large Headers (28pt, Bold 700)
├─ "Your Quotes" on Home
├─ "Search Quotes" on Search
├─ "Create Quote" on Create
├─ "Profile" on Profile
└─ "Leaderboard" on Leaderboard

Medium Headers (20pt, Bold 700)
├─ User names in profile
├─ "Your Top Quotes" section title
└─ Similar quote modal title

Section Titles (16pt, Bold 600)
├─ "Your Top Quotes"
├─ "Discover Quotes"
├─ Section separators
└─ "Your Quotes" in profile

Body Text (14-16pt, Regular 400)
├─ Quote text in cards (16pt, 700)
├─ Author names (14pt, 400)
├─ Form inputs (16pt, 400)
├─ User bios (13-14pt, 400)
└─ Button text (14pt, 600)

Secondary Text (12pt, Regular 400)
├─ Stats labels
├─ Timestamps
├─ Character counts
├─ Help text
└─ Error messages

Tiny Text (10-11pt, Regular 400)
├─ Badge numbers
├─ Input placeholders
└─ Fine print

LINE HEIGHT:
├─ Headings: 1.0x (28pt)
├─ Subheadings: 1.1x (20pt)
├─ Body text: 1.5x (21-24pt)
├─ Quote text: 1.5x (24-32pt)
└─ Labels: 1.0x (14pt)
```

### Spacing System

```
BASE UNIT: 4px (8pt)

SPACING SCALE:
2px   = 0.5 unit  (micro spacing)
4px   = 1 unit    (minimum padding)
8px   = 2 units   (small spacing)
12px  = 3 units   (button padding)
16px  = 4 units   (standard padding) ⭐ MOST USED
20px  = 5 units   (section spacing)
24px  = 6 units   (large spacing)
32px  = 8 units   (major spacing)

COMPONENT SPACING:
┌──────────────────────────────────────┐
│ Cards             │ 16px padding all │
│ Buttons           │ 12px V, 16px H   │
│ Inputs            │ 12px V, 16px H   │
│ Section title     │ 16px left, 20px top│
│ Screen padding    │ 16px horizontal  │
│ List item padding │ 12px vertical    │
│ Modal padding     │ 16px all         │
└──────────────────────────────────────┘
```

### Sizing System

```
RADIUS (Border Radius):
Sharp       = 0px      (none)
Subtle      = 4px      (small inputs)
Small       = 8px      (buttons, small cards)
Medium      = 12px     ⭐ MOST USED
Large       = 16px     (modal, major cards)
Extra Large = 20px     (profile rounded)
Full        = 999px    (pills, badges)

ICON SIZES:
Extra Small = 16px     (inline indicators)
Small       = 20px     ⭐ MOST USED
Medium      = 24px     (navigation icons)
Large       = 32px     (empty states)
Extra Large = 48px     (hero images)

BUTTON SIZES:
Height:
├─ Small:  32px
├─ Medium: 40px  ⭐ MOST USED
└─ Large:  48px

Width:
├─ Extra Small: 80px
├─ Small:       120px
├─ Medium:      Full width common
└─ Large:       Full width

CARD WIDTHS:
├─ Extra Small: 48px
├─ Small:       120px
├─ Medium:      280px
└─ Full:        Screen width
```

### Shadows & Elevation

```
ELEVATION LEVELS:

No Elevation
├─ Flat backgrounds, text

Elevation 1 (Subtle)
├─ Subtle cards on light backgrounds
├─ Shadow: 0 1px 2px rgba(0,0,0,0.05)

Elevation 2 (Light)
├─ Quote cards, input fields
├─ Shadow: 0 1px 3px rgba(0,0,0,0.1)

Elevation 3 (Medium) ⭐ MOST USED
├─ Main cards, buttons on hover
├─ Shadow: 0 4px 6px rgba(0,0,0,0.1)

Elevation 4 (Dark)
├─ Modals, popovers
├─ Shadow: 0 10px 15px rgba(0,0,0,0.15)

Elevation 5 (Very Dark)
├─ Full screen modals
├─ Shadow: 0 20px 25px rgba(0,0,0,0.2)
```

---

## 🎯 Component Specifications

### QuoteCard Component

```
┌─────────────────────────────────────┐
│ ▊  Quote Card (with left border)    │
│                                     │
│  "At the end of the day, people    │
│  won't remember what you said or   │
│  did, they will remember how you   │
│  made them feel."                  │
│                                     │
│  ~Maya Angelou                      │
│                                     │
│  ───────────────────────────────    │
│  ❤️ 120 likes   📤 45 shares        │
└─────────────────────────────────────┘

Dimensions:
├─ Width: Full screen - 32px padding
├─ Height: Auto (content based)
├─ Min Height: 140px
└─ Border Radius: 16px

Colors:
├─ Background: #F3F4F6 (or #FAF5FF if featured)
├─ Left Border: #7C3AED (or #A855F7 if featured)
├─ Text: #1F2937
└─ Stats: #6B7280

Typography:
├─ Quote: 16pt Bold (#1F2937)
├─ Author: 14pt Regular (#6B7280)
├─ Stats: 12pt Regular (#6B7280)
└─ Line Height: 24pt for quote

Spacing:
├─ All padding: 16px
├─ Quote margin bottom: 12px
├─ Border line margin top: 12px
├─ Stat gap: 16px
└─ Card margin bottom: 12px

Interactive:
├─ onPress: Opens QuoteDetailScreen
├─ onAuthorPress: Opens UserProfileScreen
├─ Tap feedback: opacity 0.7
└─ Animation: smooth 100ms
```

### Button Styles

```
PRIMARY BUTTON:
┌────────────────────────────────┐
│     Publish Quote              │
└────────────────────────────────┘
├─ Background: #7C3AED
├─ Text: White (16pt Bold)
├─ Height: 48-52px
├─ Border Radius: 12px
├─ Padding: 12px vertical, 16px horizontal
├─ Border: None
├─ Disabled: #D1D5DB
└─ Hover: #6D28D9 (darker)

SECONDARY BUTTON:
┌────────────────────────────────┐
│     Start Over                 │
└────────────────────────────────┘
├─ Background: White
├─ Border: 1px #E5E7EB
├─ Text: #1F2937 (14pt Bold)
├─ Height: 40-44px
├─ Border Radius: 10px
├─ Padding: 10px vertical, 16px horizontal
└─ Hover: #F9FAFB

TERTIARY BUTTON:
┌────────────────────────────────┐
│        Follow                  │
└────────────────────────────────┘
├─ Background: Transparent
├─ Border: 1px #E5E7EB
├─ Text: #1F2937
├─ Minimal padding
└─ Compact style

ICON BUTTON:
└─ Just icon, no background until hover
   └─ On hover: Subtle background
```

### Input Field Styles

```
TEXT INPUT:
┌─────────────────────────────────┐
│ Enter your quote here...         │ Placeholder
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ At the end of the day...        │ Filled
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ Quote cannot be empty          │ Error
└─────────────────────────────────┘

Styling:
├─ Background: #F3F4F6
├─ Border: 1px #E5E7EB
├─ Border Radius: 12px
├─ Padding: 12px all sides
├─ Font: 16pt DM Sans
├─ Text Color: #1F2937
├─ Placeholder Color: #9CA3AF
├─ Error Border: #EF4444
├─ Focus Border: #7C3AED
├─ Focus Background: #FFFFFF
└─ Transition: 200ms

TEXTAREA (Multi-line):
├─ Min Height: 120px
├─ Max Height: 300px
├─ Text Align: Top
├─ Resize: Vertical only
└─ Scrollable: Yes

COUNTER:
├─ Position: Bottom left
├─ Font: 12pt Regular #6B7280
├─ Format: "150/500"
├─ Turns red when >500
└─ Updates in real-time
```

### Navigation Bar (Bottom Tab)

```
┌─────────────────────────────────┐
│  🏠  🔍  ➕  🏆  👤           │
│ Home Search Create Trending Me │
└─────────────────────────────────┘

Specifications:
├─ Height: 60px (8pt padding + icon + label)
├─ Background: #FFFFFF
├─ Border Top: 1px #E5E7EB
├─ Shadow: Subtle elevation 2
├─ Safe Area: +8pt bottom (notch devices)

Icon Styling:
├─ Inactive: #D1D5DB (24pt)
├─ Active: #7C3AED (24pt)
├─ Transition: 200ms

Label Styling:
├─ Font: 10pt DM Sans
├─ Inactive: #D1D5DB
├─ Active: #7C3AED
├─ Margin Top: 2pt
└─ Always visible

Spacing:
├─ Each tab: Equal width
├─ Icon to label: 2-4pt gap
└─ Padding sides: 8pt

Behavior:
├─ Tap: Switch screen (200ms animation)
├─ Visual feedback: Immediate color change
├─ Persist: Navigation state saved
└─ Accessibility: 44pt minimum touch
```

### Modal Specifications

```
SIMILAR QUOTES MODAL:
┌─────────────────────────────────┐
│ Similar Quotes Found            │
├─────────────────────────────────┤
│ We found quotes very similar to │
│ yours. Consider reviewing these:│
│                                 │
│ "Quote text here..."            │
│ ~Author Name                    │
│                                 │
│ ┌───────────────┬──────────────┐│
│ │ Start Over    │ Publish      ││
│ └───────────────┴──────────────┘│
└─────────────────────────────────┘

Specifications:
├─ Background: Semi-transparent black (0.5 opacity)
├─ Modal Slide: From bottom
├─ Animation: 300ms spring
├─ Border Radius Top: 16px
├─ Max Height: 80% screen
├─ Scrollable Content: Yes

Colors:
├─ Background: #FFFFFF
├─ Title: #1F2937 (18pt Bold)
├─ Subtitle: #6B7280 (12pt)
├─ Border Top: Rounded 16px
└─ Padding: 16px all

Buttons:
├─ Width: Equal split with 8px gap
├─ Left: Secondary (white)
├─ Right: Primary (purple)
├─ Both: 48pt height minimum
└─ Text: 14pt Bold
```

---

## 📱 Screen Layouts

### Home Screen Layout

```
┌─────────────────────────────────┐
│ Your Quotes                     │
│ Brandon Tedesco • 5 saved       │
├─────────────────────────────────┤
│                                 │
│ Your Top Quotes                 │
├─────────────────────────────────┤
│ ▊ Quote Card 1                  │
│ ▊ Quote Card 2                  │
│ ▊ Quote Card 3                  │
│ ▊ Quote Card 4                  │
│ ▊ Quote Card 5                  │
│                                 │
│ Discover Quotes                 │
│ ┌────────────────────────────┐  │
│ │ Load More Quotes (Button)  │  │
│ └────────────────────────────┘  │
│                                 │
│ ▊ Quote Card (API)              │
│ ▊ Quote Card (API)              │
│ ▊ Quote Card (API)              │
│                                 │
└─────────────────────────────────┘
```

### Search Screen Layout

```
┌─────────────────────────────────┐
│ Search Quotes                   │
│                                 │
│ ┌──────────────────────────────┐│
│ │ Search quotes or authors...  ││
│ └──────────────────────────────┘│
│                                 │
│ [All][GoodReads][My Quotes]    │
│                                 │
│ 5 results found                 │
├─────────────────────────────────┤
│ ▊ Quote Result 1                │
│ ▊ Quote Result 2                │
│ ▊ Quote Result 3                │
│ ▊ Quote Result 4                │
│ ▊ Quote Result 5                │
│                                 │
└─────────────────────────────────┘
```

### Create Quote Layout

```
┌─────────────────────────────────┐
│ Create Quote                    │
│                                 │
│ 💡 Share your wisdom! Quotes... │
│                                 │
│ Your Quote *                    │
│ ┌──────────────────────────────┐│
│ │ Enter your quote here...     ││
│ │                              ││
│ │                              ││
│ └──────────────────────────────┘│
│ 0/500                           │
│                                 │
│ Author *                        │
│ ┌──────────────────────────────┐│
│ │ Who said this quote?         ││
│ └──────────────────────────────┘│
│                                 │
│ ┌──────────────────────────────┐│
│ │   Publish Quote (Button)     ││
│ └──────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

### Profile Screen Layout

```
┌─────────────────────────────────┐
│ Profile                         │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Brandon Tedesco             │ │
│ │ Quote enthusiast 💭         │ │
│ │ 24 | 420 | 1.3K | 342      │ │
│ │ Quotes  Likes  Followers    │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌──────────┬──────────────────┐ │
│ │+ Create  │ 📤 Share         │ │
│ └──────────┴──────────────────┘ │
│                                 │
│ Your Quotes (24)                │
├─────────────────────────────────┤
│ ▊ Quote Card 1                  │
│ ▊ Quote Card 2                  │
│ ▊ Quote Card 3                  │
│ ▊ Quote Card 4                  │
│                                 │
└─────────────────────────────────┘
```

### Leaderboard Layout

```
┌─────────────────────────────────┐
│ Leaderboard                     │
│                                 │
│ [❤️ Likes][📝 Quotes][👥 Followers]
│                                 │
├─────────────────────────────────┤
│ #1 👤 Buzz                      │
│    1.3K likes                   │
│                                 │
│ #2 👤 Brandon Tedesco           │
│    420 likes                    │
│                                 │
│ #3 👤 Heather                   │
│    220 likes                    │
│                                 │
│ #4 👤 User 4                    │
│    150 likes                    │
│                                 │
│ #5 👤 User 5                    │
│    120 likes                    │
│                                 │
└─────────────────────────────────┘
```

---

## 🎭 Interaction States

### Button States

```
DEFAULT:
├─ Background: #7C3AED
├─ Text: White
└─ Opacity: 1.0

HOVER/ACTIVE:
├─ Background: #6D28D9 (darker)
├─ Text: White
└─ Opacity: 1.0

PRESSED:
├─ Background: #5B21B6 (even darker)
├─ Scale: 0.98
└─ Duration: 100ms

DISABLED:
├─ Background: #D1D5DB
├─ Text: White
├─ Opacity: 0.6
└─ Cursor: not-allowed
```

### Quote Card States

```
DEFAULT:
├─ Background: #F3F4F6
├─ Border Left: #7C3AED
├─ Shadow: Subtle (elevation 2)
└─ Opacity: 1.0

HOVERED:
├─ Background: #EFEFEF
├─ Scale: 1.01
├─ Shadow: Slightly darker
└─ Duration: 150ms

PRESSED:
├─ Background: #E5E7EB
├─ Scale: 0.99
└─ Duration: 100ms

FEATURED:
├─ Background: #FAF5FF
├─ Border Left: #A855F7 (lighter)
└─ Visual indicator
```

### Like Button States

```
UNLIKED:
├─ Icon: Heart outline
├─ Color: #9CA3AF
├─ Background: #FEF2F2
└─ Border: 1px #FECACA

LIKED:
├─ Icon: Heart filled
├─ Color: #DC2626
├─ Background: #FEE2E2
├─ Animation: Scale 1.1 then 1.0
└─ Duration: 300ms

LOADING:
├─ Opacity: 0.5
├─ Animation: Spinner
└─ Disable interactions
```

---

## 📊 Responsive Design

### Breakpoints

```
Mobile (default):
├─ Min width: 375px (iPhone SE)
├─ Max width: 428px (iPhone Pro Max)
└─ Padding: 16px

Tablet (future):
├─ Width: 768px+
├─ Padding: 24px
└─ Two-column layout

Desktop (web):
├─ Width: 1200px+
├─ Max width: 1440px
└─ Three-column layout
```

### Safe Area Padding

```
iOS:
├─ Top: Status bar + notch
├─ Bottom: Home indicator
└─ Auto-handled by React Navigation

Android:
├─ Top: Status bar (varies)
├─ Bottom: Navigation bar (varies)
└─ Auto-handled by React Navigation
```

---

## 🎬 Animations & Transitions

```
NAVIGATION:
├─ Slide right on back
├─ Fade in new screens
├─ Duration: 200ms
└─ Easing: ease-out-cubic

INTERACTIONS:
├─ Button tap: 100ms scale
├─ Like animation: 300ms scale
├─ Loading spinner: Continuous rotation
└─ Pull-to-refresh: Spring animation

PROPERTY ANIMATIONS:
├─ Color changes: 200ms
├─ Position changes: 200ms
├─ Size changes: 150ms
└─ Opacity changes: 300ms

TIMING FUNCTIONS:
├─ Tap feedback: cubic-bezier(0.4, 0, 0.2, 1)
├─ Navigation: cubic-bezier(0.25, 0.46, 0.45, 0.94)
├─ Transitions: cubic-bezier(0.4, 0, 0.2, 1)
└─ Entrance: cubic-bezier(0.34, 1.56, 0.64, 1)
```

---

## ♿ Accessibility

### Color Contrast

```
WCAG AA Standards (4.5:1):
├─ Dark text on light: ✅ 9.5:1
├─ White text on purple: ✅ 6.8:1
├─ Light text on dark: ✅ 7.2:1
└─ All combinations: ✅ Pass

COLORBLIND FRIENDLY:
├─ Not relying on red/green only
├─ Patterns and icons for distinction
├─ Text labels always present
└─ Symbol alternatives provided
```

### Touch Targets

```
MINIMUM SIZE:
├─ All buttons: 44x44pt
├─ Icon buttons: 48x48pt
├─ List items: 48pt height minimum
├─ Spacing between targets: 8pt minimum
└─ WCAG AAA compliant
```

### Text

```
READABILITY:
├─ Minimum font: 12pt
├─ Default font: 16pt for body
├─ Line spacing: 1.5x
├─ Letter spacing: Default
└─ No full justification (improved)
```

---

## 📸 Visual Examples Reference

For visual mockups, see the attached screenshot showing:
- Home screen layout
- Profile section
- Leaderboard structure
- Card components
- Navigation bar

Update colors and styles as needed per this specification.

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Status**: Production Ready
