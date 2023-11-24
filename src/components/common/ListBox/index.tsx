"use client";
import { CoverProps, MultiSelectProps } from "@/types";
import * as S from "./styled";
import Image from "next/image";
import { CategoryBox } from "..";
import { useRouter } from "next/navigation";
import { CategoryColorArr } from "@/utils/CategoryArray";

const ListBox = ({
  cover,
  title,
  category,
}: {
  cover: CoverProps;
  title: string;
  category: MultiSelectProps[];
}) => {
  const router = useRouter();

  return (
    <S.Wrapper onClick={() => router.push(`/${title}`)}>
      <Image
        src={cover?.external?.url || cover?.file?.url || ""}
        alt="포스터 이미지"
        priority
        width={200}
        height={296}
        style={{
          borderTopLeftRadius: "7px",
          borderTopRightRadius: "7px",
          objectFit: "cover",
        }}
      />
      <S.Decs>
        <S.Title>{title}</S.Title>
        <S.Categorys>
          {category.map((i) => (
            <CategoryBox
              key={i.id}
              color={CategoryColorArr[i.color] ?? i.color}
              name={i.name}
              fontSize={"0.8rem"}
            />
          ))}
        </S.Categorys>
      </S.Decs>
    </S.Wrapper>
  );
};

export default ListBox;
