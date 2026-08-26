# AI Workplace Hub

Build a modern, responsive SaaS web application called "AI Workplace Productivity Assistant"Project Goal:

A dashboard that helps professionals automate daily workplace tasks using AI. The design should look like a premium SaaS product - clean, modern, professional like Notion / Linear / Monday.comLayout & Structure:Left Sidebar Navigation - Collapsible, with logo at top, menu items with icons:Dashboard (Overview)Smart Email GeneratorMeeting Notes SummarizerAI Task PlannerAI Research AssistantAI ChatbotSettingsTop Header: Search bar, notification icon, user profile avatarMain Content Area: Changes based on sidebar selectionDashboard Page (Overview):4 stats cards: Emails Generated, Meetings Summarized, Tasks Planned, Time SavedRecent activity timelineQuick action buttons for each toolClean card-based layout with shadows and rounded cornersFeature Details to Build:Smart Email Generator: Text area for context + dropdown for Tone (Professional, Friendly, Formal) + button Generate. Show editable output area with Copy and Regenerate buttons.Meeting Notes Summarizer: Paste meeting transcript input + Upload button (UI only) + Generate Summary button. Output: Summary, Key Points, Action Items in separate cards. Editable.AI Task Planner: Input for goals/projects. Output: Structured daily task list with checkboxes, priority tags (High/Medium/Low), and deadlines. Ability to add/edit/delete tasks.AI Research Assistant: Search input field. Output: Structured answer with summary, key insights, sources list (mock data).AI Chatbot Interface: ChatGPT-style chat UI on the right side - chat history on left, chat window on right, prompt suggestions at bottom.Design Requirements:Color palette: White background, slate gray text, primary color Indigo #6366F1Font: InterFully responsive for mobile, tablet, desktopUse Shadcn UI components, Tailwind CSSAdd smooth transitions and hover effectsEditable AI outputs everywhere (textarea that can be edited)Add a "Responsible AI Disclaimer" footer on all AI output cards: "AI-generated content may be inaccurate. Please review before use."Tech: React, Tailwind, Lucide icons, mock data (no backend needed for now).Make it look like a real, launch-ready SaaS product.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://ai-workmate-buddy-39.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f3dec8ae-3ff0-41bd-b796-77259969ebc8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
