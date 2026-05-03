const composeBase = [
  'sudo docker compose',
  '--env-file "$COMPOSE_ENV_FILE"',
  '-f "$COMPOSE_FILE"',
  '-p "$COMPOSE_PROJECT_NAME"',
].join(' ');

const composeUpCommand = [
  composeBase,
  'up',
  '$COMPOSE_UP_OPTIONS',
  '$COMPOSE_SERVICES',
].join(' ');

module.exports = {
  apps: [
    {
      name: 'ord-dogecoin-compose',
      cwd: __dirname,
      script: '/bin/sh',
      args: ['-lc', composeUpCommand],
      interpreter: 'none',
      exec_mode: 'fork',
      autorestart: true,
      restart_delay: 5000,
      max_restarts: 20,
      kill_timeout: 120000,
      env: {
        COMPOSE_ENV_FILE: '.env',
        COMPOSE_FILE: 'docker-compose.yaml',
        COMPOSE_PROJECT_NAME: 'ord-indexer',
        COMPOSE_UP_OPTIONS: '--remove-orphans',
        COMPOSE_SERVICES: 'ord-indexer',
        RPC_URL: process.env.RPC_URL || '127.0.0.1:22555',
        NR_PARALLEL_REQUESTS: process.env.NR_PARALLEL_REQUESTS || '16',
        DOGE_COOKIE_FILE_HOST:
          process.env.DOGE_COOKIE_FILE_HOST ||
          `${process.env.HOME || '/Users/apple'}/.dogecoin/.cookie`,
        DOGE_COOKIE_FILE_CONTAINER: '/root/.dogecoin/.cookie',
      },
      env_production: {
        COMPOSE_UP_OPTIONS: '--remove-orphans --pull always',
      },
    },
  ],
};
