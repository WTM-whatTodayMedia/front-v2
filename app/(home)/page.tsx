import Home from "@/components/Home";
import { listProps } from "@/types";
import { legnthRn } from "@/utils/lengthRn";
import CustomAxios from "@/utils/lib/CustomAxios";
import { Suspense } from "react";
import HomeLoadingPage from "./loading";

export default async function HomePage() {
  const { data } = await CustomAxios.post("");
  const list: listProps[] = data.results;
  const rn = legnthRn(list);

  return (
    <Suspense fallback={<HomeLoadingPage />}>
      <Home
        list={list}
        coverImgUrl={
          list[rn]?.cover?.external?.url ?? list[rn]?.cover?.file?.url ?? ""
        }
        coverImgTitle={list[rn]?.properties.Name.title[0].text.content}
      />
    </Suspense>
  );
}
