type CloudProvider = 'none' | 'firebase' | 'mongodb'

export class Preferences {
  static storageKey = 'prefs'
  static internal?: Preferences

  cloud: CloudProvider = 'none'
  email?: string
  identifier?: string
  apiKey?: string

  constructor() {
    const preferences = localStorage.getItem(Preferences.storageKey)

    if (preferences) {
      Object.assign(this, JSON.parse(preferences))
    }
  }

  static update(payload: Partial<Preferences>) {
    Object.assign(Preferences.instance, payload)
    localStorage.setItem(
      Preferences.storageKey,
      JSON.stringify(Preferences.instance),
    )
  }

  static get instance(): Preferences {
    if (!Preferences.internal) {
      Preferences.internal = new Preferences()
    }

    return Preferences.internal
  }
}
