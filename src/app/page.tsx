import { Container } from "@/components/shared/Container";
import Filters from "@/components/shared/Filters";
import FiltersCheckboxGroup from "@/components/shared/FiltersCheckboxGroup";
import ProductsGroupList from "@/components/shared/ProductsGroupList";
import { Title } from "@/components/shared/Title";
import TopBar from "@/components/shared/TopBar";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-bold" />
      </Container>
      <TopBar />
      <Container className="pb-14">
        <div className="flex gap-[60px]">
          <div className="w-[250px] flex flex-col gap-6">
            <Filters />
            <FiltersCheckboxGroup
              title="Ингредиенты"
              items={[
                {
                  text: "TOmato",
                  value: "1",
                },
                {
                  text: "space",
                  value: "2",
                },
                {
                  text: "TOmato",
                  value: "3",
                },
                {
                  text: "TOmato",
                  value: "4",
                },
                {
                  text: "TOmato",
                  value: "5",
                },
                {
                  text: "TOmato",
                  value: "6",
                },
                {
                  text: "TOmato",
                  value: "7",
                },
              ]}
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Пиццы"
                categoryId={1}
                items={[
                  {
                    id: 1,
                    name: "чизбурегр пицца1",
                    price: 550,
                    imageUrl:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvWaWNryI38VO95ankleq03UZSCN-agkTuDw&s",
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2,
                    name: "чизбурегр пицца2",
                    price: 550,
                    imageUrl:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvWaWNryI38VO95ankleq03UZSCN-agkTuDw&s",
                    items: [{ price: 550 }],
                  },
                  {
                    id: 3,
                    name: "чизбурегр пицца3",
                    price: 550,
                    imageUrl:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvWaWNryI38VO95ankleq03UZSCN-agkTuDw&s",
                    items: [{ price: 550 }],
                  },
                  {
                    id: 4,
                    name: "чизбурегр пицца4",
                    price: 550,
                    imageUrl:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvWaWNryI38VO95ankleq03UZSCN-agkTuDw&s",
                    items: [{ price: 550 }],
                  },
                  {
                    id: 5,
                    name: "чизбурегр пицца5",
                    price: 550,
                    imageUrl:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvWaWNryI38VO95ankleq03UZSCN-agkTuDw&s",
                    items: [{ price: 550 }],
                  },
                  {
                    id: 6,
                    name: "чизбурегр пицца6",
                    price: 550,
                    imageUrl:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvWaWNryI38VO95ankleq03UZSCN-agkTuDw&s",
                    items: [{ price: 550 }],
                  },
                ]}
              />
              <ProductsGroupList
                title="Снеки"
                categoryId={1}
                items={[
                  {
                    id: 7,
                    name: "чизбурегр пицца7",
                    price: 550,
                    imageUrl:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvWaWNryI38VO95ankleq03UZSCN-agkTuDw&s",
                    items: [{ price: 550 }],
                  },
                  {
                    id: 8,
                    name: "чизбурегр пицца8",
                    price: 550,
                    imageUrl:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvWaWNryI38VO95ankleq03UZSCN-agkTuDw&s",
                    items: [{ price: 550 }],
                  },
                  {
                    id: 9,
                    name: "чизбурегр пицца9",
                    price: 550,
                    imageUrl:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvWaWNryI38VO95ankleq03UZSCN-agkTuDw&s",
                    items: [{ price: 550 }],
                  },
                  {
                    id: 10,
                    name: "чизбурегр пицца10",
                    price: 550,
                    imageUrl:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvWaWNryI38VO95ankleq03UZSCN-agkTuDw&s",
                    items: [{ price: 550 }],
                  },
                  {
                    id: 11,
                    name: "чизбурегр пицца11",
                    price: 550,
                    imageUrl:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvWaWNryI38VO95ankleq03UZSCN-agkTuDw&s",
                    items: [{ price: 550 }],
                  },
                  {
                    id: 12,
                    name: "чизбурегр пицца12",
                    price: 550,
                    imageUrl:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvWaWNryI38VO95ankleq03UZSCN-agkTuDw&s",
                    items: [{ price: 550 }],
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
