import Everything from "./components/everything/Everything";
import TopHeadlines from "./components/top-headlines/TopHeadlines";

export default function LocalePage() {
  return (
    <>
      <TopHeadlines category="sports" />
      <Everything pageSize={10} page={1} q="it's netflix" />
    </>
  );
}
