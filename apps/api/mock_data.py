"""
Mock data seed — realistic email and user data to populate every screen.
Run: python mock_data.py
"""
from datetime import datetime, timedelta
import random

DEMO_USER_ID = "user-demo-001"

MOCK_EMAILS = [
    {
        "id": "email-001",
        "account_id": "account-001",
        "sender_email": "prof.sharma@iitb.ac.in",
        "sender_name": "Prof. R. Sharma",
        "subject": "DBMS Mini-Project Submission Deadline — TONIGHT 11:59 PM",
        "snippet": "Dear students, this is a reminder that the DBMS mini-project submission deadline is tonight at 11:59 PM...",
        "body_text": "Dear students,\n\nThis is an urgent reminder that the DBMS mini-project submission deadline is TONIGHT at 11:59 PM. No extensions will be granted. Please submit via the course portal.\n\nBest regards,\nProf. R. Sharma",
        "received_at": (datetime.utcnow() - timedelta(hours=2)).isoformat(),
        "is_read": False,
        "labels": ["academic", "urgent"],
        "analysis": {
            "category": "academic",
            "priority_score": 96.0,
            "urgency_score": 98.0,
            "actionability_score": 92.0,
            "confidence_score": 0.97,
            "summary": "DBMS mini-project deadline is tonight at 11:59 PM. No extensions.",
            "reasoning": "High priority academic deadline email. Deadline is imminent (same-day), sender is a professor, subject contains 'URGENT' and 'DEADLINE' signals.",
            "suggested_reply": "Dear Prof. Sharma,\n\nThank you for the reminder. I will submit the project before the deadline tonight.\n\nBest regards",
            "extracted_data": {
                "entities": [{"type": "deadline", "value": "Tonight 11:59 PM"}, {"type": "organization", "value": "IITB"}],
                "action_items": [{"description": "Submit DBMS mini-project via course portal", "deadline": "Tonight 11:59 PM"}],
                "deadlines": [{"label": "Submission", "datetime": "Tonight 11:59 PM"}],
            }
        }
    },
    {
        "id": "email-002",
        "account_id": "account-001",
        "sender_email": "talent@stripe.com",
        "sender_name": "Stripe Recruiting",
        "subject": "Your Application — Software Engineer Intern | Please select interview slot by Friday",
        "snippet": "Hi Alex! Congratulations on advancing to the technical interview round at Stripe...",
        "body_text": "Hi Alex!\n\nCongratulations on advancing to the technical interview round at Stripe. We're excited to move forward with your application for the Software Engineer Intern position.\n\nPlease select an interview slot by this Friday using the link below: [Schedule Interview]\n\nBest,\nStripe Recruiting",
        "received_at": (datetime.utcnow() - timedelta(hours=5)).isoformat(),
        "is_read": False,
        "labels": ["job"],
        "analysis": {
            "category": "job",
            "priority_score": 94.0,
            "urgency_score": 88.0,
            "actionability_score": 95.0,
            "confidence_score": 0.96,
            "summary": "Stripe recruiting: Technical interview invitation for SWE Intern role. Action required by Friday.",
            "reasoning": "Job opportunity with clear deadline (Friday). High actionability — requires scheduling interview slot.",
            "suggested_reply": "Hi! Thank you so much for this opportunity at Stripe. I'm very excited to proceed. I'll select an interview slot right away.",
            "extracted_data": {
                "entities": [{"type": "company", "value": "Stripe"}, {"type": "deadline", "value": "Friday"}, {"type": "role", "value": "Software Engineer Intern"}],
                "action_items": [{"description": "Select interview slot via scheduling link", "deadline": "Friday"}],
            }
        }
    },
    {
        "id": "email-003",
        "account_id": "account-001",
        "sender_email": "noreply@razorpay.com",
        "sender_name": "Razorpay",
        "subject": "Payment Successful — ₹2,499 to Udemy",
        "snippet": "Your payment of ₹2,499 to Udemy has been processed successfully...",
        "body_text": "Your payment of ₹2,499 to Udemy was processed successfully.\n\nTransaction ID: RPY20260626001\nDate: 26 June 2026\nAmount: ₹2,499\nMerchant: Udemy India\n\nKeep this receipt for your records.",
        "received_at": (datetime.utcnow() - timedelta(hours=8)).isoformat(),
        "is_read": True,
        "labels": ["finance"],
        "analysis": {
            "category": "finance",
            "priority_score": 45.0,
            "urgency_score": 20.0,
            "actionability_score": 10.0,
            "confidence_score": 0.99,
            "summary": "Payment confirmation: ₹2,499 to Udemy via Razorpay. Transaction ID: RPY20260626001.",
            "reasoning": "Finance email with payment receipt. Low urgency — informational only. Amount and merchant extracted.",
            "suggested_reply": "",
            "extracted_data": {
                "amounts": [{"value": 2499, "currency": "INR", "merchant": "Udemy"}],
                "entities": [{"type": "transaction_id", "value": "RPY20260626001"}],
            }
        }
    },
    {
        "id": "email-004",
        "account_id": "account-001",
        "sender_email": "team@linear.app",
        "sender_name": "Linear",
        "subject": "Weekly Digest — What's new in Linear",
        "snippet": "This week in Linear: Improved keyboard shortcuts, new bulk actions...",
        "body_text": "Hi there! Here's what's new in Linear this week:\n- Improved keyboard shortcuts\n- New bulk action support\n- Better notification grouping\n\nUnsubscribe | View in browser",
        "received_at": (datetime.utcnow() - timedelta(days=1)).isoformat(),
        "is_read": True,
        "labels": ["newsletter"],
        "analysis": {
            "category": "newsletter",
            "priority_score": 12.0,
            "urgency_score": 5.0,
            "actionability_score": 8.0,
            "confidence_score": 0.98,
            "summary": "Linear weekly digest covering product updates and new features.",
            "reasoning": "Newsletter pattern detected: unsubscribe link, 'weekly digest' in subject, marketing sender domain.",
            "suggested_reply": "",
            "extracted_data": {}
        }
    },
    {
        "id": "email-005",
        "account_id": "account-001",
        "sender_email": "noreply@google.com",
        "sender_name": "Google",
        "subject": "Your verification code is 847291",
        "snippet": "Use this one-time code to verify your identity: 847291. Valid for 10 minutes.",
        "body_text": "Use this one-time code to verify your identity: 847291\nThis code expires in 10 minutes.\nIf you didn't request this, please ignore this email.",
        "received_at": (datetime.utcnow() - timedelta(minutes=15)).isoformat(),
        "is_read": False,
        "labels": ["otp"],
        "analysis": {
            "category": "otp",
            "priority_score": 99.0,
            "urgency_score": 100.0,
            "actionability_score": 100.0,
            "confidence_score": 1.0,
            "summary": "Google verification OTP: 847291. Expires in 10 minutes.",
            "reasoning": "OTP email detected with high confidence. Urgent by nature — time-sensitive code.",
            "suggested_reply": "",
            "extracted_data": {"otp_code": "847291"}
        }
    },
    {
        "id": "email-006",
        "account_id": "account-001",
        "sender_email": "hr@startupxyz.io",
        "sender_name": "Sarah (StartupXYZ HR)",
        "subject": "Offer Letter — Full Stack Developer",
        "snippet": "We're thrilled to extend an offer for the Full Stack Developer role at StartupXYZ...",
        "body_text": "Dear Alex,\n\nWe are thrilled to extend an offer for the Full Stack Developer role at StartupXYZ.\n\nPackage: ₹18 LPA + 0.1% equity\nStart Date: August 1, 2026\nPlease respond by July 3, 2026.\n\nBest,\nSarah\nHR, StartupXYZ",
        "received_at": (datetime.utcnow() - timedelta(days=2)).isoformat(),
        "is_read": False,
        "labels": ["job", "urgent"],
        "analysis": {
            "category": "job",
            "priority_score": 99.0,
            "urgency_score": 92.0,
            "actionability_score": 98.0,
            "confidence_score": 0.97,
            "summary": "Job offer from StartupXYZ for Full Stack Developer — ₹18 LPA + equity. Response required by July 3.",
            "reasoning": "Offer letter detected. Very high priority — actionable deadline (July 3) and significant career decision.",
            "suggested_reply": "Dear Sarah,\n\nThank you so much for this exciting offer! I'm very interested in joining StartupXYZ. I'll review the complete offer letter and respond by the specified date.",
            "extracted_data": {
                "entities": [{"type": "company", "value": "StartupXYZ"}, {"type": "salary", "value": "₹18 LPA"}, {"type": "deadline", "value": "July 3, 2026"}],
                "action_items": [{"description": "Review and respond to offer letter", "deadline": "July 3, 2026"}],
            }
        }
    },
    {
        "id": "email-007",
        "account_id": "account-001",
        "sender_email": "meetings@calendly.com",
        "sender_name": "Calendly",
        "subject": "New Event: Design Review — Monday 3 PM",
        "snippet": "A new event has been scheduled: Design Review on Monday, June 30 at 3:00 PM IST...",
        "body_text": "A new event has been scheduled.\n\nEvent: Design Review\nDate: Monday, June 30, 2026\nTime: 3:00 PM IST\nLocation: Google Meet\nOrganizer: Priya Menon",
        "received_at": (datetime.utcnow() - timedelta(hours=12)).isoformat(),
        "is_read": True,
        "labels": ["meeting"],
        "analysis": {
            "category": "meeting",
            "priority_score": 78.0,
            "urgency_score": 65.0,
            "actionability_score": 80.0,
            "confidence_score": 0.95,
            "summary": "Design Review meeting scheduled for Monday June 30 at 3 PM IST via Google Meet.",
            "reasoning": "Calendar invite detected from Calendly. Meeting confirmed with specific date, time, and location.",
            "suggested_reply": "Thank you for the calendar invite. I'll be there for the Design Review on Monday.",
            "extracted_data": {
                "entities": [{"type": "meeting", "value": "Design Review"}, {"type": "datetime", "value": "Monday June 30, 3 PM IST"}],
            }
        }
    },
    {
        "id": "email-008",
        "account_id": "account-001",
        "sender_email": "support@github.com",
        "sender_name": "GitHub Support",
        "subject": "Action required: Verify your email address",
        "snippet": "Please verify your new email address for your GitHub account...",
        "body_text": "Hi Alex,\n\nPlease verify your email address for your GitHub account by clicking the link below:\n\n[Verify Email Address]\n\nThis link expires in 24 hours.",
        "received_at": (datetime.utcnow() - timedelta(hours=3)).isoformat(),
        "is_read": False,
        "labels": ["support"],
        "analysis": {
            "category": "support",
            "priority_score": 72.0,
            "urgency_score": 75.0,
            "actionability_score": 85.0,
            "confidence_score": 0.93,
            "summary": "GitHub email verification required. Link expires in 24 hours.",
            "reasoning": "Support email requiring user action. Time-sensitive — verification link expires in 24h.",
            "suggested_reply": "",
            "extracted_data": {"entities": [{"type": "deadline", "value": "24 hours"}]}
        }
    },
]

MOCK_RULES = [
    {
        "id": "rule-001",
        "user_id": DEMO_USER_ID,
        "name": "OTP Instant Alert",
        "description": "Send all OTP emails to Telegram immediately",
        "conditions": [{"field": "category", "operator": "equals", "value": "otp"}],
        "actions": [{"type": "notify_telegram", "params": {"priority": "instant"}}],
        "priority_order": 1,
        "is_active": True,
    },
    {
        "id": "rule-002",
        "user_id": DEMO_USER_ID,
        "name": "University Emails",
        "description": "Boost priority for academic institution emails",
        "conditions": [{"field": "sender_email", "operator": "contains", "value": ".edu"}],
        "actions": [{"type": "priority_boost", "params": {"boost": 20}}, {"type": "notify_telegram", "params": {}}],
        "priority_order": 2,
        "is_active": True,
    },
    {
        "id": "rule-003",
        "user_id": DEMO_USER_ID,
        "name": "Newsletter Digest",
        "description": "Add newsletters to daily digest, no interruption",
        "conditions": [{"field": "category", "operator": "equals", "value": "newsletter"}],
        "actions": [{"type": "add_to_digest", "params": {}}, {"type": "ignore", "params": {}}],
        "priority_order": 3,
        "is_active": True,
    },
    {
        "id": "rule-004",
        "user_id": DEMO_USER_ID,
        "name": "High Priority Jobs",
        "description": "Notify immediately for job offers and interview invites",
        "conditions": [{"field": "category", "operator": "equals", "value": "job"}, {"field": "priority_score", "operator": "gt", "value": 80}],
        "actions": [{"type": "notify_telegram", "params": {"priority": "high"}}, {"type": "create_task", "params": {}}],
        "priority_order": 4,
        "is_active": True,
    },
    {
        "id": "rule-005",
        "user_id": DEMO_USER_ID,
        "name": "Finance Tracking",
        "description": "Log all financial emails for expense tracking",
        "conditions": [{"field": "category", "operator": "equals", "value": "finance"}],
        "actions": [{"type": "log_expense", "params": {}}, {"type": "add_to_digest", "params": {}}],
        "priority_order": 5,
        "is_active": False,
    },
]

MOCK_TASKS = [
    {"id": "task-001", "user_id": DEMO_USER_ID, "title": "Submit DBMS mini-project", "description": "Submit via course portal before 11:59 PM tonight", "deadline": (datetime.utcnow() + timedelta(hours=6)).isoformat(), "status": "pending", "priority": "urgent", "source_email_id": "email-001"},
    {"id": "task-002", "user_id": DEMO_USER_ID, "title": "Schedule Stripe interview slot", "description": "Use scheduling link to pick an interview time by Friday", "deadline": (datetime.utcnow() + timedelta(days=3)).isoformat(), "status": "pending", "priority": "high", "source_email_id": "email-002"},
    {"id": "task-003", "user_id": DEMO_USER_ID, "title": "Review StartupXYZ offer letter", "description": "Respond to job offer by July 3, 2026", "deadline": (datetime.utcnow() + timedelta(days=7)).isoformat(), "status": "in_progress", "priority": "urgent", "source_email_id": "email-006"},
    {"id": "task-004", "user_id": DEMO_USER_ID, "title": "Verify GitHub email address", "description": "Click verification link before it expires (24h)", "deadline": (datetime.utcnow() + timedelta(hours=21)).isoformat(), "status": "pending", "priority": "medium", "source_email_id": "email-008"},
]

MOCK_REMINDERS = [
    {"id": "rem-001", "user_id": DEMO_USER_ID, "email_id": "email-001", "title": "DBMS Deadline in 2 hours", "message": "DBMS mini-project due at 11:59 PM", "remind_at": (datetime.utcnow() + timedelta(hours=2)).isoformat(), "status": "pending", "channel": "telegram"},
    {"id": "rem-002", "user_id": DEMO_USER_ID, "email_id": "email-002", "title": "Stripe interview slot", "message": "Select Stripe interview slot — deadline Friday", "remind_at": (datetime.utcnow() + timedelta(days=1)).isoformat(), "status": "pending", "channel": "telegram"},
    {"id": "rem-003", "user_id": DEMO_USER_ID, "email_id": "email-006", "title": "Offer letter response", "message": "Respond to StartupXYZ offer by July 3", "remind_at": (datetime.utcnow() + timedelta(days=5)).isoformat(), "status": "pending", "channel": "telegram"},
    {"id": "rem-004", "user_id": DEMO_USER_ID, "email_id": None, "title": "Weekly inbox review", "message": "Review your email digest for the week", "remind_at": (datetime.utcnow() - timedelta(days=2)).isoformat(), "status": "sent", "channel": "email"},
]

MOCK_NOTIFICATIONS = [
    {"id": "notif-001", "user_id": DEMO_USER_ID, "channel": "telegram", "title": "🚨 Urgent Email", "content": "DBMS mini-project submission deadline is TONIGHT at 11:59 PM. No extensions.", "status": "sent"},
    {"id": "notif-002", "user_id": DEMO_USER_ID, "channel": "telegram", "title": "💼 Job Alert", "content": "Stripe is inviting you to interview for SWE Intern. Select slot by Friday.", "status": "sent"},
    {"id": "notif-003", "user_id": DEMO_USER_ID, "channel": "telegram", "title": "🔑 OTP", "content": "Google verification code: 847291 (expires in 10 minutes)", "status": "sent"},
    {"id": "notif-004", "user_id": DEMO_USER_ID, "channel": "telegram", "title": "📋 Daily Digest", "content": "Today's digest: 3 newsletters, 1 finance update, 2 low-priority emails.", "status": "sent"},
]

DASHBOARD_STATS = {
    "total_emails": 247,
    "processed_today": 18,
    "high_priority": 4,
    "pending_tasks": 4,
    "sent_notifications": 12,
    "category_breakdown": {
        "academic": 32,
        "job": 18,
        "finance": 41,
        "meeting": 27,
        "otp": 15,
        "newsletter": 89,
        "personal": 14,
        "support": 11,
    },
    "priority_distribution": {
        "critical": 8,
        "high": 26,
        "medium": 73,
        "low": 140,
    },
    "recent_activity": [
        {"time": "2 min ago", "action": "OTP delivered to Telegram", "type": "notification"},
        {"time": "5 min ago", "action": "DBMS deadline email — priority 96", "type": "analysis"},
        {"time": "1 hour ago", "action": "Task created from Stripe email", "type": "task"},
        {"time": "3 hours ago", "action": "Razorpay receipt logged to expenses", "type": "finance"},
        {"time": "5 hours ago", "action": "4 newsletters added to digest", "type": "digest"},
        {"time": "Yesterday", "action": "Design Review calendar event created", "type": "calendar"},
    ]
}

ANALYTICS_DATA = {
    "weekly_volume": [
        {"day": "Mon", "emails": 34, "processed": 34},
        {"day": "Tue", "emails": 28, "processed": 28},
        {"day": "Wed", "emails": 41, "processed": 41},
        {"day": "Thu", "emails": 19, "processed": 19},
        {"day": "Fri", "emails": 52, "processed": 52},
        {"day": "Sat", "emails": 15, "processed": 15},
        {"day": "Sun", "emails": 8, "processed": 8},
    ],
    "category_trends": [
        {"category": "Newsletter", "count": 89, "percentage": 36},
        {"category": "Finance", "count": 41, "percentage": 17},
        {"category": "Academic", "count": 32, "percentage": 13},
        {"category": "Meeting", "count": 27, "percentage": 11},
        {"category": "Job", "count": 18, "percentage": 7},
        {"category": "OTP", "count": 15, "percentage": 6},
        {"category": "Support", "count": 11, "percentage": 4},
        {"category": "Personal", "count": 14, "percentage": 6},
    ],
    "top_senders": [
        {"sender": "GitHub", "email": "support@github.com", "count": 23},
        {"sender": "Linear", "email": "team@linear.app", "count": 18},
        {"sender": "Razorpay", "email": "noreply@razorpay.com", "count": 15},
        {"sender": "Prof. R. Sharma", "email": "prof.sharma@iitb.ac.in", "count": 12},
        {"sender": "Google", "email": "noreply@google.com", "count": 11},
    ],
    "response_time_avg": 4.2,
    "priority_heatmap": [
        {"hour": h, "day": d, "value": __import__("random").randint(0, 10)}
        for d in ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        for h in range(0, 24)
    ],
}
