export type Colors =
  | 'gray'
  | 'red'
  | 'pink'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'rose'
  | 'fuchsia'
  | 'cyan'
  | 'white'
  | 'black'

interface ColorEntry {
  from_normal: string
  to_normal: string
  via_normal: string
}

interface ColorTheme {
  [color: string]: ColorEntry
}

export const colorThemes: ColorTheme = {
  gray: {
    from_normal: 'from-gray-500',
    to_normal: 'to-gray-500',
    via_normal: 'via-gray-300'
  },
  red: {
    from_normal: 'from-red-500',
    to_normal: 'to-red-400',
    via_normal: 'via-red-300'
  },
  blue: {
    from_normal: 'from-blue-500',
    to_normal: 'to-blue-500',
    via_normal: 'via-blue-300'
  },
  green: {
    from_normal: 'from-green-500',
    to_normal: 'to-green-500',
    via_normal: 'via-green-300'
  }
}
