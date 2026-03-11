# Discovery 5 — Lead Handling and Notifications

This document defines where captured leads are stored outside of the database and how the Horizon Digital team is notified when a new lead is captured.

## 1. Storage Location (Google Sheets)

While all leads are permanently stored in the PostgreSQL `leads` table, a Google Sheet will be used as the primary, user-friendly CRM interface for the team.

### Sheet Structure
The Google Sheet (e.g., "Horizon Chatbot Leads") must have the following exact column headers in row 1:
- `A`: **Date Captured** (Timestamp)
- `B`: **Name**
- `C`: **Email Address**
- `D`: **Phone Number** (Optional)
- `E`: **Service Interest** (e.g., "Looking for a brand new starter website")
- `F`: **Source Page** (URL where the chat happened)
- `G`: **Session ID** (For cross-referencing with the Postgres DB)
- `H`: **Status** (Dropdown: New, Contacted, Qualified, Closed)

## 2. Notification Preferences

### Primary Notification Method: Email
When n8n (Workflow C) successfully writes a new lead to the database and Google Sheet, it will trigger an email to the Horizon Digital team using a standard SMTP node or Gmail node.

### Notification Recipients
- **To:** gregorypanagary@gmail.com (or the primary Horizon Digital sales address)
- **Subject:** 🚨 New Website Lead from Chatbot: {{ $json.name }}

### Email Template Body
```text
Hi Team,

A new lead was just captured via the website chatbot!

Name: {{ $json.name }}
Email: {{ $json.email }}
Phone: {{ $json.phone | "Not provided" }}

What they are looking for: 
"{{ $json.service_interest }}"

Source Page: {{ $json.source_page }}
Session ID: {{ $json.session_id }}

Please review the full conversation history in the Postgres database if more context is needed before reaching out.

View in Google Sheets: [Insert Link to Google Sheet]
```

## 3. SLA (Service Level Agreement)
- **Response Time Target:** The internal objective is to reply to all chatbot leads within 24 hours (1 business day).
- **Follow-up Mechanism:** The team should update the Google Sheet column `Status` from "New" to "Contacted" immediately after sending the first email or WhatsApp message to the prospect.
