import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const getImpactVariant = (impactScore) => {
  if (impactScore === "High Impact") {
    return "default";
  }

  if (impactScore === "Medium Impact") {
    return "secondary";
  }

  if (impactScore === "Low Impact") {
    return "outline";
  }

  return "outline";
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export function PaperLibraryTable({ papers, isLoading, isFetching }) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Paper Library</CardTitle>
        <CardDescription>
          {papers.length} paper(s) found with the active filters.
          {isFetching && !isLoading ? " Updating results..." : ""}
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[28rem]">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading papers...</p>
        ) : papers.length === 0 ? (
          <p className="text-sm text-muted-foreground">No papers match the selected filters.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paper Title</TableHead>
                <TableHead>First Author</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Reading Stage</TableHead>
                <TableHead>Citations</TableHead>
                <TableHead>Impact</TableHead>
                <TableHead>Date Added</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {papers.map((paper) => (
                <TableRow key={paper._id}>
                  <TableCell className="font-medium">{paper.paperTitle}</TableCell>
                  <TableCell>{paper.firstAuthorName}</TableCell>
                  <TableCell>{paper.researchDomain}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{paper.readingStage}</Badge>
                  </TableCell>
                  <TableCell>{paper.citationCount}</TableCell>
                  <TableCell>
                    <Badge variant={getImpactVariant(paper.impactScore)}>{paper.impactScore}</Badge>
                  </TableCell>
                  <TableCell>{formatDate(paper.dateAdded)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
