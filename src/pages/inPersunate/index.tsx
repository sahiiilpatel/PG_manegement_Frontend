import { impersonateLogin } from '@/api/auth/authApi';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function InpersuNate() {
  const param = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  // interface LoginPayload{
  //   fullName : string,
  //   email : string,
  //   impersonateKey : string | undefined
  // }
  const payload: any = JSON.parse(atob(param?.id as string));
  payload.impersonateKey = param?.id;
  console.log(payload, 'payload');

  interface LoginData {
    email: string;
    password: string;
    impersonateKey: string;
  }

  const loginUser = async (data: LoginData) => {
    // dispatch(startLoading())
    setLoading(true);
    try {
      const response = await impersonateLogin(data);
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
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // dispatch(stopLoading())
      setLoading(false);
    }
  };

  useEffect(() => {
    if (param.id) {
      loginUser(payload);
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        action: <ToastAction altText="Try again">Try again</ToastAction>
      });
    }
  }, [param?.id]);

  return (
    <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
      verifying....
    </div>
  );
}
