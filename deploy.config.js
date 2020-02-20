module.exports = {
  apps: {
    name: "appointment.usemy.app",
    script:
      "npm run start:myproxy << /home/myproxy/.pm2/logs/appointment.usemy.app-out.log",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "1G",
    env_production: {
      NODE_ENV: "production",
      PORT: 3051,
      ADMIN: "A3uPmSvEs5H7FfgmjCUsqD3vsshwuRMwezneqXdA",
      WORKPATH: "/home/myproxy"
    },
    error_file: "/home/myproxy/.pm2/logs/appointment.usemy.app-err.log",
    merge_logs: true
  }
};
