import { Block } from './block'

export class Bus {
  emit(type: string, data: Block) {
    window.dispatchEvent(new CustomEvent(type, { detail: data }))
  }

  on(type: string, callback: (data: Block) => void) {
    function listener(event: Event) {
      callback((event as CustomEvent<Block>).detail)
    }

    window.addEventListener(type, listener)

    return listener
  }

  off(type: string, listener: (event: Event) => void) {
    window.removeEventListener(type, listener)
  }
}
