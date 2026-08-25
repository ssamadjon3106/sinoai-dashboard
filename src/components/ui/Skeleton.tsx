export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-surface-muted ${className}`} />
}

export function TableRowSkeleton() {
  return (
    <tr>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </td>
      <td className="px-4 py-3"><Skeleton className="h-3.5 w-16" /></td>
      <td className="px-4 py-3"><Skeleton className="h-3.5 w-20" /></td>
      <td className="px-4 py-3"><Skeleton className="h-6 w-14 rounded-full" /></td>
      <td className="px-4 py-3"><Skeleton className="h-6 w-14 rounded-full" /></td>
      <td className="px-4 py-3"><Skeleton className="h-6 w-14 rounded-full" /></td>
      <td className="px-4 py-3"><Skeleton className="h-3.5 w-20" /></td>
    </tr>
  )
}
