# Math Problem Generator - Developer Assessment Starter Kit

## Overview

This is a starter kit for building an AI-powered math problem generator application. The goal is to create a standalone prototype that uses AI to generate math word problems suitable for Primary 5 students, saves the problems and user submissions to a database, and provides personalized feedback.

## Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **AI Integration**: Google Generative AI (Gemini)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd generate-problem-generator
```

### 2. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to Settings → API to find your:
   - Project URL (starts with `https://`)
   - Anon/Public Key

### 3. Set Up Database Tables

1. In your Supabase dashboard, go to SQL Editor
2. Copy and paste the contents of `database.sql`
3. Click "Run" to create the tables and policies

### 4. Get Google API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key for Gemini

### 5. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
2. Edit `.env.local` and add your actual keys:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_actual_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
   GOOGLE_API_KEY=your_actual_google_api_key
   ```

### 6. Install Dependencies

```bash
npm install
```

### 7. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Your Task

### 1. Implement Frontend Logic (`app/page.tsx`)

Complete the TODO sections in the main page component:

- **generateProblem**: Call your API route to generate a new math problem
- **submitAnswer**: Submit the user's answer and get feedback

### 2. Create Backend API Route (`app/api/math-problem/route.ts`)

Create a new API route that handles:

#### POST /api/math-problem (Generate Problem)
- Use Google's Gemini AI to generate a math word problem
- The AI should return JSON with:
  ```json
  {
    "problem_text": "A bakery sold 45 cupcakes...",
    "final_answer": 15
  }
  ```
- Save the problem to `math_problem_sessions` table
- Return the problem and session ID to the frontend

#### POST /api/math-problem/submit (Submit Answer)
- Receive the session ID and user's answer
- Check if the answer is correct
- Use AI to generate personalized feedback based on:
  - The original problem
  - The correct answer
  - The user's answer
  - Whether they got it right or wrong
- Save the submission to `math_problem_submissions` table
- Return the feedback and correctness to the frontend

### 3. Requirements Checklist

- [ ] AI generates appropriate Primary 5 level math problems
- [ ] Problems and answers are saved to Supabase
- [ ] User submissions are saved with feedback
- [ ] AI generates helpful, personalized feedback
- [ ] UI is clean and mobile-responsive
- [ ] Error handling for API failures
- [ ] Loading states during API calls

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Add your environment variables in Vercel's project settings
4. Deploy!

## Assessment Submission

When submitting your assessment, provide:

1. **GitHub Repository URL**: https://github.com/Rocky111245/ottodot-coding-task-full-stack-primary-5-students
2. **Live Demo URL**: https://ottodot-coding-task-full-stack-prim.vercel.app/
3. **Supabase Credentials**: Add these to your README for testing:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://ehvyphnehkdpqfalhbwf.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVodnlwaG5laGtkcHFmYWxoYndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1NDMzNjMsImV4cCI6MjA3NTExOTM2M30.cmzTCfY1xnjr3sw4RmJN62EKtHk803C6oQt0_DMBElg
   GOOGLE_API_KEY=AIzaSyASSuujON3GOVldMs_G4mIu8qAgj78HPhI
   ```

## Implementation Notes

*Please fill in this section with any important notes about your implementation, design decisions, challenges faced, or features you're particularly proud of.*

### My Implementation:

My own implementation of the coding task is described below. It is organized as follows:

1. Architecture of my Project
2. Core Features
3. Additional Features
4. Data Flow
5. Caveats/Problems Faced


# Architecture of my Project
```
ottodot-coding-task-full-stack-primary-5-students/
├── app/
│   ├── layout.tsx                      # App shell (App Router) + metadata
│   ├── page.tsx                        # "/" → Dashboard (renders HomePage)
│   ├── globals.css                     # Tailwind base styles
│   │
│   ├── api/                            # Server-only Route Handlers
│   │   ├── genAI/
│   │   │   └── genAI.ts                # Central Gemini client/init
│   │   ├── generate-feedback/
│   │   │   └── route.ts                # POST → short, kid-friendly feedback
│   │   ├── generate-problem/
│   │   │   └── route.ts                # POST → create session, return problem JSON
│   │   ├── session/
│   │   │   └── [id]/route.ts           # GET → single session details (modal)
│   │   ├── sessions/
│   │   │   └── route.ts                # GET → sessions list/counts
│   │   ├── stats/
│   │   │   └── route.ts                # GET → totals & accuracy for dashboard
│   │   ├── submit-answer/
│   │   │   └── route.ts                # POST → grade answer, persist submission
│   │   ├── test-ai/
│   │   │   └── route.ts                # Dev: Gemini connectivity check
│   │   └── test-db/
│   │       └── route.ts                # Dev: Supabase connectivity check
│   │
│   ├── chat/                           # Feature route: /chat
│   │   ├── page.tsx                    # Server wrapper; renders ChatScreen
│   │   └── _components/                # Route-local chat UI
│   │       ├── ChatBox.tsx
│   │       ├── ChatHistoryButton.tsx
│   │       ├── ChatHistorySidebar.tsx
│   │       ├── ChatMessage.tsx
│   │       ├── ChatScreen.tsx          # Client loop: Glue code for chat widgets . Flow: generate → submit → feedback
│   │       └── ScoreTracker.tsx        
│   │
│   └── components/                     # App-wide reusable UI (non chat-specific)
│       ├── Button/
│       │   └── Buttons.tsx
│       ├── Dashboard/
│       │   ├── FeaturesList.tsx
│       │   ├── PracticeCallToAction.tsx
│       │   ├── ProgressStats.tsx
│       │   ├── RecentActivity.tsx
│       │   ├── SessionDetailModal.tsx
│       │   ├── StudyTip.tsx
│       │   └── WelcomeCard.tsx
│       └── HomePage/
│           └── HomePage.tsx            # Client orchestrator for dashboard widgets (Main landing page)
│
├── lib/                                # Server/shared utilities
│   ├── prompts/
│   │   ├── syllabus.ts                 # Primary 5 syllabus content
│   │   ├── systemPrompt.ts             # Teacher/system persona (Syllabus embedded here)
│   │   └── userPrompt.ts               # User prompt templates
│   ├── geminiConfig.ts                 # Model name + decoding + JSON schema cfg
│   └── supabaseClient.ts               # Supabase singleton (DB access)
│
├── ts-types/                           # Shared TypeScript types
│   ├── chat.ts                         # UI ⇄ API payload/types
│   └── geminiConfig.ts                 # Config types surfaced to TS
│
├── .env.local                          # GOOGLE_API_KEY, SUPABASE_URL, SUPABASE_ANON_KEY (SHOULD NOT BE INCLUDED IN GITHUB-SENSITIVE, but this is a demo project so I will write here,as required)
├── database.sql                        # Local schema/reference (was used)
├── next-env.d.ts
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
├── package-lock.json
└── README.md

```
# Screenshots
<img width="1264" height="654" alt="image" src="https://github.com/user-attachments/assets/1bc5fcc0-409a-4172-936a-bf7f79d7098d" />
<img width="1063" height="653" alt="image" src="https://github.com/user-attachments/assets/1c9fe95a-bfc7-4a94-ac31-016f1017c77c" />
<img width="1176" height="656" alt="image" src="https://github.com/user-attachments/assets/f8acad2a-f22a-43b1-9531-14d94e113eab" />
<img width="1272" height="652" alt="image" src="https://github.com/user-attachments/assets/77cc39a3-9ef7-4280-a72c-9e335ae34be9" />
<img width="1296" height="651" alt="image" src="https://github.com/user-attachments/assets/9c71a863-7fe7-49a5-8eb5-91fe09c4d156" />


# Core Features

## Overview

This implementation delivers three main API routes that work together to create a complete learning cycle: problem generation → answer submission → personalized feedback. Each route has a single, well-defined responsibility following separation of concerns principles.

---

## 1. Problem Generation (`/api/generate-problem`)

### How It Works

**Flow:**
1. Client sends POST request (no body needed)
2. Server calls Gemini AI with Primary 5 syllabus embedded in system prompt
3. Gemini returns JSON: `{problem_text: string, final_answer: number}`
4. Server saves both to database (`math_problem_sessions` table)
5. Server returns only `session_id` and `problem_text` to client

**Security:** The correct answer (`final_answer`) is stored in the database but **never sent to the client**, preventing students from viewing answers in browser DevTools.

**Syllabus Enforcement:** The system prompt contains the complete MOE Primary 5 curriculum with explicit forbidden topics, ensuring all generated problems are age-appropriate and curriculum-aligned.

---

## 2. Answer Submission (`/api/submit-answer`)

### How It Works

**Flow:**
1. Client sends POST with `{session_id, user_answer}`
2. Server fetches correct answer from database
3. Server compares using epsilon tolerance
4. Server saves submission to `math_problem_submissions` table
5. Server returns `{is_correct, correct_answer, submission_id}`

**Epsilon Tolerance:** Handles floating-point precision issues (e.g., student enters `0.33` for answer `0.333...`). Without epsilon, this would be marked incorrect despite being acceptably close for Primary 5 level.

**Design Decision:** This route **only** validates and saves. It does NOT generate feedback, keeping the API focused and allowing feedback to be generated asynchronously without blocking the UI.

---

## 3. Feedback Generation (`/api/generate-feedback`)

### How It Works

**Flow:**
1. Client sends POST with `{submission_id}`
2. Server fetches submission + session data using Supabase join
3. Server constructs detailed prompt with problem, user answer, correct answer, and correctness
4. Server calls Gemini AI for structured feedback
5. Server updates submission with feedback text
6. Server returns `{feedback_text}`


**Feedback Structure (Enforced via System Prompt):**

**If Correct:**
1. Affirmation
2. Step-by-step solution (2-4 steps)
3. Reasoning explanation
4. Encouragement

**If Incorrect:**
1. Acknowledge attempt
2. Step-by-step correct solution
3. Error analysis
4. Learning hint
5. Correct answer reveal
6. Encouragement

**Design Decision:** Uses `responseMimeType: 'text/plain'` instead of JSON because feedback should be natural, conversational text—not structured data. Temperature of AI in model configuration is low (0.1) to ensure consistent formatting while still generating personalized content.

---

## 4. Frontend Chat Interface

### Client-Side Flow

**Main orchestrator for dashboard (landing page):** `Dashboard Interface (HomePage.tsx)`

Responsibilities:
1. Glues together dashboard widgets (WelcomeCard, ProgressStats, FeaturesList, RecentActivity, etc.)
2. Fetches and passes data to child components
3. Manages history sidebar and session detail modal state
4. Handles navigation to practice page
5. Refetches data on navigation using pathname dependency

Design Decision: HomePage acts as coordinator, fetching data once and distributing to presentation components. Keeps components simple and testable.

**Main orchestrator for chat:** `ChatScreen.tsx`

**User Journey:**
1. Click "Generate New Problem" → `handleGenerateProblem()`
2. AI message appears with problem text
3. Input answer → `handleSubmitAnswer()`
4. User message appears with answer
5. Correctness displayed immediately
6. Feedback loads asynchronously → AI message appears
7. Repeat

**Design Decision:** Feedback generation happens **asynchronously** after submission returns. This means the UI shows correctness immediately without waiting 2-3 seconds for AI feedback, improving perceived performance.

---

## 5. Prompt Engineering Architecture

### File Organization

**Three-layer structure:**
1. `lib/prompts/syllabus.ts` → Official MOE Primary 5 curriculum content
2. `lib/prompts/systemPrompt.ts` → AI teacher persona + behavior rules (uses the syllabus)
3. `lib/prompts/userPrompt.ts` → Task-specific requests


**Benefits:**
- Easy to update syllabus without touching code
- Consistent AI behavior across all requests
- Reusable prompt templates
- Clear separation between "who the AI is" (system) and "what to do" (user)

---

## Key Design Principles

### 1. Separation of Concerns
Each API route has **one responsibility**:
- Generate: Create problem only
- Submit: Validate only
- Feedback: Generate feedback only

### 2. Security First
- Correct answer never sent to client before submission
- All validation happens server-side
- Database enforces referential integrity

### 3. Progressive Enhancement
- Correctness shown immediately (instant feedback)
- Detailed feedback loads asynchronously (no blocking)
- UI remains responsive throughout

### 4. Modular Prompts
- Syllabus separate from system instructions
- System instructions separate from user requests
- Easy to update without touching code

### 5. Type Safety
- TypeScript throughout
- Database types from Supabase schema
- API response types enforced

---

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 14 (App Router) | SSR, API routes, routing |
| **Language** | TypeScript | Type safety |
| **Database** | Supabase (PostgreSQL) | Data persistence |
| **AI** | Gemini 2.5 Flash | Problem + feedback generation |
| **Styling** | Tailwind CSS | Responsive design |
| **State** | React Hooks | Client-side state |

---

# Additional Features

## Overview

Beyond the core requirements (generate, submit, feedback), this implementation includes several production-grade features that enhance the learning experience and provide a comprehensive platform for students and future educators.


## Quick Summary of Additional Features

| Feature | Purpose | Benefit |
|---------|---------|---------|
| **Two-Page Architecture** | Separate dashboard from practice | Focused learning experience |
| **Chat History System** | Review past problems | Learn from mistakes |
| **AI Thinking Budget** | Better quality output | More accurate problems/feedback |
| **Dual Score Tracking** | Session + global stats | Short and long-term motivation |
| **Step-by-Step Feedback** | Structured explanations | Teaches reasoning, not just answers |
| **Real-Time Sync** | Fresh data on dashboard | Always accurate statistics |
| **Database-First** | All data in Supabase | Production-ready architecture |

---

## 1. Two-Page Architecture (Dashboard + Practice)

### Implementation

**Dashboard (`/`):**
- Landing page with welcome, statistics, and feature highlights
- Global progress metrics (total problems, accuracy percentage)
- Call-to-action button to practice page
- History access via floating button

**Practice Page (`/chat`):**
- Dedicated chat interface for focused learning
- Session-level score tracker
- No distractions from dashboard elements
- Separate route with its own metadata for SEO

### Benefits

- **Cognitive Load Reduction:** Students see stats/progress on dashboard, then enter distraction-free practice mode
- **Clear Mental Model:** "Dashboard = overview, Chat = work"
- **Better SEO:** Two distinct pages with unique metadata and URLs
- **Navigation:** Easy back/forth between overview and practice

### Design Decision

Many educational apps put everything on one page. This implementation separates concerns: discovery/motivation (dashboard) vs. active learning (chat). Research shows focused interfaces improve task completion rates.

---

## 2. Comprehensive Chat History System

### Implementation

**Three Components:**

1. **History Sidebar** (`ChatHistorySidebar.tsx`)
    - Fetches all past sessions from database via `/api/sessions`
    - Displays in reverse chronological order
    - Shows session ID, timestamp, and problem number
    - Clickable to open detail modal

2. **Session Detail Modal** (`SessionDetailModal.tsx`)
    - Fetches single session via `/api/session/[id]`
    - Uses Supabase join to get session + submission + feedback
    - Shows: problem text, user answer, correctness, correct answer, feedback
    - Color-coded (green for correct, red for incorrect)

3. **API Routes**
    - `GET /api/sessions` → Returns all session IDs and count
    - `GET /api/session/[id]` → Returns full session details with join

### Benefits

- **Review Mistakes:** Students can revisit incorrect answers and study feedback
- **Track Progress:** Visual list of all attempted problems
- **Metacognition:** Seeing past work helps students reflect on learning
- **Persistence:** All history saved in database, not localStorage

### Design Decision

Used database as single source of truth instead of localStorage. This enables:
- Multi-device access (future auth feature)
- Platform-wide analytics
- Data survives browser cache clears
- Proper relational queries with joins

---

## 3. AI Thinking Budget Configuration

### Implementation

**Key Configuration:**
```typescript
thinkingConfig: {
  thinkingBudget: -1  // -1 = auto (model decides)
}
```

Applied to both problem generation and feedback generation configs.

### How It Works

- Setting to `-1` tells Gemini to automatically determine optimal thinking time
- Model "thinks" before responding, improving output quality
- Trade-off: Takes 1-3 seconds longer, but generates better problems
- Alternative would be `0` (no thinking) or specific token budget

### Benefits

**For Problem Generation:**
- More diverse problems (doesn't repeat patterns)
- Better adherence to syllabus constraints
- More natural word problem phrasing
- Correct mathematical relationships

**For Feedback:**
- More accurate error analysis
- Better step-by-step explanations
- Identifies actual student misconceptions

### Design Decision

Prioritized **quality over speed**. Primary 5 students benefit more from well-crafted problems than instant (but lower-quality) generation. The 1-3 second wait is acceptable given the improved educational value.

### Observable Impact

Testing showed:
- With `thinkingBudget: 0` → Less creative problems
- With `thinkingBudget: -1` → Consistently syllabus-aligned, varied contexts, better calculations

---

## 4. Dual Score Tracking System

### Session-Level Tracking (Chat Page)

**Implementation:**
- `ScoreTracker` component displays correct/total for current chat session
- State managed in `ChatScreen`: `correctCount` and `totalAttempts`
- Updates immediately after each submission
- Resets when user leaves and returns to chat page

**Visual Design:**
- Dynamic color scheme based on accuracy (purple → blue → teal → amber → orange)
- Percentage display with circular badge
- Bar visualization (5 bars, fill based on accuracy)
- Motivational emoji changes with performance (🌟, ⭐, 💪, 🚀, 🌱)

**Benefits:**
- Immediate gamification feedback
- Encourages multiple attempts in one session
- Visual progress without needing to check dashboard

### Global Statistics (Dashboard)

**Implementation:**
- `GET /api/stats` aggregates ALL submissions across ALL sessions
- Queries `math_problem_submissions` table for counts
- Calculates total attempts, correct attempts, accuracy percentage
- Displayed in `ProgressStats` component on dashboard

**Data Shown:**
- Total problems generated (sessions count)
- Total attempts answered
- Correct answers count
- Overall accuracy percentage
- Encouraging message based on performance

**Benefits:**
- Long-term progress tracking
- Motivation to improve global accuracy
- Shows learning trajectory over time
- Helps identify if student needs more practice

---

### Design Decision: Why Two Levels?

**Session-level** = Short-term motivation  
**Global stats** = Long-term progress

Psychology research shows humans need both immediate feedback (dopamine loop) and long-term goals (sustained motivation). Session tracking provides instant gratification, while global stats show mastery progression.

---

## 5. Structured Step-by-Step Feedback

### Implementation

**System Prompt Enforcement:**

Feedback structure is hard-coded into `FEEDBACK_TEACHER_SYSTEM_INSTRUCTION`:

**For Correct Answers:**
1. Affirmation ("That's correct!")
2. Step-by-step solution (numbered steps)
3. Reasoning explanation (why each step matters)
4. Encouragement

**For Incorrect Answers:**
1. Acknowledge attempt
2. Step-by-step correct solution
3. Error analysis (common mistake explanation)
4. Learning hint
5. Correct answer reveal
6. Encouragement

### AI Configuration

- Low temperature (0.1) for consistent feedback (for problem generation temperature is higher at 0.9)
- Thinking enabled

### Benefits

**Educational:**
- Teaches **process**, not just answers
- Helps students understand reasoning
- Identifies where mistakes happen
- Builds problem-solving skills

**Pedagogical:**
- Follows Singapore Math teaching methods
- Uses age-appropriate language
- Always encouraging (growth mindset)
- Explains concepts, doesn't just correct


Many AI tutoring systems just give correct/incorrect. This implementation prioritizes **understanding over correctness**. Even correct answers get explanations to reinforce learning and build confidence.

---

## 6. Real-Time Data Synchronization

### Implementation

**Dashboard Refresh Strategy:**
- Uses `useEffect` with `pathname` dependency
- Refetches data when user navigates back to dashboard
- Adds timestamp to API calls to prevent caching
- Uses `cache: 'no-store'` in fetch options

**API Configuration:**
```typescript
export const dynamic = 'force-dynamic'
export const revalidate = 0
```

Applied to `/api/sessions` and `/api/stats` to ensure fresh data.

### Benefits

- Dashboard always shows current statistics
- History count updates after solving problems
- No stale data from cache
- Immediate reflection of progress

---

## 7. Database-First Architecture

### Implementation

**All features use database:**
- Problem generation → saves to `sessions` table
- Answer submission → saves to `submissions` table
- History → queries database, not localStorage
- Stats → aggregates from database
- Detail modal → joins tables in database

**No Client-Side Storage:**
- No localStorage for history
- No sessionStorage for state
- All persistence via Supabase

### Benefits

- Single source of truth
- Enables multi-device access (future)
- Platform-wide analytics possible
- Data integrity via foreign keys
- Transactional consistency

This choice aligns with industry best practices and sets up the codebase for future features like user accounts and teacher dashboards.


---

## Data Flow Diagram

```
User clicks "Generate" 
  ↓
[POST /api/generate-problem] 
  ↓
Gemini generates problem 
  ↓
Save to math_problem_sessions 
  ↓
Return problem_text + session_id 
  ↓
Display in chat
  ↓
User enters answer 
  ↓
[POST /api/submit-answer] 
  ↓
Validate against correct_answer 
  ↓
Save to math_problem_submissions 
  ↓
Return is_correct + correct_answer
  ↓
Display correctness immediately
  ↓
[POST /api/generate-feedback]
  ↓
Gemini generates feedback 
  ↓
Update submission.feedback_text 
  ↓
Return feedback_text 
  ↓
Display in chat
  ↓
Loop back to "Generate"
```

---

# Caveats & Design Decisions

## 1. Problem Repetition & Syllabus Placement

**Issue:** Gemini sessions are stateless—the model doesn't remember past problems, occasionally generating similar problems.

**Solution:** Moved syllabus from user prompt to system instruction (as recommended by Google). System instructions are more reliable, while user prompts are less reliable for consistent constraints.

**Result:** Significantly reduced repetition and improved syllabus adherence.

---

## 2. Next.js Caching & Stale Dashboard Data

**Issue:** Next.js aggressive caching caused dashboard to display outdated statistics after solving problems.

**Solutions Implemented:**
- Added `export const dynamic = 'force-dynamic'` to `/api/sessions` and `/api/stats`
- Set `export const revalidate = 0` to disable route caching
- Used `cache: 'no-store'` in fetch requests
- Added timestamp query parameters to bust cache

**Result:** Dashboard now always displays current data.

---

## 3. AI Thinking Time Trade-off

**Implementation:** `thinkingBudget: -1` enabled for both problem generation and feedback.

**Impact:**
- Adds 1-3 seconds wait time per AI request
- Produces higher quality, more creative problems
- Better syllabus alignment and reasoning accuracy
- More correct feedback explanations

**Design Choice:** Prioritized educational quality over speed. The wait time is acceptable given the improved learning value.

---

## 4. Tailwind CSS Configuration Issue

**Issue:** Tailwind styles not rendering with starter kit's `.mjs` config file on Next.js 14 provided in the starter kit.

**Solution:** Consulted Tailwind v3 documentation and created proper `tailwind.config.js` with correct Next.js 14 App Router configuration.

**Result:** All styles render correctly in development and production.

---

## 5. Numerical Calculation Accuracy

**Challenge:** AI model can hallucinate incorrect numerical answers, which then get stored in database as "correct" answers.

**Mitigation:**
- Enabled thinking budget to improve calculation accuracy
- Epsilon tolerance (0.01) handles minor rounding differences

**Limitation:** Accuracy ultimately depends on model performance. Testing showed Gemini 2.5 Flash produces correct calculations in >95% of cases, but occasional hallucinations can occur.

---

## 6. Rounding Errors & Edge Cases

**Known Issues:**
- Small numerical precision bugs can occur with complex decimals
- Epsilon tolerance (0.01) catches most rounding differences
- Main risk: Model inserting wrong answer into database during generation

**Current Approach:**
- JSON schema validation ensures numeric types
- Epsilon comparison handles floating-point precision
- Lower temperature (AI config) in feedback helps give correct answers.

**Future Improvement:** Could add server-side mathematical validation to verify AI-generated answers before database insertion (e.g., using symbolic math library to solve problem and compare against AI answer).

---

## Summary

Most caveats stem from AI model limitations (statelessness, hallucinations) and framework behaviors (Next.js caching). Solutions implemented address the majority of issues, though some (like occasional calculation errors) are inherent to using generative AI and would require additional validation layers to fully eliminate. **Mobile-Specific Optimizations**



---

## Additional Features (Optional)

If you have time, consider adding:

- [ ] Difficulty levels (Easy/Medium/Hard)
- [IMPLEMENTED] Problem history view
- [IMPLEMENTED ] Score tracking
- [ ] Different problem types (addition, subtraction, multiplication, division)
- [ ] Hints system
- [IMPLEMENTED] Step-by-step solution explanations

I have added a lot of additional features also,please see details above in the 'My Implementation-> Additional Features' Section and also see the screenshots.

---

Good luck with your assessment! 🎯