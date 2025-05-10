import Categories from "@/components/shared/Categories";
import { Container } from "@/components/shared/Container";
import { Title } from "@/components/shared/Title";
import TopBar from "@/components/shared/TopBar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-bold" />
      </Container>
      <TopBar />
    </>
  );
}
