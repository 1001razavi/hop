/* eslint-disable @typescript-eslint/no-var-requires */
import dotenv, { type DotenvConfigOptions } from 'dotenv'
import fs from 'node:fs'
import minimist from 'minimist'
import path from 'node:path'

export function loadEnv (): void {
  const argv = minimist(process.argv.slice(2))
  const opts: DotenvConfigOptions = {}
  if (typeof argv.env === 'string') {
    const envFile = path.resolve(argv.env)
    if (!fs.existsSync(envFile)) {
      console.error(`env file '${envFile}' does not exit`)
      process.exit(1)
    }

    opts.path = envFile
    console.log(`using environment variable file: ${opts.path}`)
  }

  dotenv.config(opts)
}