import {Link, LoaderFunction, useFetcher, useLoaderData} from "remix";
import {ItemCardModel} from "~/models/item-card";
import {ItemCard} from "~/components/item-card";
import {CategoryModel} from "~/models/category";
import {useEffect, useRef, useState} from "react";

export const fakeCategories: CategoryModel[] = [
  {
    id: '5467',
    name: 'electronica',
    children: [
      {
        id: '5678',
        name: 'celulares',
        children: []
      },
      {
        id: '5679',
        name: 'televisores',
        children: []
      },
    ]
  }, {
    id: '7890',
    name: 'herramientas',
    children: []
  }
];

export const fakeItems: ItemCardModel[] = [
  {
    id: '30001',
    name: 'samsungTV',
    price: 500,
    shortDesc: 'super tele 4k',
    thumbnailUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_757003-MLU47367106092_092021-F.webp'
  },
  {
    id: '30002',
    name: 'samsungTV lite',
    price: 300,
    shortDesc: 'eco tele HD',
    thumbnailUrl: 'https://f.fenicio.app/imgs/8d5cb5/stienda.uy/sam/4601/webp/catalogo/Samsung-Tv-55-UHD-4K-2188060921653591/800_800/samsung-smart-tv-55-uhd-4k-2021-un55au7000.jpg'
  },
  {
    id: '30012',
    name: 'martillo',
    price: 30,
    shortDesc: 'para martillar',
    thumbnailUrl: 'data:image/jpeg;base64,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'
  }
];

function Category(props: { category: CategoryModel, onSelect: any, selection: {[id: string]: boolean} }) {
  function doSelect() {
    props.onSelect(props.category.id);
  }
  return (
    <div>
      <input type="checkbox" checked={props.selection[props.category.id] || false} onChange={doSelect} name="selectedCategories" value={props.category.id} />
      {props.category.name}
      {props.category.children?.map(child =>(
        <Category category={child} onSelect={props.onSelect} selection={props.selection} key={child.id}/>
      ))}
    </div>
  );
}

export default function Index() {

  const [selectedCategories, setSelectedCategories] = useState({} as {[id: string]: boolean});
  const [items, setItems] = useState(fakeItems);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [query, setQuery] = useState('');

  function selectCategory(event: any) {
    setSelectedCategories({
      ...selectedCategories,
      [event]: !selectedCategories[event]
    });
  }

  function setVal<T>(setter: (value: (((prevState: T) => T) | T)) => void) {
    return function(event: any) {
      setter(event.target.value);
    };
  }

  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data) {
      setItems(fetcher.data);
    }
  }, [fetcher.data]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <div className="leftSideBar">
        <fetcher.Form method="post" action="/actions/filter">
          {fakeCategories.map(category => (
            <Category category={category} onSelect={selectCategory} selection={selectedCategories} key={category.id}/>
          ))}
          Min<input type="number" name="priceMin" value={priceMin} onChange={setVal(setPriceMin)}/>
          <br />
          Max <input type="number" name="priceMax" value={priceMax} onChange={setVal(setPriceMax)}/>
          <br />
          Palabra clave: <input type="text" name="query" value={query} onChange={setVal(setQuery)}/>
          <br />
          <button type="submit" className="button">Aplicar filtros</button>
        </fetcher.Form>
      </div>
      <div className="main">
        <h1>Super marketplace</h1>
        <h2>Items encontrados: {items.length}</h2>
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <Link to={item.id} prefetch="intent">
                <ItemCard item={item}/>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
}
