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
import { Cluster, Command, Criteria } from '../../core/cluster'

export class FirestoreCluster extends Cluster {
  private firestore: Firestore

  constructor() {
    super()

    const config = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG)
    const app = initializeApp(config)
    const firestore = getFirestore(app)

    getAuth(app)

    this.firestore = firestore
  }

  async query(criteria: Criteria): Promise<Block[]> {
    criteria

    const col = collection(
      this.firestore,
      'accounts',
      'm.velasquez@globant.com',
      'blocks',
    )
    const response = await getDocs(col)
    const blocks = response.docs.map((doc) => new Block(doc.data()))
    console.info('Blocks from firebase', blocks)
    return blocks
  }

  async command(command: Command, block: Block): Promise<Block> {
    command

    const response = await setDoc(
      doc(this.firestore, 'accounts/m.velasquez@globant.com/blocks', block.id),
      JSON.parse(JSON.stringify(block)),
    )
    console.info('Block added to firestore', response)
    return block
  }
}
