export interface FormData {
  platform?: 'ios' | 'android' | 'both';
  appType?: string; // e.g., 'saas', 'game', 'social', 'health', 'finance'
  targetRegions?: string[]; // e.g., ['US', 'EU', 'CN']
  collectsData?: 'yes' | 'no';
  hasPrivacyPolicy?: 'yes' | 'no';
  hasAccount?: 'yes' | 'no';
  accountDeletion?: 'yes' | 'no';
  monetization?: 'free' | 'paid' | 'iap' | 'sub';
  subTermsClear?: 'yes' | 'no';
  hasRestore?: 'yes' | 'no';
  socialLogin?: 'yes' | 'no';
  permissionTiming?: 'launch' | 'context';
  isForKids?: 'yes' | 'no';
  hasParentalGate?: 'yes' | 'no';

  // 新增字段：隐私与权限
  usesLocation?: 'yes' | 'no';
  locationDisclosure?: 'yes' | 'no';
  usesCamera?: 'yes' | 'no';
  cameraDisclosure?: 'yes' | 'no';
  usesMicrophone?: 'yes' | 'no';
  usesHealthData?: 'yes' | 'no';
  healthDataDisclaimer?: 'yes' | 'no';
  usesThirdPartySDK?: 'yes' | 'no';
  sdkListProvided?: 'yes' | 'no';
  usesIDFA?: 'yes' | 'no';
  hasATTPermission?: 'yes' | 'no';

  // 新增字段：内容安全
  hasUGC?: 'yes' | 'no'; // 用户生成内容
  hasUGCFiltering?: 'yes' | 'no'; // 内容审核/过滤
  hasReportMechanism?: 'yes' | 'no'; // 举报机制
  hasContactInfo?: 'yes' | 'no'; // 联系方式

  // 新增字段：订阅与付费
  hasFreeTrial?: 'yes' | 'no';
  freeTrialClear?: 'yes' | 'no';
  subCancellationEasy?: 'yes' | 'no';
  iapPriceDisplayed?: 'yes' | 'no';

  // 新增字段：技术合规
  usesEncryption?: 'yes' | 'no';
  encryptionExportCompliance?: 'yes' | 'no';
  apiLevel?: number; // Android API level
  targetSdkVersion?: number;

  // 新增字段：元数据
  hasScreenshots?: 'yes' | 'no';
  screenshotsReal?: 'yes' | 'no';
  appDescAccurate?: 'yes' | 'no';
  ageRatingDeclared?: 'yes' | 'no';
}

export interface Rule {
  id: string;
  severity: 'critical' | 'high' | 'minor';
  score: number; // Negative values (e.g., -15, -8, -3)
  message: string;
  condition: (data: FormData) => boolean;
}

export interface AuditResult {
  score: number; // 0 to 100
  issues: Issue[];
}

export interface Issue {
  id: string;
  severity: 'critical' | 'high' | 'minor';
  message: string;
}
