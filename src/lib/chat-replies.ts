export type ChatMsg = { role: "user" | "assistant"; content: string };

export const WELCOME =
  "Hello! I'm your ServiceDesk assistant. Need help drafting a ticket reply, summarizing a call, or planning your shift?";

export const SUGGESTIONS = [
  "Draft password reset email",
  "Fix Outlook sync steps",
  "Plan my day with 6 tickets",
];

export function aiReply(input: string): string {
  const q = input.toLowerCase();

  if (q.includes("password")) {
    return `Here's a password reset confirmation you can send:

Subject: Password Reset Completed - Ticket INC123456

Hi Sarah,

Your account password has been reset as requested.

1. Sign in with the temporary password sent separately via SMS.
2. You will be prompted to set a new password - use at least 12 characters.
3. Re-authenticate Outlook and Teams once the new password is set.

If sign-in still fails after 10 minutes, reply to this email and I'll re-check the account lockout status.

Kind regards,
IT Support Desk | Ext 101 | support@company.co.za

Please verify the ticket number and user name before sending. Never include the temporary password in email.`;
  }

  if (q.includes("outlook") || q.includes("sync")) {
    return `Outlook not syncing (error 0x80040115) - standard fix path:

1. Confirm network/VPN connectivity and that outlook.office365.com resolves.
2. Restart Outlook in safe mode: Win+R > outlook.exe /safe (rules out add-ins).
3. Clear the OST cache: close Outlook, rename the .ost in %localappdata%\\Microsoft\\Outlook.
4. Recreate the mail profile in Control Panel > Mail > Show Profiles > Add.
5. Test send/receive and confirm with the user.

Common cause: corrupted local Outlook profile or a stale cached credential in Credential Manager.`;
  }

  if (q.includes("plan") || q.includes("shift") || q.includes("day")) {
    return `Suggested shift plan for 6 tickets (08:00-17:00):

08:00 - 08:30  P1 INC123460 - Server share offline (start here, highest impact)
08:30 - 09:30  P1 INC123461 - VPN down for finance team
09:30 - 10:00  P2 INC123456 - Outlook not syncing
10:00 - 10:30  P2 INC123457 - Printer offline, floor 3
10:30 - 11:00  Buffer for escalations and callbacks
11:00 - 12:00  P3 INC123458 - New laptop imaging
13:00 - 14:00  P3 INC123459 - Software install request
14:00 - 17:00  Ticket updates, follow-ups, and queue triage

Logic: P1 first, then earliest due time within each priority.`;
  }

  if (q.includes("escalat")) {
    return `Escalation note for L2:

Ticket: INC123457
Impact: Single user, business-critical email access
Steps already taken: Restarted Outlook, cleared OST cache, recreated profile, verified licence in M365 admin.
Current state: Error 0x80040115 persists on send/receive.
Requested action: L2 to check mailbox database health and Autodiscover records.

Verify the ticket number before submitting the escalation.`;
  }

  return `Here's how I'd approach "${input}":

1. Confirm the affected user, device, and exact error message, then log it on the ticket.
2. Reproduce the issue or check monitoring to confirm scope (single user vs. site-wide).
3. Apply the standard fix from the knowledge base and record each step in the ticket notes.
4. Confirm resolution with the user, then close or escalate to L2 with your findings.

Want me to draft the customer-facing email or summarize this into ticket notes?`;
}
