import { ChangeEvent, useState } from 'react'
import { Block, BlockLayout } from '../../../core/block'
import { useStore } from '../../hooks/store'

function NoteCreator() {
  const store = useStore()
  const [title, setTitle] = useState('')

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
  }

  async function onClick() {
    const name = title
    const content = ''
    const block = Block.create({ name, content, layout: BlockLayout.TASK })
    await store.command('add', block)
    setTitle('')
  }

  return (
    <div>
      <input type="text" value={title} onChange={onChange} />
      <button onClick={onClick}>Add</button>
      <p>{title}</p>
    </div>
  )
}

export default NoteCreator
