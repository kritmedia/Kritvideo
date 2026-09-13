import React from 'react';
import PolicyLayout from '../components/PolicyLayout';

export type PolicyKey = 'terms' | 'refund' | 'privacy' | 'delivery';

interface PolicyPageProps {
  policyType: PolicyKey;
  onNavigate: (path: string) => void;
}

export default function PolicyPage({ policyType, onNavigate }: PolicyPageProps) {
  return <PolicyLayout currentPolicyKey={policyType} onNavigate={onNavigate} />;
}
