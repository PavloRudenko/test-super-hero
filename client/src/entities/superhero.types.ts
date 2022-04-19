export interface SuperHero {
  readonly _id: string
  nickname: string
  realName: string
  originDescription: string
  superpowers: string
  catchPhrase: string
  images: File[]
  imageNames: ImageName[]
}

export interface ImageName {
  readonly _id: string
  needDelete: boolean
}

export type SuperHeroForInputKeys = keyof Omit<
  SuperHero,
  '_id' | 'images' | 'imageNames'
>
