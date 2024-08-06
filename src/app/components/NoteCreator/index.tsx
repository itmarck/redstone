import { ChangeEvent, useState } from 'react'
import { Block, BlockType } from '../../../core/block'
import { Action } from '../../../core/repository'
import { useRepository } from '../../hooks'

function NoteCreator() {
  const repository = useRepository()
  const [title, setTitle] = useState('')
  const [type, setType] = useState(BlockType.NONE)

  function onTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
  }

  function onTypeChange(event: ChangeEvent<HTMLSelectElement>) {
    setType(event.target.value as BlockType)
  }

  async function onClick() {
    const name = title
    const content = ''
    const block = Block.create({ name, type, content })
    await repository.command({ action: Action.ADD }, block)

    setTitle('')
    setType(BlockType.NONE)
  }

  return (
    <div style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
      <input type="text" value={title} onChange={onTitleChange} />

      <select value={type} onChange={onTypeChange}>
        <option value={BlockType.NONE}>None</option>
        <option value={BlockType.TASK}>Task</option>
        <option value={BlockType.NOTE}>Note</option>
      </select>

      <button onClick={onClick}>Add</button>
      <p>{title}</p>
    </div>
  )
}

export default NoteCreator
