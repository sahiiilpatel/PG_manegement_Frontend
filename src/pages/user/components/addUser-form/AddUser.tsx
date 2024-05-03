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
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { addUser } from '@/api/user/userApi';
import { Plus } from 'lucide-react';

const studentFormSchema = z.object({
  fullName: z.string().min(1, { message: 'fullName is required' }),
  email: z
    .string()
    .email('email is not valid')
    .min(1, { message: 'email is required' }),
  age: z.string().min(1, { message: 'age is required' }),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character')
    .min(1, { message: 'password is required' }),
  phoneNumber: z.string().min(1, { message: 'phoneNumber is required' }),
  emergencyContactName: z
    .string()
    .min(1, { message: 'emergencyContactName is required' }),
  emergencyContactNo: z
    .string()
    .min(1, { message: 'emergencyContactNo is required' })
});

type StudentFormSchemaType = z.infer<typeof studentFormSchema>;

const AddUser = ({
  // selectedValue,
  // setSelectedValue,
  userList,
  isLoading
}: {
  // selectedValue: any;
  // setSelectedValue: any;
  userList: any;
  isLoading: boolean;
}) => {
  const [selectedType, setSelectedType] =
    useState<React.Dispatch<React.SetStateAction<string>>>();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const { toast } = useToast();

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
      accessorKey: 'fullName',
      header: 'Full Name'
    },
    {
      accessorKey: 'email',
      header: 'Email'
    },
    {
      accessorKey: 'phoneNumber',
      header: 'Contact'
    },
    {
      accessorKey: 'gender',
      header: 'Gender'
    },
    {
      accessorKey: 'emergencyContactName',
      header: 'Emergency Contact Name'
    },
    {
      accessorKey: 'emergencyContactNo',
      header: 'Emergency Contact No'
    },
    {
      accessorKey: 'age',
      header: 'Age'
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
    console.log(values, 'values');
    try {
      setLoading(true);
      const response = await addUser({
        ...values,
        gender: selectedType
      });
      console.log(response, 'response11111');
      if (response.statuCode === 200) {
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
        <div className="flex gap-3">
          <Button
            className="text-xs md:text-sm"
            onClick={() => setIsOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add User
          </Button>
        </div>
      </div>

      {!isLoading ? (
        // selectedValuePg &&
        userList?.data?.list?.length > 0 ? (
          <DataTable
            columns={columns}
            data={userList?.data?.list}
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
                      Add User
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddUser;
