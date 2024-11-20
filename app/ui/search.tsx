'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce'
import refreshAccessToken from '../lib/refreshAccessToken';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParms = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback( term => {
    const params = new URLSearchParams(searchParms)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300);

  useEffect(() => {
    const baseUrl = window.location.origin
    if (baseUrl) {
      refreshAccessToken(baseUrl)
    }
  }, [searchParms])
  
  return (
    <div className='relative flex'>
      <input
        className="peer text-base w-[500px] min-w-1/4 my-auto py-1 pl-9 rounded-xl border-2 border-gray-400 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={ e => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParms.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
