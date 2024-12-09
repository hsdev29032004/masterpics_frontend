export default async function Home() {
    const response = await fetch("http://localhost:3001/api/posts/slug/anh-bang")
    const result = await response.json()

    return (
        <p>
            {result.data.title}
        </p>
    )
}
