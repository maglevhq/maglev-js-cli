import {Command, Flags} from '@oclif/core'
import path = require('path')
import fs = require('fs')
import {getTheme} from '../../concerns/loaders'

export default class Category extends Command {
  static description = 'Append a new category to the Maglev theme'

  static examples = [
    '<%= config.bin %> <%= command.id %> call_to_action "Call to Action"',
  ]

  static flags = {
    // flag with a value (-p, --path=VALUE)
    path: Flags.string({char: 'p', description: 'path to the Javascript application (Nuxt, ...etc)'}),
  }

  static args = [{name: 'id', required: true}, {name: 'name', required: true}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Category)
    try {
      await this.appendCategory(flags.path || process.cwd(), args.id, args.name)
    } catch (error) {
      this.log((error as Error).message)
      return this.exit(1)
    }

    this.log('👍 Your category has been added with success!')
  }

  private async appendCategory(rootPath: string, id: string, name: string): Promise<void> {
    const filepath = path.join(rootPath, 'maglev/theme.json')
    const theme = await getTheme(rootPath)
    const existingCategory = theme.section_categories.find(category => category.id === id)

    if (existingCategory) throw new Error('🚨 A category with the same id already exists.')

    theme.section_categories.push({id, name})

    return new Promise(resolve => {
      fs.writeFile(filepath, JSON.stringify(theme, null, 2), err => {
        if (err) throw err
        resolve()
      })
    })
  }
}
