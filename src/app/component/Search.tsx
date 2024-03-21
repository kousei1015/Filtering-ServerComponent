"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

const Search = ({ search }: { search?: string }) => {
  const router = useRouter();
  const initialRender = useRef(true);

  const [text, setText] = useState(search);
  // UXなどの観点から、入力欄に文字を入れてから500ms遅延した後にuseEffect内の処理が走るようにしています
  const [query] = useDebounce(text, 500);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!query) {
      router.push(`/`);
    } else {
      router.push(`/?title=${query}`);
    }
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={text}
        placeholder="検索するにはキーワードを入力して下さい"
        onChange={(e) => setText(e.target.value)}
        style={{ display: "inline-block", width: "50%", height: "40px" }}
      />
    </div>
  );
};

export default Search;
