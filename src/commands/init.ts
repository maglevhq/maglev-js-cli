import {Command} from '@oclif/core'
import path = require('path')
import fs = require('fs')

export default class Init extends Command {
  static description = 'Prepare your javascript application for the Maglev page builder'

  static examples = [
    '<%= config.bin %> <%= command.id %> [PATH]',
  ]

  static args = [
    {name: 'path', default: '.'},
  ]

  public async run(): Promise<void> {
    const {args} = await this.parse(Init)

    this.log("👋 Hi, we're going to prepare your project for the Maglev page builder.\n")
    await this.writeTheme(args.path)

    this.log(`Please add the following ENV variables to your .env or .env.local file:\n
MAGLEV_HOST=<host-of-your-maglev-server>
MAGLEV_API_KEY=<api-key-given-by-your-maglev-server>
MAGLEV_API_ROOT_PATH=/api
  `)

    this.log('Next step → add your first section category with the maglevcms generate:category command.')

    this.log('💪 Once it\'s done you\'re good to generate your first section.\n')
  }

  private writeTheme(rootPath: string): Promise<void> {
    const filepath = path.join(rootPath, 'maglev/theme.json')
    const dirname = path.dirname(filepath)
    const content = `{
  "name": "My theme",
  "description": "A brand new theme",
  "section_categories": [],
  "style_settings": [],
  "icons": []
}`

    if (!fs.existsSync(dirname)) fs.mkdirSync(dirname)

    return new Promise(resolve => {
      fs.writeFile(filepath, content, err => {
        if (err) throw err
        resolve()
      })
    })
  }
}
