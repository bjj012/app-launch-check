import { FormData, AuditResult, Issue } from './types';
import { rules } from './rules';

/**
 * Deterministic scoring engine
 * No AI-based reasoning - only hard-coded rule evaluation
 */
export function calculateScore(formData: FormData): AuditResult {
  let score = 100;
  const issues: Issue[] = [];

  // Evaluate each rule against the form data
  for (const rule of rules) {
    if (rule.condition(formData)) {
      score += rule.score; // Subtract points (rule scores are negative)
      issues.push({
        id: rule.id,
        severity: rule.severity,
        message: rule.message
      });
    }
  }

  // Ensure score doesn't go below 0
  score = Math.max(0, score);

  // Sort issues by severity (critical > high > minor)
  const severityOrder = { critical: 0, high: 1, minor: 2 };
  issues.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  return {
    score,
    issues
  };
}
