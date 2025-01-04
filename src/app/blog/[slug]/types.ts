export interface BlogPageProps {
    params: {
      slug: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
  }