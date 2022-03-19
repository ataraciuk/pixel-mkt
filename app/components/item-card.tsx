import {ItemCardModel} from "~/models/item-card";

export function ItemCard({item}: {item: ItemCardModel}) {
  return (
    <div>
      <img src={item.thumbnailUrl}  alt={item.name}/>
      <div className="itemCardTitle">{item.name}</div>
      <div className="itemCardDesc">{item.shortDesc}</div>
      <div className="itemCardPrice">${item.price}</div>
    </div>
  )
}

