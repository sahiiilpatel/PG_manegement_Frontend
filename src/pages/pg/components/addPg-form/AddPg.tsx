import { addRoom } from '@/api/room/roomApi';
import Heading from '@/components/shared/heading';
import { Button } from '@/components/ui/button';
import { ClipLoader } from 'react-spinners';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToastAction } from '@/components/ui/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import DataTable from '@/components/shared/data-table';
import { ColumnDef } from '@tanstack/react-table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { addPg } from '@/api/pg/pgApi';
import { useToast } from '@/components/ui/use-toast';
import { useRoomListQuery } from '@/pages/room/queries/queries';
import { CellAction } from '../students-table/cell-action';

const studentFormSchema = z.object({
  pgName: z.string().min(1, { message: 'pgName is required' }),
  unitCount: z.string().min(1, { message: 'unit count is required' }),
  email: z.string().min(1, { message: 'email Count is required' }),
  contactNo: z.string().min(1, { message: 'contactNo Count is required' }),
  description: z.string().min(1, { message: 'description Count is required' }),
  facility: z.string().min(1, { message: 'facility Count is required' }),
  termsAndConditions: z
    .string()
    .min(1, { message: 'termsAndConditions Count is required' }),
  addressLine1: z
    .string()
    .min(1, { message: 'addressLine1 Count is required' }),
  addressLine2: z
    .string()
    .min(1, { message: 'addressLine2 Count is required' }),
  city: z.string().min(1, { message: 'city Count is required' }),
  zipCode: z.string().min(1, { message: 'zipCode Count is required' })
});

type StudentFormSchemaType = z.infer<typeof studentFormSchema>;

const AddPg = ({
  // selectedValue,
  // setSelectedValue,
  pgList
}: {
  // selectedValue: any;
  // setSelectedValue: any;
  pgList: any;
}) => {
  const [selectedType, setSelectedType] =
    useState<React.Dispatch<React.SetStateAction<string>>>();
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const [selectedValuePg, setSelectedValuePg] = useState<
    React.Dispatch<React.SetStateAction<undefined>> | any
  >();
  const [activeTab, setActiveTab] = useState<string>('1');
  const { data, isLoading }: any = useRoomListQuery(
    activeTab,
    selectedValuePg?._id
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const { toast } = useToast();

  const onClose = () => {
    setIsOpen(false);
  };

  const columns: ColumnDef<any>[] = [
    // {
    //   id: 'select',
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={table.getIsAllPageRowsSelected()}
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false
    // },
    {
      accessorKey: 'pgName',
      header: 'PG Name'
    },
    {
      accessorKey: 'email',
      header: 'Email'
    },
    {
      accessorKey: 'contactNo',
      header: 'Contact'
    },
    {
      accessorKey: 'pgType',
      header: 'PG Type'
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        setSelectedRow(row.original);
        return (
          <CellAction
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            data={row.original}
          />
        );
      }
    }
  ];

  const form = useForm<StudentFormSchemaType>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {}
  });

  const onSubmit = async (values: StudentFormSchemaType) => {
    try {
      setLoading(true);
      const response = await addPg({
        ...values,
        pgType: selectedType
      });
      console.log(response, 'response11111');
      if (response.statuCode === 200) {
        toast({
          variant: 'default',
          title: `${response?.message}`
        });
        setLoading(false);
        form.reset();
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: `${error.message}`,
        description: 'There was a problem with your request.',
        action: <ToastAction altText="Try again">Try again</ToastAction>
      });
      setLoading(false);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  return (
    <div className="px-2">
      {/* <Heading
                title={selectedValue?.pgName}
                className="space-y-2 py-4 text-center"
            /> */}

      <Tabs defaultValue={activeTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="1" onClick={() => handleTabChange('1')}>
            Add Pg
          </TabsTrigger>
          <TabsTrigger value="2" onClick={() => handleTabChange('2')}>
            Pg List
          </TabsTrigger>
        </TabsList>
        <TabsContent value="1">
          <Heading title={'Add Pg'} className="space-y-2 py-4 text-left" />
          {/* <StudentTableActions
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            pgList={pgList}
          /> */}
          {loading ? (
            <div className="flex items-center justify-center">
              <ClipLoader color="#ffffff" />
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Profile</FormLabel>
                                <FormControl>
                                    <FileUpload onChange={field.onChange} value={field.value} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            /> */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <FormField
                    control={form.control}
                    name="pgName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter your room Number"
                            {...field}
                            className="px-4 py-6 shadow-inner drop-shadow-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <FormField
                            // control={form.control}
                            // name="roomType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl> */}
                  <Select
                    onValueChange={(e: any) => {
                      setSelectedType(e);
                    }}
                  >
                    <SelectTrigger className=" px-4 py-6 shadow-inner drop-shadow-xl">
                      <SelectValue placeholder="Select Pg type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="only boys">Only Boys</SelectItem>
                        <SelectItem value="only girls">Only Girls</SelectItem>
                        <SelectItem value="any">Boys and Girls</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {/* </FormControl>
                                    <FormMessage />
                                </FormItem> */}
                  {/* )} */}
                  {/* /> */}
                  <FormField
                    control={form.control}
                    name="unitCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter unit count"
                            {...field}
                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter email"
                            {...field}
                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter contactNo"
                            {...field}
                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter description"
                            {...field}
                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="facility"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter facility"
                            {...field}
                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="termsAndConditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter termsAndConditions"
                            {...field}
                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="addressLine1"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter addressLine1"
                            {...field}
                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="addressLine2"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter addressLine2"
                            {...field}
                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter city"
                            {...field}
                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter zipCode"
                            {...field}
                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-center gap-4">
                  <Button
                    type="button"
                    variant="secondary"
                    className="rounded-full "
                    size="lg"
                    onClick={() => {
                      setSelectedValue(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="rounded-full" size="lg">
                    Add Pg
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </TabsContent>
        <TabsContent value="2">
          <Heading
            title={'List Room By Pg'}
            className="space-y-2 py-4 text-left"
          />
          <Select
            onValueChange={(e: any) => {
              setSelectedValuePg(e);
            }}
          >
            <SelectTrigger className="px-4 py-6 shadow-inner drop-shadow-xl">
              <SelectValue placeholder={'select Pg'} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {pgList?.data?.list?.map((res: any) => {
                  return <SelectItem value={res}>{res?.pgName}</SelectItem>;
                })}
                {/* <SelectLabel>Fruits</SelectLabel> */}
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <StudentTableActions selectedValue={selectedValuePg} setSelectedValue={setSelectedValuePg} pgList={pgList} /> */}
          {!isLoading ? (
            // selectedValuePg &&
            data?.data?.length > 0 ? (
              <DataTable
                columns={columns}
                data={pgList?.data?.list}
                pageCount={1}
              />
            ) : (
              <p>No Data Found</p>
            )
          ) : (
            <div className="p-5">
              <DataTableSkeleton
                columnCount={10}
                filterableColumnCount={2}
                searchableColumnCount={1}
              />
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog
        open={isOpen}
        onOpenChange={(e: any) => {
          setIsOpen(e);
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              <Heading
                title={'List Room Data'}
                className="space-y-2 py-4 text-left"
              />
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Profile</FormLabel>
                        <FormControl>
                            <FileUpload onChange={field.onChange} value={field.value} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    /> */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <FormField
                    control={form.control}
                    name="roomNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter your room Number"
                            {...field}
                            className="px-4 py-6 shadow-inner drop-shadow-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <FormField
                    // control={form.control}
                    // name="roomType"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl> */}
                  <Select
                    onValueChange={(e: any) => {
                      setSelectedType(e);
                    }}
                  >
                    <SelectTrigger className=" px-4 py-6 shadow-inner drop-shadow-xl">
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="AC">AC</SelectItem>
                        <SelectItem value="NON-AC">NON AC</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {/* </FormControl>
                            <FormMessage />
                        </FormItem> */}
                  {/* )} */}
                  {/* /> */}
                  <FormField
                    control={form.control}
                    name="bedCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter your bed count"
                            {...field}
                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rentAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter your rent amount"
                            {...field}
                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-center gap-4">
                  <Button
                    type="button"
                    variant="secondary"
                    className="rounded-full "
                    size="lg"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="rounded-full" size="lg">
                    Edit Room
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPg;
