import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export const SelectType = ({
  placeholder,
  data,
  selectedValue,
  setSelectedValue
}: {
  placeholder?: string;
  data?: any;
  selectedValue?: any;
  setSelectedValue?: any;
}) => {
  const pgList: any = data?.data?.list;
  return (
    <div>
      <Select
        onValueChange={(e: any) => {
          setSelectedValue(e);
        }}
      >
        <SelectTrigger className="px-4 py-6 shadow-inner drop-shadow-xl">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {pgList?.map((res: any) => {
              return <SelectItem value={res}>{res?.pgName}</SelectItem>;
            })}
            {/* <SelectLabel>Fruits</SelectLabel> */}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
