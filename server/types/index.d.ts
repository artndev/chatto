declare global {
  export type Dictionary<type> = { [key: string]: type }

  export interface IdbScheme {
    rooms: string[]
    usernames: Dictionary<string>
  }
}

export {}
