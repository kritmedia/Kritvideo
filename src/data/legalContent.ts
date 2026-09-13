export interface LegalSection {
  id: string;
  title: string;
  content: string[];
  bullets?: string[];
  callout?: {
    type: 'note' | 'tip' | 'warning';
    text: string;
  };
}

export interface PolicyDocument {
  id: string;
  slug: string;
  title: string;
  badge: string;
  description: string;
  effectiveDate: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export const LEGAL_COMPANY_INFO = {
  name: 'KritVideo Studio',
  registeredEntity: 'KritVideo Studio (operating under KritMedia)',
  website: 'https://kritvideo.com',
  contactEmail: 'hello@kritvideo.com',
  legalEmail: 'legal@kritvideo.com',
  jurisdiction: 'India (governed under the Arbitration and Conciliation Act and applicable commercial laws)',
  slaStandardHours: '48 Hours',
  rawAssetRetentionDays: 60,
  finalMasterRetentionDays: 90,
};

export const POLICIES: Record<string, PolicyDocument> = {
  terms: {
    id: 'terms',
    slug: 'terms',
    title: 'Terms and Conditions',
    badge: 'LEGAL AGREEMENT',
    description: 'These Terms of Service govern your access to and use of video editing, sound design, color grading, motion graphics, and creative post-production services provided by KritVideo Studio.',
    effectiveDate: 'January 1, 2026',
    lastUpdated: 'September 10, 2026',
    sections: [
      {
        id: 'acceptance',
        title: '1. Acceptance of Terms',
        content: [
          `Welcome to KritVideo Studio ("KritVideo," "we," "our," or "us"). By commissioning a project, subscribing to a monthly editing retainer, making payment, or uploading raw media assets to our cloud workspaces, you ("Client," "you," or "your") acknowledge that you have read, understood, and agree to be legally bound by these Terms of Service.`,
          `If you are entering into this agreement on behalf of a company, channel, brand, or other legal entity, you represent and warrant that you possess the full legal authority to bind that entity to these Terms.`
        ]
      },
      {
        id: 'services',
        title: '2. Scope of Post-Production Services',
        content: [
          `KritVideo provides professional digital post-production and editing services, including but not limited to:`,
        ],
        bullets: [
          'Long-form YouTube video editing, retention optimization, and storytelling structure.',
          'Vertical short-form video creation (YouTube Shorts, Instagram Reels, TikTok).',
          'Podcast multi-cam switching, dialogue clean-up, and audio post-production.',
          'Commercial, product, brand, and social media advertising video edits.',
          'ACES color grading, DaVinci Resolve color science, and cinematic look development.',
          'Kinetic typography, animated lower-thirds, motion design, and thumbnail design (when included in package).'
        ],
        callout: {
          type: 'note',
          text: 'Services are delivered on a per-project or monthly retainer basis according to the deliverables explicitly specified in your signed proposal, client portal intake form, or invoice.'
        }
      },
      {
        id: 'client-materials',
        title: '3. Client Footage, Assets & Warranties',
        content: [
          `To enable us to perform the services, you must provide all required raw assets (video footage, audio tracks, brand assets, scripts, references, and briefs) via our designated cloud transfer methods (Google Drive, Dropbox, Frame.io, or AWS S3).`,
          `You represent, warrant, and covenant that:`
        ],
        bullets: [
          'You own or have acquired all necessary worldwide rights, licenses, releases, and permissions for all footage, music, imagery, scripts, and audio clips submitted to KritVideo.',
          'Client-supplied assets do not infringe any copyright, trademark, privacy, publicity, or proprietary rights of any third party.',
          'Submitted materials do not contain defamatory, unlawful, hateful, obscenely graphic, or illegal content.',
          'You maintain independent backup copies of all raw footage. While KritVideo maintains rigorous data security protocols, KritVideo is not liable for data loss occurring outside our active production environment.'
        ]
      },
      {
        id: 'intellectual-property',
        title: '4. Intellectual Property & Commercial Usage Rights',
        content: [
          `Upon receipt of full payment for the applicable invoice or retainer cycle, KritVideo grants and assigns to Client all exclusive rights, title, and interest in and to the final exported video files (the "Final Deliverables").`,
          `Music & Sound Licensing: Any background music tracks, sound effects, or stock footage provided by KritVideo are sourced through enterprise-grade commercial licenses (including Musicbed, Artlist, Epidemic Sound Pro, and Envato Elements). These commercial licenses grant you worldwide distribution and monetization rights on YouTube, Meta, TikTok, and web platforms. However, Client does not acquire underlying ownership of third-party music stems or stock clips, which cannot be resold as standalone audio/video assets.`,
          `Project Files & Raw Project Data: Unless expressly negotiated and invoiced as an add-on item in writing, project source files (including DaVinci Resolve project archives (.dra), Premiere Pro project files (.prproj), and After Effects comps) remain the proprietary studio craft of KritVideo.`
        ],
        callout: {
          type: 'tip',
          text: 'Showcase Rights: Unless Client has executed a Mutual Non-Disclosure Agreement (NDA) with KritVideo prior to delivery, Client grants KritVideo a worldwide, royalty-free license to display excerpts of the completed video edits in agency showreels, case studies, and social media portfolio channels.'
        }
      },
      {
        id: 'revisions-feedback',
        title: '5. Frame-Accurate Revision Protocol',
        content: [
          `We believe great post-production is an iterative, collaborative process. To guarantee rapid execution without confusion, all review rounds are conducted through interactive Frame.io review links.`,
          `Revisions include pacing adjustments, music level balance, cut swaps, color temperature adjustments, and typography corrections within the boundaries of the original creative brief.`,
          `Revisions must be requested within seven (7) calendar days of draft delivery. If no revision notes or approval are received within seven (7) days, the draft will be deemed accepted and complete.`,
          `Scope Creep & Significant Re-Edits: Requests that alter the approved script, incorporate newly shot raw footage after an edit is underway, or demand a completely distinct narrative direction do not qualify as revisions and will be quoted as an add-on or new edit.`
        ]
      },
      {
        id: 'turnaround-sla',
        title: '6. Turnaround Time & Service Level Commitment',
        content: [
          `KritVideo commits to a standard 48-Hour Service Level Agreement (SLA) for first drafts of standard-tier projects following complete intake (all raw files uploaded, brief confirmed, and invoice/deposit secured).`,
          `Standard turnarounds: 24 to 48 hours for short-form edits and active retainers; 48 to 72 hours for documentary or highly complex long-form videos; 12 to 24 hours for revision turnaround cycles.`,
          `Turnaround clocks pause if client feedback is delayed, if footage is missing/corrupted, or in cases of documented force majeure events.`
        ]
      },
      {
        id: 'payment-billing',
        title: '7. Invoicing, Payments & Late Fees',
        content: [
          `One-Off Projects: A 50% deposit is required prior to project intake, with the remaining 50% due upon draft sign-off prior to un-watermarked 4K master delivery (or 100% upfront for expedited turnaround).`,
          `Monthly Retainers: Retainer subscriptions are billed in advance at the start of each 30-day billing cycle. Retainer hours and editor allocation are guaranteed exclusively for that active billing cycle.`,
          `Payment Gateways: Payments are processed through secure, PCI-DSS compliant gateways (Stripe, Razorpay, or wire transfer). All transaction handling fees levied by the gateway are covered as stated on your invoice.`,
          `Invoices overdue by more than seven (7) business days will result in an immediate pause on active production queues and delayed delivery dates.`
        ]
      },
      {
        id: 'liability-indemnification',
        title: '8. Limitation of Liability & Indemnification',
        content: [
          `To the maximum extent permitted by law, in no event shall KritVideo, its founders, editors, or contractors be liable for any indirect, punitive, incidental, special, or consequential damages arising from the use of our edits, including loss of advertising revenue, platform algorithm changes, account suspensions, or copyright strikes resulting from client-provided materials.`,
          `Total aggregate liability for any claim arising out of or related to these Terms or services rendered shall not exceed the total amount actually paid by Client to KritVideo for the specific project or monthly cycle giving rise to the claim.`,
          `Client agrees to defend, indemnify, and hold harmless KritVideo from any third-party claims, damages, liabilities, or legal fees resulting from any breach of Client's asset ownership warranties.`
        ]
      },
      {
        id: 'termination',
        title: '9. Term & Termination',
        content: [
          `Either party may terminate an individual project engagement with written notice if the other party materially breaches these Terms and fails to cure such breach within five (5) business days.`,
          `For monthly retainer clients, termination requires a minimum of fourteen (14) calendar days written notice prior to the start of the subsequent monthly billing cycle.`,
          `Upon termination, Client shall promptly compensate KritVideo for all billable creative work performed up to the date of termination.`
        ]
      },
      {
        id: 'governing-law',
        title: '10. Governing Law & Dispute Resolution',
        content: [
          `These Terms and any dispute arising out of or relating to them shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.`,
          `Any dispute, controversy, or claim arising out of or relating to this contract shall first be resolved through good-faith mutual negotiations. If unresolved within thirty (30) days, the dispute shall be finally settled by binding arbitration in accordance with the Arbitration and Conciliation Act, conducted in the English language.`
        ]
      },
      {
        id: 'contact',
        title: '11. Contact Information',
        content: [
          `If you have any questions, legal notices, or clarifications regarding these Terms of Service, please contact our studio legal desk:`,
          `Email: legal@kritvideo.com (cc: hello@kritvideo.com)`,
          `Studio Website: https://kritvideo.com`,
          `Business Entity: KritVideo Studio`
        ]
      }
    ]
  },

  refund: {
    id: 'refund',
    slug: 'refund-policy',
    title: 'Refund & Cancellation Policy',
    badge: 'MONEY-BACK & REVISION PROTOCOL',
    description: 'Our clear, fair policy regarding project deposits, creative labor expenditure, monthly retainer subscriptions, and revision-driven satisfaction guarantees.',
    effectiveDate: 'January 1, 2026',
    lastUpdated: 'September 10, 2026',
    sections: [
      {
        id: 'creative-labor',
        title: '1. The Nature of Bespoke Creative Labor',
        content: [
          `At KritVideo, video editing is not a mass-manufactured commodity; it is a personalized, intensive creative service. When you commission a project or book an editor, we reserve dedicated post-production workstation capacity, timeline engineers, ACES colorists, and sound designers exclusively for your brand.`,
          `Because creative hours, rendering infrastructure, and editor allocation are permanently spent once editing commences, our refund protocol is structured around fairness, revision commitments, and transparent milestones.`
        ],
        callout: {
          type: 'tip',
          text: 'Our Revision-First Commitment: We do not consider a project complete until you are satisfied. Rather than walking away with a half-finished cut, we dedicate our team to iterative revision passes until the video aligns with your vision.'
        }
      },
      {
        id: 'pre-production-cancellation',
        title: '2. Pre-Production Cancellation (Before Editing Starts)',
        content: [
          `If you book an edit or pay an upfront project deposit but need to cancel before any work has commenced:`,
          `You are eligible for a 100% full refund (minus direct third-party payment processing fees levied by Stripe/PayPal/Razorpay, typically 2.9% + $0.30) provided you notify us in writing within forty-eight (48) hours of payment and before our creative lead has initiated project file setup, footage ingestion, or cutting.`,
          `To initiate a cancellation, email hello@kritvideo.com with your project invoice number.`
        ]
      },
      {
        id: 'active-production-refunds',
        title: '3. In-Progress & Delivered Projects',
        content: [
          `Once raw footage has been ingested, timeline assemblies have begun, or a first draft has been rendered and delivered:`,
        ],
        bullets: [
          'Initial project deposits and milestone fees are non-refundable, as they directly compensate our creative team for the hours expended on ingestion, pacing, audio scrubbing, and grading.',
          'If you are dissatisfied with a delivered draft, you are entitled to comprehensive revision cycles (as outlined in your project tier) to rectify pacing, tone, color, audio balance, or motion graphics.',
          'In the rare event that KritVideo fails to deliver a first draft within our agreed Service Level Agreement (48 to 72 hours, excluding client delay) without prior written notice, Client is entitled to request an immediate 100% refund of fees paid for that unfulfilled deliverable.',
          'Deliberately abandoning a project after receiving drafts, or using our exported work elsewhere without completing payment, voids any claim to a refund and constitutes copyright infringement.'
        ]
      },
      {
        id: 'retainer-subscriptions',
        title: '4. Monthly Retainer Subscription Cancellations',
        content: [
          `For clients enrolled in dedicated monthly video editing retainers:`,
        ],
        bullets: [
          'Cancellation Notice: You may cancel your monthly subscription at any time by providing written notice at least fourteen (14) calendar days prior to your next scheduled billing date.',
          'No Mid-Month Prorated Refunds: We do not offer prorated refunds for partial months or unused video quota within an active billing cycle, as editor capacity and server allocation are reserved for the entire 30-day block.',
          'Unused Video Rollover: Unless explicitly stated in your custom Enterprise Service Level Agreement, monthly video allocations expire at the end of each 30-day billing cycle to maintain predictable studio workflow.'
        ],
        callout: {
          type: 'warning',
          text: 'Retainer Pause Option: Need to pause production while filming your next batch? You may pause your retainer for up to thirty (30) days once every six months with seven (7) days written notice.'
        }
      },
      {
        id: 'dormant-projects',
        title: '5. Dormant Projects & Inactive Queues',
        content: [
          `If Client purchases a video editing package but fails to upload raw footage, provide necessary assets, or reply to review drafts for more than sixty (60) consecutive days:`,
          `The project will be marked as "Archived Due to Inactivity." Project deposits cannot be refunded after 60 days of inactivity. However, Client may reactivate the project within twelve (12) months by paying a nominal re-ingestion fee of $75 to unarchive project assets from cold storage.`
        ]
      },
      {
        id: 'disputes-chargebacks',
        title: '6. Chargebacks & Friendly Fraud',
        content: [
          `We are committed to resolving any dissatisfaction directly, swiftly, and amicably. Filing an unauthorized credit card chargeback or PayPal dispute without first contacting our management team at hello@kritvideo.com constitutes a material breach of these Terms.`,
          `In the event of an unjustified chargeback for services rendered, Client's commercial licenses to all soundtrack tracks and exported video masters will be immediately revoked, and the footage will be subject to DMCA takedown notices on YouTube, Meta, and TikTok.`
        ]
      },
      {
        id: 'refund-process',
        title: '7. How to Request a Refund',
        content: [
          `To request an eligible pre-production refund or discuss project adjustments:`,
          `1. Email hello@kritvideo.com with the subject line "Refund Request — [Invoice Number]".`,
          `2. Detail your project name, payment date, and the specific rationale for your request.`,
          `3. Our studio management will review and respond within two (2) business days. Approved refunds are credited back to the original payment method within 5 to 10 banking business days.`
        ]
      }
    ]
  },

  privacy: {
    id: 'privacy',
    slug: 'privacy',
    title: 'Privacy Policy & Data Security',
    badge: 'DATA PROTECTION PROTOCOL',
    description: 'How KritVideo Studio protects your personal information, client raw footage, confidential intellectual property, and studio assets in compliance with international privacy laws.',
    effectiveDate: 'January 1, 2026',
    lastUpdated: 'September 10, 2026',
    sections: [
      {
        id: 'overview',
        title: '1. Overview & Commitment',
        content: [
          `KritVideo Studio ("KritVideo," "we," "our") values the trust you place in us when sharing your personal information, business communications, and proprietary video footage. This Privacy Policy details how we collect, process, safeguard, and delete your data when you interact with https://kritvideo.com (the "Website") or use our post-production services.`,
          `We adhere strictly to global data protection principles, including the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and the Digital Personal Data Protection (DPDP) Act.`
        ]
      },
      {
        id: 'data-we-collect',
        title: '2. Information We Collect',
        content: [
          `We collect only the minimum information necessary to execute world-class video post-production:`,
        ],
        bullets: [
          'Contact & Identity Data: Full name, business email address, WhatsApp/Telegram handle, channel/brand name, and company URL.',
          'Project & Creative Data: Creative briefs, raw video footage, audio recordings, project scripts, branding guidelines, font files, and timestamp feedback.',
          'Billing & Transaction Information: Billing address, tax/GST identifier, and transaction records. (Note: Full credit card numbers and CVVs are handled exclusively by PCI-DSS Level 1 certified payment processors like Stripe and Razorpay; KritVideo never stores your raw card details).',
          'Automated Technical Analytics: IP address, browser type, operating system, device characteristics, and anonymous page engagement metrics collected via Google Tag Manager.'
        ]
      },
      {
        id: 'footage-security',
        title: '3. Raw Footage Security & Strict Confidentiality',
        content: [
          `We recognize that raw footage often includes unpublished product demos, confidential creator conversations, outtakes, and unreleased business strategies. We enforce strict enterprise asset security:`,
        ],
        bullets: [
          'Encrypted Cloud Ingestion: All raw files are transferred via TLS 1.3 encrypted connections directly into secure cloud workspaces (Frame.io Enterprise, Google Workspace Enterprise, or AWS S3).',
          'Role-Based Editor Access: Only the designated lead editor, colorist, and creative director assigned to your specific project have access to your raw media folders.',
          'Strict Non-Disclosure: All studio editors and team members work under signed NDAs with zero tolerance for leaking, sharing, or privately distributing client materials.',
          'Unpublished Work Confidentiality: We will never share or publish your finished videos or excerpts until you have publicly premiered or published them first, unless an explicit NDA supersedes.'
        ],
        callout: {
          type: 'note',
          text: 'Need a custom Enterprise NDA signed before sending raw footage? We are happy to review and sign your organization’s NDA. Email legal@kritvideo.com prior to uploading assets.'
        }
      },
      {
        id: 'how-we-use-data',
        title: '4. How We Use Your Data',
        content: [
          `We utilize collected data strictly for the following operational purposes:`,
        ],
        bullets: [
          'To cut, grade, mix, sound-design, render, and deliver your customized video assets.',
          'To facilitate frame-accurate review rounds and client feedback via Frame.io.',
          'To issue invoices, process payments, and fulfill statutory tax compliance obligations.',
          'To communicate real-time project milestone updates, delivery notifications, and customer support.',
          'To monitor and improve our website performance, user experience, and Core Web Vitals.'
        ]
      },
      {
        id: 'data-retention',
        title: '5. Asset Retention & Automated Purge Policy',
        content: [
          `Video production requires massive storage capacity. To maintain high-speed NVMe editing environments and ensure data hygiene:`,
          `Raw Footage & Working Project Files: Retained on active editing drives for sixty (60) days following final project sign-off, after which raw camera files are permanently purged.`,
          `Final Master Exports: Stored in our cloud archives for ninety (90) days to allow you to download backup copies if needed. After 90 days, exports are moved to cold archival.`,
          `Personal Account Records: Basic contact, communication, and billing records are maintained for statutory legal, accounting, and tax compliance periods (typically 5 to 7 years).`
        ]
      },
      {
        id: 'third-parties',
        title: '6. Third-Party Service Providers',
        content: [
          `We do not sell, rent, trade, or monetize your personal data or footage to any third parties. We share data solely with trusted infrastructure partners essential to delivering our services:`,
        ],
        bullets: [
          'Review & Cloud Storage: Frame.io / Adobe Creative Cloud, Google Workspace, AWS Cloud Storage.',
          'Payment Processing: Stripe Inc., Razorpay Software Pvt. Ltd., PayPal.',
          'Analytics & Diagnostics: Google Tag Manager / Google Analytics (anonymized IP tracking).',
          'Communications: Google Workspace (Gmail), Slack, WhatsApp Business.'
        ]
      },
      {
        id: 'your-rights',
        title: '7. Your Global Privacy Rights (GDPR / CCPA / DPDP)',
        content: [
          `Regardless of your geographic location, KritVideo provides you with full transparency and control over your data:`,
        ],
        bullets: [
          'Right to Access: You may request a summary of the personal data we hold about you.',
          'Right to Rectification: You may request correction of inaccurate contact or billing details.',
          'Right to Erasure ("Right to Be Forgotten"): You may request that we permanently delete your personal information and purge all associated video media files from our servers.',
          'Right to Restrict Processing & Withdraw Consent: You may revoke marketing permissions at any time.',
          'No Sale of Personal Data: KritVideo has never sold and will never sell personal information.'
        ]
      },
      {
        id: 'cookies',
        title: '8. Cookies & Telemetry Policy',
        content: [
          `Our website utilizes lightweight, first-party essential cookies necessary for site navigation and secure session management. We defer non-essential analytics scripts to idle browser frames to preserve lightning-fast mobile performance. You can disable cookies at any time through your browser settings.`
        ]
      },
      {
        id: 'contact-privacy',
        title: '9. Contact Our Data Protection Desk',
        content: [
          `To exercise any privacy rights, request asset purging, or report a data concern, please reach out to our dedicated privacy contact:`,
          `Email: hello@kritvideo.com (Subject: "Data Privacy Request")`,
          `Response SLA: We acknowledge all data requests within forty-eight (48) business hours.`
        ]
      }
    ]
  },

  delivery: {
    id: 'delivery',
    slug: 'delivery-policy',
    title: 'Digital Delivery & 48H SLA Policy',
    badge: 'ELECTRONIC SHIPPING & SERVICE LEVEL AGREEMENT',
    description: 'Standards, timelines, delivery mechanisms, and file specifications for all digital video assets produced by KritVideo Studio.',
    effectiveDate: 'January 1, 2026',
    lastUpdated: 'September 10, 2026',
    sections: [
      {
        id: 'digital-shipping',
        title: '1. 100% Digital Delivery (No Physical Goods)',
        content: [
          `KritVideo is an entirely digital post-production studio. All deliverables—including initial review drafts, revisions, sound-designed cuts, color-graded masters, and motion graphics packages—are delivered 100% electronically over secure cloud infrastructure.`,
          `No physical media (such as USB drives, hard disks, DVDs, or optical tapes) are shipped, and no physical shipping fees or import customs duties apply to your invoice.`
        ],
        callout: {
          type: 'tip',
          text: 'Payment Gateway Compliance: For clients paying via Stripe, Razorpay, or PayPal, your invoice confirms receipt of digital post-production creative services delivered electronically.'
        }
      },
      {
        id: 'delivery-mechanisms',
        title: '2. Delivery Mechanisms & Formats',
        content: [
          `We deliver video assets through a two-stage digital pipeline:`,
          `Stage 1: Interactive Review Drafts — Delivered via private, password-protected Frame.io review links. This allows you to inspect playback on mobile or desktop, scrub frame-by-frame, and leave timestamped annotations.`,
          `Stage 2: Final Master Exports — Upon final client approval and invoice settlement, we generate and deliver full-resolution master download links via Google Drive or AWS high-speed transfer.`
        ],
        bullets: [
          'YouTube & Web Long-Form: 4K UHD (3840×2160) or 1080p Full HD in high-bitrate H.264 / H.265 MP4 (Rec.709 color space, -14 LUFS integrated audio mastering).',
          'Vertical Shorts / Reels / TikTok: 1080×1920 (9:16 aspect ratio) 60fps / 30fps optimized for mobile screens and platform bitrate limits.',
          'Commercial & Broadcast Master: Apple ProRes 422 HQ or Avid DNxHR broadcast masters upon request.',
          'Clean Audio Stems & SRT Captions: Separate dialogue/music stems and .SRT subtitle files included with commercial tiers.'
        ]
      },
      {
        id: 'turnaround-sla',
        title: '3. Turnaround Tiers & 48-Hour SLA Guarantee',
        content: [
          `We calculate turnaround times starting from "Production Intake Complete"—the exact timestamp when all three conditions are satisfied: (1) all raw footage is uploaded, (2) the creative brief is confirmed, and (3) project deposit or retainer payment is verified.`,
        ],
        bullets: [
          'Shorts, Reels & TikTok Cuts: Guaranteed first cut delivered within 24 to 48 hours.',
          'Standard YouTube Long-Form (up to 15 mins): Guaranteed first cut delivered within 48 hours.',
          'Deep Documentary / Extended Long-Form (20+ mins): Delivered within 48 to 72 hours.',
          'Revision Iterations: Standard revision rounds delivered within 12 to 24 hours of timestamp submission.'
        ]
      },
      {
        id: 'client-delays',
        title: '4. Factors Affecting Turnaround Times',
        content: [
          `Our 48-Hour SLA clock operates during standard studio production hours (Monday through Saturday, 9:00 AM to 8:00 PM IST / UTC+5:30). The clock pauses in the event of:`,
        ],
        bullets: [
          'Missing, corrupt, or unlinked raw video/audio media files.',
          'Major mid-edit scope alterations (e.g., swapping scripts or submitting newly shot takes).',
          'Delays in Client review feedback exceeding forty-eight (48) hours.',
          'National holidays and documented force majeure technical outages.'
        ]
      },
      {
        id: 'download-window',
        title: '5. Client Download Window & File Safeguards',
        content: [
          `Final master download links remain active for thirty (30) days from delivery. We strongly advise clients to immediately download and store their master video files across their own local and cloud storage systems.`,
          `If you ever lose your master files within ninety (90) days of project completion, contact hello@kritvideo.com with your project ID, and our team will re-generate fresh download links at no additional cost.`
        ]
      }
    ]
  }
};
