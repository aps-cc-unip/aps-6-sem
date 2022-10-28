import chalk from 'chalk'

export const logger = {
  info(...args: any) {
    const timestamp = new Date().toISOString()
    console.log(
      chalk.gray(timestamp),
      chalk.green('[INFO]'.padStart(8, ' ')),
      ...args
    )
  },
  warn(...args: any) {
    const timestamp = new Date().toISOString()
    console.log(
      chalk.gray(timestamp),
      chalk.yellow('[WARN]'.padStart(8, ' ')),
      ...args
    )
  },
  error(...args: any) {
    const timestamp = new Date().toISOString()
    console.log(
      chalk.gray(timestamp),
      chalk.red('[ERROR]'.padStart(8, ' ')),
      ...args
    )
  },
}
