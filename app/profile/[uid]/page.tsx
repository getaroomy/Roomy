export default function Page({ params }: { params: { uid: string } }) {
    return (
        <main>
            <h1>UID: {params.uid}</h1>
        </main>
    )
}