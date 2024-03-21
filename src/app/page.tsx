import Search from "./component/Search";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // searchParamsオブジェクトのtitleプロパティが文字列型のデータであれば、その文字列型のデータを格納
  const searchTitle =
    typeof searchParams.title === "string" ? searchParams.title : undefined;

  // Seachコンポーネントのfetchを使って、データを取得している
  const posts: POSTS = await getData({ query: searchTitle });

  // フィルタリングされたデータ
  const filterdPosts = posts.filter((post) => post.title.includes(searchTitle));

  return (
    <>
      <Search search={searchTitle} />
      <h1>Filtered Posts</h1>
      {/* フィルタリングされたデータを展開 */}
      {filterdPosts.length > 0 ? (
        <ul>
          {filterdPosts.map((filteredPost, index) => (
            <li key={filteredPost.id}>
              {index+1} {filteredPost.title}
            </li>
          ))}
        </ul>
      ) : <p>入力欄に何か文字を入れてください</p>}

      <h1>Posts</h1>
      {/* フィルタリングされていないデータを展開 */}
      <ul>
        {posts.map((post, index) => (
          <li key={post.id}>
            {index+1} {post.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Page;

async function getData({ query }: { query: string | undefined }) {
  let res;
  if (query) {
    res = await fetch(`https://jsonplaceholder.typicode.com/posts?${query}`);
  } else {
    res = await fetch(`https://jsonplaceholder.typicode.com/posts/`);
  }

  return res.json();
}

export type POSTS = {
  id: number;
  title: string;
}[];
