import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  collection,
  doc,
  Firestore,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore'
import { Block } from '../../core/block'

export class FirestoreBackup {
  private firestore: Firestore

  constructor() {
    const config = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG)
    const app = initializeApp(config)
    const firestore = getFirestore(app)

    getAuth(app)

    this.firestore = firestore
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
