# Universal Bot Engine Architecture

## Problem Statement

**Current Limitations:**
- Each bot requires custom TypeScript code
- Cannot create new bot demos without developer involvement
- Difficult to maintain and scale multiple bot demos
- No easy way to test different conversational flows

**Goal:**
Create a configuration-driven bot framework where anyone can create a new bot by simply adding two files (config + data) without writing any code.

---

## Architecture Overview

### Directory Structure

```
bots/
├── doctor-appointment/
│   ├── config.json          # Bot configuration & flow definition
│   └── data.json            # Bot data (lists, variables)
│
├── restaurant-booking/
│   ├── config.json
│   └── data.json
│
├── ecommerce-support/
│   ├── config.json
│   └── data.json
│
└── event-registration/
    ├── config.json
    └── data.json

src/bot-engine/
├── bot-loader.ts            # Scans & loads bot configs
├── bot-engine.ts            # Core bot execution engine
├── message-builder.ts       # Builds WhatsApp messages from config
├── state-manager.ts         # Manages user sessions & state
├── template-engine.ts       # Handles variable replacement
├── validator.ts             # Validates bot configurations
└── types.ts                 # TypeScript interfaces
```

---

## Configuration File Format

### `config.json` - Complete Example

```json
{
  "bot_id": "doctor_appointment",
  "name": "Doctor Appointment Bot",
  "description": "Book doctor appointments at BotPe Care hospitals",
  "version": "1.0.0",

  "triggers": {
    "start": ["dr1", "doctor", "appointment"],
    "end": ["end", "close", "stop", "quit"]
  },

  "phone_numbers": ["399808179880352"],

  "personalization": {
    "use_full_name": true,
    "use_first_name": true
  },

  "stages": [
    {
      "id": "department_selection",
      "type": "list",
      "data_source": "departments",
      "messages": {
        "header": "{{hospital_name}}",
        "body": "Hello {{fullName}}! 👋\n\nWelcome to {{hospital_name}}. I'm here to help you book a doctor's appointment.\n\nWhich department would you like to consult?",
        "button": "Select Department"
      },
      "error_message": "{{firstName}}, please select a department from the list above.",
      "next": "location_request",
      "typing_delay_ms": 1500
    },

    {
      "id": "location_request",
      "type": "location_request",
      "messages": {
        "body": "Great choice, {{firstName}}! 🏥\n\nTo find the nearest {{selections.department}} specialists, please share your current location."
      },
      "error_message": "{{firstName}}, please share your location using the button below so I can find the nearest hospitals for you. 📍",
      "next": "hospital_selection",
      "typing_delay_ms": 1500
    },

    {
      "id": "hospital_selection",
      "type": "list",
      "data_source": "locations",
      "messages": {
        "header": "Nearby Hospitals",
        "body": "Perfect! 📍\n\nHere are the nearest {{hospital_name}} hospitals with {{selections.department}} specialists:",
        "button": "Select Hospital"
      },
      "error_message": "{{firstName}}, please select a hospital from the options above.",
      "next": "doctor_selection",
      "typing_delay_ms": 2000
    },

    {
      "id": "doctor_selection",
      "type": "list",
      "data_source": "doctors",
      "messages": {
        "header": "Available Doctors",
        "body": "Excellent! 👨‍⚕️\n\nHere are the {{selections.department}} doctors available at {{selections.hospital}}:",
        "button": "Select Doctor"
      },
      "error_message": "{{firstName}}, please choose a doctor from the list.",
      "next": "date_selection",
      "typing_delay_ms": 2000
    },

    {
      "id": "date_selection",
      "type": "list",
      "data_source": "dates",
      "messages": {
        "header": "Available Dates",
        "body": "Perfect choice! 📅\n\nWhen would you like to book your appointment with {{selections.doctor}}?",
        "button": "Select Date"
      },
      "error_message": "{{firstName}}, please select a date from the available options.",
      "next": "time_selection",
      "typing_delay_ms": 1500
    },

    {
      "id": "time_selection",
      "type": "list",
      "data_source": "time_slots",
      "messages": {
        "header": "Available Time Slots",
        "body": "Great! ⏰\n\nPlease select your preferred time slot for {{selections.date}}:",
        "button": "Select Time"
      },
      "error_message": "{{firstName}}, please select a time slot.",
      "next": "booking_summary",
      "typing_delay_ms": 1500
    },

    {
      "id": "booking_summary",
      "type": "cta_url",
      "messages": {
        "body": "🎉 Appointment Confirmed!\n\n*Patient:* {{fullName}}\n*Department:* {{selections.department}}\n*Hospital:* {{selections.hospital}}\n*Doctor:* {{selections.doctor}}\n*Date:* {{selections.date}}\n*Time:* {{selections.timeSlot}}\n\nYour appointment has been booked successfully! Click below to view details and download your appointment slip.",
        "button": "View Appointment",
        "url": "https://botpe.in/"
      },
      "next": "end",
      "typing_delay_ms": 2000
    }
  ]
}
```

### `data.json` - Complete Example

```json
{
  "variables": {
    "hospital_name": "BotPe Care",
    "support_phone": "+91-1234567890",
    "support_email": "support@botpe.in"
  },

  "departments": [
    {
      "title": "Cardiology",
      "subtitle": "Heart checkups, ECG, echo, hypertension care"
    },
    {
      "title": "Orthopedics",
      "subtitle": "Bone, joint, sports injury, fracture care"
    },
    {
      "title": "Neurology",
      "subtitle": "Headache, seizures, stroke, nerve care"
    },
    {
      "title": "Dermatology",
      "subtitle": "Skin, hair, acne, allergy treatments"
    },
    {
      "title": "Pediatrics",
      "subtitle": "Child wellness, vaccination, growth care"
    },
    {
      "title": "ENT",
      "subtitle": "Ear, nose, throat, sinus, hearing care"
    }
  ],

  "locations": [
    {
      "title": "Kothrud, Pune",
      "subtitle": "3 kms away • 24 hours • Parking available"
    },
    {
      "title": "Aundh West, Pune",
      "subtitle": "4 kms away • 24 hours • Wheelchair access"
    },
    {
      "title": "Baner, Pune",
      "subtitle": "5 kms away • 24 hours"
    },
    {
      "title": "Katraj, Pune",
      "subtitle": "6 kms away • 24 hours • Pharmacy on-site"
    }
  ],

  "doctors": [
    {
      "title": "Dr A Sharma",
      "subtitle": "MD Cardiology • 10 yrs exp"
    },
    {
      "title": "Dr B Mehta",
      "subtitle": "MS Orthopedics • 12 yrs exp"
    },
    {
      "title": "Dr C Rao",
      "subtitle": "DM Neurology • 9 yrs exp"
    },
    {
      "title": "Dr D Kumar",
      "subtitle": "MD Dermatology • 8 yrs exp"
    },
    {
      "title": "Dr E Patel",
      "subtitle": "DCH Pediatrics • 11 yrs exp"
    },
    {
      "title": "Dr F Jain",
      "subtitle": "MS ENT • 7 yrs exp"
    },
    {
      "title": "Dr G Singh",
      "subtitle": "MBBS, MD • 6 yrs exp"
    }
  ],

  "dates": [
    { "title": "23 October", "subtitle": "Friday" },
    { "title": "24 October", "subtitle": "Saturday" },
    { "title": "25 October", "subtitle": "Sunday" },
    { "title": "26 October", "subtitle": "Monday" },
    { "title": "27 October", "subtitle": "Tuesday" },
    { "title": "28 October", "subtitle": "Wednesday" },
    { "title": "29 October", "subtitle": "Thursday" },
    { "title": "30 October", "subtitle": "Friday" },
    { "title": "31 October", "subtitle": "Saturday" },
    { "title": "01 November", "subtitle": "Sunday" }
  ],

  "time_slots": [
    { "title": "9:00 AM", "subtitle": "Morning slot" },
    { "title": "10:30 AM", "subtitle": "Morning slot" },
    { "title": "12:00 PM", "subtitle": "Afternoon slot" },
    { "title": "2:00 PM", "subtitle": "Afternoon slot" },
    { "title": "4:30 PM", "subtitle": "Evening slot" },
    { "title": "6:00 PM", "subtitle": "Evening slot" }
  ]
}
```

---

## Stage Types Reference

### 1. `list` - Interactive List Message

**Purpose:** Display multiple options for user to select

**Config:**
```json
{
  "id": "stage_name",
  "type": "list",
  "data_source": "departments",  // Key in data.json
  "messages": {
    "header": "List Header",
    "body": "List body text with {{variables}}",
    "button": "Button Text"
  },
  "next": "next_stage_id"
}
```

**Data Format:**
```json
{
  "departments": [
    { "title": "Option 1", "subtitle": "Description 1" },
    { "title": "Option 2", "subtitle": "Description 2" }
  ]
}
```

### 2. `location_request` - Ask for User Location

**Purpose:** Request user to share their GPS location

**Config:**
```json
{
  "id": "stage_name",
  "type": "location_request",
  "messages": {
    "body": "Please share your location"
  },
  "next": "next_stage_id"
}
```

### 3. `cta_url` - Call-to-Action URL Button

**Purpose:** Send message with external link button

**Config:**
```json
{
  "id": "stage_name",
  "type": "cta_url",
  "messages": {
    "body": "Message text",
    "button": "Button text",
    "url": "https://example.com/"
  },
  "next": "end"
}
```

### 4. `text` - Simple Text Message

**Purpose:** Send plain text message

**Config:**
```json
{
  "id": "stage_name",
  "type": "text",
  "messages": {
    "body": "Text message with {{variables}}"
  },
  "next": "next_stage_id"
}
```

### 5. `image` - Image Message

**Purpose:** Send image with optional caption

**Config:**
```json
{
  "id": "stage_name",
  "type": "image",
  "messages": {
    "image_url": "https://example.com/image.jpg",
    "caption": "Optional caption"
  },
  "next": "next_stage_id"
}
```

---

## Template Variables

### Built-in Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{fullName}}` | User's full name from WhatsApp | "Rahul Mane" |
| `{{firstName}}` | User's first name only | "Rahul" |
| `{{phoneNumber}}` | User's phone number | "919422594226" |

### Data Variables

Access any variable from `data.json`:

```
{{hospital_name}}       → "BotPe Care"
{{support_phone}}       → "+91-1234567890"
```

### Selection Variables

Access user's previous selections:

```
{{selections.department}}   → "Cardiology"
{{selections.hospital}}     → "Kothrud, Pune"
{{selections.doctor}}       → "Dr A Sharma"
{{selections.date}}         → "23 October"
{{selections.timeSlot}}     → "9:00 AM"
```

---

## Core Engine Components

### 1. Bot Loader (`bot-loader.ts`)

**Responsibilities:**
- Scan `bots/` directory on startup
- Load all `config.json` and `data.json` files
- Validate configuration schemas
- Register bots with engine
- Watch for config file changes (hot reload)

**API:**
```typescript
class BotLoader {
  async loadAllBots(): Promise<Bot[]>
  async loadBot(botId: string): Promise<Bot>
  async reloadBot(botId: string): Promise<Bot>
  validateConfig(config: BotConfig): ValidationResult
}
```

### 2. Bot Engine (`bot-engine.ts`)

**Responsibilities:**
- Route incoming messages to correct bot
- Execute current stage logic
- Handle stage transitions
- Manage conversation state
- Handle errors and edge cases

**API:**
```typescript
class BotEngine {
  async handleMessage(
    phoneNumber: string,
    messageType: string,
    messageBody: any,
    contactName: string,
    phoneNumberId: string
  ): Promise<void>

  getBotByTrigger(text: string): Bot | null
  getBotByPhoneNumberId(phoneNumberId: string): Bot[]
  executeStage(bot: Bot, stage: Stage, userState: UserState): Promise<void>
}
```

### 3. Message Builder (`message-builder.ts`)

**Responsibilities:**
- Build WhatsApp messages from stage config
- Apply template variable replacements
- Create list messages
- Create location requests
- Create CTA buttons

**API:**
```typescript
class MessageBuilder {
  buildListMessage(stage: Stage, data: any[], variables: object): ListMessage
  buildLocationRequest(stage: Stage, variables: object): LocationRequest
  buildCTAButton(stage: Stage, variables: object): CTAButton
  buildTextMessage(stage: Stage, variables: object): TextMessage
}
```

### 4. State Manager (`state-manager.ts`)

**Responsibilities:**
- Store user conversation state per bot
- Track current stage
- Store user selections
- Handle session timeouts
- Support multiple concurrent bots per user

**API:**
```typescript
class StateManager {
  getState(phoneNumber: string, botId: string): UserState | null
  setState(phoneNumber: string, botId: string, state: UserState): void
  updateSelection(phoneNumber: string, botId: string, key: string, value: any): void
  clearState(phoneNumber: string, botId: string): void
  hasActiveSession(phoneNumber: string, botId: string): boolean
}

interface UserState {
  botId: string;
  currentStage: string;
  fullName: string;
  firstName: string;
  selections: Record<string, any>;
  metadata: {
    startedAt: number;
    lastMessageAt: number;
  };
}
```

### 5. Template Engine (`template-engine.ts`)

**Responsibilities:**
- Replace template variables in messages
- Handle nested variable access
- Provide default values
- Format variables (uppercase, lowercase, etc.)

**API:**
```typescript
class TemplateEngine {
  render(template: string, variables: object): string
  parseVariables(template: string): string[]
  formatVariable(value: any, format: string): string
}
```

---

## How It Works - Step by Step

### 1. Startup Sequence

```
1. Server starts
2. BotLoader.loadAllBots()
3. Scan bots/ directory
4. For each bot folder:
   a. Read config.json
   b. Read data.json
   c. Validate schema
   d. Register with BotEngine
5. Ready to receive messages
```

### 2. Message Flow

```
1. Webhook receives message
2. Extract: phoneNumber, messageType, messageBody, contactName, phoneNumberId
3. Check for trigger word in message:
   a. If trigger found → Start new bot session
   b. If no trigger → Check for active session
4. BotEngine.handleMessage()
5. Get current stage from UserState
6. MessageBuilder.build() appropriate message
7. TemplateEngine.render() with variables
8. Send message via WhatsApp API
9. Update UserState with new stage
10. Wait for next message
```

### 3. Creating a New Bot (5 minutes!)

```bash
# Step 1: Create bot directory
mkdir bots/restaurant-booking

# Step 2: Create config.json
cat > bots/restaurant-booking/config.json <<EOF
{
  "bot_id": "restaurant_booking",
  "name": "Restaurant Booking Bot",
  "triggers": { "start": ["book", "restaurant"], "end": ["end"] },
  "phone_numbers": ["399808179880352"],
  "stages": [
    {
      "id": "cuisine_selection",
      "type": "list",
      "data_source": "cuisines",
      "messages": {
        "header": "Available Cuisines",
        "body": "Hi {{fullName}}! What cuisine would you like?",
        "button": "Select Cuisine"
      },
      "next": "restaurant_selection"
    },
    // ... more stages
  ]
}
EOF

# Step 3: Create data.json
cat > bots/restaurant-booking/data.json <<EOF
{
  "cuisines": [
    { "title": "Italian", "subtitle": "Pizza, Pasta" },
    { "title": "Chinese", "subtitle": "Noodles, Rice" },
    { "title": "Indian", "subtitle": "Curry, Biryani" }
  ],
  // ... more data
}
EOF

# Step 4: Restart server (or hot-reload)
npm run webhook

# Done! Bot is live!
```

---

## Advanced Features

### 1. Conditional Stages

```json
{
  "id": "payment_stage",
  "type": "list",
  "conditions": [
    {
      "if": "{{selections.amount}} > 1000",
      "then": "premium_payment_options"
    },
    {
      "if": "{{selections.amount}} <= 1000",
      "then": "standard_payment_options"
    }
  ]
}
```

### 2. Loop Support

```json
{
  "id": "add_more_items",
  "type": "buttons",
  "messages": {
    "body": "Added {{selections.item}}. Add more items?",
    "buttons": [
      { "id": "yes", "title": "Yes, add more" },
      { "id": "no", "title": "No, checkout" }
    ]
  },
  "next": {
    "yes": "item_selection",  // Loop back
    "no": "checkout"          // Continue
  }
}
```

### 3. Multi-Bot Support

```typescript
// User can interact with multiple bots simultaneously
StateManager.getState("919422594226", "doctor_appointment")
StateManager.getState("919422594226", "restaurant_booking")
StateManager.getState("919422594226", "event_registration")
```

---

## Benefits & Impact

### For Business
- ✅ Create 10 bot demos in 1 hour (vs 1 week with coding)
- ✅ Non-technical team members can create bots
- ✅ Rapid prototyping and testing
- ✅ Easy A/B testing of conversation flows
- ✅ Quick customer demos

### For Developers
- ✅ No more repetitive bot coding
- ✅ Focus on engine improvements (benefits all bots)
- ✅ Easy to maintain and debug
- ✅ Version control friendly (JSON files)
- ✅ Standardized bot architecture

### For Users
- ✅ Consistent experience across all bots
- ✅ Fast, responsive interactions
- ✅ Natural conversation flows
- ✅ Multi-bot support (can use multiple bots)

---

## Migration Plan

### Phase 1: Build Core Engine (Week 1)
1. Create directory structure
2. Implement BotLoader with validation
3. Build BotEngine core
4. Build MessageBuilder
5. Build StateManager
6. Build TemplateEngine

### Phase 2: Integration (Week 2)
7. Update webhook handlers
8. Migrate doctor appointment bot
9. Test end-to-end

### Phase 3: Testing & Validation (Week 3)
10. Create 3 new demo bots
11. Load testing
12. Bug fixes

### Phase 4: Documentation (Week 4)
13. Bot creation guide
14. API documentation
15. Video tutorials

---

## Example Bots to Create

### 1. Restaurant Booking Bot
**Trigger:** "book" or "restaurant"
**Flow:** Cuisine → Location → Restaurant → Date → Time → Party Size → Confirmation

### 2. E-commerce Support Bot
**Trigger:** "support" or "help"
**Flow:** Issue Type → Order Number → Issue Details → Resolution → Satisfaction

### 3. Event Registration Bot
**Trigger:** "register" or "event"
**Flow:** Event Type → Date → Number of Attendees → Contact Info → Confirmation

### 4. Real Estate Enquiry Bot
**Trigger:** "property" or "flat"
**Flow:** Property Type → Location → Budget → Bedrooms → Contact Schedule

### 5. Gym Membership Bot
**Trigger:** "gym" or "fitness"
**Flow:** Membership Type → Duration → Personal Trainer → Payment → Confirmation

---

## Technical Considerations

### Performance
- In-memory state for fast access
- Redis for production (scalability)
- Lazy loading of bot configs
- Caching of template renders

### Security
- Validate all user inputs
- Sanitize template variables
- Rate limiting per user
- Bot access control (phone number whitelist)

### Monitoring
- Log all bot interactions
- Track conversation drop-offs
- Monitor response times
- Alert on bot errors

### Scalability
- Horizontal scaling (multiple server instances)
- State stored in Redis (shared across instances)
- Bot configs cached in memory
- Queue for message sending

---

## Future Enhancements

1. **Bot Builder UI:** Web interface to create bots without JSON
2. **Visual Flow Editor:** Drag-and-drop bot flow designer
3. **Analytics Dashboard:** Bot performance metrics
4. **A/B Testing:** Test multiple conversation variants
5. **Multi-language:** Same bot, multiple languages
6. **AI Integration:** ChatGPT for dynamic responses
7. **Integrations:** Connect to external APIs, databases
8. **Payment Gateway:** Accept payments in bot flows
9. **File Uploads:** Let users upload documents
10. **Voice Messages:** Support voice input/output

---

## Conclusion

This universal bot engine will transform how we create and deploy WhatsApp bot demos. Instead of weeks of coding, we can create production-ready bots in minutes with just configuration files.

**Next Steps:**
1. Review and approve architecture
2. Begin Phase 1 implementation
3. Migrate existing doctor bot
4. Create 2-3 new demo bots
5. Document and scale!
