import {LoaderFunction, useLoaderData} from "remix";
import {fakeItems} from "~/routes/index";
import {ItemCardModel} from "~/models/item-card";

export const loader: LoaderFunction = async ({ request, params }) => {
  // in the future, fetch items with more information details instead the itemCard for the listing.
  const item = fakeItems.find(item => item.id === params.itemId);
  if (!item) {
    throw new Response(`Item with id ${params.itemId} not found`, { status: 404 });
  }
  return { item };
};

export default function ItemRoute() {
  const data = useLoaderData<{item: ItemCardModel}>();
  return (
    <div>
      <h2>{data.item.name}</h2>
      <div>price: {data.item.price}</div>
      <div>description: {data.item.shortDesc}</div>
      <img src={data.item.thumbnailUrl}  alt={data.item.name}/>
      <button>BUY!</button>
    </div>
  );
}
