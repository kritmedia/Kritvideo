export interface ServicePillar {
  number: string;
  title: string;
  description: string;
  tags?: string[];
}

export interface TrustedBrand {
  name: string;
  iconType: 'circle' | 'hourglass' | 'split' | 'globe' | 'shield' | 'layers';
}

export interface CraftFeatureCard {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  metric: string;
  metricLabel: string;
  specs: { label: string; value: string }[];
  highlight: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  turnaround: string;
  idealFor: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  channelOrBrand: string;
  stats: string;
}

export interface ProjectQuoteState {
  projectType: 'commercial' | 'youtube' | 'social_reels' | 'documentary';
  footageLengthMinutes: number;
  rawFormat: 'prores_raw' | 'log_4k' | 'standard_hd' | 'smartphone';
  turnaroundSpeed: 'standard' | 'express_48h' | 'hyper_24h';
  soundDesignIncluded: boolean;
  colorGradingIncluded: boolean;
  motionGraphicsIncluded: boolean;
  thumbnailIncluded: boolean;
}
