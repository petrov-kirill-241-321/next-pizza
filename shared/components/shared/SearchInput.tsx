import { cn } from "../../lib/utils";
import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import React from "react";
import { useClickAway, useDebounce } from "react-use";
import { Api } from "../../services/api-client";
import Image from "next/image";
import Link from "next/link";

type Props = {
  className?: string;
};

export default function SearchInput({ className }: Props) {
  const [focused, setFocused] = React.useState(false);
  const ref = React.useRef(null);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [inputValue, setInputValue] = React.useState<string>("");

  useClickAway(ref, () => setFocused(false));
  useDebounce(
    async () => {
      try {
        const data = await Api.products.search(inputValue);
        setProducts(data);
      } catch (e) {
        console.error(e);
      }
    },
    200,
    [inputValue]
  );

  const onClickItem = () => {
    setFocused(false);
    setInputValue("");
    setProducts([]);
  };
  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50"></div>
      )}
      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11 z-100",
          className
        )}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          placeholder="Найти пиццу..."
          onFocus={() => setFocused(true)}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {products.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
              focused && "visible opacity-100 top-12"
            )}
          >
            {products.map((product) => (
              <Link
                onClick={onClickItem}
                key={product.id}
                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                href={`/product/${product.id}`}
              >
                <Image
                  className="rounded-sm p-0"
                  src={product.imageUrl}
                  alt={product.name}
                  height={18}
                  width={18}
                />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
