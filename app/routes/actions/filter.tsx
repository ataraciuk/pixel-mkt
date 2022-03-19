import {ActionFunction, json} from "remix";
import {fakeCategories, fakeItems} from "~/routes/index";

const itemCategories: {itemId: string, categoryId: string}[] = [
  {itemId: fakeItems[0].id, categoryId: fakeCategories[0].id},
  {itemId: fakeItems[0].id, categoryId: fakeCategories[0].children[1].id},
  {itemId: fakeItems[1].id, categoryId: fakeCategories[0].id},
  {itemId: fakeItems[1].id, categoryId: fakeCategories[0].children[1].id},
  {itemId: fakeItems[2].id, categoryId: fakeCategories[1].id},
];

export const action: ActionFunction = async ({ request}) => {
  const formData = await request.formData();

  const categoryIds = formData.getAll('selectedCategories').filter(c => typeof c === 'string');

  // with a real DB we shouldn't need to to this nested array iteration.
  const itemsThatMatchCategories = categoryIds.length ?
    itemCategories.filter(ic => categoryIds.includes(ic.categoryId)).map(ic => ic.itemId) :
    null;

  // if we know no items match the selected categories, no need to compare other fields.
  if (itemsThatMatchCategories && !itemsThatMatchCategories.length) {
    return [];
  }

  const minVal = getFormNumber(formData, 'priceMin');
  const maxVal = getFormNumber(formData, 'priceMax');
  const query = formData.get('query');
  return json(fakeItems.filter(item => {
    if (minVal && item.price < minVal) {
      return false;
    }
    if (maxVal && item.price > maxVal) {
      return false;
    }
    if (itemsThatMatchCategories && !itemsThatMatchCategories.includes(item.id)) {
      return false;
    }
    return !query ||
      typeof query !== 'string' ||
      !query.length ||
      item.name.includes(query) ||
      item.shortDesc.includes(query);
  }));
};

function getFormNumber(form: FormData, field: string): number | null {
  const formField = form.get(field);
  if (!formField || typeof formField !== 'string') {
    return null;
  }
  const numVal = Number.parseFloat(formField);
  if (isNaN(numVal)) {
    return null;
  }
  return numVal;
}
