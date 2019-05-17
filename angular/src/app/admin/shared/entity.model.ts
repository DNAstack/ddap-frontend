export const nameConstraintPattern = '^[A-Za-z][-_A-Za-z0-9\.]{1,46}[A-Za-z0-9]$';

export class EntityModel {
  constructor(public name: string, public dto: any) {}

  static objectToMap(models: object): Map<string, EntityModel> {
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
