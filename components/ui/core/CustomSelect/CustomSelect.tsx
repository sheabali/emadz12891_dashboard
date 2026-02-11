import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CustomSelect = ({
  label,
  placeholder,
  options,
  onChange,
}: {
  label: string;
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
}) => (
  <Select onValueChange={onChange}>
    <SelectTrigger className="w-[180px] mt-4 py-6 me-3">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>{label}</SelectLabel>
        {options.map((option, index) => (
          <SelectItem key={index} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);
