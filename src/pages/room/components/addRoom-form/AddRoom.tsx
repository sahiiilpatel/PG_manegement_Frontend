import {
  addRoom
  //  getRoomListByPgId
} from '@/api/room/roomApi';
import Heading from '@/components/shared/heading';
import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle
// } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
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
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import StudentTableActions from '../room-table/student-table-action';
import {
  // useGetRoomListByPgId,
  useRoomDataQuery,
  useRoomListQuery
} from '../../queries/queries';
// import StudentsTable from '../room-table';
// import { useQuery } from '@tanstack/react-query';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import DataTable from '@/components/shared/data-table';
import { CellAction } from '../room-table/cell-action';
import { ColumnDef } from '@tanstack/react-table';
// import PopupModal from '@/components/shared/popup-modal';
// import { Modal } from '@/components/ui/modal';
// import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle
  // DialogTrigger
} from '@/components/ui/dialog';

const studentFormSchema = z.object({
  roomNumber: z.string().min(1, { message: 'RoomNumber is required' }),
  // roomType: z.string().no min(1, { message: 'RoomType is required' }),
  bedCount: z.string().min(1, { message: 'Bed Count is required' }),
  rentAmount: z.string().min(1, { message: 'Rent Amount is required' }),
  depositeAmount: z.string().min(1, { message: 'Deposite Amount is required' })
});

type StudentFormSchemaType = z.infer<typeof studentFormSchema>;

const AddRoom = ({
  // selectedValue,
  // setSelectedValue,
  pgList,
  roomList
}: {
  // selectedValue: any;
  // setSelectedValue: any;
  pgList: any;
  roomList: any;
}) => {
  const [selectedType, setSelectedType] =
    useState<React.Dispatch<React.SetStateAction<string>>>();
  const [selectedValue, setSelectedValue] = useState<
    React.Dispatch<React.SetStateAction<undefined>> | any
  >(null);
  const [selectedValueRoom, setSelectedValueRoom] = useState<
    React.Dispatch<React.SetStateAction<undefined>> | any
  >();
  const [selectedValuePg, setSelectedValuePg] = useState<
    React.Dispatch<React.SetStateAction<undefined>> | any
  >();
  const [activeTab, setActiveTab] = useState<string>('1');
  const { data, isLoading }: any = useRoomListQuery(
    activeTab,
    selectedValuePg?._id
  );
  const { data: data1, isLoading: isLoading1 }: any = useRoomDataQuery(
    activeTab,
    selectedValueRoom?._id
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [selectedRow, setSelectedRow] = useState<any>(null);
  // console.log('selectedRow: ', selectedRow);
  const [_, setSelectedRow] = useState<any>(null);

  // const onClose = () => {
  //   setIsOpen(false);
  // };

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
      accessorKey: 'roomNumber',
      header: 'Room Number'
    },
    {
      accessorKey: 'roomType',
      header: 'Room Type'
    },
    {
      accessorKey: 'bedCount',
      header: 'Bed Count'
    },
    {
      accessorKey: 'rentAmount',
      header: 'Rent Amount'
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
      const response = await addRoom(selectedValue?._id, {
        ...values,
        roomType: selectedType
      });
      console.log(response, 'response11111');
      if (response.statuCode === 200) {
        toast({
          variant: 'default',
          title: `${response?.message}`
        });
        form.reset();
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: `${error.message}`,
        description: 'There was a problem with your request.',
        action: <ToastAction altText="Try again">Try again</ToastAction>
      });
      return error;
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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="1" onClick={() => handleTabChange('1')}>
            Add Room
          </TabsTrigger>
          <TabsTrigger value="2" onClick={() => handleTabChange('2')}>
            Rooms List By Pg
          </TabsTrigger>
          <TabsTrigger value="3" onClick={() => handleTabChange('3')}>
            Room List
          </TabsTrigger>
        </TabsList>
        <TabsContent value="1">
          <Heading title={'Add Room'} className="space-y-2 py-4 text-left" />
          <StudentTableActions
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            pgList={pgList}
          />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <FormField
                  control={form.control}
                  name="depositeAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter your Deposite amount"
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
                    // setSelectedValue();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="rounded-full" size="lg">
                  Add Room
                </Button>
              </div>
            </form>
          </Form>
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
              <SelectValue placeholder={'select room'} />
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
            selectedValuePg &&
            (data?.data?.length > 0 ? (
              <DataTable columns={columns} data={data?.data} pageCount={1} />
            ) : (
              <p>No Data Found</p>
            ))
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
        <TabsContent value="3">
          <Heading
            title={'List Room Data'}
            className="space-y-2 py-4 text-left"
          />
          <Select
            onValueChange={(e: any) => {
              setSelectedValueRoom(e);
            }}
          >
            <SelectTrigger className="px-4 py-6 shadow-inner drop-shadow-xl">
              <SelectValue placeholder={'select room'} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {roomList?.data?.map((res: any) => {
                  return <SelectItem value={res}>{res?.roomNumber}</SelectItem>;
                })}
                {/* <SelectLabel>Fruits</SelectLabel> */}
              </SelectGroup>
            </SelectContent>
          </Select>
          {!isLoading1 ? (
            selectedValueRoom &&
            (data1?.data?.length > 0 ? (
              <DataTable columns={columns} data={data1?.data} pageCount={1} />
            ) : (
              <p>No Data Found</p>
            ))
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

export default AddRoom;
