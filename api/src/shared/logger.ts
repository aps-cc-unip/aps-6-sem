import chalk from 'chalk'
import { pid } from 'node:process'

class Logger {
  constructor(private prefix: string) {}

  info(message: string, namespace?: string) {
    const timestamp = new Date()

    console.log(
      chalk.green(`[${this.prefix}] ${pid} -`),
      chalk.gray(timestamp.toLocaleString()),
      chalk.green('-'),
      chalk.yellow(namespace ? `[${namespace}]` : ''),
      chalk.green(message)
    )
  }

  error(message: string, namespace?: string) {
    const timestamp = new Date()

    console.log(
      chalk.red(`[${this.prefix}] ${pid} -`),
      chalk.gray(timestamp.toLocaleString()),
      chalk.red('-'),
      chalk.yellow(namespace ? `[${namespace}]` : ''),
      chalk.red(message)
    )
  }

  warn(message: string, namespace?: string) {
    const timestamp = new Date()

    console.log(
      chalk.yellow(`[${this.prefix}] ${pid} -`),
      chalk.gray(timestamp.toLocaleString()),
      chalk.yellow('-'),
      chalk.yellow(namespace ? `[${namespace}]` : ''),
      chalk.yellow(message)
    )
  }
}

export const logger = new Logger('Application')
