import type { AppProps } from 'next/app';
import Layout from '../components/layout/layout';
import { NextComponentType, NextPageContext } from 'next';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './../styles/app.sass';
import { ModalProvider } from '../contexts/modals';
import { ReactElement } from 'react';

type NextComponentTypeWithLayout<P = {}> = NextComponentType<NextPageContext, any, P> & {
  getLayout?: (page: ReactElement) => ReactElement;
};

type AppWithLayoutProps<P = {}> = AppProps & {
  Component: NextComponentTypeWithLayout;
};

export const apolloClient = new ApolloClient({
  uri: 'http://localhost:5000/api/graphql',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppWithLayoutProps) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => <Layout>{page}</Layout>);

  return (
    <ApolloProvider client={apolloClient}>
      <ModalProvider>{getLayout(<Component {...pageProps} />)}</ModalProvider>
    </ApolloProvider>
  );
}
export default MyApp;
