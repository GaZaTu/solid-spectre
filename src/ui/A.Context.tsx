export type Params = Record<string, string>

export type SetParams = Record<string, string | number | boolean | null | undefined>

export type UseSearchParams = () => [Params, (params: SetParams, options?: Partial<NavigateOptions<unknown>> | undefined) => void]

const useSearchParams: UseSearchParams = () => {
  return [{}, () => undefined]
}

export interface Path {
  pathname: string
  search: string
  hash: string
}

export interface Location<S = unknown> extends Path {
  query?: Params
  state?: Readonly<Partial<S>> | null
  key?: string
}

export type UseLocation = <S = unknown>() => Location<S> | undefined

const useLocation: UseLocation = () => {
  if (typeof window === "undefined") {
    return undefined
  }

  return window.location
}

export interface NavigateOptions<S = unknown> {
  resolve: boolean
  replace: boolean
  scroll: boolean
  state: S
}

export interface Navigator {
  (to: string, options?: Partial<NavigateOptions>): void
  (delta: number): void
}

export type UseNavigate = () => Navigator | undefined

const useNavigate: UseNavigate = () => {
  return undefined
}

export const AnchorContext = {
  useSearchParams,
  useLocation,
  useNavigate,
  activeClass: "active",
}
