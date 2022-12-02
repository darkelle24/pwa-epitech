export interface ClotheInterface {
  id: string
  name: string
  clotheAvaible: number
  unitPrice: number

  picture?: FileInterface

  user: UserInterface

  longitude?: number

  latitude?: number
  fav: boolean
  //liked?: UserEntity[]
}

export interface FileInterface {
  id: string,
  name: string,
  path: string,
  mimetype: string,
  downloadLink: string,
  showLink: string
}

export interface UserInterface {
      id: string,
      username: string,
      password: string,
      email: string,
      role: string,
      picture?: FileInterface
}
