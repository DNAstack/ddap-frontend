export class ChangeDto {
  constructor(public item: ItemDto, public apply: object) {}
}

export class ItemDto {
  constructor(public name: string) {
  }

}
