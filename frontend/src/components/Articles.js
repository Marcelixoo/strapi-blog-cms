import React from 'react';
import { Card } from './Card';

const Articles = ({ articles }) => {
  const leftArticlesCount = Math.ceil(articles.length / 5);
  const leftArticles = articles.slice(0, leftArticlesCount);
  const rightArticles = articles.slice(leftArticlesCount, articles.length);

  return (
    <div>
      <div className="uk-child-width-1-2@s" data-uk-grid='true'>
        <div>
          {leftArticles && leftArticles.map((article) => (
            <Card article={article} key={`article__left__${article.slug}`} />
          ))}
        </div>
        <div>
          <div className="uk-child-width-1-2@m uk-grid-match" data-uk-grid='true'>
            {rightArticles && rightArticles.map((article) => (
              <Card article={article} key={`article__right__${article.slug}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Articles };