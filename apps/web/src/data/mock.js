// Central mock data for the frontend — mirrors backend mock_data.py
// All screens use this data in development mode

export const MOCK_USER = {
  id: 'user-demo-001',
  name: 'Alex Chen',
  email: 'demo@inboxos.app',
  avatar: null,
}

export const MOCK_EMAILS = [
  {
    id: 'email-001',
    sender_email: 'prof.sharma@iitb.ac.in',
    sender_name: 'Prof. R. Sharma',
    subject: 'DBMS Mini-Project Submission Deadline — TONIGHT 11:59 PM',
    snippet: 'Dear students, this is a reminder that the DBMS mini-project submission deadline is tonight at 11:59 PM...',
    body_text: 'Dear students,\n\nThis is an urgent reminder that the DBMS mini-project submission deadline is TONIGHT at 11:59 PM. No extensions will be granted. Please submit via the course portal.\n\nBest regards,\nProf. R. Sharma',
    received_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    is_read: false,
    is_starred: true,
    is_archived: false,
    labels: ['academic', 'urgent'],
    analysis: {
      category: 'academic',
      priority_score: 96,
      urgency_score: 98,
      actionability_score: 92,
      confidence_score: 0.97,
      summary: 'DBMS mini-project deadline is tonight at 11:59 PM. No extensions.',
      reasoning: 'High priority academic deadline email. Deadline is imminent (same-day), sender is a professor, subject contains URGENT and DEADLINE signals.',
      suggested_reply: 'Dear Prof. Sharma,\n\nThank you for the reminder. I will submit the project before the deadline tonight.\n\nBest regards,\nAlex',
      extracted_data: {
        entities: [{ type: 'deadline', value: 'Tonight 11:59 PM' }, { type: 'organization', value: 'IITB' }],
        action_items: [{ description: 'Submit DBMS mini-project via course portal', deadline: 'Tonight 11:59 PM' }],
        deadlines: [{ label: 'Submission', datetime: 'Tonight 11:59 PM' }],
      }
    }
  },
  {
    id: 'email-002',
    sender_email: 'talent@stripe.com',
    sender_name: 'Stripe Recruiting',
    subject: 'Your Application — Software Engineer Intern | Select interview slot by Friday',
    snippet: 'Hi Alex! Congratulations on advancing to the technical interview round at Stripe...',
    body_text: 'Hi Alex!\n\nCongratulations on advancing to the technical interview round at Stripe. We\'re excited to move forward with your application for the Software Engineer Intern position.\n\nPlease select an interview slot by this Friday.\n\nBest,\nStripe Recruiting',
    received_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    is_read: false,
    is_starred: false,
    is_archived: false,
    labels: ['job'],
    analysis: {
      category: 'job',
      priority_score: 94,
      urgency_score: 88,
      actionability_score: 95,
      confidence_score: 0.96,
      summary: 'Stripe recruiting: Technical interview invitation for SWE Intern role. Action required by Friday.',
      reasoning: 'Job opportunity with clear deadline (Friday). High actionability — requires scheduling interview slot.',
      suggested_reply: 'Hi! Thank you so much for this opportunity at Stripe. I\'m very excited to proceed. I\'ll select an interview slot right away.',
      extracted_data: {
        entities: [{ type: 'company', value: 'Stripe' }, { type: 'deadline', value: 'Friday' }],
        action_items: [{ description: 'Select interview slot via scheduling link', deadline: 'Friday' }],
      }
    }
  },
  {
    id: 'email-003',
    sender_email: 'noreply@razorpay.com',
    sender_name: 'Razorpay',
    subject: 'Payment Successful — ₹2,499 to Udemy',
    snippet: 'Your payment of ₹2,499 to Udemy has been processed successfully...',
    body_text: 'Your payment of ₹2,499 to Udemy was processed.\n\nTransaction ID: RPY20260626001\nAmount: ₹2,499\nMerchant: Udemy India',
    received_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    is_read: true,
    is_starred: false,
    is_archived: false,
    labels: ['finance'],
    analysis: {
      category: 'finance',
      priority_score: 45,
      urgency_score: 20,
      actionability_score: 10,
      confidence_score: 0.99,
      summary: 'Payment confirmation: ₹2,499 to Udemy via Razorpay.',
      reasoning: 'Finance email with payment receipt. Low urgency — informational only.',
      suggested_reply: '',
      extracted_data: { amounts: [{ value: 2499, currency: 'INR', merchant: 'Udemy' }] }
    }
  },
  {
    id: 'email-004',
    sender_email: 'team@linear.app',
    sender_name: 'Linear',
    subject: 'Weekly Digest — What\'s new in Linear',
    snippet: 'This week in Linear: Improved keyboard shortcuts, new bulk actions...',
    body_text: 'Hi! Here\'s what\'s new in Linear this week:\n- Improved keyboard shortcuts\n- New bulk action support',
    received_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    is_read: true,
    is_starred: false,
    is_archived: false,
    labels: ['newsletter'],
    analysis: {
      category: 'newsletter',
      priority_score: 12,
      urgency_score: 5,
      actionability_score: 8,
      confidence_score: 0.98,
      summary: 'Linear weekly digest covering product updates.',
      reasoning: 'Newsletter detected: unsubscribe link, weekly digest pattern.',
      suggested_reply: '',
      extracted_data: {}
    }
  },
  {
    id: 'email-005',
    sender_email: 'noreply@google.com',
    sender_name: 'Google',
    subject: 'Your verification code is 847291',
    snippet: 'Use this one-time code to verify your identity: 847291. Valid for 10 minutes.',
    body_text: 'Use this one-time code: 847291\nExpires in 10 minutes.',
    received_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    is_read: false,
    is_starred: false,
    is_archived: false,
    labels: ['otp'],
    analysis: {
      category: 'otp',
      priority_score: 99,
      urgency_score: 100,
      actionability_score: 100,
      confidence_score: 1.0,
      summary: 'Google verification OTP: 847291. Expires in 10 minutes.',
      reasoning: 'OTP email — time-critical.',
      suggested_reply: '',
      extracted_data: { otp_code: '847291' }
    }
  },
  {
    id: 'email-006',
    sender_email: 'hr@startupxyz.io',
    sender_name: 'Sarah (StartupXYZ HR)',
    subject: 'Offer Letter — Full Stack Developer',
    snippet: 'We\'re thrilled to extend an offer for the Full Stack Developer role...',
    body_text: 'Dear Alex,\n\nWe are thrilled to extend an offer for the Full Stack Developer role at StartupXYZ.\n\nPackage: ₹18 LPA + 0.1% equity\nStart Date: August 1, 2026\nPlease respond by July 3, 2026.',
    received_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    is_read: false,
    is_starred: true,
    is_archived: false,
    labels: ['job', 'urgent'],
    analysis: {
      category: 'job',
      priority_score: 99,
      urgency_score: 92,
      actionability_score: 98,
      confidence_score: 0.97,
      summary: 'Job offer from StartupXYZ — ₹18 LPA + equity. Respond by July 3.',
      reasoning: 'Offer letter with significant career decision and deadline.',
      suggested_reply: 'Dear Sarah,\n\nThank you for the offer! I\'ll review and respond by July 3.',
      extracted_data: {
        entities: [{ type: 'salary', value: '₹18 LPA' }, { type: 'deadline', value: 'July 3, 2026' }],
        action_items: [{ description: 'Review and respond to offer letter', deadline: 'July 3, 2026' }],
      }
    }
  },
  {
    id: 'email-007',
    sender_email: 'meetings@calendly.com',
    sender_name: 'Calendly',
    subject: 'New Event: Design Review — Monday 3 PM',
    snippet: 'A new event: Design Review on Monday, June 30 at 3:00 PM IST',
    body_text: 'Event: Design Review\nDate: Monday, June 30, 2026\nTime: 3:00 PM IST\nLocation: Google Meet',
    received_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    is_read: true,
    is_starred: false,
    is_archived: false,
    labels: ['meeting'],
    analysis: {
      category: 'meeting',
      priority_score: 78,
      urgency_score: 65,
      actionability_score: 80,
      confidence_score: 0.95,
      summary: 'Design Review meeting scheduled for Monday June 30 at 3 PM IST.',
      reasoning: 'Calendar invite from Calendly.',
      suggested_reply: 'Thanks! I\'ll be there for the Design Review.',
      extracted_data: { entities: [{ type: 'meeting', value: 'Design Review' }] }
    }
  },
  {
    id: 'email-008',
    sender_email: 'support@github.com',
    sender_name: 'GitHub Support',
    subject: 'Action required: Verify your email address',
    snippet: 'Please verify your new email address for your GitHub account...',
    body_text: 'Please verify your email address for GitHub. This link expires in 24 hours.',
    received_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    is_read: false,
    is_starred: false,
    is_archived: false,
    labels: ['support'],
    analysis: {
      category: 'support',
      priority_score: 72,
      urgency_score: 75,
      actionability_score: 85,
      confidence_score: 0.93,
      summary: 'GitHub email verification required. Link expires in 24 hours.',
      reasoning: 'Support email with time-sensitive action.',
      suggested_reply: '',
      extracted_data: {}
    }
  },
]

export const MOCK_RULES = [
  {
    id: 'rule-001',
    name: 'OTP Instant Alert',
    description: 'Send all OTP emails to Telegram immediately',
    conditions: [{ field: 'category', operator: 'equals', value: 'otp' }],
    actions: [{ type: 'notify_telegram', params: { priority: 'instant' } }],
    priority_order: 1,
    is_active: true,
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rule-002',
    name: 'University Emails',
    description: 'Boost priority for academic institution emails',
    conditions: [{ field: 'sender_email', operator: 'contains', value: '.edu' }],
    actions: [{ type: 'priority_boost', params: { boost: 20 } }, { type: 'notify_telegram', params: {} }],
    priority_order: 2,
    is_active: true,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rule-003',
    name: 'Newsletter Digest',
    description: 'Add newsletters to daily digest, no interruption',
    conditions: [{ field: 'category', operator: 'equals', value: 'newsletter' }],
    actions: [{ type: 'add_to_digest', params: {} }, { type: 'ignore', params: {} }],
    priority_order: 3,
    is_active: true,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rule-004',
    name: 'High Priority Jobs',
    description: 'Notify immediately for job offers and interview invites',
    conditions: [
      { field: 'category', operator: 'equals', value: 'job' },
      { field: 'priority_score', operator: 'gt', value: 80 },
    ],
    actions: [{ type: 'notify_telegram', params: { priority: 'high' } }, { type: 'create_task', params: {} }],
    priority_order: 4,
    is_active: true,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rule-005',
    name: 'Finance Tracking',
    description: 'Log all financial emails for expense tracking',
    conditions: [{ field: 'category', operator: 'equals', value: 'finance' }],
    actions: [{ type: 'log_expense', params: {} }, { type: 'add_to_digest', params: {} }],
    priority_order: 5,
    is_active: false,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export const MOCK_TASKS = [
  { id: 'task-001', title: 'Submit DBMS mini-project', description: 'Submit via course portal before 11:59 PM tonight', deadline: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), status: 'pending', priority: 'urgent', source_email_id: 'email-001' },
  { id: 'task-002', title: 'Schedule Stripe interview slot', description: 'Use scheduling link to pick an interview time by Friday', deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), status: 'pending', priority: 'high', source_email_id: 'email-002' },
  { id: 'task-003', title: 'Review StartupXYZ offer letter', description: 'Respond to job offer by July 3, 2026', deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), status: 'in_progress', priority: 'urgent', source_email_id: 'email-006' },
  { id: 'task-004', title: 'Verify GitHub email address', description: 'Click verification link before it expires (24h)', deadline: new Date(Date.now() + 21 * 60 * 60 * 1000).toISOString(), status: 'pending', priority: 'medium', source_email_id: 'email-008' },
]

export const MOCK_REMINDERS = [
  { id: 'rem-001', email_id: 'email-001', title: 'DBMS Deadline in 2 hours', message: 'DBMS mini-project due at 11:59 PM', remind_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), status: 'pending', channel: 'telegram' },
  { id: 'rem-002', email_id: 'email-002', title: 'Stripe interview slot', message: 'Select Stripe interview slot — deadline Friday', remind_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), status: 'pending', channel: 'telegram' },
  { id: 'rem-003', email_id: 'email-006', title: 'Offer letter response', message: 'Respond to StartupXYZ offer by July 3', remind_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), status: 'pending', channel: 'telegram' },
  { id: 'rem-004', email_id: null, title: 'Weekly inbox review', message: 'Review your email digest for the week', remind_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), status: 'sent', channel: 'email' },
]

export const MOCK_NOTIFICATIONS = [
  { id: 'notif-001', channel: 'telegram', title: '🚨 Urgent Email', content: 'DBMS mini-project submission deadline is TONIGHT at 11:59 PM. No extensions.', status: 'sent', time: '2 min ago' },
  { id: 'notif-002', channel: 'telegram', title: '💼 Job Alert', content: 'Stripe is inviting you to interview for SWE Intern. Select slot by Friday.', status: 'sent', time: '5 hours ago' },
  { id: 'notif-003', channel: 'telegram', title: '🔑 OTP', content: 'Google verification code: 847291 (expires in 10 minutes)', status: 'sent', time: '15 min ago' },
  { id: 'notif-004', channel: 'telegram', title: '📋 Daily Digest', content: 'Today: 3 newsletters, 1 finance update, 2 low-priority emails.', status: 'sent', time: 'Yesterday' },
  { id: 'notif-005', channel: 'telegram', title: '💼 Offer Received', content: 'StartupXYZ sent you a job offer: ₹18 LPA + equity. Respond by July 3.', status: 'sent', time: '2 days ago' },
]

export const DASHBOARD_STATS = {
  total_emails: 247,
  processed_today: 18,
  high_priority: 4,
  pending_tasks: 4,
  sent_notifications: 12,
  category_breakdown: {
    academic: 32, job: 18, finance: 41, meeting: 27,
    otp: 15, newsletter: 89, personal: 14, support: 11,
  },
  priority_distribution: { critical: 8, high: 26, medium: 73, low: 140 },
  recent_activity: [
    { time: '2 min ago', action: 'OTP delivered to Telegram', type: 'notification', icon: '🔑' },
    { time: '5 min ago', action: 'DBMS deadline — priority 96', type: 'analysis', icon: '🤖' },
    { time: '1 hour ago', action: 'Task: Schedule Stripe interview', type: 'task', icon: '✅' },
    { time: '3 hours ago', action: 'Razorpay receipt → expenses', type: 'finance', icon: '💰' },
    { time: '5 hours ago', action: '4 newsletters added to digest', type: 'digest', icon: '📋' },
    { time: 'Yesterday', action: 'Design Review event created', type: 'calendar', icon: '📅' },
  ]
}

export const ANALYTICS_DATA = {
  weekly_volume: [
    { day: 'Mon', emails: 34 }, { day: 'Tue', emails: 28 }, { day: 'Wed', emails: 41 },
    { day: 'Thu', emails: 19 }, { day: 'Fri', emails: 52 }, { day: 'Sat', emails: 15 }, { day: 'Sun', emails: 8 },
  ],
  category_trends: [
    { category: 'Newsletter', count: 89, percentage: 36, color: '#6b7280' },
    { category: 'Finance', count: 41, percentage: 17, color: '#10b981' },
    { category: 'Academic', count: 32, percentage: 13, color: '#8b5cf6' },
    { category: 'Meeting', count: 27, percentage: 11, color: '#f59e0b' },
    { category: 'Job', count: 18, percentage: 7, color: '#3b82f6' },
    { category: 'OTP', count: 15, percentage: 6, color: '#ef4444' },
    { category: 'Support', count: 11, percentage: 4, color: '#06b6d4' },
    { category: 'Personal', count: 14, percentage: 6, color: '#ec4899' },
  ],
  top_senders: [
    { sender: 'GitHub', email: 'support@github.com', count: 23 },
    { sender: 'Linear', email: 'team@linear.app', count: 18 },
    { sender: 'Razorpay', email: 'noreply@razorpay.com', count: 15 },
    { sender: 'Prof. R. Sharma', email: 'prof.sharma@iitb.ac.in', count: 12 },
    { sender: 'Google', email: 'noreply@google.com', count: 11 },
  ],
  response_time_avg: 4.2,
}

export const SENDERS = [
  { id: 's-001', name: 'Prof. R. Sharma', email: 'prof.sharma@iitb.ac.in', emails_count: 12, priority: 'always_notify', category_override: null, notes: 'University professor' },
  { id: 's-002', name: 'Stripe Recruiting', email: 'talent@stripe.com', emails_count: 3, priority: 'always_notify', category_override: 'job', notes: '' },
  { id: 's-003', name: 'Linear', email: 'team@linear.app', emails_count: 18, priority: 'digest', category_override: 'newsletter', notes: 'Add to digest only' },
  { id: 's-004', name: 'Razorpay', email: 'noreply@razorpay.com', emails_count: 15, priority: 'normal', category_override: 'finance', notes: '' },
  { id: 's-005', name: 'GitHub', email: 'support@github.com', emails_count: 23, priority: 'normal', category_override: null, notes: '' },
]
