import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card';
import { BellRing, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Heading from '../shared/heading';
import { useGetSubscriptionList } from '@/pages/room/queries/queries';
import { checkout } from '@/api/subscription/subscription';
import Razorpay from 'razorpay';
import { ClipLoader } from 'react-spinners';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';
import { Label } from '../ui/label';
import { useSelector } from 'react-redux';

export const BlurPage = (props: any) => {
  const { data, isLoading } = useGetSubscriptionList();

  const user = useSelector((state: any) => state?.user?.userInfo);
  const [isOpen, setIsOpen] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState([]);

  const handleChange = () => {
    setIsOpen(false);
  };

  console.log(subscriptionData);

  const handlePayment = async () => {
    try {
      const data = {
        amount: subscriptionData?.price,
        name: user?.fullName,
        planId: subscriptionData?._id
      };
      const response: any = await checkout(data);

      var options: any = {
        key: 'rzp_test_nTdQGQc9GojJI8',
        amount: response.data.amount,
        currency: response.data.currency,
        name: user?.fullName,
        description: 'Buy Subscription',
        image: user?.avatar,
        order_id: response.data?.id,
        callback_url: 'http://localhost:8000/api/v1/payment/verification',
        prefill: {
          name: user?.fullName,
          email: user?.email,
          contact: user?.phoneNumber
        },
        notes: {
          address: 'subscription'
        },
        theme: {
          color: '#3399cc'
        }
      };
      var rzp1 = window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Heading
        title={'Please Subscribe Plane To Access This Page'}
        className="space-y-2 py-4 text-center"
      />
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <ClipLoader color="#ffffff" />
        </div>
      ) : (
        <div className="flex items-center justify-center gap-4 py-5">
          {data?.data?.map((res: any, index: number) => {
            return (
              <Card className={cn('w-screen')} {...props}>
                <CardHeader>
                  <CardTitle>{res?.duration}</CardTitle>
                  <CardDescription>
                    Read features according to plans below
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div>
                    <div
                      key={index}
                      className="mb-4 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0"
                    >
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          occupants : {res.limits?.occupants}
                        </p>
                      </div>
                    </div>
                    <div
                      key={index}
                      className="mb-4 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0"
                    >
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          pgs : {res.limits?.pgs}
                        </p>
                      </div>
                    </div>
                    {res?.features?.map((feat: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className="mb-4 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0"
                        >
                          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {feat}
                            </p>
                          </div>
                        </div>
                      );
                    })}

                    <p className="py-4 text-xl font-extrabold text-red-600">
                      {res?.price} INR
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => {
                      setIsOpen(true);
                      setSubscriptionData(res);
                    }}
                  >
                    <Check className="mr-2 h-4 w-4" /> Subscribe
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
      <Dialog open={isOpen} onOpenChange={handleChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Subscription</DialogTitle>
            <DialogDescription>
              Are You Sure? you want to subscribe this plane ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handlePayment}>Confirm</Button>
            <Button onClick={handleChange}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
