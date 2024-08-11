import { ChangeEvent, useState } from 'react'
import { Block, BlockType } from '../../../core/block'
import { Entry } from '../../../core/entry'
import { Action } from '../../../core/repository'
import { useRepository } from '../../hooks'

import './Inbox.css'

function Inbox() {
  const repository = useRepository()
  const [title, setTitle] = useState('')

  function onTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
  }

  function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault()
    sendToInbox()
  }

  function sendToInbox() {
    if (!title) {
      return
    }

    const name = title
    const type = BlockType.TASK
    const content = 'This is empty'
    const entries = [
      new Entry({ content: 'This is a paragraph' }),
      new Entry({ content: 'This is another paragraph' }),
    ]
    const block = Block.create({ name, type, content, entries })
    repository.command({ action: Action.ADD }, block)

    setTitle('')
  }

  return (
    <form className="Inbox" onSubmit={onSubmit}>
      <input
        className="Inbox__input"
        value={title}
        type="text"
        placeholder="What's on your mind?"
        onChange={onTitleChange}
      />

      <svg
        className="Inbox__button"
        viewBox="0 0 28 28"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        onClick={sendToInbox}
      >
        <g stroke="none" strokeWidth="1" fillRule="evenodd">
          <g fillRule="nonzero">
            <path d="M3.78963301,2.77233335 L24.8609339,12.8499121 C25.4837277,13.1477699 25.7471402,13.8941055 25.4492823,14.5168992 C25.326107,14.7744476 25.1184823,14.9820723 24.8609339,15.1052476 L3.78963301,25.1828263 C3.16683929,25.4806842 2.42050372,25.2172716 2.12264586,24.5944779 C1.99321184,24.3238431 1.96542524,24.015685 2.04435886,23.7262618 L4.15190935,15.9983421 C4.204709,15.8047375 4.36814355,15.6614577 4.56699265,15.634447 L14.7775879,14.2474874 C14.8655834,14.2349166 14.938494,14.177091 14.9721837,14.0981464 L14.9897199,14.0353553 C15.0064567,13.9181981 14.9390703,13.8084248 14.8334007,13.7671556 L14.7775879,13.7525126 L4.57894108,12.3655968 C4.38011873,12.3385589 4.21671819,12.1952832 4.16392965,12.0016992 L2.04435886,4.22889788 C1.8627142,3.56286745 2.25538645,2.87569101 2.92141688,2.69404635 C3.21084015,2.61511273 3.51899823,2.64289932 3.78963301,2.77233335 Z"></path>
          </g>
        </g>
      </svg>
    </form>
  )
}

export default Inbox
