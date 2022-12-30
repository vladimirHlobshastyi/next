import Head from "next/head"
type HeadTypesProps = { description: string, viewport: string }

const HeadComponent = ({ description, viewport }: HeadTypesProps) => {
    return <Head>
        <title>Create Next App</title>
        <meta name="description" content={description} />
        <meta name="viewport" content={viewport} />
        <link rel="icon" href="/favicon.ico" />
    </Head>
}

export default HeadComponent