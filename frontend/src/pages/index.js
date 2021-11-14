import React from 'react';
import { Layout } from '../components/Layout';
import { Seo } from '../components/Seo';
import { Articles } from '../components/Articles';
import { fetchAPI } from '../services/api';

function Home({ articles, categories, homepage }) {
  return (
    <Layout categories={categories}>
      <Seo seo={homepage.seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{homepage.hero.title}</h1>
          <Articles articles={articles} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const [articles, categories, homepage] = await Promise.all([
    fetchAPI('/articles'),
    fetchAPI('/categories'),
    fetchAPI('/homepage'),
  ]);

  return {
    props: { articles, categories, homepage },
    revalidate: 1,
  };
}

export default Home;
