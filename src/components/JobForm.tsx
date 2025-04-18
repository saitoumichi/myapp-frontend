// src/components/JobForm.tsx（新規ファイルとして分けてもOK）

import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
type Category = {
  id: number;
  name: string;
};

export default function JobForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("カテゴリ取得エラー:", err));
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/v1/jobs", {
        title,
        description,
        category_id: Number(categoryId),
      })
      .then(() => {
        alert("求人を投稿しました！");
        setTitle("");
        setDescription("");
        setCategoryId("");
      })
      .catch((err) => {
        console.error("投稿エラー:", err);
        alert("投稿に失敗しました");
      });
  };
  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded shadow max-w-xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">求人を投稿する</h2>

      <input
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full mb-4 p-2 border rounded"
        required
      />

      <textarea
        placeholder="仕事内容など"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="block w-full mb-4 p-2 border rounded"
        required
      />

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="block w-full mb-4 p-2 border rounded"
        required
      >
        <option value="">カテゴリを選択</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        投稿
      </button>
    </form>
  );
}
