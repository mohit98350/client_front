import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { IMPACT_SCORES, READING_STAGES, RESEARCH_DOMAINS } from "@/constants/paperOptions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const getDefaultValues = () => ({
  paperTitle: "",
  firstAuthorName: "",
  researchDomain: RESEARCH_DOMAINS[0],
  readingStage: READING_STAGES[0],
  citationCount: 0,
  impactScore: "Unknown",
  dateAdded: new Date().toISOString().slice(0, 10),
});

const paperFormSchema = z.object({
  paperTitle: z.string().trim().min(2, "Paper title is required"),
  firstAuthorName: z.string().trim().min(2, "First author name is required"),
  researchDomain: z.enum(RESEARCH_DOMAINS),
  readingStage: z.enum(READING_STAGES),
  citationCount: z.coerce.number().int().min(0, "Citation count cannot be negative"),
  impactScore: z.enum(IMPACT_SCORES),
  dateAdded: z.string().min(1, "Date added is required"),
});

export function PaperForm({ onCreatePaper, isSubmitting }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paperFormSchema),
    defaultValues: getDefaultValues(),
  });

  const submitHandler = async (values) => {
    await onCreatePaper({
      ...values,
      citationCount: Number(values.citationCount),
    });

    reset(getDefaultValues());
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Add Research Paper</CardTitle>
        <CardDescription>Track new papers with domain, stage, impact, and citation details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
          <div className="space-y-2">
            <Label htmlFor="paperTitle">Paper Title</Label>
            <Input id="paperTitle" placeholder="e.g. Attention Is All You Need" {...register("paperTitle")} />
            {errors.paperTitle ? <p className="text-xs text-destructive">{errors.paperTitle.message}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="firstAuthorName">First Author Name</Label>
            <Input id="firstAuthorName" placeholder="e.g. Ashish Vaswani" {...register("firstAuthorName")} />
            {errors.firstAuthorName ? <p className="text-xs text-destructive">{errors.firstAuthorName.message}</p> : null}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Research Domain</Label>
              <Controller
                control={control}
                name="researchDomain"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select domain" />
                    </SelectTrigger>
                    <SelectContent>
                      {RESEARCH_DOMAINS.map((domain) => (
                        <SelectItem key={domain} value={domain}>
                          {domain}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Reading Stage</Label>
              <Controller
                control={control}
                name="readingStage"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {READING_STAGES.map((stage) => (
                        <SelectItem key={stage} value={stage}>
                          {stage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="citationCount">Citation Count</Label>
              <Input id="citationCount" type="number" min={0} {...register("citationCount")} />
              {errors.citationCount ? <p className="text-xs text-destructive">{errors.citationCount.message}</p> : null}
            </div>

            <div className="space-y-2">
              <Label>Impact Score</Label>
              <Controller
                control={control}
                name="impactScore"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select impact" />
                    </SelectTrigger>
                    <SelectContent>
                      {IMPACT_SCORES.map((impact) => (
                        <SelectItem key={impact} value={impact}>
                          {impact}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateAdded">Date Added</Label>
            <Input id="dateAdded" type="date" {...register("dateAdded")} />
            {errors.dateAdded ? <p className="text-xs text-destructive">{errors.dateAdded.message}</p> : null}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding Paper..." : "Add Paper"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
