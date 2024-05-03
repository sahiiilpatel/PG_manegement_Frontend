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
import { useToast } from '@/components/ui/use-toast';
import { CellAction } from '../students-table/cell-action';
// import { addUser } from '@/api/user/userApi';
// import { Plus } from 'lucide-react';
import { formatDate } from 'date-fns';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { assignBed } from '@/api/bed/bedApi';

const bedFormSchema = z.object({
  rentAmount: z.string().min(1, { message: 'Rent Amount is required' }),
  depositeAmount: z.string().min(1, { message: 'Deposite Amount is required' }),
  fullName: z.string().min(1, { message: 'Full Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  age: z.number().int().positive({ message: 'Age must be a positive integer' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  phoneNumber: z.string().min(10, { message: 'Phone Number is required' }),
  emergencyContactName: z
    .string()
    .min(1, { message: 'Emergency Contact Name is required' }),
  emergencyContactNo: z
    .string()
    .min(10, { message: 'Emergency Contact Number is required' })
});

type BedFormSchemaType = z.infer<typeof bedFormSchema>;

const AddBed = ({
  // selectedValue,
  // setSelectedValue,
  bedList,
  isLoading,
  userListUnAssign
}: {
  // selectedValue: any;
  // setSelectedValue: any;
  bedList: any;
  isLoading: boolean;
  userListUnAssign;
}) => {
  // const [selectedType, setSelectedType] =
  //   useState<React.Dispatch<React.SetStateAction<string>>>('');
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpneDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  // const [selectedRow, setSelectedRow] = useState<any>(null);
  // console.log('selectedRow: ', selectedRow);
  const [_, setSelectedRow] = useState<any>(null);
  const [selectedBedRow, setSelectedBedRow] = useState<any>(null);

  const { toast } = useToast();

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
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
      header: 'Pg Name',
      cell: ({ row }) => {
        console.log(row);
        return row.original.pgName ? <p>{row.original.pgName}</p> : <>--</>;
      }
    },
    {
      accessorKey: 'roomNumber',
      header: 'Room Number',
      cell: ({ row }) => {
        console.log(row);
        return row.original.roomNumber ? (
          <p>{row.original.roomNumber}</p>
        ) : (
          <>--</>
        );
      }
    },
    {
      accessorKey: 'occupantName',
      header: 'Occupant Name',
      cell: ({ row }) => {
        console.log(row);
        return row.original.occupantName ? (
          <p>{row.original.occupantName}</p>
        ) : (
          <>--</>
        );
      }
    },
    {
      accessorKey: 'checkInDate',
      header: 'Check In Date',
      cell: ({ row }) => {
        console.log(row);
        return row.original.checkInDate ? (
          <p>{formatDate(row.original.checkInDate, 'dd-MM-yyyy')}</p>
        ) : (
          <>--</>
        );
      }
    },
    {
      accessorKey: 'depositAmount',
      header: 'Deposit Amount',
      cell: ({ row }) => {
        console.log(row);
        return row.original.depositAmount ? (
          <p>{row.original.depositAmount}</p>
        ) : (
          <>--</>
        );
      }
    },
    {
      accessorKey: 'pendingRentAmount',
      header: 'Pending Rent Amount',
      cell: ({ row }) => {
        console.log(row);
        return row.original.pendingRentAmount ? (
          <p>{row.original.pendingRentAmount}</p>
        ) : (
          <>--</>
        );
      }
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
            isOpenDrawer={isOpneDrawer}
            setIsOpenDrawer={setIsOpenDrawer}
            setSelectedBedRow={setSelectedBedRow}
          />
        );
      }
    }
  ];

  const form = useForm<BedFormSchemaType>({
    resolver: zodResolver(bedFormSchema),
    defaultValues: {}
  });

  const onSubmit = async (values: BedFormSchemaType) => {
    console.log(values, 'values');
    try {
      setLoading(true);
      const response = await assignBed(selectedBedRow._id, {
        ...values,
        occupantId: selectedType
      });
      console.log(response, 'response11111');
      if (response.statuCode === 200) {
        handleCloseDrawer();
        toast({
          variant: 'default',
          title: `${response?.message}`
        });
        form.reset();
        setLoading(false);
      }
    } catch (error: any) {
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

  return (
    <div className="px-2">
      {/* <Heading
              title={selectedValue?.pgName}
              className="space-y-2 py-4 text-center"
          /> */}
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-1 gap-4">
          <Input
            placeholder={`search value`}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full md:max-w-sm"
          />
          <Select
            onValueChange={(e: any) => {
              setSelectedType(e);
            }}
          >
            <SelectTrigger className="w-[180px] shadow-inner drop-shadow-xl">
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
        </div>
        {/* <div className="flex gap-3">
          <Button
            className="text-xs md:text-sm"
            onClick={() => setIsOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Bed
          </Button>
        </div> */}
      </div>

      {!isLoading ? (
        // selectedValuePg &&
        bedList?.data?.list?.length > 0 ? (
          <DataTable
            columns={columns}
            data={bedList?.data?.list}
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
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter your fullName"
                              {...field}
                              className="px-4 py-6 shadow-inner drop-shadow-xl"
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
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
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
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter age"
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
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter password"
                              type="password"
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
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter phone Number"
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
                      name="emergencyContactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter emergency Contact Name"
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
                      name="emergencyContactNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter emergency ContactNo"
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
                      Add Bed
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <Sheet open={isOpneDrawer} onOpenChange={handleCloseDrawer}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Assign Bed</SheetTitle>
            <SheetDescription>
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
                  <div className="flex flex-col justify-center gap-4 py-6">
                    <Select
                      onValueChange={(e: any) => {
                        setSelectedType(e);
                      }}
                    >
                      <SelectTrigger className=" px-4 py-6 shadow-inner drop-shadow-xl">
                        <SelectValue placeholder="Select user" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {userListUnAssign?.data?.length > 0 ? (
                            userListUnAssign?.data?.map((res: any) => {
                              return (
                                <SelectItem value={res?._id}>
                                  {res?.fullName}
                                </SelectItem>
                              );
                            })
                          ) : (
                            <SelectItem value="" disabled>
                              {' '}
                              No Data Found
                            </SelectItem>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormField
                      control={form.control}
                      name="rentAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter Rent Amount"
                              {...field}
                              className="px-4 py-6 shadow-inner drop-shadow-xl"
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
                              placeholder="Enter Deposite Amount"
                              {...field}
                              className=" px-4 py-6 shadow-inner drop-shadow-xl"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {loading ? (
                    <div className="flex items-center justify-center gap-4">
                      <Button
                        type="submit"
                        className="w-screen rounded-full"
                        size="lg"
                      >
                        <ClipLoader className="text-sm" color="#000000" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-4">
                      {' '}
                      <Button
                        type="button"
                        variant="secondary"
                        className="rounded-full "
                        size="lg"
                        onClick={handleCloseDrawer}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="rounded-full" size="lg">
                        Assign Room
                      </Button>
                    </div>
                  )}
                </form>
              </Form>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddBed;
