import { useEffect, useRef, useState } from 'react'

interface EditableProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

function Editable({ className, value, onChange }: EditableProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [internalValue, setInternalValue] = useState(value)

  useEffect(() => {
    if (ref.current?.textContent !== value) {
      setInternalValue(value)
    }
  }, [value])

  function onInput(event: React.FormEvent<HTMLDivElement>) {
    onChange(event.currentTarget.textContent || '')
  }

  return (
    <div
      ref={ref}
      className={className}
      contentEditable
      suppressContentEditableWarning
      onInput={onInput}
    >
      {internalValue}
    </div>
  )
}

export default Editable
