import { Container } from "../../../shared/components/shared/Container";
import Filters from "../../../shared/components/shared/Filters";
import ProductsGroupList from "../../../shared/components/shared/ProductsGroupList";
import { Title } from "../../../shared/components/shared/Title";
import TopBar from "../../../shared/components/shared/TopBar";
import { prisma } from "../../../prisma/prisma-client";
import { findPizzas, GetSearchParams } from "../../../shared/lib/find-pizzas";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await findPizzas(searchParams);
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-bold" />
      </Container>
      <TopBar categories={categories} />
      <Container className="pb-14">
        <div className="flex gap-[60px]">
          <div className="w-[250px] flex flex-col gap-6">
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map((category) => (
                <ProductsGroupList
                  key={category.id}
                  title={category.name}
                  categoryId={category.id}
                  items={category.products}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
