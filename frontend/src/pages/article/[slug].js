import ReactMarkdown from 'react-markdown';
import Moment from 'react-moment';

import { Image } from '../../components/Image';
import { Layout } from '../../components/Layout';
import { Seo } from '../../components/Seo';

import { getStrapiMedia } from '../../services/media';
import { fetchAPI } from '../../services/api';

const Article = ({ article, categories }) => {
  const imageUrl = getStrapiMedia(article.image);

  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  };

  const imageStyle = {
    postition: 'static',
    borderRadius: '50%',
    height: 30,
  };

  return (
    <Layout cateogires={categories}>
      <Seo seo={seo} />
      <div
        id='banner'
        className={[
          'uk-height-medium',
          'uk-flex',
          'uk-flex-center',
          'uk-flex-middle',
          'uk-background-cover',
          'uk-light',
          'uk-padding',
          'uk-margin',
        ].join(' ')}
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <h1>{article.title}</h1>
      </div>

      <div className="uk-section">
        <div className="uk-container uk-container-small">
          <ReactMarkdown children={article.content}/>
          <hr className="uk-divider-small" />
          <div
            className="uk-grid-small uk-flex-left"
            data-uk-grid='true'
          >
            <div>
              {article.author.picture && (<Image image={article.author.picture} style={imageStyle} />)}
            </div>
            <div className="uk-width-expand">
              <p className="uk-margin-remove-bottom">
                By {article.author.name}
              </p>
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format='MMM Do YYYY'>{article.published_at}</Moment>
              </p>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export async function getStaticPaths() {
  const articles = await fetchAPI('/articles');

  return {
    paths: articles.map(article => ({ params: { slug: article.slug }})),
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const articles = await fetchAPI(`/articles?slug=${params.slug}`);
  const categories = await fetchAPI('/categories');

  return {
    props: { article: articles[0], categories },
    revalidate: 1,
  };
};

export default Article;