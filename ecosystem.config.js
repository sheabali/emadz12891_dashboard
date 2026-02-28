// for nextjs project

module.exports = {
  apps: [
    {
      name: "emadz12891_dashboard",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
