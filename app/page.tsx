import Confessions from "@/components/confessions";
import ServerForm from "@/components/forms/server-form";

function Home() {
  return (
    <div className="mt-5">
      <ServerForm />
      <Confessions />
    </div>
  );
}

export default Home;
