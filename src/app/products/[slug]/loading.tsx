export default function Loading() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="grid gap-12 md:grid-cols-2">
                <div className="aspect-square animate-pulse rounded-lg bg-muted" />
                <div className="flex flex-col gap-6">
                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                    <div className="h-8 w-64 animate-pulse rounded bg-muted" />
                    <div className="h-6 w-32 animate-pulse rounded bg-muted" />
                    <div className="h-20 w-full animate-pulse rounded bg-muted" />
                    <div className="h-6 w-24 animate-pulse rounded bg-muted" />
                </div>
            </div>
        </div>
    )
}