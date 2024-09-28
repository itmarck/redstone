import { beforeEach, describe, it } from 'vitest'

import { Preferences } from '..'

describe('Preferences', () => {
  beforeEach(() => {
    delete Preferences.internal
  })

  it('should create the instance', async ({ expect }) => {
    expect(Preferences.instance.cloud).to.be.equals('none')
  })

  it('should update the properties', async ({ expect }) => {
    Preferences.update({
      cloud: 'firebase',
      email: 'user@example.com',
      identifier: 'test',
    })

    expect(Preferences.instance.cloud).to.be.equals('firebase')
    expect(Preferences.instance.email).to.be.equals('user@example.com')
    expect(Preferences.instance.identifier).to.be.equals('test')
  })

  it('should take the values from local storage', async ({ expect }) => {
    localStorage.setItem(
      Preferences.storageKey,
      JSON.stringify({ cloud: 'mongodb' }),
    )

    expect(Preferences.instance.cloud).to.be.equals('mongodb')
  })
})
