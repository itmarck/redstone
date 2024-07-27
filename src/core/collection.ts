export abstract class Collection<T> {
  abstract search(): Promise<T[]>
  abstract find(uid: string): Promise<T | undefined>
  abstract add(item: T): Promise<void>
  abstract update(item: T): Promise<void>
  abstract remove(item: T): Promise<void>
}
