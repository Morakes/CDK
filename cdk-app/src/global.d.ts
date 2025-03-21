declare global {
  type Res<T> = {
    code: number
    data: T
    msg: string
  }
}