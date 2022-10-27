import {Command, Flags} from '@oclif/core'
import path = require('path')
import fs = require('fs')
import {camelize} from '../utils'
import {getSectionDefinitions} from '../concerns/loaders'
import {types as CoreTypes} from 'maglevcms-client'

export default class Codegen extends Command {
  static description = 'Generate the Typescript types from the Section definitions'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    // flag with a value (-p, --path=VALUE)
    path: Flags.string({char: 'p', description: 'path to the Javascript application (Nuxt, ...etc)'}),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(Codegen)
    this.log("👋 Hi! We're going to generate the types for your sections:\n")
    try {
      await this.codegen(flags.path || process.cwd())
    } catch (error) {
      this.log((error as Error).message)
      return this.exit(1)
    }

    this.log('\n💪 maglev/types.ts and maglev/section-mapping.ts have been generated.')
  }

  private async codegen(rootPath: string) {
    let typeStr = ''
    const mapping: string[] = []
    const sectionDefinitions = await getSectionDefinitions(rootPath)

    for (const sectionDefinition of sectionDefinitions) {
      const sectionName = `${camelize(sectionDefinition.id, true)}Section`

      typeStr = ''.concat(
        ...typeStr,
        this.generateSectionType(sectionName, sectionDefinition),
        this.generateBlockTypes(sectionName, sectionDefinition),
      )

      mapping.push(this.generateSectionMapping(sectionName, sectionDefinition))

      this.log(`...${sectionName} ✅`)
    }

    return Promise.all([
      this.writeTypesFile(rootPath, typeStr),
      this.writeMappingFile(rootPath, mapping.join(',')),
    ])
  }

  private writeMappingFile(rootPath: string, mappingStr: string): Promise<void> {
    const filepath = path.join(rootPath, 'maglev/section-mapping.ts')
    const content = `
// Generated by Maglev codegen
import {types as CoreTypes} from 'maglevcms-client'

const sectionDefinitionMapping: CoreTypes.SectionDefinitionMapping = {${mappingStr}
}

export { sectionDefinitionMapping }
    `.trim()

    return new Promise(resolve => {
      fs.writeFile(filepath, content, err => {
        if (err) throw err
        resolve()
      })
    })
  }

  private writeTypesFile(rootPath: string, typeStr: string): Promise<void> {
    const filepath = path.join(rootPath, 'maglev/types.ts')
    const content = `
// Generated by Maglev codegen
import {types as CoreTypes} from 'maglevcms-client'
${typeStr}
    `.trim()

    return new Promise(resolve => {
      fs.writeFile(filepath, content, err => {
        if (err) throw err
        resolve()
      })
    })
  }

  private generateSectionType(sectionName: string, sectionDefinition: CoreTypes.SectionDefinition): string {
    return `
export type ${sectionName} = CoreTypes.Section & {
  id: string
  settings: {${sectionDefinition.settings.map(setting => `
    ${setting.id}: CoreTypes.${camelize(setting.type, true)}Setting`).join('')}
  }` + (sectionDefinition.blocks.length > 0 ? `
  blocks: (${sectionDefinition.blocks.map(block => `${sectionName}${camelize(block.type, true)}Block`)})[]` : '') + `
}
    `
  }

  private generateSectionMapping(sectionName: string, sectionDefinition: CoreTypes.SectionDefinition): string {
    return `
  ${sectionDefinition.id}: {
    settings: {${sectionDefinition.settings.map(setting => `
      ${setting.id}: '${setting.type}'`).join(',')}
    },
    blocks: {${sectionDefinition.blocks.map(blockDefinition => `
      ${blockDefinition.type}: {
        settings: {${blockDefinition.settings.map(setting => `
          ${setting.id}: '${setting.type}'`).join(',')}
        }
      }`).join(',')}
    }
  }`
  }

  private generateBlockTypes(sectionName: string, sectionDefinition: CoreTypes.SectionDefinition): string {
    return sectionDefinition.blocks.map(block => `
export type ${sectionName}${camelize(block.type, true)}Block = {
  id: string
  settings: {${block.settings.map(setting => `
    ${setting.id}: CoreTypes.${camelize(setting.type, true)}Setting`).join('')}
  }
}
    `).join('')
  }
}
