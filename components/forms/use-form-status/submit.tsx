"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useFormStatus } from "react-dom";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-end space-x-4">
      <Button type="reset" variant="outline" className="px-8">
        Clear
      </Button>
      <Button
        type="submit"
        disabled={pending}
        className="bg-black hover:bg-gray-800 text-white px-8"
      >
        {pending && <RefreshCcw className="mr-1 h-4 w-4 animate-spin" />}
        Submit
      </Button>
    </div>
  );
}

export default Submit;
