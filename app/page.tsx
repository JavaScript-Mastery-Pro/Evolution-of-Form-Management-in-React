import Confessions from "@/components/confessions";
import UseFormStatusForm from "@/components/forms/use-form-status";

function Home() {
  return (
    <div className="mt-5">
      <UseFormStatusForm />
      <Confessions />
    </div>
  );
}

export default Home;
