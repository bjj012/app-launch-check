import type { NextConfig } from "next";

// 使用 any 绕过类型检查
const nextConfig: any = {
  eslint: {
    // 忽略 ESLint 错误
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 忽略 TypeScript 类型错误
    ignoreBuildErrors: true,
  },
};

export default nextConfig;