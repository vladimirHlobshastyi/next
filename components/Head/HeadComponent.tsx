import Head from "next/head"
type HeadTypesProps = { description: string, viewport: string }

const HeadComponent = ({ description, viewport }: HeadTypesProps) => {
    return <Head>
        <title>Mono Store</title>
        <meta name="description" content={description} />
        <meta name="viewport" content={viewport} />
        <link rel="icon" href="/Letter_M_black_64.ico" />
        <link rel="manifest" href="manifest.json"></link>
    </Head>
}

export default HeadComponent