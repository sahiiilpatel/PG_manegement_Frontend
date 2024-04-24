import { login } from '@/api/auth/authApi';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/routes/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormFeedback from '@/components/errors/FormFeedback';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().email({ message: 'Enter a valid password' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const router = useRouter();
  const [loading] = useState(false);
  const defaultValues = {
    email: 'demo@gmail.com',
    password: ''
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    console.log('data', data);
    router.push('/');
  };

  const [loading1, setLoading1] = useState<Boolean>(false);
  const navigate = useNavigate();

  interface LoginData {
    email: string;
    password: string;
  }

  const loginUser = async (data: LoginData) => {
    // dispatch(startLoading())
    setLoading1(true);
    try {
      const payload = {
        email: data.email,
        password: data.password
      };
      const response = await login(payload);
      if (response.statusCode === 200) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        // notify("Login SuccessFully","success")
        // dispatch(setUserInfo(response.data.user))
        // dispatch(setAccessToken(response.data.accessToken))
        navigate('/');
        // formik.resetForm()
      } else {
        // dispatch(stopLoading())
        setLoading1(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // dispatch(stopLoading())
      setLoading1(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required')
        .matches(
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
          'Invalid email address'
        ),
      password: Yup.string().required('Password is required')
      // .matches(
      //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      //   "Password must be at least 8 characters long and contain at least one letter and one number"
      // )
    }),
    onSubmit: async (props: LoginData) => {
      await loginUser(props);
      console.log(props, 'props1111');
    }
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // handleSubmit(e)
            formik.handleSubmit(e);
          }}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    value={formik.values.email}
                    name="email"
                    validate={{ required: { value: true } }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={
                      formik.touched.email && formik.errors.email ? true : false
                    }
                    // {...field}
                  />
                </FormControl>
                {formik.touched.email && formik.errors.email ? (
                  <FormFeedback message={formik.errors.email} />
                ) : null}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    disabled={loading}
                    value={formik.values.password}
                    name="password"
                    validate={{ required: { value: true } }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={
                      formik.touched.password && formik.errors.password
                        ? true
                        : false
                    }
                    // {...field}
                  />
                </FormControl>
                {formik.touched.password && formik.errors.password ? (
                  <FormFeedback message={formik.errors.password} />
                ) : null}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Continue With Email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
    </>
  );
}
