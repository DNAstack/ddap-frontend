export class EntityModel {
  constructor(public name: string, public dto: any) {}

  static objectToMap(models: object) {
    const map: Map<string, EntityModel> = new Map();
    if (models) {
      Object.keys(models).forEach(name => map.set(name, new EntityModel(name, models[name])));
    }
    return map;
  }

  static arrayFromMap(models: Map<string, EntityModel>): EntityModel[] {
    return Array.from(models.values());
  }
}
