import qs from 'qs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import DisqusComments from '../../../components/Comments';
const API = process.env.NEXT_PUBLIC_API;
export const dynamic = "force-dynamic";


async function fetchArticle(slug) {
  const query = qs.stringify({
    filters: { slug: slug },
  });

  const articlesPromise = await fetch(
    `${API}/articles?${query}&populate[0]=image&populate[1]=writers&populate[2]=translators&populate[3]=source`
  );
  const article = await articlesPromise.json();
  return article.data[0];
}

function toPersianNumber(num) {
  return num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
}

// extract headings with remark
function extractHeadings(markdown) {
  const tree = unified().use(remarkParse).parse(markdown);
  const headings = [];

  function visit(node) {
    if (node.type === 'heading') {
      const text = node.children
        .filter(c => c.type === 'text')
        .map(c => c.value)
        .join('');

      if (node.depth === 1) {
        headings.push({ text, id: slugify(text), level: 1 });
      } else if (node.depth === 2 || node.depth === 3) {
        const id = slugify(text);
        if (text !== 'پانوشت‌ها:') {
          headings.push({ text, id, level: node.depth });
        }
      }
    }
    if (node.children) {
      node.children.forEach(visit);
    }
  }

  visit(tree);
  return headings;
}

function slugify(text) {
  return text
    .toString()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\u0600-\u06FF\w\-]+/g, '')
    .toLowerCase();
}

export default async function Page({ params }) {
  const { slug } = await params;
  const article = await fetchArticle(slug);

  // Collect headings once before render
  const headings = extractHeadings(article.content);

  // add main H1 from article.name at the start
  if (article.name) {
    headings.unshift({ text: article.name, id: slugify(article.name), level: 1 });
  }

  // ensure footnotes link always at the end if present
  if (article.content.includes("[^")) {
    headings.push({ text: "پانوشت‌ها", id: "footnote-label", level: 2, isFootnote: true });
  }

  headings.push({ text: "نظرات", id: "comments-section", level: 2 });

  const components = {
    a({ node, ...props }) {
      if (
        (props.className && props.className.includes('data-footnote-backref')) ||
        props['data-footnote-ref']
      ) {
        return <a {...props}>{toPersianNumber(props.children)}</a>;
      } else {
        return (
          <a {...props} target="_blank" rel="noopener noreferrer">
            {props.children}
          </a>
        );
      }
    },
    h1({ node, ...props }) {
      const text = String(props.children);
      return (
        <h1 id={slugify(text)} className="text-3xl font-bold mt-6 mb-4">
          {text}
        </h1>
      );
    },
    h2({ node, ...props }) {
      if (props.id === "footnote-label") {
        return (
          <h2 id="footnote-label" className="text-lg font-bold mt-6">
            پانوشت‌ها:
          </h2>
        );
      }
      const text = String(props.children);
      return (
        <h2 id={slugify(text)} className="text-xl font-bold mt-6 mb-2">
          {text}
        </h2>
      );
    },
    h3({ node, ...props }) {
      const text = String(props.children);
      return (
        <h3 id={slugify(text)} className="text-lg mt-4 mb-2">
          {text}
        </h3>
      );
    },
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 md:mx-32 md:my-8">
      <article className="flex-1 bg-white md:rounded-lg shadow-md">
        <div className="headerimg">
          <img
            className="md:rounded-lg"
            src={`http://localhost:1337${article.image.url}`}
            alt={article.name}
          />
        </div>

        <div className="content md:px-8 px-4z">
          <div className="top mb-8 text-white md:py-8 py-2">
            <h1 id={slugify(article.name)} className="text-3xl pb-4 px-8 font-bold">
              {article.name}
            </h1>
            <h2 className="text-2xl pt-4 px-8 font-bold ltr">
              {article.originalName}
            </h2>
          </div>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {article.content}
          </ReactMarkdown>

          <div className='comments mt-16'>
            <h2 className='text-lg font-bold pt-4' id='comments-section'>نظرات</h2>
            <DisqusComments article="article" />
          </div>
          
        </div>
      </article>

      <aside className="w-full md:w-1/3 sticky top-[6rem] self-start">
        <div className="bg-gray-100 md:rounded-lg shadow-md p-4 mb-2">
          <h2 className="font-bold mb-4">اطلاعات مقاله</h2>
          <hr className="my-4" />
          <ul className="space-y-2">
            <li>
              <strong>نویسنده:</strong> {(article.writers ?? []).map(w => w.name).join(", ")}
            </li>
            <li>
              <strong>مترجم:</strong> {(article.translators ?? []).map(w => w.name).join(", ")}
            </li>
            <li>
              <strong>سال چاپ:</strong>{' '}
              {new Intl.NumberFormat('fa-IR', { useGrouping: false }).format(
                article.OriginalPublishedYear
              )}
            </li>
            <li>
              <strong>نشر مشطاح:</strong>{' '}
              {new Date(article.createdAt).toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </li>
            {article.source?.name && (
              <li>
                <strong>ماخذ:</strong>{' '}
                <a
                  className="text-niceblue hover:underline"
                  href={article.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.source.name}
                </a>
              </li>
            )}
          </ul>
        </div>
        <div className="bg-gray-100 md:rounded-lg shadow-md p-4 mb-2">
          <h2 className="font-bold mb-4">فهرست مطالب</h2>
          <hr className="my-4 bg-dustyred" />
          <ol className="space-y-2 px-4">
            {headings.map((h, i) => (
              <li key={i} className={h.level === 3 ? 'ml-4' : ''}>
                <a href={`#${h.id}`} className="text-niceblue hover:underline">
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        </div>
        <div className="bg-gray-100 md:rounded-lg shadow-md p-4">
          <h2 className="font-bold mb-4">توضیحات</h2>
          <hr className="my-4 bg-dustyred" />
            <p className='text-sm'>{article.description}</p>
        </div>
      </aside>
    </div>
  );
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const article = await fetchArticle(slug);

  return {
    title: article.name,
    description: article.description,
    openGraph: {
      title: article.name,
      description: article.description,
      images: [`http://localhost:1337${article.image?.url}`],
    },
  };
}