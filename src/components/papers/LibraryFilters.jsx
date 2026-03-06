import { DATE_RANGE_FILTERS, IMPACT_SCORES, READING_STAGES, RESEARCH_DOMAINS } from "@/constants/paperOptions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const toSafeId = (text) => text.toLowerCase().replace(/\s+/g, "-");

const FilterGroup = ({ title, options, selectedValues, onToggle }) => {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold">{title}</h4>
      <div className="space-y-2">
        {options.map((option) => {
          const id = `${toSafeId(title)}-${toSafeId(option)}`;

          return (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox id={id} checked={selectedValues.includes(option)} onCheckedChange={(checked) => onToggle(option, checked === true)} />
              <Label htmlFor={id} className="font-normal">
                {option}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export function LibraryFilters({ filters, onFiltersChange, onClearFilters }) {
  const toggleArrayFilter = (filterKey, value, isChecked) => {
    const currentValues = filters[filterKey];
    const nextValues = isChecked ? [...currentValues, value] : currentValues.filter((item) => item !== value);

    onFiltersChange({
      ...filters,
      [filterKey]: nextValues,
    });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Library Filters</CardTitle>
        <CardDescription>Use multiple filters together to narrow down papers.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <FilterGroup
          title="Reading Stage"
          options={READING_STAGES}
          selectedValues={filters.readingStage}
          onToggle={(value, checked) => toggleArrayFilter("readingStage", value, checked)}
        />

        <FilterGroup
          title="Research Domain"
          options={RESEARCH_DOMAINS}
          selectedValues={filters.researchDomain}
          onToggle={(value, checked) => toggleArrayFilter("researchDomain", value, checked)}
        />

        <FilterGroup
          title="Impact Score"
          options={IMPACT_SCORES}
          selectedValues={filters.impactScore}
          onToggle={(value, checked) => toggleArrayFilter("impactScore", value, checked)}
        />

        <div className="space-y-2">
          <Label>Date Added</Label>
          <Select value={filters.dateRange} onValueChange={(value) => onFiltersChange({ ...filters, dateRange: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              {DATE_RANGE_FILTERS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="button" variant="secondary" className="w-full" onClick={onClearFilters}>
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
}
