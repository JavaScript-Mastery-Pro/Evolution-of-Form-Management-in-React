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
import { Textarea } from "@/components/ui/textarea";
import { cn, Weapons } from "@/lib/utils";
import { createConfession } from "@/lib/appwrite";
import { Button } from "@/components/ui/button";
import { use, useOptimistic } from "react";
import { ConfessionItem } from "@/components/confessions";

type OptimistiConfesssion = Confession & { sending?: boolean };

function UseOptimisticForm({
  confessionPromise,
}: {
  confessionPromise: Promise<Confession[]>;
}) {
  const confessions = use(confessionPromise);

  const [optimisticConfessions, addOptimisticConfession] = useOptimistic(
    confessions,
    (currentState, optimisticValue: OptimistiConfesssion) => {
      return [optimisticValue, ...currentState];
    }
  );

  async function formAction(formData: FormData) {
    const name = formData.get("name") as string;
    const weapon = formData.get("weapon") as string;
    const confession = formData.get("confession") as string;

    const newConfession = {
      $id: Date.now().toString(),
      name,
      weapon,
      confession,
      sending: true,
    };

    addOptimisticConfession(newConfession);

    try {
      await createConfession(name, weapon, confession);
    } catch (error) {
      console.error("Failed to create confession:", error);
    }
  }

  return (
    <>
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
          <Select name="weapon" required>
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
          <Button type="submit" className="btn">
            Submit
          </Button>
        </div>
      </form>

      <section className="my-10 flex gap-5 flex-col">
        <h3 className="text-2xl font-bold">All Confessions</h3>

        {optimisticConfessions.map((confession: OptimistiConfesssion) => (
          <div
            key={confession.$id}
            className={cn(
              "transition-opacity duration-300",
              confession?.sending ? "opacity-50 animate-pulse" : "opacity-100"
            )}
          >
            <ConfessionItem
              name={confession.name}
              weapon={confession.weapon}
              confession={confession.confession}
            />
          </div>
        ))}
      </section>
    </>
  );
}

export default UseOptimisticForm;
