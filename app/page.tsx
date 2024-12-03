import Confessions from "@/components/confessions";
import UseActionStateForm from "@/components/forms/use-action";

function Home() {
  return (
    <div className="mt-5">
      <UseActionStateForm />
      <Confessions />
    </div>
  );
}

export default Home;
