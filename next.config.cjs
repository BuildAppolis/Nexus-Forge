await import("./src/env.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: [
        '@node-rs/bcrypt',
        '@node-rs/argon2',
        'argon2',
        '@sentry/profiling-node'
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: true,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: false,

    },
}

module.exports = nextConfig