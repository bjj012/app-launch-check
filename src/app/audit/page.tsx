import StepWizard from '@/components/StepWizard';

export default function AuditPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-3xl font-black text-slate-900 mb-4">App Store Readiness Audit</h1>
        <p className="text-slate-500">Answer honestly. We don't save your data.</p>
      </div>
      <StepWizard />
    </main>
  );
}