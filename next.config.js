const { hostname } = require('os')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images:
        {
            remotePatterns:[
                {
                    hostname:'j7k7yjtlvqcgjzoy.public.blob.vercel-storage.com'
                }
            ]
        }
    
}

module.exports = nextConfig
