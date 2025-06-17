declare global {
  export interface Dictionary<type> {
    [key: string]: type
  }

  export interface dbScheme {
    rooms: string[]
    usernames: Dictionary<string>
  }
}

export {}
