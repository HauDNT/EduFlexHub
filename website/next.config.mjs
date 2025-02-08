/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            }
        ]
    },
    sassOptions: {
        implementation: 'sass-embedded',
    },
};

export default nextConfig;
