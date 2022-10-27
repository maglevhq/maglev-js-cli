import path = require('path')
import glob = require('glob')
import fs = require('fs')
import {buildSectionDefinition, buildTheme, types as CoreTypes} from 'maglevcms-client'

const getSectionSchemaFiles = async (rootPath: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    glob(`${rootPath}/maglev/**/*.schema.json`, (err: Error | null, files: string[]) => {
      if (err) reject()
      resolve(files.map(file => path.resolve(file)))
    })
  })
}

const getTheme = async (rootPath: string): Promise<CoreTypes.Theme> => {
  const rawData = await fs.readFileSync(`${rootPath}/maglev/theme.json`, {encoding: 'utf8', flag: 'r'})
  const theme = buildTheme(rawData)

  theme.sections = await getSectionDefinitions(rootPath)

  return theme
}

const getSectionDefinitions = async (rootPath: string): Promise<CoreTypes.SectionDefinition[]> => {
  const files = await getSectionSchemaFiles(rootPath)

  const definitions: CoreTypes.SectionDefinition[] = []

  for (const filepath of files) {
    const rawData = fs.readFileSync(filepath, {encoding: 'utf8', flag: 'r'})

    try {
      definitions.push(buildSectionDefinition(rawData))
    } catch {
      throw new Error(`🚨 ${path.basename(filepath)} is incorrect`)
    }
  }

  return definitions
}

export {getTheme, getSectionDefinitions}
