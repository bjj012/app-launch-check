import React, { useState } from 'react';
import { FormData } from '../lib/types';

// ============================================================
// STEP 1: 基础结构 - 类型定义与组件骨架
// ============================================================

interface StepWizardProps {
  onSubmit: (data: FormData) => void;
}

interface StepProps {
  data: FormData;
  onChange: (field: keyof FormData, value: any) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const StepWizard: React.FC<StepWizardProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});

  const totalSteps = 7;

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const stepProps: StepProps = {
    data: formData,
    onChange: handleChange,
    onNext: handleNext,
    onBack: handleBack,
    currentStep,
    totalSteps
  };

  return (
    <div className="wizard-container">
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
      </div>

      {/* Step Indicator */}
      <div className="step-indicator">
        Step {currentStep} of {totalSteps}
      </div>

      {/* Step Content */}
      <div className="step-content">
        {currentStep === 1 && <Step1BasicInfo {...stepProps} />}
        {currentStep === 2 && <Step2PrivacyData {...stepProps} />}
        {currentStep === 3 && <Step3Permissions {...stepProps} />}
        {currentStep === 4 && <Step4ContentSafety {...stepProps} />}
        {currentStep === 5 && <Step5Monetization {...stepProps} />}
        {currentStep === 6 && <Step6TechMetadata {...stepProps} />}
        {currentStep === 7 && <Step7Review {...stepProps} />}
      </div>

      {/* Navigation Buttons */}
      <div className="wizard-buttons">
        {currentStep > 1 && (
          <button className="btn-back" onClick={handleBack}>
            Back
          </button>
        )}
        <button className="btn-next" onClick={handleNext}>
          {currentStep === totalSteps ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

// ============================================================
// SHARED COMPONENTS
// ============================================================

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="card">
    <h3 className="card-title">{title}</h3>
    <div className="card-content">{children}</div>
  </div>
);

const RadioGroup: React.FC<{
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}> = ({ label, options, value, onChange }) => (
  <div className="form-group">
    <label className="form-label">{label}</label>
    <div className="radio-group">
      {options.map(opt => (
        <label key={opt.value} className={`radio-option ${value === opt.value ? 'selected' : ''}`}>
          <input
            type="radio"
            name={label}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  </div>
);

const CheckboxGroup: React.FC<{
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (values: string[]) => void;
}> = ({ label, options, selected, onChange }) => (
  <div className="form-group">
    <label className="form-label">{label}</label>
    <div className="checkbox-group">
      {options.map(opt => (
        <label key={opt.value} className={`checkbox-option ${selected.includes(opt.value) ? 'selected' : ''}`}>
          <input
            type="checkbox"
            value={opt.value}
            checked={selected.includes(opt.value)}
            onChange={(e) => {
              if (e.target.checked) {
                onChange([...selected, opt.value]);
              } else {
                onChange(selected.filter(v => v !== opt.value));
              }
            }}
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  </div>
);

const FormInput: React.FC<{
  label: string;
  type?: 'text' | 'number';
  placeholder?: string;
  value: string | number | undefined;
  onChange: (value: string) => void;
}> = ({ label, type = 'text', placeholder, value, onChange }) => (
  <div className="form-group">
    <label className="form-label">{label}</label>
    <input
      type={type}
      className="form-input"
      placeholder={placeholder}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

// ============================================================
// STEP 1: BASIC INFO
// ============================================================

const APP_TYPE_OPTIONS = [
  { value: 'saas', label: 'SaaS / Productivity' },
  { value: 'game', label: 'Game' },
  { value: 'social', label: 'Social Networking' },
  { value: 'health', label: 'Health & Fitness' },
  { value: 'finance', label: 'Finance / Banking' },
  { value: 'education', label: 'Education' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'utility', label: 'Utility / Tools' },
  { value: 'other', label: 'Other' }
];

const REGION_OPTIONS = [
  { value: 'US', label: 'United States' },
  { value: 'EU', label: 'Europe (EU)' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'CN', label: 'China' },
  { value: 'JP', label: 'Japan' },
  { value: 'KR', label: 'South Korea' },
  { value: 'IN', label: 'India' },
  { value: 'BR', label: 'Brazil' },
  { value: 'AU', label: 'Australia' },
  { value: 'CA', label: 'Canada' },
  { value: 'SG', label: 'Singapore' },
  { value: 'GLOBAL', label: 'Global / Worldwide' }
];

const Step1BasicInfo: React.FC<StepProps> = ({ data, onChange }) => {
  const handleRegionChange = (values: string[]) => {
    onChange('targetRegions', values);
  };

  return (
    <div className="step">
      <h2>Basic Information</h2>
      <p className="step-desc">Tell us about your app's basic details.</p>

      <Card title="Target Platform">
        <RadioGroup
          label="Which platform(s) are you targeting?"
          name="platform"
          options={[
            { value: 'ios', label: 'iOS only' },
            { value: 'android', label: 'Android only' },
            { value: 'both', label: 'Both iOS & Android' }
          ]}
          value={data.platform || ''}
          onChange={(val) => onChange('platform', val as 'ios' | 'android' | 'both')}
        />
      </Card>

      <Card title="App Category">
        <RadioGroup
          label="What type of app is this?"
          name="appType"
          options={APP_TYPE_OPTIONS}
          value={data.appType || ''}
          onChange={(val) => onChange('appType', val)}
        />
      </Card>

      <Card title="Target Regions">
        <CheckboxGroup
          label="Which regions will you distribute your app?"
          options={REGION_OPTIONS}
          selected={data.targetRegions || []}
          onChange={handleRegionChange}
        />
      </Card>

      <Card title="Target Audience">
        <RadioGroup
          label="Is this app designed for children under 13?"
          name="isForKids"
          options={[
            { value: 'no', label: 'No - General audience' },
            { value: 'yes', label: 'Yes - Designed for kids (COPPA compliance needed)' }
          ]}
          value={data.isForKids || 'no'}
          onChange={(val) => onChange('isForKids', val as 'yes' | 'no')}
        />
      </Card>
    </div>
  );
};

// ============================================================
// STEP 2: PRIVACY & DATA
// ============================================================

const Step2PrivacyData: React.FC<StepProps> = ({ data, onChange }) => {
  const collectsData = data.collectsData === 'yes';
  const hasAccount = data.hasAccount === 'yes';

  return (
    <div className="step">
      <h2>Privacy & Data Collection</h2>
      <p className="step-desc">Help us understand your app's data practices.</p>

      <Card title="Data Collection">
        <RadioGroup
          label="Does your app collect any user data?"
          name="collectsData"
          options={[
            { value: 'no', label: 'No - No data collection' },
            { value: 'yes', label: 'Yes - Collects user data' }
          ]}
          value={data.collectsData || ''}
          onChange={(val) => onChange('collectsData', val as 'yes' | 'no')}
        />
      </Card>

      {collectsData && (
        <>
          <Card title="Privacy Policy">
            <RadioGroup
              label="Do you have a privacy policy?"
              name="hasPrivacyPolicy"
              options={[
                { value: 'no', label: 'No - Need to create one' },
                { value: 'yes', label: 'Yes - Privacy policy available' }
              ]}
              value={data.hasPrivacyPolicy || ''}
              onChange={(val) => onChange('hasPrivacyPolicy', val as 'yes' | 'no')}
            />
          </Card>

          <Card title="Account System">
            <RadioGroup
              label="Does your app require or offer user account creation?"
              name="hasAccount"
              options={[
                { value: 'no', label: 'No - No account system' },
                { value: 'yes', label: 'Yes - Users can create accounts' }
              ]}
              value={data.hasAccount || ''}
              onChange={(val) => onChange('hasAccount', val as 'yes' | 'no')}
            />
          </Card>

          {hasAccount && (
            <Card title="Account Deletion">
              <RadioGroup
                label="Can users delete their accounts within the app?"
                name="accountDeletion"
                options={[
                  { value: 'no', label: 'No - Deletion not available' },
                  { value: 'yes', label: 'Yes - In-app deletion available' }
                ]}
                value={data.accountDeletion || ''}
                onChange={(val) => onChange('accountDeletion', val as 'yes' | 'no')}
              />
            </Card>
          )}

          <Card title="Encryption">
            <RadioGroup
              label="Does your app use encryption (HTTPS, database encryption, etc.)?"
              name="usesEncryption"
              options={[
                { value: 'no', label: 'No - No encryption used' },
                { value: 'yes', label: 'Yes - Uses encryption' }
              ]}
              value={data.usesEncryption || ''}
              onChange={(val) => onChange('usesEncryption', val as 'yes' | 'no')}
            />
          </Card>

          {data.usesEncryption === 'yes' && (
            <Card title="Export Compliance">
              <RadioGroup
                label="Have you completed encryption export compliance filing?"
                name="encryptionExportCompliance"
                options={[
                  { value: 'no', label: 'No - Need to file' },
                  { value: 'yes', label: 'Yes - Filed properly' }
                ]}
                value={data.encryptionExportCompliance || ''}
                onChange={(val) => onChange('encryptionExportCompliance', val as 'yes' | 'no')}
              />
            </Card>
          )}

          <Card title="Third-Party SDKs">
            <RadioGroup
              label="Does your app use third-party SDKs (analytics, ads, etc.)?"
              name="usesThirdPartySDK"
              options={[
                { value: 'no', label: 'No - No third-party SDKs' },
                { value: 'yes', label: 'Yes - Uses third-party SDKs' }
              ]}
              value={data.usesThirdPartySDK || ''}
              onChange={(val) => onChange('usesThirdPartySDK', val as 'yes' | 'no')}
            />
          </Card>

          {data.usesThirdPartySDK === 'yes' && (
            <Card title="SDK Disclosure">
              <RadioGroup
                label="Have you listed all SDKs in your privacy disclosure?"
                name="sdkListProvided"
                options={[
                  { value: 'no', label: 'No - Need to document' },
                  { value: 'yes', label: 'Yes - All SDKs listed' }
                ]}
                value={data.sdkListProvided || ''}
                onChange={(val) => onChange('sdkListProvided', val as 'yes' | 'no')}
              />
            </Card>
          )}
        </>
      )}
    </div>
  );
};

// ============================================================
// STEP 3: PERMISSIONS & DISCLOSURES
// ============================================================

const Step3Permissions: React.FC<StepProps> = ({ data, onChange }) => {
  const isIOS = data.platform === 'ios' || data.platform === 'both';

  return (
    <div className="step">
      <h2>Permissions & Disclosures</h2>
      <p className="step-desc">Tell us about your app's permission requirements.</p>

      <Card title="Permission Timing">
        <RadioGroup
          label="When does your app request permissions from users?"
          name="permissionTiming"
          options={[
            { value: 'launch', label: 'At app launch' },
            { value: 'context', label: 'When needed (contextual)' }
          ]}
          value={data.permissionTiming || ''}
          onChange={(val) => onChange('permissionTiming', val as 'launch' | 'context')}
        />
      </Card>

      <Card title="Location Access">
        <RadioGroup
          label="Does your app access user location?"
          name="usesLocation"
          options={[
            { value: 'no', label: 'No - No location access' },
            { value: 'yes', label: 'Yes - Uses location data' }
          ]}
          value={data.usesLocation || ''}
          onChange={(val) => onChange('usesLocation', val as 'yes' | 'no')}
        />
      </Card>

      {data.usesLocation === 'yes' && (
        <Card title="Location Disclosure">
          <RadioGroup
            label="Do you explain why location is needed and how it's used?"
            name="locationDisclosure"
            options={[
              { value: 'no', label: 'No - Need to add disclosure' },
              { value: 'yes', label: 'Yes - Clear disclosure provided' }
            ]}
            value={data.locationDisclosure || ''}
            onChange={(val) => onChange('locationDisclosure', val as 'yes' | 'no')}
          />
        </Card>
      )}

      <Card title="Camera Access">
        <RadioGroup
          label="Does your app access the camera?"
          name="usesCamera"
          options={[
            { value: 'no', label: 'No - No camera access' },
            { value: 'yes', label: 'Yes - Uses camera' }
          ]}
          value={data.usesCamera || ''}
          onChange={(val) => onChange('usesCamera', val as 'yes' | 'no')}
        />
      </Card>

      {data.usesCamera === 'yes' && (
        <Card title="Camera Disclosure">
          <RadioGroup
            label="Do you disclose the purpose and get consent for camera use?"
            name="cameraDisclosure"
            options={[
              { value: 'no', label: 'No - Need to add disclosure' },
              { value: 'yes', label: 'Yes - Clear disclosure provided' }
            ]}
            value={data.cameraDisclosure || ''}
            onChange={(val) => onChange('cameraDisclosure', val as 'yes' | 'no')}
          />
        </Card>
      )}

      <Card title="Microphone Access">
        <RadioGroup
          label="Does your app access the microphone?"
          name="usesMicrophone"
          options={[
            { value: 'no', label: 'No - No microphone access' },
            { value: 'yes', label: 'Yes - Uses microphone' }
          ]}
          value={data.usesMicrophone || ''}
          onChange={(val) => onChange('usesMicrophone', val as 'yes' | 'no')}
        />
      </Card>

      <Card title="Health Data Access">
        <RadioGroup
          label="Does your app access health/medical data?"
          name="usesHealthData"
          options={[
            { value: 'no', label: 'No - No health data access' },
            { value: 'yes', label: 'Yes - Accesses health data' }
          ]}
          value={data.usesHealthData || ''}
          onChange={(val) => onChange('usesHealthData', val as 'yes' | 'no')}
        />
      </Card>

      {data.usesHealthData === 'yes' && (
        <Card title="Health Data Disclaimer">
          <RadioGroup
            label="Do you include health data disclaimers and comply with regulations?"
            name="healthDataDisclaimer"
            options={[
              { value: 'no', label: 'No - Need to add disclaimer' },
              { value: 'yes', label: 'Yes - Proper disclaimers included' }
            ]}
            value={data.healthDataDisclaimer || ''}
            onChange={(val) => onChange('healthDataDisclaimer', val as 'yes' | 'no')}
          />
        </Card>
      )}

      {isIOS && (
        <Card title="iOS Tracking (IDFA)">
          <RadioGroup
            label="Does your iOS app use IDFA (Identifier for Advertisers)?"
            name="usesIDFA"
            options={[
              { value: 'no', label: 'No - No IDFA usage' },
              { value: 'yes', label: 'Yes - Uses IDFA' }
            ]}
            value={data.usesIDFA || ''}
            onChange={(val) => onChange('usesIDFA', val as 'yes' | 'no')}
          />
        </Card>
      )}

      {isIOS && data.usesIDFA === 'yes' && (
        <Card title="App Tracking Transparency">
          <RadioGroup
            label="Have you implemented the App Tracking Transparency (ATT) prompt?"
            name="hasATTPermission"
            options={[
              { value: 'no', label: 'No - Need to implement ATT' },
              { value: 'yes', label: 'Yes - ATT implemented' }
            ]}
            value={data.hasATTPermission || ''}
            onChange={(val) => onChange('hasATTPermission', val as 'yes' | 'no')}
          />
        </Card>
      )}
    </div>
  );
};

// ============================================================
// STEP 4: CONTENT & SAFETY
// ============================================================

const Step4ContentSafety: React.FC<StepProps> = ({ data, onChange }) => {
  const hasUGC = data.hasUGC === 'yes';
  const isForKids = data.isForKids === 'yes';

  return (
    <div className="step">
      <h2>Content & Safety</h2>
      <p className="step-desc">Tell us about user-generated content and safety features.</p>

      <Card title="User-Generated Content">
        <RadioGroup
          label="Does your app allow users to create or share content (posts, comments, photos, etc.)?"
          name="hasUGC"
          options={[
            { value: 'no', label: 'No - No UGC features' },
            { value: 'yes', label: 'Yes - Users can generate content' }
          ]}
          value={data.hasUGC || ''}
          onChange={(val) => onChange('hasUGC', val as 'yes' | 'no')}
        />
      </Card>

      {hasUGC && (
        <>
          <Card title="Content Moderation">
            <RadioGroup
              label="Do you have content moderation/filtering in place?"
              name="hasUGCFiltering"
              options={[
                { value: 'no', label: 'No - Need to implement moderation' },
                { value: 'yes', label: 'Yes - Content filtering active' }
              ]}
              value={data.hasUGCFiltering || ''}
              onChange={(val) => onChange('hasUGCFiltering', val as 'yes' | 'no')}
            />
          </Card>

          <Card title="Report Mechanism">
            <RadioGroup
              label="Can users report inappropriate content?"
              name="hasReportMechanism"
              options={[
                { value: 'no', label: 'No - Need to add reporting' },
                { value: 'yes', label: 'Yes - Report feature available' }
              ]}
              value={data.hasReportMechanism || ''}
              onChange={(val) => onChange('hasReportMechanism', val as 'yes' | 'no')}
            />
          </Card>
        </>
      )}

      <Card title="Contact Information">
        <RadioGroup
          label="Do you provide valid contact information for users and regulators?"
          name="hasContactInfo"
          options={[
            { value: 'no', label: 'No - Need to add contact info' },
            { value: 'yes', label: 'Yes - Contact info available' }
          ]}
          value={data.hasContactInfo || ''}
          onChange={(val) => onChange('hasContactInfo', val as 'yes' | 'no')}
        />
      </Card>

      <Card title="Social Login">
        <RadioGroup
          label="Does your app support social login (Google, Facebook, etc.)?"
          name="socialLogin"
          options={[
            { value: 'no', label: 'No - No social login' },
            { value: 'yes', label: 'Yes - Social login available' }
          ]}
          value={data.socialLogin || ''}
          onChange={(val) => onChange('socialLogin', val as 'yes' | 'no')}
        />
      </Card>

      {isForKids && (
        <Card title="Parental Gate">
          <RadioGroup
            label="Does your app have a parental gate for external content, purchases, or social features?"
            name="hasParentalGate"
            options={[
              { value: 'no', label: 'No - Need to implement parental gate' },
              { value: 'yes', label: 'Yes - Parental gate implemented' }
            ]}
            value={data.hasParentalGate || ''}
            onChange={(val) => onChange('hasParentalGate', val as 'yes' | 'no')}
          />
        </Card>
      )}
    </div>
  );
};

// ============================================================
// STEP 5: MONETIZATION & SUBSCRIPTIONS
// ============================================================

const Step5Monetization: React.FC<StepProps> = ({ data, onChange }) => {
  const isIAP = data.monetization === 'iap' || data.monetization === 'sub';
  const isSub = data.monetization === 'sub';

  return (
    <div className="step">
      <h2>Monetization & Subscriptions</h2>
      <p className="step-desc">Tell us about your app's monetization model.</p>

      <Card title="Monetization Type">
        <RadioGroup
          label="How does your app make money?"
          name="monetization"
          options={[
            { value: 'free', label: 'Free - No monetization' },
            { value: 'paid', label: 'Paid - Upfront purchase only' },
            { value: 'iap', label: 'In-App Purchases (one-time)' },
            { value: 'sub', label: 'Subscriptions (recurring)' }
          ]}
          value={data.monetization || ''}
          onChange={(val) => onChange('monetization', val as 'free' | 'paid' | 'iap' | 'sub')}
        />
      </Card>

      {isSub && (
        <>
          <Card title="Subscription Terms">
            <RadioGroup
              label="Are subscription terms and auto-renewal clearly displayed before purchase?"
              name="subTermsClear"
              options={[
                { value: 'no', label: 'No - Need to clarify terms' },
                { value: 'yes', label: 'Yes - Terms are clear' }
              ]}
              value={data.subTermsClear || ''}
              onChange={(val) => onChange('subTermsClear', val as 'yes' | 'no')}
            />
          </Card>

          <Card title="Free Trial">
            <RadioGroup
              label="Do you offer a free trial?"
              name="hasFreeTrial"
              options={[
                { value: 'no', label: 'No - No free trial' },
                { value: 'yes', label: 'Yes - Free trial available' }
              ]}
              value={data.hasFreeTrial || ''}
              onChange={(val) => onChange('hasFreeTrial', val as 'yes' | 'no')}
            />
          </Card>

          {data.hasFreeTrial === 'yes' && (
            <Card title="Free Trial Clarity">
              <RadioGroup
                label="Is the free trial duration and post-trial price clearly stated?"
                name="freeTrialClear"
                options={[
                  { value: 'no', label: 'No - Need to clarify' },
                  { value: 'yes', label: 'Yes - Clear disclosure' }
                ]}
                value={data.freeTrialClear || ''}
                onChange={(val) => onChange('freeTrialClear', val as 'yes' | 'no')}
              />
            </Card>
          )}

          <Card title="Cancellation">
            <RadioGroup
              label="Can users easily cancel their subscription?"
              name="subCancellationEasy"
              options={[
                { value: 'no', label: 'No - Need easier cancellation' },
                { value: 'yes', label: 'Yes - Easy cancellation available' }
              ]}
              value={data.subCancellationEasy || ''}
              onChange={(val) => onChange('subCancellationEasy', val as 'yes' | 'no')}
            />
          </Card>
        </>
      )}

      {isIAP && (
        <>
          <Card title="Price Display">
            <RadioGroup
              label="Are prices clearly displayed before purchase?"
              name="iapPriceDisplayed"
              options={[
                { value: 'no', label: 'No - Need to show prices' },
                { value: 'yes', label: 'Yes - Prices are clear' }
              ]}
              value={data.iapPriceDisplayed || ''}
              onChange={(val) => onChange('iapPriceDisplayed', val as 'yes' | 'no')}
            />
          </Card>

          <Card title="Restore Purchases">
            <RadioGroup
              label="Do you have a 'Restore Purchases' button?"
              name="hasRestore"
              options={[
                { value: 'no', label: 'No - Need to add' },
                { value: 'yes', label: 'Yes - Restore available' }
              ]}
              value={data.hasRestore || ''}
              onChange={(val) => onChange('hasRestore', val as 'yes' | 'no')}
            />
          </Card>
        </>
      )}
    </div>
  );
};

// ============================================================
// STEP 6: TECH & METADATA
// ============================================================

const Step6TechMetadata: React.FC<StepProps> = ({ data, onChange }) => {
  const isAndroid = data.platform === 'android' || data.platform === 'both';

  return (
    <div className="step">
      <h2>Technical & Metadata</h2>
      <p className="step-desc">Tell us about technical specs and store listing details.</p>

      {isAndroid && (
        <>
          <Card title="Android API Level">
            <div className="form-group">
              <label className="form-label">Minimum API Level (minSdkVersion):</label>
              <input
                type="number"
                className="form-input"
                placeholder="e.g., 21"
                value={data.apiLevel || ''}
                onChange={(e) => onChange('apiLevel', parseInt(e.target.value) || undefined)}
              />
            </div>
          </Card>

          <Card title="Target SDK Version">
            <div className="form-group">
              <label className="form-label">Target SDK Version:</label>
              <input
                type="number"
                className="form-input"
                placeholder="e.g., 34"
                value={data.targetSdkVersion || ''}
                onChange={(e) => onChange('targetSdkVersion', parseInt(e.target.value) || undefined)}
              />
            </div>
          </Card>
        </>
      )}

      <Card title="App Store Screenshots">
        <RadioGroup
          label="Have you prepared screenshots for the store listing?"
          name="hasScreenshots"
          options={[
            { value: 'no', label: 'No - Need to create' },
            { value: 'yes', label: 'Yes - Screenshots ready' }
          ]}
          value={data.hasScreenshots || ''}
          onChange={(val) => onChange('hasScreenshots', val as 'yes' | 'no')}
        />
      </Card>

      {data.hasScreenshots === 'yes' && (
        <Card title="Screenshot Authenticity">
          <RadioGroup
            label="Do your screenshots show real app content (not mockups)?"
            name="screenshotsReal"
            options={[
              { value: 'no', label: 'No - Using mockups' },
              { value: 'yes', label: 'Yes - Real screenshots' }
            ]}
            value={data.screenshotsReal || ''}
            onChange={(val) => onChange('screenshotsReal', val as 'yes' | 'no')}
          />
        </Card>
      )}

      <Card title="App Description">
        <RadioGroup
          label="Does your app description accurately reflect all features?"
          name="appDescAccurate"
          options={[
            { value: 'no', label: 'No - Need to update' },
            { value: 'yes', label: 'Yes - Description is accurate' }
          ]}
          value={data.appDescAccurate || ''}
          onChange={(val) => onChange('appDescAccurate', val as 'yes' | 'no')}
        />
      </Card>

      <Card title="Age Rating">
        <RadioGroup
          label="Have you declared the appropriate age rating?"
          name="ageRatingDeclared"
          options={[
            { value: 'no', label: 'No - Need to set' },
            { value: 'yes', label: 'Yes - Age rating declared' }
          ]}
          value={data.ageRatingDeclared || ''}
          onChange={(val) => onChange('ageRatingDeclared', val as 'yes' | 'no')}
        />
      </Card>
    </div>
  );
};

// ============================================================
// STEP 7: REVIEW & SUBMIT
// ============================================================

const Step7Review: React.FC<StepProps> = ({ data, onNext, currentStep, totalSteps }) => {
  const summaryItems = [
    { label: 'Platform', value: data.platform?.toUpperCase() || 'Not set' },
    { label: 'App Type', value: data.appType || 'Not set' },
    { label: 'Target Regions', value: data.targetRegions?.join(', ') || 'Not set' },
    { label: 'For Kids', value: data.isForKids === 'yes' ? 'Yes' : 'No' },
    { label: 'Collects Data', value: data.collectsData === 'yes' ? 'Yes' : 'No' },
    { label: 'Has Privacy Policy', value: data.hasPrivacyPolicy === 'yes' ? 'Yes' : 'No' },
    { label: 'Has Account System', value: data.hasAccount === 'yes' ? 'Yes' : 'No' },
    { label: 'Account Deletion', value: data.accountDeletion === 'yes' ? 'Yes' : 'No' },
    { label: 'Monetization', value: data.monetization?.toUpperCase() || 'Not set' },
    { label: 'Uses Location', value: data.usesLocation === 'yes' ? 'Yes' : 'No' },
    { label: 'Uses Camera', value: data.usesCamera === 'yes' ? 'Yes' : 'No' },
    { label: 'Uses Microphone', value: data.usesMicrophone === 'yes' ? 'Yes' : 'No' },
    { label: 'Uses Health Data', value: data.usesHealthData === 'yes' ? 'Yes' : 'No' },
    { label: 'Has UGC', value: data.hasUGC === 'yes' ? 'Yes' : 'No' },
    { label: 'Social Login', value: data.socialLogin === 'yes' ? 'Yes' : 'No' },
    { label: 'Uses Encryption', value: data.usesEncryption === 'yes' ? 'Yes' : 'No' },
    { label: 'Third-Party SDKs', value: data.usesThirdPartySDK === 'yes' ? 'Yes' : 'No' },
    { label: 'Has Screenshots', value: data.hasScreenshots === 'yes' ? 'Yes' : 'No' }
  ];

  return (
    <div className="step review-step">
      <h2>Review & Submit</h2>
      <p className="step-desc">Please review your answers before submitting.</p>

      <div className="review-grid">
        {summaryItems.map((item, index) => (
          <div key={index} className="review-item">
            <span className="review-label">{item.label}:</span>
            <span className={`review-value ${item.value === 'Not set' || item.value === 'No' ? 'warning' : ''}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <Card title="Ready to Audit">
        <p>Click <strong>Submit</strong> to run the compliance audit and see your score.</p>
        <p className="note">This will check your app against 58+ platform compliance rules.</p>
      </Card>
    </div>
  );
};

export default StepWizard;
