// src/pages/JobsPage.tsx

import { useEffect, useState } from "react";
import axios from "axios";

type Job = {
  id: number;
  title: string;
  description: string;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("取得エラー:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">求人一覧</h1>
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p>{job.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
