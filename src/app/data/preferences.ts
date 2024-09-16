export class Preferences {
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