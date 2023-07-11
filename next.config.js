/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")([
    "@fullcalendar/common",
    "@babel/preset-react",
    "@fullcalendar/daygrid",
    "@fullcalendar/interaction",
    "@fullcalendar/react",
    "@fullcalendar/timegrid",
    "@fullcalendar/list",
]);


const nextConfig = {
    trailingSlash: true,
    output: 'standalone',
    env: {
        NEXT_PUBLIC_AZURE_AD_CLIENT_ID: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID,
        NEXT_PUBLIC_AZURE_AUTHORITY_URL: process.env.NEXT_PUBLIC_AZURE_AUTHORITY_URL,
        NEXT_PUBLIC_AZURE_AD_TENANT_ID: process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID
    }
};

module.exports = withTM(nextConfig);