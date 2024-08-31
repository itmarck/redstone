import { useEffect, useState } from 'react'

import { FirebaseCloud, Preferences } from '../../data'
import { useRepository } from '../../hooks'

import './Settings.css'

function Settings() {
  const repository = useRepository()
  const [cloud, setCloud] = useState(Preferences.cloud)
  const [user, setUser] = useState<any>(null)
  const userId = user && user.uid

  useEffect(() => {
    repository.cloud?.onUserChanged(setUser)
  }, [repository.cloud])

  function onFirebaseSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const email = (event.currentTarget[0] as HTMLInputElement).value
    const projectId = (event.currentTarget[1] as HTMLInputElement).value
    const apiKey = (event.currentTarget[2] as HTMLInputElement).value

    if (email && projectId && apiKey) {
      Preferences.cloud = cloud
      Preferences.email = email
      Preferences.projectId = projectId
      Preferences.apiKey = apiKey

      repository.cloud = new FirebaseCloud()

      alert('All set!')
    }
  }

  async function onAuthSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const password = (event.currentTarget[0] as HTMLInputElement).value

    await repository.cloud?.signIn(password)

    alert('Signed in!')
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Cloud</h2>
      <section>
        <p>Select the cloud provider you want to use.</p>
        <select
          value={cloud}
          onChange={(event) => setCloud(event.target.value)}
        >
          <option value="none">None</option>
          <option value="firebase">Firebase</option>
          <option value="mongodb">MongoDB</option>
        </select>
        {cloud === 'firebase' && (
          <form className="FirebaseForm" onSubmit={onFirebaseSubmit}>
            <label>Email</label>
            <input
              defaultValue={Preferences.email}
              placeholder="For identification purpose"
            />
            <div />
            <label>Project ID</label>
            <input
              defaultValue={Preferences.projectId}
              placeholder="Project ID"
            />
            <div />
            <label>API Key</label>
            <input
              defaultValue={Preferences.apiKey}
              placeholder="Public API Key"
            />
            <div />
            <button type="submit">Connect</button>
          </form>
        )}
      </section>

      <h2>Authentication</h2>
      <section>
        {userId && <p>You are signed in with {userId}</p>}
        {!userId && (
          <p>Type your password if it is needed for authentication.</p>
        )}
        {!userId && (
          <form className="FirebaseForm" onSubmit={onAuthSubmit}>
            <div />
            <label>Password</label>
            <input type="password" placeholder="Password" />
            <div />
            <button type="submit">Sign in</button>
          </form>
        )}
      </section>
    </div>
  )
}

export default Settings
