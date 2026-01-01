import React from 'react';
import { AuditResult, Issue } from '../lib/types';

// ============================================================
// TYPES & PROPS
// ============================================================

interface ResultViewProps {
  result: AuditResult;
}

interface IssueStats {
  critical: number;
  high: number;
  minor: number;
}

// ============================================================
// ICON COMPONENTS
// ============================================================

const CriticalIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const HighIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const MinorIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LockIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

// ============================================================
// HELPER FUNCTIONS
// ============================================================

const calculateStats = (issues: Issue[]): IssueStats => {
  return {
    critical: issues.filter(i => i.severity === 'critical').length,
    high: issues.filter(i => i.severity === 'high').length,
    minor: issues.filter(i => i.severity === 'minor').length,
  };
};

const getScoreColor = (score: number): string => {
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-yellow-500';
  if (score >= 40) return 'text-orange-500';
  return 'text-red-500';
};

const getScoreBgColor = (score: number): string => {
  if (score >= 80) return 'bg-green-50 border-green-200';
  if (score >= 60) return 'bg-yellow-50 border-yellow-200';
  if (score >= 40) return 'bg-orange-50 border-orange-200';
  return 'bg-red-50 border-red-200';
};

const getSeverityConfig = (severity: 'critical' | 'high' | 'minor') => {
  switch (severity) {
    case 'critical':
      return {
        label: 'Critical',
        color: 'text-red-600',
        bgLight: 'bg-red-50',
        bgDark: 'bg-red-500',
        border: 'border-red-200',
        icon: CriticalIcon
      };
    case 'high':
      return {
        label: 'High Risk',
        color: 'text-orange-600',
        bgLight: 'bg-orange-50',
        bgDark: 'bg-orange-500',
        border: 'border-orange-200',
        icon: HighIcon
      };
    case 'minor':
      return {
        label: 'Minor',
        color: 'text-blue-600',
        bgLight: 'bg-blue-50',
        bgDark: 'bg-blue-500',
        border: 'border-blue-200',
        icon: MinorIcon
      };
  };
};

// ============================================================
// SCORE CARD COMPONENT
// ============================================================

interface ScoreCardProps {
  score: number;
  totalIssues: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score, totalIssues }) => {
  const scoreColor = getScoreColor(score);
  const scoreBgColor = getScoreBgColor(score);

  return (
    <div className={`score-card rounded-2xl border-2 p-8 text-center ${scoreBgColor}`}>
      <div className="mb-4">
        <span className="text-sm font-medium uppercase tracking-wider text-gray-500">
          Compliance Score
        </span>
      </div>
      <div className={`text-7xl font-bold ${scoreColor} mb-2`}>
        {score}
      </div>
      <div className="text-lg text-gray-600 mb-4">out of 100</div>

      {score === 100 ? (
        <div className="flex items-center justify-center text-green-600">
          <CheckIcon className="w-5 h-5 mr-2" />
          <span className="font-medium">Perfect! No issues found.</span>
        </div>
      ) : (
        <div className="flex items-center justify-center text-gray-600">
          <span className="font-medium">
            {totalIssues} {totalIssues === 1 ? 'issue' : 'issues'} detected
          </span>
        </div>
      )}

      {/* Progress Ring */}
      <div className="mt-6 flex justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-gray-200"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={`${(score / 100) * 352} 352`}
              strokeLinecap="round"
              className={scoreColor.replace('text-', 'stroke-')}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// STATS CARDS COMPONENT
// ============================================================

interface StatsCardsProps {
  stats: IssueStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="stats-grid grid grid-cols-3 gap-4">
      {/* Critical Stats */}
      <div className="stat-card bg-red-50 border border-red-200 rounded-xl p-4 text-center">
        <div className="flex items-center justify-center mb-2">
          <CriticalIcon className="w-5 h-5 text-red-500" />
        </div>
        <div className="text-3xl font-bold text-red-600">{stats.critical}</div>
        <div className="text-sm text-red-500 font-medium">Critical</div>
        <div className="text-xs text-red-400 mt-1">Must Fix</div>
      </div>

      {/* High Stats */}
      <div className="stat-card bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
        <div className="flex items-center justify-center mb-2">
          <HighIcon className="w-5 h-5 text-orange-500" />
        </div>
        <div className="text-3xl font-bold text-orange-600">{stats.high}</div>
        <div className="text-sm text-orange-500 font-medium">High Risk</div>
        <div className="text-xs text-orange-400 mt-1">Should Fix</div>
      </div>

      {/* Minor Stats */}
      <div className="stat-card bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
        <div className="flex items-center justify-center mb-2">
          <MinorIcon className="w-5 h-5 text-blue-500" />
        </div>
        <div className="text-3xl font-bold text-blue-600">{stats.minor}</div>
        <div className="text-sm text-blue-500 font-medium">Minor</div>
        <div className="text-xs text-blue-400 mt-1">Suggestions</div>
      </div>
    </div>
  );
};

// ============================================================
// ISSUE ITEM COMPONENT
// ============================================================

interface IssueItemProps {
  issue: Issue;
  index: number;
}

const IssueItem: React.FC<IssueItemProps> = ({ issue, index }) => {
  const config = getSeverityConfig(issue.severity);
  const IconComponent = config.icon;

  return (
    <div className={`issue-item border ${config.border} ${config.bgLight} rounded-xl p-4`}>
      <div className="flex items-start">
        {/* Icon & Index */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${config.bgDark} flex items-center justify-center mr-4`}>
          <IconComponent className="w-5 h-5 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-semibold uppercase ${config.color}`}>
              {config.label}
            </span>
            <span className="text-xs text-gray-400">#{index + 1}</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            {issue.message}
          </p>
          <div className="text-xs text-gray-400 mt-2 font-mono">
            ID: {issue.id}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// PAYWALL SECTION COMPONENT
// ============================================================

interface PaywallSectionProps {
  hiddenCount: number;
  allIssues: Issue[];
}

const PaywallSection: React.FC<PaywallSectionProps> = ({ hiddenCount, allIssues }) => {
  if (hiddenCount <= 0) return null;

  // Generate placeholder items for blur effect
  const placeholderCount = Math.min(hiddenCount, 5);
  const placeholders = Array.from({ length: placeholderCount }, (_, i) => i);

  return (
    <div className="paywall-section relative">
      {/* Header */}
      <div className="section-header mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          All Issues ({hiddenCount} more)
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Unlock to see detailed recommendations for each issue
        </p>
      </div>

      {/* Blurred Issues List */}
      <div className="issues-list-blurred space-y-3 relative">
        {/* Blur Overlay */}
        <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-sm rounded-xl" />

        {/* Placeholder Items (blurred) */}
        {placeholders.map((i) => (
          <div key={i} className="border border-gray-200 bg-gray-50 rounded-xl p-4">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-lg bg-gray-300 flex items-center justify-center mr-4">
                <LockIcon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-20 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-full mb-1" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          </div>
        ))}

        {hiddenCount > placeholderCount && (
          <div className="text-center py-2 text-gray-400 text-sm">
            +{hiddenCount - placeholderCount} more issues...
          </div>
        )}
      </div>

      {/* Unlock Card (positioned over blur) */}
      <div className="unlock-card relative z-20 -mt-32 mx-auto max-w-sm">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 shadow-2xl text-center border-4 border-white">
          {/* Lock Icon */}
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <LockIcon className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            Unlock Full Report
          </h3>

          <p className="text-indigo-100 text-sm mb-4">
            Get detailed fix recommendations and priority action items for all <span className="font-bold text-white">{hiddenCount}</span> issues
          </p>

          {/* Price */}
          <div className="bg-white/10 rounded-lg py-3 mb-4">
            <span className="text-3xl font-bold text-white">$29</span>
            <span className="text-indigo-200 text-sm ml-2">one-time</span>
          </div>

          {/* CTA Button */}
          <button className="w-full bg-white text-indigo-600 font-bold py-3 px-6 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg">
            Unlock Now - See All {hiddenCount} Issues
          </button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-indigo-200">
            <span className="flex items-center gap-1">
              <CheckIcon className="w-3 h-3" />
              Instant access
            </span>
            <span className="flex items-center gap-1">
              <CheckIcon className="w-3 h-3" />
              Detailed fixes
            </span>
            <span className="flex items-center gap-1">
              <CheckIcon className="w-3 h-3" />
              Priority support
            </span>
          </div>
        </div>
      </div>

      {/* Spacer for unlock card overlap */}
      <div className="h-24" />
    </div>
  );
};

// ============================================================
// FREE ISSUES SECTION COMPONENT
// ============================================================

interface FreeIssuesSectionProps {
  freeIssues: Issue[];
  allIssues: Issue[];
}

const FreeIssuesSection: React.FC<FreeIssuesSectionProps> = ({ freeIssues, allIssues }) => {
  if (allIssues.length === 0) return null;

  return (
    <div className="free-issues-section">
      <div className="section-header mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {freeIssues.length > 0 ? 'Free Preview' : 'Issues Found'}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {freeIssues.length > 0
            ? `Preview of issues detected in your app`
            : `No issues to display`
          }
        </p>
      </div>

      {freeIssues.length > 0 ? (
        <div className="issues-list space-y-3">
          {freeIssues.map((issue, index) => (
            <IssueItem key={issue.id} issue={issue} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          No issues found in this category
        </div>
      )}
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export const ResultView: React.FC<ResultViewProps> = ({ result }) => {
  const { score, issues } = result;
  const stats = calculateStats(issues);

  // Free preview: 1 critical + 1 high + 1 minor (if available)
  const freePreviewCriticalIssues = issues.filter(i => i.severity === 'critical').slice(0, 1);
  const freePreviewHighIssues = issues.filter(i => i.severity === 'high').slice(0, 1);
  const freePreviewMinorIssues = issues.filter(i => i.severity === 'minor').slice(0, 1);

  const freeIssues = [
    ...freePreviewCriticalIssues,
    ...freePreviewHighIssues,
    ...freePreviewMinorIssues
  ];

  const hiddenCount = issues.length - freeIssues.length;

  return (
    <div className="result-view max-w-3xl mx-auto p-6 space-y-6">
      {/* Score Card */}
      <ScoreCard score={score} totalIssues={issues.length} />

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Free Issues Section */}
      <FreeIssuesSection freeIssues={freeIssues} allIssues={issues} />

      {/* Paywall Section (only show if there are hidden issues) */}
      {hiddenCount > 0 && (
        <PaywallSection hiddenCount={hiddenCount} allIssues={issues} />
      )}

      {/* Footer */}
      {hiddenCount === 0 && issues.length > 0 && (
        <div className="text-center py-8 text-green-600">
          <CheckIcon className="w-8 h-8 mx-auto mb-2" />
          <p className="font-medium">All issues are displayed above</p>
        </div>
      )}
    </div>
  );
};

export default ResultView;
