import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticProps,
} from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ArrayElement } from "@the-chat/types"
import { DEFAULT_LOCALE } from "@the-chat/config"

type A<T, D> = T extends D ? never : T

// todo??????: unique args
// todo???: delete fn that exists only for types
// A - Allowed (A<a,b> = if a NOT in b), L - Locale(s), P - Locale(s) on every Page, CL - CurrentLocale(s), GP - GetProps

const getNJPWT =
  <
    L extends string,
    GP extends GetServerSideProps | GetStaticProps = GetServerSideProps
  >() =>
  <Ps extends L[] = []>(localesOnEveryPage: Ps = [] as unknown as Ps) =>
  <
    CL extends L = L,
    CCL extends A<CL, ArrayElement<Ps>> = A<CL, ArrayElement<Ps>>
  >(
    locales: (CCL extends CL ? CCL[] : never) | never[] = [],
    getRestProps: GP = (async () => ({ props: {} })) as unknown as GP
  ): GP =>
    (async (
      context: GP extends GetServerSideProps
        ? GetServerSidePropsContext
        : GetServerSidePropsContext
    ) => {
      const config = await getRestProps(context)

      return {
        ...("props" in config && config.props),
        props: {
          ...("props" in config && config.props),
          // learn
          ...(await serverSideTranslations(
            context.locale || context.defaultLocale || DEFAULT_LOCALE,
            [...localesOnEveryPage, ...locales]
          )),
        },
      }
    }) as unknown as GP

export default getNJPWT

// tests
// type AL = "a" | "b" | "c" | "d" | "e" | "f"
// const st = getNJPWT<AL, GetStaticProps>()(["a"])
// st(["b"], () => ({ props: {} }))
// const ssr = getNJPWT<AL, GetServerSideProps>()(["a"])
// const ssr2 = getNJPWT<AL, GetServerSideProps>()()
// ssr(["b"], async () => ({ props: {} }))
// ssr2(["b"])
// ssr2()
