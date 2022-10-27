import {Command, Flags, CliUx} from '@oclif/core'
import {Client} from 'maglevcms-client'
import {getTheme} from '../concerns/loaders'

export default class Sync extends Command {
  static description = 'Synchronize the theme and its sections (definitions) to the Maglev server'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    // flag with a value (-p, --path=VALUE)
    path: Flags.string({char: 'p', description: 'path to the Javascript application (Nuxt, ...etc)'}),
    // flag with a value (-h, --host=VALUE)
    host: Flags.string({char: 'h', description: 'Host of the Maglev server'}),
    // flag with a value (-r, --apiRootPath=VALUE)
    apiRootPath: Flags.string({char: 'r', description: 'Path to the API (/maglev by default)'}),
    // flag with a value (-a, --apiKey=VALUE)
    apiKey: Flags.string({char: 'a', description: 'Api key given by the Maglev server'}),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(Sync)
    const host = flags.host || process.env.MAGLEV_HOST
    const apiKey = flags.apiKey || process.env.MAGLEV_API_KEY
    const apiRootPath = flags.apiRootPath || process.env.MAGLEV_API_ROOT_PATH

    console.log(host, apiKey, flags.apiRootPath)

    if (!host || !apiKey) {
      this.log('🚨 This command requires the host and the apiKey to run')
      return this.exit(1)
    }

    this.log("👋 Hi! We're going to send the theme and the sections definitions to the Maglev server:\n")
    CliUx.ux.action.start('Sending the theme to the Maglev server')
    await this.sync(flags.path || process.cwd(), host, apiRootPath, apiKey)
    CliUx.ux.action.stop()

    this.log('\n💪 The theme and the sections have been synchronized.')
  }

  private async sync(rootPath: string, host: string, apiRootPath: string | undefined, apiKey: string): Promise<void> {
    const client = new Client(host, apiKey, apiRootPath)
    const theme = await getTheme(rootPath)
    return client.updateTheme(theme)
  }
}
