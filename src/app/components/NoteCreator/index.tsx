import { ChangeEvent, useState } from 'react'
import { Block, BlockLayout } from '../../../core/block'
import { useStore } from '../../hooks/store'

function NoteCreator() {
  const store = useStore()
  const [title, setTitle] = useState('')
  const [layout, setLayout] = useState(BlockLayout.NONE)

  function onTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
  }

  function onLayoutChange(event: ChangeEvent<HTMLSelectElement>) {
    setLayout(event.target.value as BlockLayout)
  }

  async function onClick() {
    const name = title
    const content = ''
    const block = Block.create({ name, content, layout })
    await store.command('add', block)
    setTitle('')
    setLayout(BlockLayout.NONE)
  }

  return (
    <div>
      <input type="text" value={title} onChange={onTitleChange} />

      <select value={layout} onChange={onLayoutChange}>
        <option value={BlockLayout.NONE}>None</option>
        <option value={BlockLayout.TASK}>Task</option>
        <option value={BlockLayout.NOTE}>Note</option>
      </select>

      <button onClick={onClick}>Add</button>
      <p>{title}</p>
    </div>
  )
}

export default NoteCreator
