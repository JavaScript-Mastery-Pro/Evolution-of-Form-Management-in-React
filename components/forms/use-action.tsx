"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createConfession } from "@/lib/appwrite";
import { Weapons } from "@/lib/utils";
import { useActionState } from "react";
import { toast } from "@/hooks/use-toast";
import { RefreshCcw } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function submitConfession(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const weapon = formData.get("weapon") as string;
  const confession = formData.get("confession") as string;

  try {
    const result = await createConfession(name, weapon, confession);
    if (!result) throw new Error("Failed to create confession");

    toast({
      title: "Confession submitted successfully!",
      description: "Your secret is safe with us.",
    });

    return { success: true };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    toast({
      title: "Something went wrong.",
      description: errorMessage,
      variant: "destructive",
    });

    return {
      success: false,
      error: errorMessage,
    };
  }
}

function UseActionStateForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction, isPending] = useActionState(
    submitConfession,
    undefined
  );

  return (
    <form action={formAction} className="form">
      <h3 className="heading">Share Your Confession</h3>

      <div className="space-y-2">
        <Label htmlFor="name" className="label">
          Code Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="e.g., Lord of the Pings, Darth Coder"
          className="input"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="weapon" className="label">
          Weapon of Choice
        </Label>
        <Select name="weapon">
          <SelectTrigger className="select">
            <SelectValue placeholder="Select your debugging weapon" />
          </SelectTrigger>
          <SelectContent>
            {Weapons.map((weapon) => (
              <SelectItem key={weapon.title} value={weapon.title}>
                <span className="flex items-center">
                  <weapon.icon className="mr-2 h-4 w-4" />
                  {weapon.title}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confession" className="label">
          Your Confession
        </Label>
        <Textarea
          id="confession"
          name="confession"
          placeholder="Confess your most embarrassing bug or your weirdest coding habit"
          className="textarea"
          required
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="reset" variant="outline" className="btn-clear">
          Clear
        </Button>
        <Button type="submit" disabled={isPending} className="btn">
          {isPending && <RefreshCcw className="mr-1 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </div>
    </form>
  );
}

export default UseActionStateForm;
