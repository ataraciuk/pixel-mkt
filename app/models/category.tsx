export interface CategoryModel {
  id: string;
  name: string;
  children: CategoryModel[];
}
