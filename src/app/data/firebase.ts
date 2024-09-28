import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import {
  collection,
  doc,
  Firestore,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore'
import { Block } from '../../core/block'
import { Cloud } from '../../core/repository'
import { Preferences } from './preferences'

export class FirebaseCloud implements Cloud {
  private firestore: Firestore

  constructor() {
    const projectId = Preferences.instance.identifier
    const apiKey = Preferences.instance.apiKey
    const app = initializeApp({ projectId, apiKey })
    const firestore = getFirestore(app)

    getAuth(app)

    this.firestore = firestore
  }

  async signIn(password: string): Promise<void> {
    const auth = getAuth()

    if (!Preferences.instance.email) {
      throw new Error('Email is required')
    }

    await signInWithEmailAndPassword(auth, Preferences.instance.email, password)
  }

  onUserChanged(callback: (user: any) => void): void {
    onAuthStateChanged(getAuth(), callback)
  }

  async pull(): Promise<Block[]> {
    const col = collection(
      this.firestore,
      'accounts',
      'm.velasquez@globant.com',
      'blocks',
    )
    const response = await getDocs(col)
    const blocks = response.docs.map((doc) => Block.from(doc.data()))
    return blocks
  }

  async commit(block: Block): Promise<void> {
    block.commit()
    await setDoc(
      doc(this.firestore, 'accounts/m.velasquez@globant.com/blocks', block.id),
      JSON.parse(JSON.stringify(block)),
    )
  }
}
