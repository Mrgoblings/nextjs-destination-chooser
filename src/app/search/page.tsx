export default function SearchPage({searchParams}: {
    searchParams: {q: string | string[] | undefined}
}) {
    let query = '';

    if (Array.isArray(searchParams.q)) {
      query = searchParams.q.join(' ');
    } else {
      query = searchParams.q || '';
    }
    
    console.log("q:", query);
    
    return (
        <h1 className="text-primary text-center text-4xl py-7">You searched: {query}</h1>
    );
}