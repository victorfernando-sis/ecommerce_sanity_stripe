/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_STRIPE_SECRET_KEY: 'pk_test_51M7GZYGxoK37hX7Rz4F3e6Sow1VqKNRyQIeKW70pQAAxqcEtQl4tsSGIHR3w7t4hMqp2W80A2I3qN65b7vz4uLGI00Pgn8JmbD',
    NEXT_SECRET_STRIPE_KEY: 'sk_test_51M7GZYGxoK37hX7RLzBYrVfg6R8gnbzeoV2XSKPMG0GHV5krctgjqGki9pxYDqrMubCxoWz6lpodHdSns1DpMOc200HRikeVFt',
  },
}

module.exports = nextConfig
