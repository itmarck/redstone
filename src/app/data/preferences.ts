type CloudProvider = 'none' | 'firebase' | 'mongodb'

export class Preferences {
  cloud: CloudProvider = 'none'
  email?: string
  identifier?: string
  apiKey?: string

  constructor() {}

  static get instance(): Preferences {
    return new Preferences()
  }

  static update(payload: Partial<Preferences>) {
    Object.assign(Preferences.instance, payload)
  }

  static get cloud() {
    return localStorage.getItem('cloud_provider') || 'none'
  }
  static set cloud(cloud: string) {
    localStorage.setItem('cloud_provider', cloud)
  }

  static get email(): string | undefined {
    return localStorage.getItem('email') || undefined
  }
  static set email(email: string) {
    localStorage.setItem('email', email)
  }

  static get projectId(): string | undefined {
    return localStorage.getItem('cloud_project_id') || undefined
  }
  static set projectId(projectId: string) {
    localStorage.setItem('cloud_project_id', projectId)
  }

  static get apiKey(): string | undefined {
    return localStorage.getItem('cloud_api_key') || undefined
  }
  static set apiKey(apiKey: string) {
    localStorage.setItem('cloud_api_key', apiKey)
  }
}
