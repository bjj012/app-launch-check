import { Rule } from './types';

export const rules: Rule[] = [
  // ============================================================
  // IOS PRIVACY RULES
  // ============================================================
  {
    id: 'IOS_PRIVACY',
    severity: 'critical',
    score: -15,
    message: 'iOS apps that collect data MUST include a Privacy Policy URL in App Store Connect. (Guideline 5.1.1)',
    condition: (data) =>
      (data.platform === 'ios' || data.platform === 'both') &&
      data.collectsData === 'yes' &&
      data.hasPrivacyPolicy === 'no'
  },

  // ============================================================
  // ACCOUNT & DATA RULES
  // ============================================================
  {
    id: 'ACC_DELETION',
    severity: 'critical',
    score: -15,
    message: 'If your app offers account creation, you MUST provide in-app account deletion option. (Apple Guideline 5.1.1)',
    condition: (data) =>
      (data.platform === 'ios' || data.platform === 'both') &&
      data.hasAccount === 'yes' &&
      data.accountDeletion === 'no'
  },

  // ============================================================
  // SUBSCRIPTION RULES
  // ============================================================
  {
    id: 'SUB_TERMS',
    severity: 'high',
    score: -8,
    message: 'Subscription apps must clearly display terms and auto-renewal information before purchase. (Apple Guideline 3.1.2)',
    condition: (data) =>
      (data.platform === 'ios' || data.platform === 'both') &&
      data.monetization === 'sub' &&
      data.subTermsClear === 'no'
  },

  {
    id: 'SUB_RESTORE',
    severity: 'high',
    score: -8,
    message: 'Apps with subscriptions MUST include a "Restore Purchases" button for users to re-access previous purchases.',
    condition: (data) =>
      (data.monetization === 'sub' || data.monetization === 'iap') &&
      data.hasRestore === 'no'
  },

  // ============================================================
  // ANDROID KIDS APP RULES
  // ============================================================
  {
    id: 'ANDROID_PARENTAL_GATE',
    severity: 'high',
    score: -8,
    message: 'Android apps designed for children MUST implement a parental gate before accessing external content, purchases, or social features. (Google Play Families Policy)',
    condition: (data) =>
      (data.platform === 'android' || data.platform === 'both') &&
      data.isForKids === 'yes' &&
      data.hasParentalGate === 'no'
  },

  // ============================================================
  // IOS ADDITIONAL PRIVACY RULES
  // ============================================================
  {
    id: 'IOS_PRIVACY_NUTRITION',
    severity: 'high',
    score: -8,
    message: 'iOS apps MUST display a privacy nutrition label in App Store Connect. (Apple Guideline 5.1.1)',
    condition: (data) =>
      (data.platform === 'ios' || data.platform === 'both') &&
      data.collectsData === 'yes'
  },

  {
    id: 'IOS_APPLE_SIGNIN',
    severity: 'high',
    score: -8,
    message: 'If your app offers social login (Google, Facebook, etc.), you MUST also offer Sign in with Apple. (Apple Guideline 5.1.1)',
    condition: (data) =>
      (data.platform === 'ios' || data.platform === 'both') &&
      data.socialLogin === 'yes' &&
      data.hasAccount === 'yes'
  },

  {
    id: 'IOS_DATA_COLLECTION_DISCLOSURE',
    severity: 'critical',
    score: -15,
    message: 'iOS apps MUST disclose all data collection practices in App Store Connect privacy section. (Apple Guideline 5.1.1)',
    condition: (data) =>
      (data.platform === 'ios' || data.platform === 'both') &&
      data.collectsData === 'yes' &&
      !data.hasPrivacyPolicy
  },

  {
    id: 'IOS_KIDS_PRIVACY',
    severity: 'critical',
    score: -15,
    message: 'Kids apps MUST NOT collect personal data without parental consent. (Apple Guideline 5.1.1, COPPA)',
    condition: (data) =>
      (data.platform === 'ios' || data.platform === 'both') &&
      data.isForKids === 'yes' &&
      data.collectsData === 'yes' &&
      data.hasParentalGate === 'no'
  },

  {
    id: 'IOS_PERMISSION_TIMING',
    severity: 'high',
    score: -8,
    message: 'iOS apps MUST request permissions at the point of use, not at launch. (Apple Guideline 5.1.5)',
    condition: (data) =>
      (data.platform === 'ios' || data.platform === 'both') &&
      data.permissionTiming === 'launch'
  },

  // ============================================================
  // ANDROID PRIVACY RULES
  // ============================================================
  {
    id: 'ANDROID_PRIVACY_POLICY',
    severity: 'critical',
    score: -15,
    message: 'Android apps MUST have a valid privacy policy URL in Play Store listing. (Google Play Policy)',
    condition: (data) =>
      (data.platform === 'android' || data.platform === 'both') &&
      data.collectsData === 'yes' &&
      data.hasPrivacyPolicy === 'no'
  },

  {
    id: 'ANDROID_DATA_DISCLOSURE',
    severity: 'high',
    score: -8,
    message: 'Android apps MUST complete the Data Safety section in Play Console. (Google Play Data Policy)',
    condition: (data) =>
      (data.platform === 'android' || data.platform === 'both') &&
      data.collectsData === 'yes'
  },

  {
    id: 'ANDROID_PERMISSION_RATIONALE',
    severity: 'high',
    score: -8,
    message: 'Android apps MUST display permission rationale before requesting sensitive permissions. (Google Play Policy)',
    condition: (data) =>
      (data.platform === 'android' || data.platform === 'both') &&
      data.permissionTiming === 'launch'
  },

  {
    id: 'ANDROID_KIDS_DATA',
    severity: 'critical',
    score: -15,
    message: 'Kids apps on Android MUST comply with Families Policy and limit data collection. (Google Play Families Policy)',
    condition: (data) =>
      (data.platform === 'android' || data.platform === 'both') &&
      data.isForKids === 'yes' &&
      data.collectsData === 'yes' &&
      data.hasParentalGate === 'no'
  },

  {
    id: 'ANDROID_ACCOUNT_DELETION',
    severity: 'high',
    score: -8,
    message: 'Android apps offering account creation MUST provide in-app and web-based account deletion. (Google Play User Data Policy)',
    condition: (data) =>
      (data.platform === 'android' || data.platform === 'both') &&
      data.hasAccount === 'yes' &&
      data.accountDeletion === 'no'
  },

  // ============================================================
  // PERMISSION & DISCLOSURE RULES
  // ============================================================
  {
    id: 'LOCATION_DISCLOSURE',
    severity: 'high',
    score: -8,
    message: 'Apps using location MUST disclose why location is needed and how it is used. (iOS/Android Policy)',
    condition: (data) =>
      data.usesLocation === 'yes' &&
      data.locationDisclosure === 'no'
  },

  {
    id: 'CAMERA_DISCLOSURE',
    severity: 'high',
    score: -8,
    message: 'Apps using camera MUST disclose purpose and obtain user consent. (Platform Guidelines)',
    condition: (data) =>
      data.usesCamera === 'yes' &&
      data.cameraDisclosure === 'no'
  },

  {
    id: 'MICROPHONE_CONSENT',
    severity: 'high',
    score: -8,
    message: 'Apps using microphone MUST obtain clear user consent and indicate recording status. (Platform Guidelines)',
    condition: (data) =>
      data.usesMicrophone === 'yes'
  },

  {
    id: 'HEALTH_DATA_DISCLAIMER',
    severity: 'critical',
    score: -15,
    message: 'Apps using health data MUST include disclaimer and comply with health regulations. (iOS/Android Policy)',
    condition: (data) =>
      data.usesHealthData === 'yes' &&
      data.healthDataDisclaimer === 'no'
  },

  {
    id: 'IDFA_ATT_PERMISSION',
    severity: 'high',
    score: -8,
    message: 'iOS apps using IDFA MUST implement App Tracking Transparency prompt. (Apple Guideline 5.1.2)',
    condition: (data) =>
      (data.platform === 'ios' || data.platform === 'both') &&
      data.usesIDFA === 'yes' &&
      data.hasATTPermission === 'no'
  },

  // ============================================================
  // CONTENT SAFETY RULES
  // ============================================================
  {
    id: 'UGC_MODERATION',
    severity: 'high',
    score: -8,
    message: 'Apps with User Generated Content MUST implement content moderation/filtering. (Platform Safety Guidelines)',
    condition: (data) =>
      data.hasUGC === 'yes' &&
      data.hasUGCFiltering === 'no'
  },

  {
    id: 'UGC_REPORT_MECHANISM',
    severity: 'high',
    score: -8,
    message: 'Apps with User Generated Content MUST provide a user report mechanism. (Platform Safety Guidelines)',
    condition: (data) =>
      data.hasUGC === 'yes' &&
      data.hasReportMechanism === 'no'
  },

  {
    id: 'CONTACT_INFO_AVAILABLE',
    severity: 'high',
    score: -8,
    message: 'Apps MUST provide valid contact information for users and regulators. (Store Guidelines)',
    condition: (data) =>
      data.hasContactInfo === 'no'
  },

  {
    id: 'KIDS_NO_SOCIAL',
    severity: 'critical',
    score: -15,
    message: 'Kids apps MUST NOT allow social sharing or external interactions without parental gate. (Families Policy)',
    condition: (data) =>
      data.isForKids === 'yes' &&
      data.hasUGC === 'yes' &&
      data.hasParentalGate === 'no'
  },

  // ============================================================
  // SUBSCRIPTION & PAYMENT RULES
  // ============================================================
  {
    id: 'FREE_TRIAL_CLEAR',
    severity: 'high',
    score: -8,
    message: 'Apps offering free trial MUST clearly state trial duration and post-trial price. (Apple Guideline 3.1.2)',
    condition: (data) =>
      data.hasFreeTrial === 'yes' &&
      data.freeTrialClear === 'no'
  },

  {
    id: 'SUB_CANCEL_EASY',
    severity: 'high',
    score: -8,
    message: 'Subscription apps MUST provide easy cancellation mechanism in-app and/or account settings. (Platform Guidelines)',
    condition: (data) =>
      data.monetization === 'sub' &&
      data.subCancellationEasy === 'no'
  },

  {
    id: 'IAP_PRICE_DISPLAY',
    severity: 'high',
    score: -8,
    message: 'In-app purchases MUST display clear price information before purchase. (Platform Billing Guidelines)',
    condition: (data) =>
      (data.monetization === 'iap' || data.monetization === 'sub') &&
      data.iapPriceDisplayed === 'no'
  },

  {
    id: 'SUB_NO_AUTO_RENEW',
    severity: 'minor',
    score: -3,
    message: 'Subscriptions auto-renew by default. Consider offering non-renewing options for better UX. (Best Practice)',
    condition: (data) =>
      data.monetization === 'sub'
  },

  {
    id: 'IAP_PLATFORM_REQUIRED',
    severity: 'critical',
    score: -15,
    message: 'Digital goods MUST use platform IAP (Apple/Google). External payment for digital content is prohibited. (Platform Guidelines)',
    condition: (data) =>
      (data.monetization === 'iap' || data.monetization === 'sub') &&
      (data.appType === 'saas' || data.appType === 'game')
  },

  // ============================================================
  // KIDS APP ADDITIONAL RULES
  // ============================================================
  {
    id: 'KIDS_NO_BEHAVIORAL_ADS',
    severity: 'critical',
    score: -15,
    message: 'Kids apps MUST NOT use behavioral advertising. Only contextual ads allowed. (COPPA, Families Policy)',
    condition: (data) =>
      data.isForKids === 'yes' &&
      data.usesThirdPartySDK === 'yes'
  },

  {
    id: 'KIDS_IOS_CERTIFICATION',
    severity: 'high',
    score: -8,
    message: 'Kids apps MUST declare Kids category and/or comply with Kids Certification requirements. (Apple Guideline 5.1.1)',
    condition: (data) =>
      (data.platform === 'ios' || data.platform === 'both') &&
      data.isForKids === 'yes'
  },

  {
    id: 'KIDS_ANDROID_DESIGNATED',
    severity: 'high',
    score: -8,
    message: 'Kids apps MUST be submitted to the Designed for Families program. (Google Play Families Policy)',
    condition: (data) =>
      (data.platform === 'android' || data.platform === 'both') &&
      data.isForKids === 'yes'
  },

  {
    id: 'KIDS_NO_ANALYTICS',
    severity: 'high',
    score: -8,
    message: 'Kids apps MUST limit analytics and tracking. Ensure compliance with COPPA/GDPR-K. (Families Policy)',
    condition: (data) =>
      data.isForKids === 'yes' &&
      data.collectsData === 'yes'
  },

  // ============================================================
  // TECHNICAL COMPLIANCE RULES
  // ============================================================
  {
    id: 'ENCRYPTION_EXPORT',
    severity: 'high',
    score: -8,
    message: 'Apps using encryption MUST complete Encryption Export Compliance filing. (US Export Regulations)',
    condition: (data) =>
      data.usesEncryption === 'yes' &&
      data.encryptionExportCompliance === 'no'
  },

  {
    id: 'ANDROID_TARGET_SDK',
    severity: 'high',
    score: -8,
    message: 'Android apps MUST target recent API level (within 2 years). Old targets may cause rejection. (Google Play Policy)',
    condition: (data) =>
      (data.platform === 'android' || data.platform === 'both') &&
      data.targetSdkVersion &&
      data.targetSdkVersion < 33
  },

  {
    id: 'ANDROID_64BIT',
    severity: 'high',
    score: -8,
    message: 'Android apps MUST include 64-bit native code. 32-bit only apps are rejected. (Google Play Policy)',
    condition: (data) =>
      (data.platform === 'android' || data.platform === 'both') &&
      data.apiLevel &&
      data.apiLevel < 21
  },

  {
    id: 'HTTPS_ONLY',
    severity: 'minor',
    score: -3,
    message: 'Apps should use HTTPS exclusively for network communications. (Security Best Practice)',
    condition: (data) =>
      data.collectsData === 'yes'
  },

  {
    id: 'SSL_PINNING',
    severity: 'minor',
    score: -3,
    message: 'Consider implementing SSL certificate pinning for sensitive apps. (Security Best Practice)',
    condition: (data) =>
      data.appType === 'finance' || data.collectsData === 'yes'
  },

  // ============================================================
  // METADATA RULES
  // ============================================================
  {
    id: 'SCREENSHOTS_REQUIRED',
    severity: 'high',
    score: -8,
    message: 'Apps MUST provide screenshots for all supported device sizes. (Store Guidelines)',
    condition: (data) =>
      data.hasScreenshots === 'no'
  },

  {
    id: 'SCREENSHOTS_REAL',
    severity: 'high',
    score: -8,
    message: 'Screenshots MUST represent actual app gameplay/content. No mockups. (Apple Guideline 2.3.3)',
    condition: (data) =>
      data.hasScreenshots === 'yes' &&
      data.screenshotsReal === 'no'
  },

  {
    id: 'APP_DESC_ACCURATE',
    severity: 'high',
    score: -8,
    message: 'App description MUST accurately reflect app features and functionality. (Store Guidelines)',
    condition: (data) =>
      data.appDescAccurate === 'no'
  },

  {
    id: 'AGE_RATING_DECLARED',
    severity: 'high',
    score: -8,
    message: 'Apps MUST declare accurate age rating based on content. (Store Guidelines)',
    condition: (data) =>
      data.ageRatingDeclared === 'no'
  },

  {
    id: 'METADATA_REGIONAL',
    severity: 'minor',
    score: -3,
    message: 'Consider localizing metadata for target regions. (Best Practice)',
    condition: (data) =>
      data.targetRegions &&
      data.targetRegions.length > 1
  },

  // ============================================================
  // ACCOUNT & DATA ADDITIONAL RULES
  // ============================================================
  {
    id: 'DATA_RETENTION_POLICY',
    severity: 'minor',
    score: -3,
    message: 'Apps collecting data should have a clear data retention policy. (Privacy Best Practice)',
    condition: (data) =>
      data.collectsData === 'yes' &&
      data.hasPrivacyPolicy === 'yes'
  },

  {
    id: 'GDPR_COMPLIANCE',
    severity: 'high',
    score: -8,
    message: 'Apps targeting EU MUST comply with GDPR (right to access, delete, port data). (GDPR)',
    condition: (data) =>
      data.targetRegions &&
      (data.targetRegions.includes('EU') || data.targetRegions.includes('Europe')) &&
      data.collectsData === 'yes'
  },

  {
    id: 'SECURE_AUTH',
    severity: 'high',
    score: -8,
    message: 'Apps with accounts MUST implement secure authentication (OAuth2, MFA support). (Security Best Practice)',
    condition: (data) =>
      data.hasAccount === 'yes' &&
      (data.appType === 'finance' || data.appType === 'health')
  },

  {
    id: 'DATA_MINIMIZATION',
    severity: 'minor',
    score: -3,
    message: 'Collect only necessary data. Excessive data collection may cause rejection. (Privacy Best Practice)',
    condition: (data) =>
      data.collectsData === 'yes' &&
      !data.hasPrivacyPolicy
  },

  // ============================================================
  // LOCATION & HEALTH DATA RULES
  // ============================================================
  {
    id: 'BACKGROUND_LOCATION',
    severity: 'high',
    score: -8,
    message: 'Background location access requires strong justification and clear disclosure to users. (Platform Guidelines)',
    condition: (data) =>
      data.usesLocation === 'yes' &&
      data.locationDisclosure === 'no'
  },

  {
    id: 'HEALTH_APPS_COMPLIANCE',
    severity: 'high',
    score: -8,
    message: 'Health apps MUST comply with HIPAA/local regulations and handle data securely. (HIPAA/Platform Guidelines)',
    condition: (data) =>
      data.appType === 'health' &&
      data.usesHealthData === 'yes'
  },

  {
    id: 'HEALTHKIT_DECLARATION',
    severity: 'critical',
    score: -15,
    message: 'iOS apps using HealthKit MUST declare usage in Info.plist and provide privacy policy. (Apple Guideline 5.1.2)',
    condition: (data) =>
      (data.platform === 'ios' || data.platform === 'both') &&
      data.usesHealthData === 'yes' &&
      !data.hasPrivacyPolicy
  },

  // ============================================================
  // THIRD-PARTY SDK & ENCRYPTION RULES
  // ============================================================
  {
    id: 'SDK_LIST_PROVIDED',
    severity: 'high',
    score: -8,
    message: 'Apps using third-party SDKs MUST list them in privacy disclosure. (Store Privacy Guidelines)',
    condition: (data) =>
      data.usesThirdPartySDK === 'yes' &&
      data.sdkListProvided === 'no'
  },

  {
    id: 'SDK_ATTRIBUTION',
    severity: 'high',
    score: -8,
    message: 'Third-party SDKs MUST be properly attributed in privacy nutrition label/safety section. (Platform Guidelines)',
    condition: (data) =>
      data.usesThirdPartySDK === 'yes' &&
      (data.platform === 'ios' || data.platform === 'both')
  },

  {
    id: 'NO_PRIVATE_APIS',
    severity: 'critical',
    score: -15,
    message: 'Apps MUST NOT use private APIs. This will cause immediate rejection. (Apple Guideline 2.5.2)',
    condition: (data) =>
      data.platform === 'ios' || data.platform === 'both'
  },

  {
    id: 'ENCRYPTION_DISCLOSURE',
    severity: 'high',
    score: -8,
    message: 'Apps using encryption MUST properly disclose in export compliance documents. (US Export Regulations)',
    condition: (data) =>
      data.usesEncryption === 'yes' &&
      !data.encryptionExportCompliance
  },

  {
    id: 'AD_NETWORK_DISCLOSURE',
    severity: 'high',
    score: -8,
    message: 'Apps using ad networks MUST declare ad attribution in privacy disclosures. (Platform Guidelines)',
    condition: (data) =>
      data.usesThirdPartySDK === 'yes' &&
      !data.sdkListProvided
  },

  // ============================================================
  // SOCIAL LOGIN & SUPPLEMENTARY RULES
  // ============================================================
  {
    id: 'SOCIAL_LOGIN_TERMS',
    severity: 'high',
    score: -8,
    message: 'Apps with social login MUST display terms of service before account creation. (Platform Guidelines)',
    condition: (data) =>
      data.socialLogin === 'yes' &&
      data.hasAccount === 'yes' &&
      !data.subTermsClear
  },

  {
    id: 'ANDROID_RUNTIME_PERMISSIONS',
    severity: 'high',
    score: -8,
    message: 'Android apps MUST request runtime permissions properly (API 23+). (Google Play Policy)',
    condition: (data) =>
      (data.platform === 'android' || data.platform === 'both') &&
      data.permissionTiming === 'launch'
  },

  {
    id: 'CRASH_REPORTING',
    severity: 'minor',
    score: -3,
    message: 'Apps should implement crash reporting for stability monitoring. (Best Practice)',
    condition: (data) =>
      data.monetization === 'paid' || data.monetization === 'sub' || data.monetization === 'iap'
  }
];
