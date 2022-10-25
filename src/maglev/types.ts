// CONFIG
export type MaglevConfig = {
  apiBaseURL: string
  apiKey: string
}

// THEME + SECTION definitions

export type Theme = {
  name: string
  description: string
  sectionCategories: SectionCategory[]
  sections: SectionDefinition[]
  styleSettings: DefinitionSetting[]
  icons: string[]
}

export type SectionCategory = {
  id?: string
  name: string
}

export type SectionDefinitionMapping = {
  [sectionId: string]: {
    settings: Record<string, string>
    blocks: BlockDefinitionMapping
  }
}

export type BlockDefinitionMapping = {
  [sectionId: string]: {
    settings: Record<string, string>
  }
}

export type SectionDefinition = {
  id: string
  name: string
  category: string
  site_scoped?: boolean // eslint-disable-line camelcase
  settings: DefinitionSetting[]
  blocks: DefinitionBlock[]
  blocks_label?: string // eslint-disable-line camelcase
  blocks_presentation?: 'tree' | 'list' // eslint-disable-line camelcase
  sample: {
    settings: any
    blocks: {
      type: string
      settings: any
    }[]
  }
}

export type DefinitionBlock = {
  name: string
  type: string
  root?: boolean
  accept?: string[]
  settings: DefinitionSetting[]
}

export type DefinitionSetting =
  | TextSettingDefinition
  | CheckboxSettingDefinition
  | ImageSettingDefinition
  | IconSettingDefinition
  | LinkSettingDefinition
  | ColorSettingDefinition
  | SelectSettingDefinition
  | RadioSettingDefinition

export type CoreSettingDefinition = {
  id: string
  label: string
  advanced?: boolean
}

export type TextSettingDefinition = CoreSettingDefinition & {
  type: 'text'
  html?: boolean
  lineBreak?: boolean
  nbRows?: number
  default: string
}

export type CheckboxSettingDefinition = CoreSettingDefinition & {
  type: 'checkbox'
  default: boolean
}

export type ImageSettingDefinition = CoreSettingDefinition & {
  type: 'image'
  default: string
}

export type IconSettingDefinition = CoreSettingDefinition & {
  type: 'icon'
  default: string
}

export type LinkSettingDefinition = CoreSettingDefinition & {
  type: 'link'
  with_text: boolean // eslint-disable-line camelcase
  default: {
    text?: string
    href: string
  }
}

export type ColorSettingDefinition = CoreSettingDefinition & {
  type: 'color'
  presets?: string[]
  default: string
}

export type SelectSettingDefinition = CoreSettingDefinition & {
  type: 'select'
  options?: { label: string, value: string }[]
  default: string
}

export type RadioSettingDefinition = CoreSettingDefinition & {
  type: 'radio'
  options?: { label: string, value: string }[]
  default: string
}

// API

export type APIPage = {
  id: string
  title: string
  path: string
  pathHash: Record<string, string>
  sections: APIPageSection[]
  seoTitle: string | null
  metaDescription: string | null
  ogTitle: string | null
  ogDescription: string | null
  ogImageUrl: string | null
}

export type APIPageSection = {
  id: string
  type: string
  blocks: APIPageBlock[]
  settings: APIPageSetting[]
}

export type APIPageBlock = {
  id: string
  type: string
  settings: APIPageSetting[]
}

export type APIPageSetting = {
  id: string
  value: null | undefined | string | Record<string, any>
}

// Content

export type ContentElement = {
  id: string
  settings: Record<string, Setting>
}

export type Section = ContentElement & {
  id: string
  type: string
  settings: Record<string, Setting>
  blocks: Block[]
}

export type Block = ContentElement & {
  id: string
  type: string
  settings: Record<string, Setting>
}

export type Setting =
| TextSetting
| ImageSetting
| LinkSetting
| IconSetting
| SelectSetting
| RadioSetting
| CheckboxSetting
| ColorSetting

export type TextSetting = {
  domId: string
  value: string
}

export type ImageSetting = {
  domId: string
  url: string
  altText?: string
  size?: number
  width?: number
  height?: number
}

export type LinkSetting = {
  domId: string
  href: string
  text?: string
  openNewTab: boolean
}

export type IconSetting = {
  domId: string
  value: string
}

export type SelectSetting = {
  domId: string
  value: string
}

export type RadioSetting = {
  domId: string
  value: string
}

export type CheckboxSetting = {
  domId: string
  value: boolean
}

export type ColorSetting = {
  domId: string
  value: string
}
