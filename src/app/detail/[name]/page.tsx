import HomeDetail from '@/components/HomeDetail'
import { Props } from '@/types/common'
import type { Metadata, ResolvingMetadata } from 'next'
import { WtmListType, getWtmData, getWtmSearchData } from 'wtm-api'

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const name = params.name
  const data: WtmListType[] = await getWtmSearchData(name) // 이름이 같으면 예외사항 고려
  const previousImages = (await parent).openGraph?.images || []
  const detailData = data[0]
  const ImageUrl = detailData?.thumbnailUrl

  return {
    title: 'Detail',
    openGraph: {
      type: 'website',
      title: detailData?.title + '- WTM',
      description: detailData?.described,
      siteName: 'WTM',
      images: [ImageUrl, ...previousImages],
    },
  }
}

export async function generateStaticParams() {
  const detailData: WtmListType[] = await getWtmData()
  return detailData.map(i => ({ name: encodeURIComponent(i.title) }))
}

export const DetailPage = async ({ params: { name } }: Props) => {
  const detailData = await getWtmSearchData(decodeURIComponent(name))

  return <HomeDetail data={detailData[0]} />
}

export default DetailPage
